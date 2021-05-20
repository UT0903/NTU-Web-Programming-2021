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
    const { name, subject, score } = req.body;
    const newScore = new ScoreCard({ name, subject, score });
    const existing = await ScoreCard.findOne({ name, subject });
    if (existing) {
      ScoreCard.updateOne({ name, subject }, {$set: { score }}, function (err) {
        if (err)
          console.log(err); // saved!
      });
      res.send({ card: newScore, message: `Updating (${name}, ${subject}, ${score})` });
    }
    else {
      newScore.save(function (err) {
        if (err)
          console.log(err); // saved!
      });
      res.send({ card: newScore, message: `Adding (${name}, ${subject}, ${score})` });
    }

  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/delete', async function (req, res) {
  try {
    ScoreCard.deleteMany(function (err) {
      if (err)
        console.log(err); // saved!
    });
    res.send({ message: [] });
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});


// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query', async function (req, res) {
  try {
    const { queryName, querySubject, queryScore } = req.query;
    let query = {};
    if (queryName) {
      query.name = queryName;
    }
    if (querySubject) {
      query.subject = querySubject;
    }
    if (queryScore) {
      query.score = queryScore;
    }
    await ScoreCard.find(query, function (err, obj) {
      if (obj.length != 0) {
        let messages = [];
        obj.map((m) => {
          messages = [...messages, `Name: ${m.name}, Subject: ${m.subject}, Score: ${m.score}`];
        });
        res.send({ messages, message: `query ${queryName}, ${querySubject}, ${queryScore}` });
      }
      else {
        let message = "";
        Object.keys(query).map(key => { message += `${key} (${query[key]}) ` });
        res.send({ message: message + `not found!` });
      }
    }
    )
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

export default router;
