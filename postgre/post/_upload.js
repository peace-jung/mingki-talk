module.exports = async (client, data) => {
  const { userId, photos, content } = data;
  const created = Date.now();

  const query = {
    name: 'insert-post',
    text: `INSERT INTO public."post"(
        id, photos, content, created, "like", comment)
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
