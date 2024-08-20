const logger = require('./logger'); // 引入logger模組
const express = require('express');
const cors = require('cors');
const { rejectUnauthorized } = require('./middleware'); // 引入自定義中間件
const app = express();
const port = 3123;

logger.info(`invoice server starting`);
// 使用CORS中間件，允許所有來源
app.use(cors());

// 使用內置的中間件處理POST請求主體
app.use(express.json()); // 解析JSON格式的請求主體
app.use(express.urlencoded({ extended: true })); // 解析URL編碼的請求主體

// 將自定義中間件添加到應用程序中，確保它在其他路由之前執行
app.use(rejectUnauthorized);

// 引入路由文件
const routes = require('./routes');

// 使用路由
app.use('/', routes);

// 監聽指定端口
app.listen(port, () => {
    logger.info(`Server is running on port http://127.0.0.1:${port}`);
});
