module.exports = function(app)
{
    app.get('/',function(req,res){
        res.render('index.js')
     });
     app.get('/Diet',function(req,res){
        res.render('Diet.js');
    });

    app.get('/Gut',function(req,res){
        res.render('Gut.js');
    });
    
    app.get('/Recovery',function(req,res){
        res.render('Recovery.js');
    });
    
    app.get('/Vagina',function(req,res){
        res.render('Vagina.js');
    });
    
    app.get('/Recommend',function(req,res){
        res.render('Recommend.js');
    });
    
    app.get('/Like',function(req,res){
        res.render('Like.js');
    });

}