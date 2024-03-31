import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Restaurant from './restaurant.model.js';
import Category from './category.model.js';

@Table({
  timestamps: true,
  tableName: 'menus',
  modelName: 'Menu',
})
class Menu extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @AllowNull(false)
  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.UUID,
  })
  declare restaurantId: string;

  @BelongsTo(() => Restaurant)
  declare restaurant: Restaurant;

  @HasMany(() => Category)
  declare categories: Category[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default Menu;
