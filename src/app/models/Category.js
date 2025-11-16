import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'categories',
      },
    );
  }
}

export default Category;

//get -> produto -> sequelize busca o produto -> monta campo virtual com os dados do produto
