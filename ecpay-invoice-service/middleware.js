
require('dotenv').config();

// 嘗試取得 .env 的 INVOICE_TOKEN，如果不存在就引發異常
const invoiceToken = process.env.INVOICE_TOKEN;
if (!invoiceToken) {
  throw new Error('INVOICE_TOKEN not found in .env');
}

const rejectUnauthorized = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const clientIP = req.ip; // 获取客户端IP地址
  const route = req.originalUrl; // 获取路由
  const params = req.params; // 获取请求参数

  console.log(`Client IP: ${clientIP}`);
  console.log(`Route: ${route}`);
  console.log(`Request Params:`, params);
  console.log(`Authorization Header:`, authHeader);

  if (authHeader === 'Bearer ' + invoiceToken) {
    next();
  } else {
    // 否则，拒绝连接，返回未授权的错误
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  rejectUnauthorized,
};
