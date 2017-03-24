/**
 * Created by jdai on 17/03/2017.
 */
const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/states', (req, res)=>{
    res.status(200).json(
        {"CarRental Website": ['Has some cars for rental','Has a car for ID 1']}
        );
});

app.post('/setup', (req, res)=>{
    const state=req.body.state;

    switch(state){
        case 'Has some cars for rental':
            //do nothing;
            break;
        default:
            break;
    }

    res.end();
});

module.exports=app;

// app.listen(8081, ()=>{
//     console.log('state server listening on 8081');
// });