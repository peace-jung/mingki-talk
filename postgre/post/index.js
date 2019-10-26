module.exports = client => {
  const _get = async data => {
    const userId = data.userId;
    const postId = data.postId;

    const query = {
      name: postId ? 'get-post' : 'get-posts',
      text:
        `SELECT created, id, content, photo FROM public.post
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
    const { userId, photo, content } = data;
    const created = Date.now();
    const query = {
      name: 'insert-post',
      text: `INSERT INTO public."post"(
        id, photo, content, created)
        VALUES ($1, $2, $3, $4)`,
      values: [userId, photo, content, created]
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

  return {
    get: data => _get(data),
    upload: data => _upload(data)
  };
};
