import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class deleteUserDTO {
  @ApiProperty()
  id: string;
}
