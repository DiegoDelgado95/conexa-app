import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { userDTO, getUserDTO, deleteUserDTO, modifyUserDTO } from '../DTOs';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  signUp(@Body() body: userDTO) {
    return this.userService.register(body);
  }

  @Post('/login')
  signIn(@Body() body: userDTO) {
    return this.userService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  getAllUser(@Query() queryParams) {
    return this.userService.getAllUser(queryParams);
  }

  @UseGuards(AuthGuard)
  @Get('/:id_user')
  getUser(@Param('id_user') id_user: getUserDTO) {
    return this.userService.getUser(id_user);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id_user')
  deleteUser(@Param('id_user') id_user: deleteUserDTO) {
    this.userService.deleteUser(id_user);
  }

  @UseGuards(AuthGuard)
  @Put('')
  modifyUser(@Body() body: modifyUserDTO) {
    this.userService.modifyUser(body);
  }
}
