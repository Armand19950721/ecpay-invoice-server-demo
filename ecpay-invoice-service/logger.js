const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');


// 創建一個logger
const logger = winston.createLogger({
    level: 'info', // 設定日誌級別，這裡設定為'info'
    format: winston.format.json(), // 使用JSON格式記錄
    transports: [
        new DailyRotateFile({
            filename: 'logs/%DATE%.log', // 日誌文件名，%DATE%將被替換為當前日期
            datePattern: 'YYYY-MM-DD', // 日期模式
            zippedArchive: true, // 壓縮舊的日誌文件
            maxSize: '5m', // 單個日誌文件的最大大小
            maxFiles: '10d' // 最多保留10天的日誌文件
        }),
        new winston.transports.Console() // 控制台傳輸器
    ]
});

module.exports = logger;
