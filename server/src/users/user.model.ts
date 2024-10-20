// user.schema.ts
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class User {
  @prop({ required: true, unique: true, length: 10 })
  phoneNumber: string;

  @prop({ required: true, minlength: 6 })
  password: string;

  @prop({ default: Date.now })
  createdAt: Date;

  @prop({ type: String, default: () => new Types.ObjectId().toHexString() })
  _id?: string;

  @prop()
  name?: string;

  @prop()
  address?: string;

  @prop()
  email?: string;

  @prop()
  carBrand?: string;

  @prop({default:'user'})
  role: string;

  @prop({default:'VietEV'})
  userBrand: string;

}
