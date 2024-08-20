const express = require('express');
const router = express.Router();

// 引入控制器文件
const controller = require('./controller/invoiceController');

// 定義路由
router.get('/echo', controller.Echo);
router.post('/Invoice', controller.Invoice);

module.exports = router;