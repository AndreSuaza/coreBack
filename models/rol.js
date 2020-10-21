module.exports = (dbConnection, DataTypes) => {
  const user = dbConnection.define("rols", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      requiered: true,
      defaultValue: 1
    }
  });

  return user;
}