module.exports = function(sequelize, DataTypes) {
const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role_id: {
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
    });

    User.associate = models => {
        User.hasMany(models.post ,{ onDelete: 'cascade' });
        User.hasMany(models.comment, { onDelete: 'cascade' });
        }
    return User
}