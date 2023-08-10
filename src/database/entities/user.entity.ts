import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordhash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
