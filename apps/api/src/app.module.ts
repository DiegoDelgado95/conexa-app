import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

import { userSchema } from './schemas/user.schema';
import { jwtConstanst } from './auth/jwt.constants';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstanst.secret,
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 4000,
        },
      },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://conexa-user:conexa-password@cluster0.fctqxdw.mongodb.net/conexa',
    ),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class AppModule {}
