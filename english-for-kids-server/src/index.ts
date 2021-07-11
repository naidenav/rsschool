require('dotenv').config();
import console from 'console';
import express from 'express';
import { MongoClient, MongoError } from 'mongodb';
import multer from 'multer';
import { CardInfo, CategoryInfo } from './interfaces';
import { getNewCategory } from './utils';
const cloudinary = require('cloudinary').v2
const path = require('path');
const fs = require('fs/promises');
const cors = require('cors');
// import { ObjectId } from 'mongodb';
const loader = multer({dest: path.join(__dirname, 'tmp')});

const app = express();
const jsonParser = express.json();

const uri = 'mongodb+srv://EnglishGuru:EnglishGuru34@cluster0.yqrxh.mongodb.net/englishForKidsData?retryWrites=true&w=majority';
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbClient: MongoClient;

app.use(express.static(`${__dirname}/public`));
app.use(cors());

const PORT = process.env.PORT || 3000;

mongoClient.connect((err, client) => {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db('englishForKidsData').collection('cards');
  app.listen(PORT, () => {
    console.log('Сервер ожидает подключения...');
  });
});

app.get('/categories', async (req: express.Request, res) => {
  const origin = req.originalUrl;
  const { collection } = req.app.locals;
  await collection.find({}).toArray((err: MongoError, categories: CategoryInfo[]) => {
    if (err) return console.log(err);
    res.send(categories);
  });
});

app.get('/categories/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  await collection.findOne({ id }, (err: MongoError, category: CategoryInfo) => {
    if (err) return console.log(err);
    res.send(category);
  });
});

app.post('/categories', jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { collection } = req.app.locals;
  let newCategory: CategoryInfo;

  await collection.find({}).sort({_id: -1}).toArray(async (err: MongoError, categories: CategoryInfo[]) => {
    if (err) return console.log(err);
    let id: number = categories[0].id + 1;
    const categoryName = req.body.categoryName;
    newCategory = getNewCategory(categoryName, id);
    await collection.insertOne(newCategory);
    res.send(newCategory);
  });
});

app.put('/categories/:id', jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  const newCategory: CategoryInfo = req.body;

  await collection.findOneAndUpdate({id: id}, { $set: newCategory },
    { returnOriginal: false }, function(err: Error, result: CategoryInfo) {     
      if(err) return console.log(err);     
      res.send(result);
  });
});

app.delete('/categories/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { collection } = req.app.locals;

  await collection.findOneAndDelete({id: id}, function(err: Error, result: CategoryInfo) {     
      if(err) return console.log(err);     
      res.send(result);
  });
});


app.get('/categories/:id/:word', async (req, res) => {
  const id = Number(req.params.id);
  const word = req.params.word;
  const { collection } = req.app.locals;
  await collection.findOne({ id: id }, (err: MongoError, category: CategoryInfo) => {
    if (err) return console.log(err);
    const card = category.cards.filter(card => card.word === word);
    res.send(card);
  });
});

app.post('/image', loader.single('image'), async function (req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file?.path);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  fs.unlink(req.file?.path);
});

app.post('/audio', loader.single('audio'), async function (req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file?.path, { resource_type: "video" });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  fs.unlink(req.file?.path);
});

app.put('/categories/:id/:word', jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const newCard: CardInfo = req.body;
  const id = Number(req.params.id);
  const word = req.params.word;
  const { collection } = req.app.locals;
  await collection.findOne({ id: id }, async (err: MongoError, category: CategoryInfo) => {
    if (err) return console.log(err);
    const index = category.cards.findIndex(card => card.word === word);
    category.cards.splice(index, 1, newCard);
    await collection.findOneAndUpdate({id: id}, { $set: category },
      { returnOriginal: false }, function(err: Error, result: any) {     
        if(err) return console.log(err);     
        res.send(category.cards[index]);
    });
  });
});

app.post('/categories/:id', jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const newCard: CardInfo = req.body;
  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  await collection.updateOne({ id: id }, { $push: { cards: newCard }}, (err: MongoError, result: CategoryInfo) => {
    if (err) return console.log(err);
    res.send(newCard)
  });
});

app.delete('/categories/:id/:word', async (req, res) => {
  const id = Number(req.params.id);
  const word = req.params.word;
  const { collection } = req.app.locals;

  await collection.updateOne({id: id}, { $pull: { cards: { word: word }}}, function(err: Error, result: CategoryInfo) {     
    if(err) return console.log(err);     
    res.send(word);
  });
});

process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});
