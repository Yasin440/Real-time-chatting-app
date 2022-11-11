const formidable = require('formidable');
module.exports.registerUser = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        console.log('err', err);
        console.log('fields', fields);
        console.log('files', files);
    })
    console.log('res');
}