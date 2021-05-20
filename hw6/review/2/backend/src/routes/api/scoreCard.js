import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    const {name, subject, score} = req.body;
    ScoreCard
      .find({$and:[{name: name}, {subject: subject}]})
      .exec(async (err, result) => {
        if (err) throw err;
        if (result.length === 0){
          const newScoreCard = new ScoreCard({name, subject, score});
          await newScoreCard.save();

          let msg = `Adding (${name}, ${subject}, ${score})`;
          let card = req.body;
          res.json({message: msg, card: card});
        }
        else{
          await ScoreCard.updateOne(result[0], {score: score});

          let msg = `Updating (${name}, ${subject}, ${score})`;
          let card = req.body;
          res.json({message: msg, card: card});
        }
      })
  } catch (e) {
    res.json({ message: 'Something went wrong: '+e });
  }
});

// TODO: delete the collection of the DB
router.delete('/delete-card', async function(req, res){
  try{
    await ScoreCard.deleteMany({});
    res.json({ message: 'Database cleared'});
  }
  catch(e){
    res.json({ message: 'Something went wrong: '+e });
  }
})

// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query-card', async function (req, res) {
  try {
    const {queryTrigger, queryString} = req.body;
    console.log(queryTrigger, queryString);
    let query = [];
    if(queryTrigger.name){
      if(queryString.name.length === 0){
        throw 'name is empty';
      }
      else{
        query = query.concat([{name: queryString.name}]);
      }
    }
    if(queryTrigger.subject){
      if(queryString.subject.length === 0){
        throw 'subject is empty';
      }
      else{
        query = query.concat([{subject: queryString.subject}]);
      }
    }
    if(queryTrigger.score){
      if(queryString.score[0] === '' && queryString.score[1] === ''){
        throw 'Score is empty';
      }

      if(queryString.score[0] !== '') 
        queryString.score[0] = Number(queryString.score[0]);
      else
        queryString.score[0] = -1e15;

      if(queryString.score[1] !== '') 
        queryString.score[1] = Number(queryString.score[1]);
      else
        queryString.score[1] = 1e15 

      if(queryString.score[0] > queryString.score[1]){
        throw 'Lower bound is larger than upper bound';
      }

      query = query.concat([{score: {$gte: queryString.score[0]}}])
      query = query.concat([{score: {$lte: queryString.score[1]}}])
    }
    if(!queryTrigger.name && !queryTrigger.subject && !queryTrigger.score)
      throw 'Query is empty';

    console.log(query);

    let result = ScoreCard.find({$and: query});

    result.exec((err, result) => {
      if(err) throw err;
      if(result.length === 0){
        let msgs = ['Your Query: ']
        let q = '';
        if(queryTrigger.name){
          q += `Name: ${queryString.name} `
        }
        if(queryTrigger.subject){
          q += `Subject: ${queryString.subject}`
        }
        msgs = msgs.concat([q, 'Not Found']);
        res.json({message: msgs, messages: msgs});
      }
      else{
        let head = ['Found:']
        let msgs = result.map((m) => `Name: ${m.name}, Subject: ${m.subject}, Score: ${m.score}`)
        msgs = head.concat(msgs)
        res.json({message: 'Found !', messages: msgs});
      }
    })
  } catch (e) {
    res.json({ message: 'Something went wrong: '+e });
  }
});

export default router;
