const express = require("express");
const app = express();
const cors = require("cors"); //middleware to process requests
const monk = require("monk");
const Filter = require("bad-words"); //Used to filter bad words , abusive languages 
const rateLimit = require("express-rate-limit");
const ejs = require("ejs");

const db = monk(process.env.MONGO_URI||'mongodb://localhost/my_database');
//const db = monk('mongodb://stacksapien:stacksapien@ds125273.mlab.com:25273/twitterclone');
const geeks = db.get('geeks');
const filter = new Filter();

app.use(cors()); //Used to allow connection from client side browser as client side browser restrict User Acces to url
app.use(express.json()); //Used to parse information sent from client side to server side ..Usually sent in json
app.set("view engine","ejs");
app.use(express.static("public"));




app.get('/',(req,res)=>{
    res.render('index.ejs');
});
function isValidGeek(geek){
    return geek.name && geek.name.toString().trim()!=''&& 
    geek.content && geek.content.toString().trim()!=''; //Checks whether it is sending Empty string or not!
}
//Sets Request limit on Sending request if it was written on top then it will rate limit all API.

app.get('/geek',(req,res)=>{
    geeks.find()
    .then(geeks=>{
        res.json(geeks);
    });
});

app.use(rateLimit({
  windowMs: 30* 1000, // 3 second window
  max: 1, // start blocking after 1 requests
}));
app.post('/geek',(req,res) =>{
    
   if(isValidGeek(req.body)){
    //   insert into db....
       const geek = {
           name : filter.clean(req.body.name.toString()),
           content : filter.clean(req.body.content.toString()),
           created : new Date()
       };
       geeks.insert(geek)
       .then(createdGeek=>{
           res.json(createdGeek);
       });
   }else
   {
       res.status(422);
       res.json({
           message : 'Hey! Name and content required...'
       });
   }
});
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started on PORT "+process.env.PORT+" On the IP "+process.env.IP);
});