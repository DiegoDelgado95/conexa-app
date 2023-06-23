import { Module } from '@nestjs/common';
import { NegociosController } from './negocios.controller';
import { NegociosService } from './negocios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://conexa-user:conexa-password@cluster0.fctqxdw.mongodb.net/conexa',
    ),
  ],
  controllers: [NegociosController],
  providers: [NegociosService],
})
export class NegociosModule {}
