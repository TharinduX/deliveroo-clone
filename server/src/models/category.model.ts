import {
  Table,
  Column,
  Model,
  AllowNull,
  Unique,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import MenuItem from './item.model.js';
import Restaurant from './restaurant.model.js';

@Table({
  timestamps: true,
  tableName: 'categories',
  modelName: 'Category',
})
class Category extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare categorySlug: string;

  @AllowNull(false)
  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.UUID,
  })
  declare restaurantId: string;

  @BelongsTo(() => Restaurant)
  declare restaurant: Restaurant;

  @HasMany(() => MenuItem)
  declare menuItems: MenuItem[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default Category;
