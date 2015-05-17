const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var AdminUser = sequelize.define(
    'AdminUser', {
      email:          DataTypes.STRING,
      passwordDigest: DataTypes.STRING,
      status:         DataTypes.STRING,
      createdAt:      DataTypes.DATE,
      updatedAt:      DataTypes.DATE
    }, {
      setterMethods: {
        password: function(password) {
          this.setDataValue('passwordDigest', bcrypt.hashSync(password, 10));
          return true;
        }
      },
      instanceMethods: {
        authenticate: function(password) {
          return bcrypt.compareSync(password, this.passwordDigest);
        }
      }
    }
  );

  return AdminUser;
}
