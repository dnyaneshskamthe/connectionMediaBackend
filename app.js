const bodyParser = require('body-parser')
const express=require('express')
const app=express()
const PORT= process.env.PORT || 5000
const router=require('./routes/routes')
app.use(bodyParser.json())
require('./db/conn')
const cors=require('cors')


app.use(cors());

app.get('/',(req,res)=>{
    res.send('welcome to backend node server');
})

app.use('/api/v1/user',router);

app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})