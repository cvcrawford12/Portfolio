var express = require('express'),
    app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
   res.render('index'); 
});

app.get('/home', function(req, res) {
   res.render('index'); 
});

app.get('/profile/:filter', function(req, res) {
   var filterParam = req.params.filter;
   res.render('profile/' + filterParam, {activeLink: req.params.filter}); 
});

app.get('/actions/:filter', function(req, res) {
   var filterParam = req.params.filter;
   res.render('actions/' + filterParam);
});

app.get('/actions/todo', function(req, res) {
   res.render('actions/todo');
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log('MentMe site is running'); 
});