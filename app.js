const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})
const Article = mongoose.model('Article', articleSchema);

app.get('/articles', function(req, res){
    Article.find({}, function(err, foundArticles){
        if (!err){
            res.send(foundArticles)
        }else{
            console.log(err);
        }
    })

})

app.post('/articles', function(req, res){

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if (!err){
            res.send('Successfully added new articles');
        }else{
            res.send(err);
        }
    });
})

app.delete('/articles', function(req, res){
    Article.deleteMany({}, function(err){
        if (!err){
            res.send('Successfully deledet ALL articles')
        }else{
            res.send(err)
        }
    })
})

app.listen(3002, function(){
    console.log('Server started on port 3002');
})
