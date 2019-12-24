module.exports = client => {
  /**
   * update profile
   * NOTE test 용 전체 유저 리스트
   */
  const updateProfile = async data => {
    const { userId, name, phone, profile_img, title, birthday } = data;

    const query = {
      name: 'update_profile',
      text: `UPDATE public."user"
        SET name = $1, phone = $2, profile_img = $3, title = $4, birthday = $5
        WHERE id = $6`,
      values: [name, phone, profile_img, title, birthday, userId]
    };

    try {
      const result = await client.query(query);
      if (result.rowCount > 0)
        return { result: 'success', message: '프로필이 수정되었습니다.' };
      else
        return {
          error: 'err',
          code: 404,
          message: '일치하는 유저가 없습니다.'
        };
    } catch (err) {
      console.log(err);
      return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
    }
  };

  /**
   * update password
   * NOTE test 용 전체 유저 리스트
   */
  const updatePassword = async data => {
    const { userId, password, new_password } = data;

    const query = {
      name: 'update_password',
      text: `UPDATE public."user"
        SET password = $1
        WHERE id = $2 AND password = $3`,
      values: [new_password, userId, password]
    };

    try {
      const result = await client.query(query);
      if (result.rowCount > 0)
        return { result: 'success', message: '비밀번호가 수정되었습니다.' };
      else
        return {
          error: 'err',
          code: 404,
          message: '일치하는 유저가 없습니다.'
        };
    } catch (err) {
      console.log(err);
      return { error: 'err', code: 500, message: '몰라 DB관리자한테 물어봐' };
    }
  };

  return {
    updateProfile: data => updateProfile(data),
    updatePassword: data => updatePassword(data)
  };
};
