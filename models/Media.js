module.exports = function(sequelize, DataTypes) {
    var Media = sequelize.define(
    "media",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT
        },
        path: {
            type: DataTypes.TEXT
        },
        type: {
           type: DataTypes.TEXT 
        }
            
        
    
    },
        {
            name: {
                singular: 'media',
                plural: 'media',
              }
        });
    Media.associate = models => {
        Media.belongsTo(models.post,{foreignkey: "media"});
        }
    return Media;
}