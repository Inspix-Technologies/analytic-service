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

export default {
  createMaskAnalyticData,
  getAllByCCTV,
};
