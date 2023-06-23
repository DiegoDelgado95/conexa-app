import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { userDTO } from './DTOs/user.dto';
import { deleteUserDTO } from './DTOs/deleteUser.dto';
import { getUserDTO } from './DTOs/getUser.dto';
import { modifyUserDTO } from './DTOs/modifyUser.dto';

@Injectable()
export class NegociosService {
  constructor(@InjectModel('User') readonly userModel: Model<User>) {}

  async createUser(body: userDTO) {
    try {
      const user = new this.userModel(body);
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message
          ? error.message
          : 'There was a problem in negocios service createUser',
      );
    }
  }

  async deleteUser(id: deleteUserDTO) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message
          ? error.message
          : 'There was a problem in negocios service deleteUser',
      );
    }
  }

  async modifyUser(body: modifyUserDTO) {
    try {
      return await this.userModel.findByIdAndUpdate(body.id, body.data);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message
          ? error.message
          : 'There was a problem in negocios service modifyUser',
      );
    }
  }

  async getUser(id: getUserDTO) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message
          ? error.message
          : 'There was a problem in negocios service getUser',
      );
    }
  }

  async getAllUser(params) {
    try {
      const limit = params.limit || 10;
      const page = params.page || 1;

      const keyword = params.keyword
        ? {
            email: {
              $regex: params.keyword,
              $options: 'i',
            },
          }
        : {};

      return await this.userModel
        .find({ ...keyword })
        .limit(limit)
        .skip(page);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message
          ? error.message
          : 'There was a problem in negocios service getAllUser',
      );
    }
  }
}
