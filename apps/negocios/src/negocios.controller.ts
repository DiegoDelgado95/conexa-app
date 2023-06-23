import { Controller } from '@nestjs/common';
import { NegociosService } from './negocios.service';
import { userDTO } from './DTOs/user.dto';
import { modifyUserDTO } from './DTOs/modifyUser.dto';
import { MessagePattern } from '@nestjs/microservices';
import { deleteUserDTO } from './DTOs/deleteUser.dto';
import { getUserDTO } from './DTOs/getUser.dto';

@Controller()
export class NegociosController {
  constructor(private readonly negociosService: NegociosService) {}

  @MessagePattern({ cmd: 'getAll_user' })
  getAllUser(params) {
    console.log('getAll_user');
    return this.negociosService.getAllUser(params);
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser(id_user: getUserDTO) {
    console.log('get_user microservice');
    return this.negociosService.getUser(id_user);
  }

  @MessagePattern({ cmd: 'new_user' })
  createUser(body: userDTO) {
    console.log('new_user');
    return this.negociosService.createUser(body);
  }

  @MessagePattern({ cmd: 'modify_user' })
  modifyUser(body: modifyUserDTO) {
    console.log('modify_user');
    return this.negociosService.modifyUser(body);
  }

  @MessagePattern('delete_user')
  deleteUser(id_user: deleteUserDTO) {
    console.log('delete_user');
    return this.negociosService.deleteUser(id_user);
  }
}
