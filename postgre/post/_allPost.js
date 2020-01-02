module.exports = async (client, userId) => {
  // DISTINCT 는 중복제거하는 구문인데
  // DISTINCT ON 은 postgresql 의 고유 구문이다.
  const query = {
    name: 'all-post-for-main',
    text: `SELECT DISTINCT ON(A.created)
        A.created, A.id, A.content, A.photos, A.like, A.comment,
        cardinality(A.comment) AS commentcount, cardinality(A.like) AS likecount
      FROM public.post AS A
      JOIN
        (SELECT following FROM public."friend" WHERE follower = $1) AS B
      ON (A.id = B.following OR A.id = $2)
      ORDER BY A.created DESC`,
    values: [userId, userId]
  };

  try {
    const result = await client.query(query);
    const data = result.rows.map(item => {
      item.isLike = item.like.find(l => l === userId) ? true : false;
      return item;
    });
    return {
      result: 'success',
      resultCode: 200,
      resultData: data
    };
  } catch (err) {
    if (String(err.code) === '23503')
      return { error: 'Not Found User', code: 404, message: '없는 유저' };
    console.error('Get All Post ERROR', err);
    return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
  }
};
