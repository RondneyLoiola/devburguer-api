import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        //category: Sequelize.STRING, removido na migration
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL, //cria um campo virtual do banco
          get() {
            return `http://localhost:3001/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
      },
    );

    return this; // por causa do map no database/index.js
  }

  //relação do produto com a categoria
  static associate(models){
    this.belongsTo(models.Category, { 
      foreignKey: 'category_id', //chave estrangeira, referencia o id da categoria
      as: 'category' 
    });
  }
}

export default Product;

//get -> produto -> sequelize busca o produto -> monta campo virtual com os dados do produto
