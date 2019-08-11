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

  const _select = query => {
    console.log('select', query);
    return 'select';
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
