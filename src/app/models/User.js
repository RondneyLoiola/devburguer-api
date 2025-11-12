import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    Model.init(
      //quando a classe model iniciar
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users',
      },
    );
  }
}

export default User;
