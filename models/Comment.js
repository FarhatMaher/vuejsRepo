module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define(
    "comment",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        contenu: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
    }

})
Comment.associate = models => {
    Comment.belongsTo(models.post);
    Comment.belongsTo(models.user);
    
    }
return Comment }