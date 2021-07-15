import console from 'console';
import express from 'express';
import { MongoClient, MongoError } from 'mongodb';
import multer from 'multer';
import cloudinary from 'cloudinary';
import path from 'path';
import { promises as fs } from 'fs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ACCESS_TOKEN_SECRET, MONGO_URI, USERS } from './constants';
import { getNewCategory } from './utils';
import { authenticateJWT } from './middleware/authentication';
import { CardInfo, CategoryInfo, User } from './interfaces';

dotenv.config();

const loader = multer({ dest: path.join(__dirname, 'tmp') });

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let dbClient: MongoClient;

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

mongoClient.connect((err, client): void => {
  if (err) console.log(err);
  dbClient = client;
  app.locals.collection = client.db('englishForKidsData').collection('cards');
  app.listen(PORT, () => console.log('Сервер ожидает подключения...'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find((u) => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ username: user.username, role: user.role }, ACCESS_TOKEN_SECRET);

    res.json({
      accessToken,
    });
  } else {
    res.send('Username or password incorrect');
  }
});

app.get('/categories', async (req, res): Promise<void> => {
  const { collection } = req.app.locals;
  await collection.find({}).toArray((err: MongoError, categories: CategoryInfo[]) => {
    if (err) console.log(err);
    res.send(categories);
  });
});

app.put('/reset', async (req, res): Promise<void> => {
  const { collection } = req.app.locals;
  await collection.find({}).toArray((err: MongoError, categories: CategoryInfo[]) => {
    if (err) console.log(err);
    categories.forEach(async (category) => {
      category.cards.forEach((card) => {
        card.trainModeTurns = 0;
        card.falseChoices = 0;
        card.trueChoices = 0;
        card.trueChoicesPer = 0;
      });
      await collection.findOneAndUpdate({ id: category.id }, { $set: category },
        { returnOriginal: false }, (error: Error) => {
          if (error) console.log(error);
        });
    });

    res.send(categories);
  });
});

app.get('/categories/:id', async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  await collection.findOne({ id }, (err: MongoError, category: CategoryInfo): void => {
    if (err) console.log(err);
    res.send(category);
  });
});

app.post('/categories', authenticateJWT, jsonParser, async (req, res): Promise<void> => {
  let role;
  if (req.user) {
    role = (req.user as User).role;
  }

  if (role !== 'admin') {
    res.sendStatus(403);
  }

  if (!req.body) res.sendStatus(400);

  const { collection } = req.app.locals;
  let newCategory: CategoryInfo;

  await collection.find({}).sort({ _id: -1 }).toArray(async (err: MongoError, categories: CategoryInfo[]) => {
    if (err) console.log(err);
    const id: number = categories[0].id + 1;
    const { categoryName } = req.body;
    newCategory = getNewCategory(categoryName, id);
    await collection.insertOne(newCategory);
    res.send(newCategory);
  });
});

app.put('/categories/:id', authenticateJWT, jsonParser, async (req, res): Promise<void> => {
  let role;
  if (req.user) {
    role = (req.user as User).role;
  }

  if (role !== 'admin') {
    res.sendStatus(403);
  }

  if (!req.body) res.sendStatus(400);

  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  const newCategory: CategoryInfo = req.body;

  await collection.findOneAndUpdate({ id }, { $set: newCategory },
    { returnOriginal: false }, (err: Error, result: unknown) => {
      if (err) console.log(err);
      res.send(result);
    });
});

app.delete('/categories/:id', authenticateJWT, async (req, res): Promise<void> => {
  let role;
  if (req.user) {
    role = (req.user as User).role;
  }

  if (role !== 'admin') {
    res.sendStatus(403);
  }

  const id = Number(req.params.id);
  const { collection } = req.app.locals;

  await collection.findOneAndDelete({ id }, (err: Error, result: unknown) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get('/categories/:id/:word', async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const { word } = req.params;
  const { collection } = req.app.locals;
  await collection.findOne({ id }, (err: MongoError, category: CategoryInfo): void => {
    if (err) console.log(err);
    const card = category.cards.filter((item) => item.word === word);
    res.send(card);
  });
});

app.post('/image', authenticateJWT, loader.single('image'), async (req, res): Promise<void> => {
  let role;
  if (req.user) {
    role = (req.user as User).role;
  }

  if (role !== 'admin') {
    res.sendStatus(403);
  }

  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
  if (req.file) fs.unlink(req.file?.path);
});

app.post('/audio', authenticateJWT, loader.single('audio'), async (req, res): Promise<void> => {
  let role;
  if (req.user) {
    role = (req.user as User).role;
  }

  if (role !== 'admin') {
    res.sendStatus(403);
  }

  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file?.path, { resource_type: 'video' });
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
  if (req.file) fs.unlink(req.file?.path);
});

app.put('/categories/:id/:word', authenticateJWT, jsonParser, async (req, res): Promise<void> => {
  let role;
  if (req.user) {
    role = (req.user as User).role;
  }

  if (role !== 'admin') {
    res.sendStatus(403);
  }

  if (!req.body) res.sendStatus(400);

  const newCard: CardInfo = req.body;
  const id = Number(req.params.id);
  const { word } = req.params;
  const { collection } = req.app.locals;
  await collection.findOne({ id }, async (err: MongoError, category: CategoryInfo) => {
    if (err) console.log(err);
    const index = category.cards.findIndex((card) => card.word === word);
    category.cards.splice(index, 1, newCard);
    await collection.findOneAndUpdate({ id }, { $set: category },
      { returnOriginal: false }, (error: Error) => {
        if (error) console.log(error);
        res.send(category.cards[index]);
      });
  });
});

app.post('/categories/:id', authenticateJWT, jsonParser, async (req, res): Promise<void> => {
  let role;
  if (req.user) {
    role = (req.user as User).role;
  }

  if (role !== 'admin') {
    res.sendStatus(403);
  }

  if (!req.body) res.sendStatus(400);

  const newCard: CardInfo = req.body;
  const id = Number(req.params.id);
  const { collection } = req.app.locals;
  await collection.updateOne({ id }, { $push: { cards: newCard } }, (err: MongoError) => {
    if (err) console.log(err);
    res.send(newCard);
  });
});

app.delete('/categories/:id/:word', authenticateJWT, async (req, res): Promise<void> => {
  let role;
  if (req.user) {
    role = (req.user as User).role;
  }

  if (role !== 'admin') {
    res.sendStatus(403);
  }

  const id = Number(req.params.id);
  const { word } = req.params;
  const { collection } = req.app.locals;

  await collection.updateOne({ id }, { $pull: { cards: { word } } }, (err: Error) => {
    if (err) console.log(err);
    res.send(word);
  });
});

process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});
