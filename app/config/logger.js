const rfs = require("rotating-file-stream");
const morgan = require('morgan')
const path = require('path');

exports.setRequest = (app) => {
    const formatDate = (d) => {
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const log_file_name = (time, index) => {
        if (!time) return 'access.log';
        return [formatDate(time), 'access.log'].join('-');
    }
    const accessLogStream = rfs.createStream(log_file_name, {
        interval: "1d", // rotate daily 
        path: path.resolve(__dirname, '..', 'logs')
    })
    // setup the logger 
    morgan.token('body', req => {
        return JSON.stringify(req.body)
    })

    morgan.token('date', function () {
        var p = new Date().toString().replace(/[A-Z]{3}\+/, '+').split(/ /);
        return (p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5]);
    });

    morgan.token('secret', function (req, res) { return req.headers['x-access-token'] })

    app.use(morgan(':remote-addr :remote-user [:date] :status [secret=:secret] ":method :url HTTP/:http-version" :body :response-time ms - :res[content-length] ', { stream: accessLogStream }))

}