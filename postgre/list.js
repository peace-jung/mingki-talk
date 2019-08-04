module.exports = client => {
  const _insert = query => {
    console.log('insert', query);
    return 'insert';
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
