module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      username: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      personalcolor: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      usermyself: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },

      userimgurl: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      follower: {
        type: DataTypes.STRING(5000),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      timestamps: true,
      modelName: "User",
      tableName: "users",
    }
  );
};
