import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';
import {parse} from 'mathjs';
const router = Router();

router.post('/create-card', async (req, res) => {
  try{
    const ret = await ScoreCard.countDocuments({name: req.body.name, subject: req.body.subject})  
    if(ret === 0){
      await ScoreCard.create(req.body)
      const message = {messageType: 'Add', name:req.body.name, subject:req.body.subject, score:req.body.score};
      const card = false;
      res.send({card, message})
    }
    else{
      await ScoreCard.updateOne({name: req.body.name, subject: req.body.subject}, req.body)
      const message = {messageType: 'Update', name:req.body.name, subject:req.body.subject, score:req.body.score};
      const card = true;
      res.send({card, message})
    }
  }
  catch(e){
    res.send({message:{ messageType: 'Something went wrong...' }});
  }
});

// TODO: delete the collection of the DB
router.post('/clear', async (req, res) =>{
  try{
    await ScoreCard.deleteMany({})
    res.send({message:{ messageType: 'cleared' }})
  }
  catch(e){
    res.send({message: { messageType: 'Something went wrong...' }});
  }
})

// TODO: implement the DB query
router.post('/query', async (req, res) =>{
  try{
    const queryString = req.body.queryString;
    const query_obj = {};
    if(queryString['queryName'] !== ''){
      query_obj['name'] = queryString['queryName'];
    }
    if(queryString['querySubject'] !== ''){
      query_obj['subject'] = queryString['querySubject'];
    }
    if(queryString['queryScore'] !== ''){
      query_obj['score'] = queryString['queryScore'];
    }
    let messages = await ScoreCard.find(query_obj).exec();
    messages = messages.map((msg)=>({messageType: "result", name: msg.name, subject: msg.subject, score: msg.score}))
    const message = ''
    res.send({ messages, message })
  }
  catch(e){
    console.log(e)
    res.send({message:{ messageType: 'Something went wrong...' }});
  }
})

export default router;
