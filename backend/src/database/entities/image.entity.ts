import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  contentType: string;

  @Prop({ required: true, unique: true })
  data: Types.Buffer;

  @Prop()
  updatedAt: UpdateLog;

  @Prop({ default: [] })
  codes: string[];
}

class UpdateLog {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  time: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
