import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL, //cria um campo virtual do banco
          get() {
            return `http://localhost:3001/category-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'categories',
      },
    );

    return this; // por causa do map no database/index.js
  }
}

export default Category;

//get -> produto -> sequelize busca o produto -> monta campo virtual com os dados do produto
