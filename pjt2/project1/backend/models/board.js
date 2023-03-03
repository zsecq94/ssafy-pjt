module.exports = (sequelize,DataTypes) => {

    return sequelize.define(
        'board',
        {
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull : false,
            },
            personalcolor: {
                type:DataTypes.STRING(20),
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestampes: true,
            modelName: 'Board',
            tableName: 'board',

        }
    )
}