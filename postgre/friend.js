module.exports = client => {
  const _insert = async (user, friend) => {
    const query = {
      name: 'add-friend',
      text: `INSERT INTO public."friend" (follower, follow) VALUES ($1, $2)`,
      values: [user, friend]
    };
    try {
      await client.query(query);
      return { result: 'success', message: '팔로우 성공' };
    } catch (err) {
      if (String(err.code) === '23505')
        return { error: err.detail, message: '이미 팔로우 중 입니다.' };
      else return { error: err.detail, message: error.code };
    }
  };

  const _select = async (action, userId) => {
    const query = {
      name: action === 'follow' ? 'select-follow' : 'select-follower',
      text:
        action === 'follow'
          ? 'SELECT follow FROM public."friend" WHERE follower = $1' // 내가 상대방을 팔로우
          : 'SELECT follower FROM public."friend" WHERE follow = $1', // 나를 팔로우하는 상대방
      values: [userId]
    };

    try {
      const result = await client.query(query);
      // if (result.rows.length === 0) {
      //   return { error: 'Not Found', code: 404, message: '친구가 없어요 ㅠㅠ' };
      // }
      return {
        result: 'success',
        resultCode: 200,
        resultData: result.rows,
        count: result.rowCount
      };
    } catch (err) {
      return { error: err, code: err.code };
    }
  };

  const _update = async data => {
    console.log('update', data);
    return 'update';
  };

  const _delete = async (user, friend) => {
    const query = {
      name: 'delete-friend',
      text: `DELETE FROM public."friend" WHERE follower = $1 AND follow = $2`,
      values: [user, friend]
    };
    try {
      await client.query(query);
      return { result: 'success', message: '손절 성공' };
    } catch (err) {
      return { error: err.detail, code: err.code };
    }
  };

  return {
    insert: (user, friend) => _insert(user, friend),
    select: (action, userId) => _select(action, userId),
    update: (user, friend) => _update(user, friend),
    delete: (user, friend) => _delete(user, friend)
  };
};
