const express = require('express');
const router = express.Router();

/**
 * ホームページ
 */
router.get('/', (req, res, next) => {
  res.render('client/index');
});

/**
 * サインイン
 */
router.get('/signin', (req, res, next) => {
  res.render('clinet/signin');
});

/**
 * サインイン処理
 */
router.post('/signin', (req, res, next) => {
  // some processes
});

/**
 * サインアップ
 */
router.get('/signup', (req, res, next) => {
  res.render('client/signup');
});

/**
 * サインアップ処理
 */
router.post('/signup', (req, res, next) => {
  // some processes
});

/**
 * サインイン認証
 */
router.use((req, res, next) => {
  next();
});

/**
 * 入庫先
 */


module.exports = router;
