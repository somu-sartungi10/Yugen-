import express from "express"


const app = express();

app.get('/', (req, res)=>{
    res.send("welcomt to jikan");
    res.send("this is express server")
})
app.listen(3000 , async()=>{
    console.log(`app is running on http://localhost:${3000}`);
})

