const { isUndefined } = require('./../utils/validate');

module.exports = client => {
  const _insert = async (user, friend) => {
    const query = {
      name: 'add-friend',
      text: `INSERT INTO public."friend" (my_id, f_id) VALUES ($1, $2)`,
      values: [user, friend]
    };
    try {
      await client.query(query);
      return { result: 'success', message: '팔로우 성공' };
    } catch (err) {
      return { error: err, code: 400 };
    }
  };

  const _select = async (action, userId) => {
    const query = {
      name: action === 'follow' ? 'select-follow' : 'select-follower',
      text:
        action === 'follow'
          ? 'SELECT f_id FROM public."friend" WHERE my_id = $1'
          : 'SELECT my_id FROM public."friend" WHERE f_id = $1',
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
      return { error: err, code: 400 };
    }
  };

  const _update = async data => {
    console.log('update', data);
    return 'update';
  };

  const _delete = async data => {
    console.log('delete', data);
    return 'delete';
  };

  return {
    insert: (user, friend) => _insert(user, friend),
    select: (action, userId) => _select(action, userId),
    update: data => _update(data),
    delete: data => _delete(data)
  };
};
