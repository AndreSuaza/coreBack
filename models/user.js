module.exports = (dbConnection, DataTypes) => {
  const user = dbConnection.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      requiered: true,
      unique: true
    },
    state: {
      type: DataTypes.STRING,
      requiered: true,
      defaultValue: 1
    }
  });

  return user;
}