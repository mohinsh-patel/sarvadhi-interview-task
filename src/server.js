const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./route/router.js');
const expressFileUpload = require('express-fileupload')
const validation=require('./helpers/validation.js')


const port = 3005

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(expressFileUpload())

app.use(validation.checkValidation)

routes(app);

app.listen(port, () => {
    console.log(`Port Running on:${port}`)
})
