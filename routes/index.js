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
router.get('/', (req, res, next) => {
  res.render('client/index', res.args);
});

/**
 * サインイン
 */
router.get('/signin', (req, res, next) => {
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
router.post('/signin', (req, res, next) => {
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
router.get('/signup', (req, res, next) => {
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
router.post('/signup', (req, res, next) => {
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
router.get('/signout', (req, res, next) => {
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

module.exports = router;
