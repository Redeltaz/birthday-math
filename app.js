const PORT = 8080;
const express = require("express");
const app = express();

// EJS
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/write', (req, res) => {
    res.render('write', {
        message: 'hey hey hey'
    })
})

app.get('/read', (req, res) => {
    const param = req.query.access

    if(param === 'adminAccess') {
        res.render('read', {})
    }

    res.send('Vous n\'avez pas les droits pour voir cette page')
})

app.use((req, res) => {
    res.send('Ce chemin n\'existe pas')
})

app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}/`)
})