
const express = require('express')
const router=express('router')

const { MongoClient, ObjectId } = require('mongodb')
const {url}=require("../secrets/mongodb.json")
const client = new MongoClient(url)
const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

// const todos = [
// 	{ id: 1, item: 'Learn JavaScript', complete: false },
// 	{ id: 2, item: 'Learn Express', complete: false },
// 	{ id: 3, item: 'Build a To Do router', complete: false }
// ]


// GET /api/todos
router.get('/',async(_,response)=>{
    const collection = await getCollection('todo-api','todos')
	const todos = await collection.find().toArray()
    response.json(todos)
})
// POST /api/todos
router.post('/',async(request,response)=>{
    const collection = await getCollection('todo-api','todos')
	const { item } = request.body
	const id = collection.find().length
	const complete = false
	await collection.insertOne({item,complete})
	response.json({message: 'New Task added'})
	

}
)
// PUT /api/todos/:id
router.put('/:id',async(request,response)=>{
    const {id}=request.params
    const collection = await getCollection('todo-api','todos')
    const todo = await collection.findOne({_id: new ObjectId(id) })
    const complete = !todo.complete
    const result = await collection.updateOne({_id: new ObjectId(id) }, { $set: { complete } })
    response.json({result})


})



module.exports=router