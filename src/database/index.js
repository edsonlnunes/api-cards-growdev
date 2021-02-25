import 'dotenv/config';
import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';

import Card from '../app/models/Card';
import User from '../app/models/User';

const models = [Card, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      this.connection = new Sequelize(process.env.DATABASE_URL, dataBaseConfig);

      console.log('connection ', this.connection)

      models.map(model => {
        console.log(model);
        model.init(this.connection)
      });

    } catch (error) {
      console.log('ERROR SEQUELIZE ', error)
    }
  }
}

export default new Database();
