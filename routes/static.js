const express = require('express')
const path = require('path')
const {response}=require('./api-routes')
const router=express('router')
const root = path.join(__dirname,'..','public')


router.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})
router.get('*',(request, response)=>{
    console.log(request.url)
    response.sendFile('404.html',{root})
})
module.exports=router