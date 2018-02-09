const express = require('express');

const port = 8088;
const app = express();
const router = express.Router();
router.get('/', (req, res, next) => {
  req.url = '/index.html';
  next();
});

app.use(router);

const goods = require('./data/01-ItemGoods.json');
const ratings = require('./data/02-ItemRating.json');
const seller = require('./data/03-ItemSeller.json');
// 路由
const rotues = express.Router();

rotues.get('/goods', (req, res) => {
  res.json(goods);
});

rotues.get('/ratings', (req, res) => {
  res.json(ratings);
});

rotues.get('/seller', (req, res) => {
  res.json(seller);
});

app.use('/api', rotues);

app.use(express.static('./dist'));

module.express = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('http://localhost:' + port + '\n');
});
