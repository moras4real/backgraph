const express = require ('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')
const app = express()
const mongoose = require('mongoose')
const uri = 'mongodb+srv://arayosam:Kn2EnLDNPAmndTI1@cluster0.ycrt4sy.mongodb.net/gql2024?retryWrites=true&w=majority&appName=Cluster0'
const cors = require ('cors')
app.use(cors())



mongoose.connect(uri)
.then(()=>console.log('Connnected to db'))
.catch(err=>console.log(err))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true 
}))

// app.get('/users',(req,res)=>{
//     res.send(users)
// })

app.listen ('4500',()=>{
    console.log('I am connected abi now');
})