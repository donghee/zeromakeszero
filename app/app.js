const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dotenv = require("dotenv");

dotenv.config();

const app = new Koa();
app.use(bodyParser());

const router = new Router();

const render = require('koa-ejs');
const path = require('path');

render(app, {
  root: path.join(__dirname, 'view'),
  layout:  false,
  viewExt: 'html',
  cache: false,
  debug: false,
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zeromakeszero', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error);

const _answers = mongoose.model('answers', new mongoose.Schema({
  q: 'string',
  a: 'string',
  date: { type: Date, default: Date.now },
}));

const _postIts = mongoose.model('postits', new mongoose.Schema({
  type: 'string',
  coordinate: [],
  message: 'string',
  name: 'string',
  password: { type: 'string', select: false },
  pin: 'string',
  color: 'string',
  area : 'string',
  date: { type: Date, default: Date.now }
}));

const questions = [
    '10대들에게 미래는 유토피아일까 디스토피아일까?',
    '세대간의 격차를 더욱 심화시키는 기술이 있을까?',
    '환경에 해가 되지 않는 창작 재료는? ',
    '광주와 서울의 공공성은 다를까?',
    '지역 중심의 행사는 또 다른 지역적 위계를 만들고 있지는 않나?',
    '퀴어의 삶은 어떤 정치성을 가지나?',
    '박물관이 작품을 보관하는 방법은 지속가능한 것일까? ',
    '인공지능 기술과 당신의 삶 사이 거리를 재어본다면? ',
    '발레를 위한 이상적인 몸의 기준은 무엇일까? ',
    '사적인 기록은 단순히 개인적인 의미만을 가질까? 어떤 공적인 가치가 있을까?',
    '기술간극이 가장 심화된 곳은 어디일까? 세대격차, 젠더격차, 빈부격차, 인종격차, 지역격차... ',
    '온라인 플랫폼이 오프라인의 위계를 뒤집을 수 있을까? ',
    '무엇을 무엇으로 어떻게 만들까?',
    '전시장에 있던 그 많던 가벽은 다 어디로 갔을까?',
    '윤리적인 예술이란 무엇일까?',
    '동물원은 없어져야 할까?',
    '비인간 동물의 역할을 우리는 어떻게 규정하고 있을까?',
    '재난의 시대를 통과하는 예술은 무엇을 고민해야 할까?',
    '기후환경이 변하면 건축은 어떻게 바뀌어야 할까?',
    '10대에게 코딩은 어떤 의미의 활동일까? ',
    '소수자의 자긍심은 어떻게 만들어질까?',
    '내가 가지고 있는 소수자성은 무엇이고 다른 소수자성과 어떻게 만날까?',
    '함께 아이를 기르는 예술가 공동체를 어떻게 만들 수 있을까?',
    '양육자로서의 경험은 예술가를 어떻게 바꿀까?',
    '감염병 시대에 적절한 거주방식은 어떤 형태일까?',
    '탄소 발생량을 줄이는 디자인이란 무엇일까?'];

router.get('/', async (ctx) => {
  const question = questions[Math.floor(Math.random()*questions.length)];
  await ctx.render('question', {
    question
  });
});

router.post('/', async (ctx) => {
  const answer = ctx.request.body;
  console.log(answer);
  if (answer.a == '') {
     ctx.redirect('/');
  }

  await _answers.create({ q: answer.q, a: answer.a}, function (err) {
    if (err) return console.error(err);
  });

  const question = questions[Math.floor(Math.random()*questions.length)];
  await ctx.render('question', {
    question
  });
});

router.get('/answers', async (ctx) => {
  var answers = await _answers.find({});
  await ctx.render('answers', {
    answers
  });
});

router.get('/be-queer/post-its', async (ctx) => {
  console.log('list post it')
  var postIts = await _postIts.find({});
  ctx.body = postIts;
});

router.post('/be-queer/create', async (ctx) => {
  console.log('create post it')
  const postIt = new _postIts(ctx.request.body);
  await postIt.save(function (err) {
    if (err) return console.error(err);
  });
  ctx.body = { status: 'success', postIt };
});

router.post('/be-queer/update', async (ctx) => {
  console.log('edit post it')
  const postIt = ctx.request.body;
  const _postIt = await _postIts.findById(postIt._id).select('+password').exec();
  if (process.env.password !== postIt.password && _postIt.password !== postIt.password) {
    ctx.body = { status: 'error' };
    return;
  }

  await _postIts.findByIdAndUpdate(postIt._id, postIt, function (err) {
    if (err) return console.error(err);
  });
  ctx.body = { status: 'success', postIt };
});

router.post('/be-queer/remove', async (ctx) => {
  console.log('remove post it')
  const postIt = ctx.request.body;
  const _postIt = await _postIts.findById(postIt._id).select('+password').exec();
  if ('0makes0' !== postIt.password && _postIt.password !== postIt.password) {
    ctx.body = { status: 'error' };
    return;
  }

  await _postIts.findByIdAndRemove(postIt._id, (err, _postIt) => {
    if (err) {
      ctx.body = { status: 'error', err };
      return;
    }
    console.log(_postIt);
    ctx.body = { status: 'success', _id: _postIt._id };
  });
});

router.get('/be-queer', async (ctx) => {
  console.log('be-queer')
  const question = questions[Math.floor(Math.random()*questions.length)];
  await ctx.render('be-queer', {
    question
  });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3003);
