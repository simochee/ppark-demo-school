const express = require('express');
const model = require('../models');
const router = express.Router();

router.use((req, res, next) => {
  res.args = {};
  model.user.get(req.session.user)
    .then((result) => {
      res.args.user = result || {};
      next();
    });
});

/**
 * ホームページ
 */
router.get('/', (req, res) => {
  res.render('client/index', res.args);
});

/**
 * サインイン
 */
router.get('/signin', (req, res) => {
  if(req.session.user) {
    // ログインしていたらホームへリダイレクト
    res.redirect('/');
  } else {
    res.render('clinet/signin');
  }
});

/**
 * サインイン処理
 */
router.post('/signin', (req, res) => {
  model.auth(req.body.id, req.body.password)
    .then(() => {
      req.session.user = req.body.id;
      res.redirect('/?msg=login');
    })
    .catch((err) => {
      res.redirect(`/signin?msg=${err.code}`);
    });
});

/**
 * サインアップ
 */
router.get('/signup', (req, res) => {
  if(req.session.user) {
    // ログインしていたらホームへリダイレクト
    res.redirect('/');
  } else {
    res.render('clinet/signup');
  }
});

/**
 * サインアップ処理
 */
router.post('/signup', (req, res) => {
  model.user.add({
    id: req.body.id,
    password: req.body.password,
  })
    .then(() => {
      req.session.user = req.body.id;
      res.redirect('/?msg=welcome');
    })
    .catch((err) => {
      res.redirect(`/signup?msg=${err.code}`);
    });
});

/**
 * サインアウト
 */
router.get('/signout', (req, res) => {
  if(!req.session.user) {
    res.redirect('/signin');
  }
  req.session.user = null;
  res.redirect('/?msg=signout');
});

/**
 * サインイン認証
 */
router.use((req, res, next) => {
  if(!req.session.user) {
    res.redirect(`/signin?redirect=${req.url}`);
  }
  next();
});

/**
 * 駐車場選択
 */
router.get('/entry', (req, res) => {
  model.parking.getAll()
    .then((result) => {
      res.args.parkings = result;
      res.render('client/parking_list', res.args);
    });
});

/**
 * 駐車マス選択
 */
router.get('/entry/:parking_id', (req, res) => {
  model.stall.getAll(req.params.parking_id)
    .then((result) => {
      res.args.stalls = result;
      res.render('client/stall_list', res.args);
    });
});

/**
 * 駐車マス確認
 */
router.get('/entry/:parking_id/:stall_id', (req, res) => {
  model.stall.get(req.params.stall_id)
    .then((result) => {
      res.args.data = result;
      res.render('client/entry', res.args);
    });
});

/**
 * 入庫処理
 */
router.post('/entry', (req, res) => {
  model.parking.entry(req.body.stall_id)
    .then(() => {
      res.redirect(`/entry/confirm/${req.body.parking_id}/${req.body.stall_id}`)
    });
});

module.exports = router;
