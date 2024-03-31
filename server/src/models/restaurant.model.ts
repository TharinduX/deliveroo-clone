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
import User from './user.model.js';

@Table({
  timestamps: true,
  tableName: 'restaurants',
  modelName: 'Restaurant',
})
class Restaurant extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare ownerId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare slug: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
  })
  declare image: string;

  @HasMany(() => Menu)
  declare menus: Menu[];

  @BelongsTo(() => User)
  declare owner: User;

  @CreatedAt
  declare readonly createdAt: Date;

  @UpdatedAt
  declare readonly updatedAt: Date;
}

export default Restaurant;
