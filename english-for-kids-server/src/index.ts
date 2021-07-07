import console from 'console';
import express from 'express';
import { BSONType, MongoClient, MongoError } from 'mongodb';
import { CardInfo, CategoryInfo } from './interfaces';
import { getNewCategory } from './utils';
// import { ObjectId } from 'mongodb';

const app = express();
const jsonParser = express.json();

const uri = 'mongodb+srv://EnglishGuru:EnglishGuru34@cluster0.yqrxh.mongodb.net/englishForKidsData?retryWrites=true&w=majority';
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbClient: MongoClient;

app.use(express.static(`${__dirname}/public`));

const PORT = process.env.PORT || 3000;

mongoClient.connect((err, client) => {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db('englishForKidsData').collection('cards');
  app.listen(PORT, () => {
    console.log('Сервер ожидает подключения...');
  });
});

app.get('/categories', (req: express.Request, res) => {
  const origin = req.originalUrl;
  console.log('origin is', origin);
  const { collection } = req.app.locals;
  collection.find({}).toArray((err: MongoError, categories: CategoryInfo[]) => {
    if (err) return console.log(err);
    res.send(categories);
  });
});

app.get('/categories/:id', (req, res) => {
  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  collection.findOne({ id }, (err: MongoError, category: CategoryInfo) => {
    if (err) return console.log(err);
    res.send(category);
  });
});

app.post('/categories', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { collection } = req.app.locals;
  let newCategory: CategoryInfo;

  collection.find({}).sort({_id: -1}).toArray((err: MongoError, categories: CategoryInfo[]) => {
    if (err) return console.log(err);
    let id: number = categories[0].id + 1;
    const categoryName = req.body.categoryName;
    newCategory = getNewCategory(categoryName, id);
    collection.insertOne(newCategory);
    res.send(newCategory);
  });
});

app.put('/categories/:id', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  const newCategory: CategoryInfo = req.body;

  collection.findOneAndUpdate({id: id}, { $set: newCategory },
    { returnOriginal: false }, function(err: Error, result: any) {     
      if(err) return console.log(err);     
      res.send(result.value);
  });
});

app.delete('/categories/:id', (req, res) => {
  const id = Number(req.params.id);
  const { collection } = req.app.locals;

  collection.findOneAndDelete({id: id}, function(err: Error, result: any) {     
      if(err) return console.log(err);     
      res.send(result.value);
  });
});


app.get('/categories/:id/:word', (req, res) => {
  const id = Number(req.params.id);
  const word = req.params.word;
  const { collection } = req.app.locals;
  collection.findOne({ id: id }, (err: MongoError, category: CategoryInfo) => {
    if (err) return console.log(err);
    const card = category.cards.filter(card => card.word === word);
    res.send(card);
  });
});

app.put('/categories/:id/:word', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const newCard: CardInfo = req.body;
  const id = Number(req.params.id);
  const word = req.params.word;
  const { collection } = req.app.locals;
  collection.findOne({ id: id }, (err: MongoError, category: CategoryInfo) => {
    if (err) return console.log(err);
    const index = category.cards.findIndex(card => card.word === word);
    category.cards.splice(index, 1, newCard);
    collection.findOneAndUpdate({id: id}, { $set: category },
      { returnOriginal: false }, function(err: Error, result: any) {     
        if(err) return console.log(err);     
        res.send(category.cards[index]);
    });
  });
});

app.post('/categories/:id', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const newCard: CardInfo = req.body;
  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  collection.updateOne({ id: id }, { $push: { cards: newCard }}, (err: MongoError, result: any) => {
    if (err) return console.log(err);
    res.send(newCard)
  });
});

app.delete('/categories/:id/:word', (req, res) => {
  const id = Number(req.params.id);
  const word = req.params.word;
  const { collection } = req.app.locals;

  collection.updateOne({id: id}, { $pull: { cards: { word: word }}}, function(err: Error, result: any) {     
    if(err) return console.log(err);     
    res.send(result.value);
  });
});

process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});
