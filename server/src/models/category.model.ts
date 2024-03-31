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
import Menu from './menu.model.js';
import MenuItem from './item.model.js';

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
  @ForeignKey(() => Menu)
  @Column({
    type: DataType.INTEGER,
  })
  declare menuId: number;

  @BelongsTo(() => Menu)
  declare menu: Menu;

  @HasMany(() => MenuItem)
  declare items: MenuItem[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default Category;
