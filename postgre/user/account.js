const { isUndefined } = require('./../../utils/validate');

module.exports = client => {
  /**
   * getAllUser
   * NOTE test 용 전체 유저 리스트
   */
  const getAllUser = async () => {
    const query = {
      name: 'all-user',
      text: `SELECT * FROM public."user"`
    };

    try {
      const result = await client.query(query);
      return { result: 'success', data: result.rows };
    } catch (err) {
      return { error: err, resultCode: 500, code: err.code || 400 };
    }
  };

  /**
   * checkUserExist
   * NOTE test 용 전체 유저 리스트
   */
  const checkUserExist = async userId => {
    const query = {
      name: 'userExist',
      text: `SELECT id, name, profile_img FROM public."user" WHERE (id = $1)`,
      values: [userId]
    };

    try {
      const result = await client.query(query);
      return { result: 'success', data: result.rows };
    } catch (err) {
      console.log(err);
      return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
    }
  };

  /**
   * login
   * @param userId
   * @param userPw
   */
  const login = async data => {
    const { userId, userPw } = data;
    const queryId = {
      name: 'user-id',
      text: `SELECT id, name FROM public."user"
        WHERE (id = $1)`,
      values: [userId]
    };
    const queryInfo = {
      name: 'user-info',
      text: `SELECT id, name, phone, profile_img, title, birthday FROM public."user"
        WHERE (id = $1 AND password = $2)`,
      values: [userId, userPw]
    };

    try {
      const result = await client.query(queryId);
      if (result.rows.length === 0)
        return {
          error: 'Not Found User',
          code: 4041,
          message: '존재하지 않는 아이디'
        };

      const result2 = await client.query(queryInfo);
      if (result2.rows.length === 0)
        return {
          error: 'Wrong Password',
          code: 4042,
          message: '잘못된 비밀번호'
        };

      return { result: 'success', resultCode: 200, data: result2.rows };
    } catch (err) {
      console.error('Login ERROR', err);
      return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
    }
  };

  /**
   * signup
   * @param userId
   * @param userPw
   * @param name
   */
  const signup = async data => {
    if (isUndefined(data)) {
      return {
        error: 'Check Parameters',
        code: 400,
        message: '파라미터 값이 없습니다.'
      };
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
      console.error('Sign Up ERROR', err);
      if (String(err.code) === '23505')
        return { error: 'Unique ID', code: 409, message: '아이디 중복' };
      else
        return {
          error: err.detail,
          code: 500,
          message: '몰라 DB관리자한테 물어봐'
        };
    }
  };

  const searchUser = async (userId, myId) => {
    const query = {
      name: 'search-one-user',
      text: `SELECT id, name, phone, profile_img, title, birthday FROM public."user" WHERE (id = $1)`,
      values: [userId]
    };
    const query2 = {
      name: 'is-follow',
      text: `SELECT follow FROM public."friend" WHERE follower = $1 AND follow = $2`,
      values: [userId, myId]
    };

    try {
      const result = await client.query(query);
      const result2 = await client.query(query2);

      if (result.rows.length === 0)
        return {
          error: 'Not Found User',
          code: 404,
          message: '존재하지 않는 아이디'
        };

      return {
        result: 'success',
        resultCode: 200,
        message: '사용자의 정보를 가져왔습니다.',
        resultData: {
          ...result.rows[0],
          follow: result2.rows.length !== 0
        }
      };
    } catch (err) {
      console.error('Search User ERROR', err);
      return {
        error: err.detail,
        code: err.code,
        message: '몰라 DB관리자한테 물어봐'
      };
    }
  };

  return {
    getAllUser: () => getAllUser(),
    checkUserExist: userid => checkUserExist(userid),
    login: data => login(data),
    signup: data => signup(data),
    searchUser: (userId, myId) => searchUser(userId, myId)
  };
};
