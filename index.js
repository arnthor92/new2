const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

var port = process.env.PORT || 3000

var logs = []

function buildHTML(html) {
    html +=
    `<form method="post" action="/">
    <input type="text" name="user[name]">
    <input type="submit" value="Submit">
    </form>`
    return html
}

app.post('/', (req, res) => {
    if(req.body.user) {
        var date = new Date()
        var msg = (date.toGMTString()) + req.body.user.name;
        logs.push(msg);
    }
    var html = ""
    for (var index in logs) {
        html += "<br>" + logs[index]
    }
    res.send(buildHTML(html))
})

app.get('/', (req, res) => {
    var html = "";
    for(var index in logs){
        html += "<br>" + logs[index]
    }
    res.send(buildHTML(html))
})

app.listen(port, () => console.log('Example app listening on port 3000!'))