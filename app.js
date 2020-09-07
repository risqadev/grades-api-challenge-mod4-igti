import express from 'express';
import bodyParser from 'body-parser';
import { logger } from './config/logger.js';
import cors from 'cors';

import { db } from './models/index.js';
import { gradeRouter } from './routes/gradeRouter.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors()
);

app.get('/', (_req, res) => {
  res.send('API em execucao');
});

app.use('/grade', gradeRouter);

app.listen(process.env.PORT || 8081, () => {
  logger.info('API Started!');
});
