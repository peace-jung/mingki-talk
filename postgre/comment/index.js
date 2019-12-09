module.exports = client => {
  const _get = async data => {
    const { ownerId, postCreated } = data;

    const query = {
      name: 'get-comments',
      text: `SELECT owner, "postId", "userId", content, created
        FROM public.comment
        WHERE owner = $1 AND "postId" = $2
        ORDER BY created DESC`,
      values: [ownerId, postCreated]
    };

    try {
      const result = await client.query(query);
      return { result: 'success', resultCode: 200, resultData: result.rows };
    } catch (err) {
      if (String(err.code) === '23503')
        return { error: 'Not Found User', code: 404, message: '없는 유저' };
      console.error('Get Comment ERROR', err);
      return {
        error: 'Get Comment ERROR',
        code: 500,
        message: '몰라 DB관리자한테 물어봐'
      };
    }
  };

  const _add = async data => {
    const { ownerId, postCreated, userId, content } = data;
    const created = Date.now();
    const query = {
      name: 'insert-comment',
      text: `INSERT INTO public.comment(
        owner, "postId", "userId", content, created)
        VALUES ($1, $2, $3, $4, $5)`,
      values: [ownerId, postCreated, userId, content, created]
    };

    try {
      const result = await client.query(query);
      return {
        result: 'success',
        resultCode: 200,
        message: '댓글 등록 성공'
      };
    } catch (err) {
      if (String(err.code) === '23503')
        return { error: 'Not Found Comment', code: 404, message: '없는 글' };
      console.error('Upload Post ERROR', err);
      return {
        error: 'Add Comment ERROR',
        code: 500,
        message: '몰라 DB관리자한테 물어봐'
      };
    }
  };

  return {
    get: data => _get(data),
    add: data => _add(data)
  };
};
