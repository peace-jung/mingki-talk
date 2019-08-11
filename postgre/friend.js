const { isUndefined } = require('./../utils/validate');

module.exports = client => {
  const _insert = async data => {
    if (isUndefined(data)) {
      return { error: 'Check Parameters', code: 400 };
    }

    const { my_id, f_id } = data;
    const query = {
      name: 'add-friend',
      text: `INSERT INTO public."friend"(my_id, f_id) VALUES ($1, $2)`,
      values: [my_id, f_id]
    };
    try {
      await client.query(query);
      return { result: 'success', message: '사용자 추가 완료' };
    } catch (err) {
      return { error: err, code: 400 };
    }
  };

  const _select = async data => {
    if (isUndefined(data)) {
      return { error: 'Check Parameters', code: 400 };
    }
    const { my_id } = data;
    const query = {
      name: 'select-friend',
      text: 'SELECT my_id, f_id FROM public."friend" WHERE my_id = $1',
      values: [my_id]
    };

    try {
      const result = await client.query(query);
      if (result.rows.length === 0) {
        return { error: 'Not Found', code: 404 };
      }
      return { result: 'success', data: result.rows };
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
    insert: data => _insert(data),
    select: data => _select(data),
    update: data => _update(data),
    delete: data => _delete(data)
  };
};
