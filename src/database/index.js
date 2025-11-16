import { Sequelize } from 'sequelize';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import User from '../app/models/User.js';
import databaseconfig from '../config/database.cjs';

const models = [User, Product, Category];

class Database {
  constructor() {
    //toda vez que a classe é iniciade, ele é chamado
    this.init(); //o this se refere ao Database
  }

  init() {
    this.connection = new Sequelize(databaseconfig);
    //models.map((model) => model.init(this.connection)); => sem associate

    //com associate, no model de Products
    models.map((model) => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database();
//exporta já instaciada, ou seja,
// para onde importar ela já estará pronta para ser usada
