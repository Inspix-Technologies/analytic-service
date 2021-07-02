import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './database/Database';
import MaskAnalytics, {
  MaskAnalyticCreationAttributes,
  isMaskAnalyticCreationAttributes,
} from './masks/MaskAnalytics';
import MaskRepository from './masks/MaskRepository';

const app = express();
sequelize.addModels([MaskAnalytics]);
app.use(cors());
app.use(bodyParser.json());

app.post('/', async (req, res, next) => {
  const newData: MaskAnalyticCreationAttributes = req.body;
  if (!isMaskAnalyticCreationAttributes(newData))
    return res.status(400).send('invalid request');
  MaskRepository.createMaskAnalyticData(newData).catch((e) => next(e));
  res.status(201).send('success');
});

/*
Returns:
[
    {
        "status": 1,
        "count": 3,
        "predictionDate": "2021-06-29"
    },
    {
        "status": 3,
        "count": 2,
        "predictionDate": "2021-06-29"
    },
    ...
]
*/
app.get('/count', async (req, res, next) => {
  const { id } = req.query;
  if (!id) return res.status(400).send('invalid request 1');
  let finalId: number | number[] = -1;
  if (typeof id === 'string') {
    const filteredId = parseInt(id);
    if (isNaN(filteredId)) return res.status(400).send('invalid request 2');
    finalId = filteredId;
  }
  if (typeof id === 'object') {
    const ids = (id as string[]).map((val) => parseInt(val));
    const filteredIds = ids.filter((val) => !isNaN(val));
    finalId = filteredIds;
  }
  try {
    const masks = await MaskRepository.getDailyCountByCCTV(finalId);
    res.status(200).json(masks);
  } catch (e) {
    next(e);
  }
});

app.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('invalid request');
  const numId = parseInt(id);
  if (isNaN(numId)) return res.status(400).send('invalid request');
  try {
    const masks = await MaskRepository.getAllByCCTV(numId);
    res.status(200).json(masks);
  } catch (e) {
    next(e);
  }
});

app.get('/', async (req, res, next) => {
  const { id } = req.query;
  if (!id) return res.status(400).send('invalid request');
  let finalId: number | number[] = -1;
  if (typeof id === 'string') {
    const filteredId = parseInt(id);
    if (isNaN(filteredId)) return res.status(400).send('invalid request');
    finalId = filteredId;
  }
  if (typeof id === 'object') {
    const ids = (id as string[]).map((val) => parseInt(val));
    const filteredIds = ids.filter((val) => !isNaN(val));
    finalId = filteredIds;
  }
  try {
    const masks = await MaskRepository.getAllByCCTV(finalId);
    res.status(200).json(masks);
  } catch (e) {
    next(e);
  }
});


export default app;
