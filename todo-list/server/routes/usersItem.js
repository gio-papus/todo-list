const router = require('express').Router();

const usersModel = require('../models/usersItem');



router.post('/api/user', async (req, res)=>{
  try{
    const newItem = new usersModel({
      email: req.body.email,
      pass:req.body.pass
    })
 
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})


router.get('/api/users', async (req, res)=>{
  try{
    const allUsers = await usersModel.find({});
    res.status(200).json(allUsers)
  }catch(err){
    res.json(err);
  }
})








module.exports = router;