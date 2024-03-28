import {
  Table,
  Column,
  Model,
  AllowNull,
  Unique,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'restaurants',
  modelName: 'Restaurant',
})

