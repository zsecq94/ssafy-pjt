module.exports = (sequelize,DataTypes) => {

    return sequelize.define(
        'story',
        {
            content: {
                type: DataTypes.TEXT,
                allowNull : false,
            },
            shopname: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            stylename: {
                type:DataTypes.STRING(100),
                allowNull: true,
            },
            styleinfo: {
                type:DataTypes.STRING(100),
                allowNull : true,
            },
            address: {
                type:DataTypes.STRING(100),
                allowNull: true,
            },
            imageUrl: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            membership: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
          },
  
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestampes: true,
            modelName: 'Story',
            tableName: 'story',
  
        }
    )
  }