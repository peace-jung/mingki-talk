const { isUndefined } = require('./../utils/validate');

module.exports = client => {
  const _insert = async data => {
    if (isUndefined(data)) {
      return res.status(400).json({
        error: 'Check Parameters',
        code: '400'
      });
    }

    const { id, password, name, phone, profile_img, title, birthday } = data;
    const query = {
      name: 'insert-user',
      text: `INSERT INTO public."user"(
        id, password, name, phone, profile_img, title, birthday)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      values: [id, password, name, phone, profile_img, title, birthday]
    };
    try {
      await client.query(query);
      return { result: 'success', message: '사용자 추가 완료' };
    } catch (err) {
      return { error: err, code: 400 };
    }
  };

  const _select = async args => {
    const { service, tokenId } = args;
    let query = '';
    switch (service) {
      // 유저 전체 리스트 조회
      case 'ALLUSER':
        query = {
          name: 'all-user',
          text: 'SELECT * FROM public."user"'
        };
        break;
      // 특정 유저 정보 조회
      case 'USERINFO':
        const { userId } = args;
        query = {
          name: 'user-info',
          text: 'SELECT * FROM public."user" WHERE id = $1',
          values: [userId]
        };
        break;
      // 유저 검색
      case 'SEARCH':
        query = {
          name: 'user-info',
          text: 'SELECT * FROM public."user" WHERE id = $1',
          values: [userId]
        };
        break;
      default:
        return { error: 'Check Service', code: 400 };
    }

    try {
      const result = await client.query(query);
      return { result: success, data: result.rows };
    } catch (err) {
      return { error: err, code: err.code || 400 };
    }
  };

  const _update = query => {
    console.log('update', query);
    return 'update';
  };

  const _delete = query => {
    console.log('delete', query);
    return 'delete';
  };

  return {
    insert: query => _insert(query),
    select: query => _select(query),
    update: query => _update(query),
    delete: query => _delete(query)
  };
};
