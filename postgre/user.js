module.exports = client => {
  const _insert = query => {
    console.log('insert', query);
    return 'insert';
  };

  const _select = async args => {
    const { service } = args;
    let query = '';
    switch (service) {
      // 유저 전체 리스트 조회
      case 'ALLUSER':
        query = 'SELECT * FROM public."user"';
        break;
      // 특정 유저 정보 조회
      case 'USERINFO':
        console.log('SELECT USERINFO');
        break;
      // 유저 검색
      case 'SEARCH':
        console.log('SELECT SEARCH');
        break;
      default:
        return { error: 'Check Service', code: 400 };
    }

    try {
      const result = await client.query(query);
      return result;
    } catch (err) {
      return err;
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
