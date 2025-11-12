import { Sequelize } from 'sequelize';
import User from '../app/models/User.js';
import databaseconfig from '../config/database.cjs';

const models = [User];

class Database {
  constructor() {
    //toda vez que a classe é iniciade, ele é chamado
    this.init(); //o this se refere ao Database
  }

  init() {
    this.connection = new Sequelize(databaseconfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
//exporta já instaciada, ou seja,
// para onde importar ela já estará pronta para ser usada
