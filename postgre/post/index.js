module.exports = client => {
  const _get = async data => {
    const userId = data.userId;
    const postId = data.postId;

    const query = {
      name: postId ? 'get-post' : 'get-posts',
      text:
        `SELECT
          created, id, content, photos, like, comment,
          cardinality(comment) AS commentcount, cardinality("like") AS likecount
        FROM public.post
        WHERE (id = $1)` + (postId ? ` AND (created = $2)` : ``),
      values: postId ? [userId, postId] : [userId]
    };

    try {
      const result = await client.query(query);
      return { result: 'success', resultCode: 200, data: result.rows };
    } catch (err) {
      if (String(err.code) === '23503')
        return { error: 'Not Found User', code: 404, message: '없는 유저' };
      console.error('Get Post ERROR', err);
      return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
    }
  };

  const _upload = async data => {
    const { userId, photos, content } = data;
    const created = Date.now();
    const query = {
      name: 'insert-post',
      text: `INSERT INTO public."post"(
        id, photos, content, created, like, comment)
        VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [userId, photos, content, created, [], []]
    };

    try {
      const result = await client.query(query);
      return {
        result: 'success',
        resultCode: 200,
        message: '데이터 삽입 성공'
      };
    } catch (err) {
      if (String(err.code) === '23503')
        return { error: 'Not Found User', code: 404, message: '없는 유저' };
      console.error('Upload Post ERROR', err);
      return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
    }
  };

  const _contentLike = async data => {
    const { userId, contentUserID, contentDataId, like } = data;

    // 좋아요한 유저 리스트 조회
    const query1 = {
      name: 'select-like-users',
      text: `SELECT "like"
        FROM public.post
        WHERE id = $1 AND created = $2`,
      values: [contentUserID, contentDataId]
    };

    try {
      const result1 = await client.query(query1);
      const likes = result1.rows[0].like || [];
      // ? result1.rows[0].like.find(user => user === userId)
      // : [];
      const newLikes = [];
      const alreadyLike = likes.find(user => user === userId);

      if (like) {
        if (alreadyLike) {
          // 좋아요 요청, 이미 좋아요 했음
          return {
            error: 'already like',
            code: 401,
            message: '이미 좋아요 했음'
          };
        } else {
          // 좋아요 요청, 좋아요
          likes.map(user => newLikes.push(user));
          newLikes.push(userId);
        }
      } else {
        if (alreadyLike) {
          // 좋아요 취소, 기존 좋아요 했음
          likes.map(user => user !== userId && newLikes.push(user));
        } else {
          // 좋아요 취소, 기존 좋아요 없음
          return {
            error: 'already unlike',
            code: 401,
            message: '이미 좋아요 취소했음'
          };
        }
      }

      // 좋아요 수정사항 반영
      const query2 = {
        name: 'update-like',
        text: `UPDATE public.post
        SET "like" = $1
        WHERE (id = $2 AND created = $3)`,
        values: [newLikes, contentUserID, contentDataId]
      };

      try {
        const result2 = await client.query(query2);

        return {
          result: 'success',
          resultCode: 200,
          messgae: '처리되었습니다.'
        };
      } catch (error) {
        if (String(error.code) === '23503')
          return {
            error: 'Not Found User',
            code: 404,
            message: '없는 유저 또는 없는 글'
          };
        console.error('Post Like ERROR', error);
        return { error: 'error', code: 500, message: '좋아요 반영에서 에러남' };
      }
    } catch (error) {
      if (String(error.code) === '23503')
        return {
          error: 'Not Found User',
          code: 404,
          message: '없는 유저 또는 없는 글'
        };
      console.error('Post Like ERROR', error);
      return { error: 'error', code: 500, message: '좋아요 조회에서 에러남' };
    }
  };

  const _allPost = async userId => {
    const query = {
      name: 'all-post-for-main',
      text: `SELECT
          A.created, A.id, A.content, A.photos, A.like, A.comment,
          cardinality(A.comment) AS commentcount, cardinality(A.like) AS likecount
        FROM public.post AS A
        JOIN
        (SELECT following FROM public."friend"
        WHERE follower = $1) AS B
        ON A.id = B.following
        ORDER BY A.created DESC`,
      values: [userId]
    };

    try {
      const result = await client.query(query);
      return {
        result: 'success',
        resultCode: 200,
        resultData: result.rows
      };
    } catch (err) {
      if (String(err.code) === '23503')
        return { error: 'Not Found User', code: 404, message: '없는 유저' };
      console.error('Get All Post ERROR', err);
      return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
    }
  };

  return {
    get: data => _get(data),
    upload: data => _upload(data),
    contentLike: data => _contentLike(data),
    allPost: userId => _allPost(userId)
  };
};
