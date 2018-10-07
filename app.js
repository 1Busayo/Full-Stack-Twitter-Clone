const express = require("express");
const app = express();
const cors = require("cors"); //middleware to process requests

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
app.post('/geek',(req,res) =>{
   if(isValidGeek(req.body)){
       //insert into db....
       const geek = {
           name : req.body.name.toString(),
           content : req.body.content.toString()
       };
       console.log(geek);
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