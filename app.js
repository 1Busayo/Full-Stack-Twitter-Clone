const express = require("express");
const app = express();

app.get('/',(req,res)=>{
    res.json({
        message : 'Geek'
    })
})
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started on PORT "+process.env.PORT+" On the IP "+process.env.IP);
});