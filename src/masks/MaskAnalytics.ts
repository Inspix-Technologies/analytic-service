import { Table, Column, Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface MaskAnalyticAtrributes {
  id: number;
  cctvId: number;
  personId: number;
  status: number;
}

export interface MaskAnalyticCreationAttributes
  extends Optional<MaskAnalyticAtrributes, 'id'> {}

export const isMaskAnalyticCreationAttributes = (
  obj: any
): obj is MaskAnalyticCreationAttributes =>
  ['cctvId', 'personId', 'status'].reduce(
    (prev: boolean, current) => current in obj && prev,
    true
  );

@Table({
  tableName: 'mask_analytics',
  timestamps: true,
})
class MaskAnalytics extends Model<
  MaskAnalyticAtrributes,
  MaskAnalyticCreationAttributes
> {
  @Column({ field: 'cctv_id' })
  cctvId!: number;

  @Column({ field: 'person_id' })
  personId!: number;

  @Column
  status!: number;
}

export default MaskAnalytics;
