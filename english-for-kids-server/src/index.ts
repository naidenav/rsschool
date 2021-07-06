import express from 'express';
import { MongoClient, MongoError, ObjectId } from 'mongodb';
import { CategoryInfo } from './interfaces';

const app = express();
const jsonParser = express.json();

const uri = "mongodb+srv://EnglishGuru:EnglishGuru34@cluster0.yqrxh.mongodb.net/englishForKidsData?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbClient: MongoClient;

app.use(express.static(`${__dirname}/public`));

const PORT = process.env.PORT || 80;

mongoClient.connect((err, client) => {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db('englishForKidsData').collection('cards');
  app.listen(PORT, () => {
    console.log('Сервер ожидает подключения...');
  });
  return { status: 'succes' };
});

app.get('/categories', (req, res) => {
  const collection = req.app.locals.collection;
  collection.find({}).toArray((err: MongoError, categories: CategoryInfo) => {
    if (err) return console.log(err);
    console.log(categories);
    res.send(categories);
    return categories;
  });
});
app.get('/categories/:id', (req, res) => {
  const id = Number(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOne({ id: id }, (err: MongoError, category: CategoryInfo) => {
    if (err) return console.log(err);
    res.send(category);
    return category;
  });
});

// app.post('/api/users', jsonParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);

//   const userName = req.body.name;
//   const userAge = req.body.age;
//   const user = { name: userName, age: userAge };

//   const { collection } = req.app.locals;
//   collection.insertOne(user, (err, result) => {
//     if (err) return console.log(err);
//     res.send(user);
//   });
// });

// app.delete('/api/users/:id', (req, res) => {
//   const id = new ObjectId(req.params.id);
//   const { collection } = req.app.locals;
//   collection.findOneAndDelete({ _id: id }, (err, result) => {
//     if (err) return console.log(err);
//     const user = result.value;
//     res.send(user);
//   });
// });

// app.put('/api/users', jsonParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   const id = new ObjectId(req.body.id);
//   const userName = req.body.name;
//   const userAge = req.body.age;

//   const { collection } = req.app.locals;
//   collection.findOneAndUpdate({ _id: id }, { $set: { age: userAge, name: userName } },
//     { returnOriginal: false }, (err, result) => {
//       if (err) return console.log(err);
//       const user = result.value;
//       res.send(user);
//     });
// });

// прослушиваем прерывание работы программы (ctrl-c)
process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});
