const express = require("express");
const app = express();
const cors = require("cors"); //middleware to process requests
const monk = require("monk");
const Filter = require("bad-words");

const db = monk('mongodb://localhost/my_database');
const geeks = db.get('geeks');
const filter = new Filter();

app.use(cors()); //Used to allow connection from client side browser as client side browser restrict User Acces to url
app.use(express.json()); //Used to parse information sent from client side to server side ..Usually sent in json

app.get('/',(req,res)=>{
    res.json({
        message : 'Iknow ike it'
    })
});
function isValidGeek(geek){
    return geek.name && geek.name.toString().trim()!=''&& 
    geek.content && geek.content.toString().trim()!=''; //Checks whether it is sending Empty string or not!
}
app.get('/geek',(req,res)=>{
    geeks.find()
    .then(geeks=>{
        res.json(geeks);
    });
})
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