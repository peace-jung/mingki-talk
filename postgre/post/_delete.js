module.exports = async (client, data) => {
  const { userId, postId } = data;

  const query = {
    name: 'delete-post',
    text: `DELETE FROM public."post" WHERE id = $1 AND created = $2`,
    values: [userId, postId]
  };

  try {
    const result = await client.query(query);
    if (result.rowCount > 0)
      return {
        result: 'success',
        resultCode: 200,
        message: '데이터 삭제 성공'
      };
    else
      return {
        error: 'err',
        code: 404,
        message: '일치하는 유저가 없습니다.'
      };
  } catch (err) {
    console.error('Upload Post ERROR', err);
    return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
  }
};
