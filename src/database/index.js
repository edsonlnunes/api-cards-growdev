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

      models.map(model => {
        try {
          model.init(this.connection)

        } catch (error) {
          console.log('DEU EROO NO INIT, ', error)
        }
      });

    } catch (error) {
      console.log('ERROR SEQUELIZE ', error)
    }
  }
}

export default new Database();
