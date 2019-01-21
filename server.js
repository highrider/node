const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express(); //вот здесь и начинается наше приложение, здесь мы запустили так сказать конструктор

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {  //здесь мы добавляем промежуточный функционал  при помощи команды use, задает параметры функции
    let now = new Date().toString();

    let log = `${now}: ${req.method} ${req.url}`; 
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => { //записываем в файл логирования наш
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //здесь мы вставляем статическую страницу, с уже написанным html  кодом



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {  //здесь, / значит, корневая папка сайта например tut.by. req and res  имеют свои методы
    // res.send('<h1>hello express</h1>'); //это ответ на запрос
    res.render('home.hbs' , {
        pageTitle: "This is home page",
        welcomeMessage: 'Hello user you in my first server app'
    });
});

app.get('/about', (req, res) => { //здесь мы делаем запрос на наш новый роут /about  только через метод render, который подтягивает шаблон
    res.render('about.hbs', {
        pageTitle: "About page"
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle: 'This is my projects',
        welcomeMessage: 'This is page for my projects'
    })
})

app.get('/bad', (req,res) => {
    res.send({
        error: 'this is 404 error',
        errorMessage: 'this type of error may occur if you have some request page problems'
    });
});

//но это все безсмысленно пока мы не установим обработчик на событие app.get()
//сделаем это
app.listen(port, () => {
    console.log('server now is set up');
});  //биндим этот обработчик на порт на нашей машине