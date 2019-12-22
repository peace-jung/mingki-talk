module.exports = async (client, data) => {
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
