import { Model, DataTypes, Sequelize } from 'sequelize';
import db from './index'; 

export class Contact extends Model {
  public id!: number;
  public phoneNumber?: string;
  public email?: string;
  public linkedId?: number;
  public linkPrecedence!: 'primary' | 'secondary';
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
}

export const Contacts = Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contacts',
        key: 'id',
      },
    },
    linkPrecedence: {
      type: DataTypes.ENUM('primary', 'secondary'),
      allowNull: false,
      defaultValue: 'secondary',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db, 
    tableName: 'contacts',
    timestamps: true, 
    paranoid: true,
  }
);
