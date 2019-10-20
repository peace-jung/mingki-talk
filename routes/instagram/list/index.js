const express = require('express');
const router = express.Router();

const { list } = require('./../../../postgre');

router.get('/', (req, res) => {
  console.log('GET / : check in');
  console.log('postgre', list.insert({ id: '1111', pw: '1111' }));
  res.send({ result: 'hello mingki', type: 'GET' });
});

router.post('/', (req, res) => {
  console.log('POST / : check in');
  console.log('postgre', list.select({ id: '1111', pw: '1111' }));
  res.send({ result: 'hello mingki', type: 'POST' });
});

module.exports = router;
