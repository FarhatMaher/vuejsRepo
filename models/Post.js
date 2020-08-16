
module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define(
    "post",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        titre: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW

        }, 
        
      }
    
    
    )
    Post.associate = models => {
        Post.hasMany(models.comment, { onDelete: 'cascade' });
        Post.belongsTo(models.user, { onDelete: 'cascade' });
        Post.hasOne(models.media, { onDelete: 'cascade' });

 }
        
        
    return Post
}
