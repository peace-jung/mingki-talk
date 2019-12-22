module.exports = async (client, data) => {
  const userId = data.userId;
  const postId = data.postId;
  const loginId = data.loginId;

  const query = {
    name: postId ? 'get-post' : 'get-posts',
    text:
      `SELECT
        created, id, content, photos,
        (SELECT COUNT("like") FROM public.post WHERE $1 = ANY("like")) AS isLike
        ${
          postId
            ? ', "like", comment, cardinality(comment) AS commentcount, cardinality("like") AS likecount'
            : ''
        }
      FROM public.post
      WHERE (id = $2)` + (postId ? ` AND (created = $3)` : ``),
    values: postId ? [loginId, userId, postId] : [loginId, userId]
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
