import { Sequelize } from 'sequelize-typescript';
import MaskAnalytics, { MaskAnalyticCreationAttributes } from './MaskAnalytics';

const createMaskAnalyticData = async (
  newMaskData: MaskAnalyticCreationAttributes
) => {
  const newMask = await MaskAnalytics.create(newMaskData);
  return newMask;
};

const getAllByCCTV = async (cctvId: number | number[]) => {
  const masks = await MaskAnalytics.findAll({ where: { cctvId: cctvId } });
  return masks;
};

const getDailyCountByCCTV = async (cctvId: number | number[]) => {
  const masks = await MaskAnalytics.findAll({
    where: { cctvId: cctvId }, group: ['predictionDate', 'status'],
    attributes: [
      'status',
      [Sequelize.fn('count', Sequelize.col('id')), 'count'],
      [Sequelize.fn('date', Sequelize.col('createdAt')), 'predictionDate']]
  })
  return masks;
}

export default {
  createMaskAnalyticData,
  getAllByCCTV,
  getDailyCountByCCTV
};
