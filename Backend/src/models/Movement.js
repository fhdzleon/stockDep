import { DataTypes } from 'sequelize';

const MovementModel = (sequelize) => {
  return sequelize.define(
    'Movement',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      sku: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true, // Ahora el campo es opcional
      },
      type: {
        type: DataTypes.ENUM('Entrada', 'Salida'),
      },
      motive: {
        type: DataTypes.ENUM('devolución', 'reabastecimiento', 'venta', 'caducidad', 'dañado'),
        allowNull: false,
        validate: {
          isValidMotive(value) {
            const validMotives = {
              Entrada: ['devolución', 'reabastecimiento'],
              Salida: ['venta', 'caducidad', 'dañado'],
            };
            if (!validMotives[this.type].includes(value)) {
              throw new Error(`Motive ${value} is not valid for type ${this.type}`);
            }
          },
        },
      },
      movQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
};

export default MovementModel;
