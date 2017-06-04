const express = require('express'); // require the Express Server module
const hbs = require('hbs'); // This is the view engine that we loaded from npm
const fs = require('fs');
const port = process.env.PORT || 3000; // Use Heroku port or local port 3000

var app = express(); // Make a new app

hbs.registerPartials(__dirname + '/views/partials/');

app.set('view engine', 'hbs'); // we need to configure hbs as our view engine

// This is the easier way to setup pages to serve:
// One command opens a directory that you can type the file names after the port
// And it serves up the pages if they live in that directory
app.use(express.static(__dirname + '/public')); // this middleware sets up the server for us!\

// app.use is how you setup middleware
app.use((req, res, next) =>{

    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=>{
    if (err) {
        console.log('Unable to append to server.log')
        }
    });
    next(); // need to call next or program will hang here
});

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
    
//     });


hbs.registerHelper('getCurrentYear', ()=>{
return new Date().getFullYear()
//return('stuff');
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})


// New Home Page with Template
app.get('/', (req, res) => {
    //res.send('<h2>The About Page</h2>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hidalay Ho Neighborino',
        //currentYear: new Date().getFullYear()

    });
    
});

// New Projects Page
app.get('/projects', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'This is your Projects Page',


    });
    
});

app.get('/about', (req, res) => {
    //res.send('<h2>The About Page</h2>');
    res.render('about.hbs', {
        pageTitle: 'A Boot Page',
        //currentYear: new Date().getFullYear()

    });
    
});

app.get('/bad', (req, res) => { // so when we get 
    res.send({
        message: 'Error 404 Bad Route Detected, yo!',
        body: 'You typed in a bad page link. Try again, k'
    });
    
});


app.listen(port,()=>{
    console.log('The server is now up and running on port: ',port);
}); // Port 3000 is a good port for local development - starts the listeer on port 3000


