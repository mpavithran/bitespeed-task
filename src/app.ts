import express from 'express';
import cors from 'cors';
import v1Router from './v1/router';

const app = express();
const port = process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/', v1Router);

app.listen(port, () => {

  return console.log(`Express is listening at http://localhost:${port}`);
});