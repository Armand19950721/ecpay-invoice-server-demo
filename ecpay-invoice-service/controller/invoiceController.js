const logger = require('../logger');
const ecpay_invoice = require('../lib/ecpay_invoice.js');

module.exports.Echo = (req, res) => {
    res.send('Hello, Express!');
};

const ecpayInvoiceIssuePromise = (base_param) => {
    return new Promise((resolve, reject) => {
        let create = new ecpay_invoice();
        let res = create.invoice_client.ecpay_invoice_issue(base_param);
        res.then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.Invoice = async (req, res) => {
    try {
        const { invoiceJson, orderJson } = req.body;

        // parse request
        logger.info('Received body:', { invoiceJson, orderJson });
        let base_param = JSON.parse(invoiceJson);
        base_param.vat = "1";

        // send to ecpay
        let ecpayRes = await ecpayInvoiceIssuePromise(base_param);
        // let ecpayRes = "test success"

        // parse reply
        logger.info({ ecpayRes });
        let resObj = queryStringToObject(ecpayRes)
        logger.info({ resObj });

        // return
        res.status(200).json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

function queryStringToObject(queryString) {
    var obj = {};
    var keyValuePairs = queryString.split('&');

    keyValuePairs.forEach(function (pair) {
        var [key, value] = pair.split('=');
        obj[key] = decodeURIComponent(value);
    });

    return obj;
}

