const { isUndefined } = require('./../utils/validate');

module.exports = client => {
  const _insert = async data => {
    if (isUndefined(data)) {
      return { error: 'Check Parameters', code: 400 };
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

  const _select = async data => {
    const { service } = data;
    let query = '';

    switch (service) {
      // 유저 전체 리스트 조회
      case 'ALLUSER':
        query = {
          name: 'all-user',
          text: 'SELECT * FROM public."user"'
        };

        try {
          const result = await client.query(query);
          return { result: 'success', data: result.rows };
        } catch (err) {
          return { error: err, code: err.code || 400 };
        }

      // 특정 유저 정보 조회
      case 'USERINFO':
        const { userId, password } = data;
        query = {
          name: 'user-info',
          text:
            'SELECT id, name, phone, profile_img, title, birthday FROM public."user" WHERE id = $1 AND password = $2',
          values: [userId, password]
        };

        try {
          const result = await client.query(query);
          if (result.rows.length === 0)
            return { error: 'Not Found', code: 404 };
          return { result: 'success', data: result.rows };
        } catch (err) {
          return { error: err, code: err.code || 400 };
        }

      // 유저 검색
      case 'SEARCH':
        const { type, value } = data;
        if (type !== 'id' && type !== 'phone') {
          return { error: 'Check Parameter', code: 400 };
        }
        query = {
          name: 'user-search',
          text: `SELECT id, name, phone, profile_img, title, birthday FROM public."user" WHERE ${type} = $1`,
          values: [value]
        };

        try {
          const result = await client.query(query);
          if (result.rows.length === 0)
            return { error: 'Not Found', code: 404 };
          return { result: 'success', data: result.rows };
        } catch (err) {
          return { error: 'Check Parameter', code: err.code || 400 };
        }
      default:
        return { error: 'Check Service', code: 400 };
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
    insert: data => _insert(data),
    select: data => _select(data),
    update: data => _update(data),
    delete: data => _delete(data)
  };
};
