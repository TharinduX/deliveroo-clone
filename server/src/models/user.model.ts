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

enum Role {
  OWNER = 'owner',
  CUSTOMER = 'customer',
}

enum Provider {
  GOOGLE = 'google',
  EMAIL = 'email',
}

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  declare passwordHash: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(Role)),
  })
  declare role: Role;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
  })
  declare lastName: string;

  @Column({
    type: DataType.ENUM(...Object.values(Provider)),
    defaultValue: Provider.EMAIL,
  })
  declare provider: Provider;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default User;
