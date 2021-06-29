import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'inspix_db',
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
});
export default sequelize;
