const Sequelize = require('sequelize');

module.exports = class Mapinfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      address : {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      lat: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      lng: {
        type: Sequelize.STRING(100),
        allowNull:false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Mapinfo',
      tableName: 'mapinfo',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Mapinfo.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};
