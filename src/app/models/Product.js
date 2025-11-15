import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    Model.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        category: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL, //cria um campo virtual do banco
          get() {
            return `http://localhost:3001/product-file/${this.path}`
          }
        }
      },
      {
        sequelize,
        tableName: 'products',
      },
    );
  }
}

export default Product;

//get -> produto -> sequelize busca o produto -> monta campo virtual com os dados do produto