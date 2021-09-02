const PORT = 8080;
const express = require("express");
const app = express();
const upload = require('express-fileupload');
const path = require('path')
const sqlite3 = require('sqlite3')
const { uuid } = require('uuidv4')

// DB
const db = new sqlite3.Database('birthdaydb.db', err => {
    if (err) throw err

    console.log('database linked')
})

// EJS
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(upload());

app.get('/', (req, res) => {
    res.redirect('/write');
})

app.get('/write', (req, res) => {
    res.render('write');
})

app.post('/write', (req, res) => {
    const identifiant = req.body.identifiant;
    const message = req.body.message;
    let fileName = '';

    try {
        if(!req.files) {
            console.log('no file uploaded');
        } else {
            const file = req.files.file;
            const size = file.data.length;
            const extension = path.extname(file.name)
            fileName = Date.now() + extension;

            const allowedExtensions = /png|jpeg|jpg|svg|PNG|JPG|JPEG|SVG/;

            if (!allowedExtensions.test(extension)) {
                res.status(400).send({message: 'Ce fichier n\'est pas prit en compte, veuillez mettre seulement du png, jpg ou svg'})
                return;
            }
            
            if (size > 50000000) {
                res.status(400).send({message: 'Le fichier est trop lourd, il doit faire moins de 50MB'})
                return;
            }

            file.mv('./public/img/uploaded/' + fileName);
            console.log('file uploaded')

        }
        
        // const fileName = (req.files) ? Date.now() + path.extname(req.files.file.name) : ''

        db.run(`INSERT INTO messages (id, name, content, file_name) VALUES (?, ?, ?, ?)`, [uuid(), identifiant, message, fileName], err => {
            if (err) throw err;
            console.log('Message ajouté')

            res.status(200).send({message: 'Merci pour votre message !'})
        })
    } catch(err) {
        throw err
    }
})

app.get('/read', (req, res) => {
    const param = req.query.access
    let messages = []

    if(param !== 'adminAccess') {
        res.send('Vous n\'avez pas les droits pour voir cette page')
    }

    db.all('SELECT * FROM messages', (err, result) => {
        if(err) throw err;

        console.log('data retrieved')
        
        res.render('read', {
            messages: result
        })
    })
    
})

app.get('/sended', (req, res) => {
    res.render('send')
})

app.use((req, res) => {
    res.send('Ce chemin n\'existe pas')
})

app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}/`)
})