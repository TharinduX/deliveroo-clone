import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Category from './category.model.js';

@Table({
  tableName: 'menu_items',
  modelName: 'MenuItem',
})
class MenuItem extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  declare categoryId: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare isPopular: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare itemSlug: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
  })
  declare image: string;

  @Column({
    type: DataType.STRING,
  })
  declare kcal: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare price: number;

  @BelongsTo(() => Category)
  declare category: Category;
}

export default MenuItem;
