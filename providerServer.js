/**
 * Created by jdai on 17/03/2017.
 */
const express=require('express')

const app=express();

app.get('/cars/available', (req, res)=>{
    res.status(200).json([
        {
            id:1,
            brand:'Toyota',
            model:'Camry'
        },
        {
            id:2,
            brand:'BMW',
            model:'320i'
        }
        ]
    );
});

app.get('/car/:id', (req, res)=>{
    console.log('get /car/id '+new Date());
    res.status(200).json({
        id: parseInt(req.params.id),
        brand:'Toyota',
        model:'Camry'
    });
});

app.listen(8080,()=>{
    console.log('Provider listening on 8080');
});