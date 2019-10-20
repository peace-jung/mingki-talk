const { isUndefined } = require('./../../utils/validate');

module.exports = client => {
  const getAllUser = async () => {
    const query = {
      name: 'all-user',
      text: 'SELECT * FROM public."user"'
    };

    try {
      const result = await client.query(query);
      return { result: 'success', data: result.rows };
    } catch (err) {
      return { error: err, code: err.code || 400 };
    }
  };

  const login = async data => {
    const { userId, userPw } = data;
    const query = {
      name: 'user-info',
      text:
        'SELECT id, name, phone, profile_img, title, birthday FROM public."user" WHERE id = $1 AND password = $2',
      values: [userId, userPw]
    };

    try {
      const result = await client.query(query);
      if (result.rows.length === 0) return { error: 'Not Found', code: 404 };
      return { result: 'success', data: result.rows };
    } catch (err) {
      return { error: err, code: err.code || 400 };
    }
  };

  const signup = async data => {
    if (isUndefined(data)) {
      return { error: 'Check Parameters', code: 400 };
    }

    const { userId, userPw, name, phone, profile_img, title, birthday } = data;
    const query = {
      name: 'insert-user',
      text: `INSERT INTO public."user"(
        id, password, name, phone, profile_img, title, birthday)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      values: [userId, userPw, name, phone, profile_img, title, birthday]
    };

    try {
      await client.query(query);
      return {
        result: 'success',
        resultCode: 200,
        message: '사용자 추가 완료'
      };
    } catch (err) {
      return { error: err, code: 400 };
    }
  };

  return {
    getAllUser: () => getAllUser(),
    login: data => login(data),
    signup: data => signup(data)
  };
};
