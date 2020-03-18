import Sequelize from 'sequelize';

const sequelize = new Sequelize('preview-images', '', '', {
    dialect: 'sqlite',
    storage: 'data/preview-images.db',
    logging: () => {}
});

const schema = {
    id: { type: Sequelize.UUID, primaryKey: true },
    md5: { type: Sequelize.STRING },
    from: { type: Sequelize.STRING, allowNull: false },
    // role: { type: Sequelize.ENUM('preview'), allowNull: false, defaultValue: 'preview' },
    width: { type: Sequelize.INTEGER, allowNull: false },
    height: { type: Sequelize.INTEGER, allowNull: false },
    image: { type: Sequelize.BLOB, allowNull: false }
};

const options = {
    timestamps: true,
    updatedAt: false,
    indexes: [{
        fields: ['hash']
    }]
};

const Image = sequelize.define('video', schema, options);

// Image.sync({ force: true });

export default Image;
