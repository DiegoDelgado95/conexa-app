import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../interfaces/user.interface';
import { userDTO } from '../DTOs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') readonly userModel: Model<User>,
    @Inject('USER_SERVICE') private userCliente: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async register(body: userDTO) {
    try {
      const { email, password } = body;
      const user = {
        email,
        password: await bcrypt.hash(password, 10),
      };
      return this.userCliente.send({ cmd: 'new_user' }, user);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message ? error.message : 'There was a problem register the user',
      );
    }
  }

  async login(body: userDTO) {
    try {
      const { email, password } = body;
      const user = await this.userModel.findOne({ email });

      if (!user) throw new UnauthorizedException('Email no valido');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Password no valido');

      const payload = { id: user._id, email: user.email };
      const token = this.jwtService.sign(payload);
      return { user, token };
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message ? error.message : 'There was a problem in login',
      );
    }
  }
}
