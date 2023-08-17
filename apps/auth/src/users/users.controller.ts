import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import {
  CreateUserDTO,
  FindOneUserDTO,
  PaginationDTO,
  UpdateUseDTO,
  UserServiceController,
  UserServiceControllerMethods,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDTO: FindOneUserDTO) {
    return this.usersService.findOne(findOneUserDTO.id);
  }

  updateUser(updateUserDto: UpdateUseDTO) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDTO: FindOneUserDTO) {
    return this.usersService.remove(findOneUserDTO.id);
  }

  queryUsers(paginationDTOStream: Observable<PaginationDTO>) {
    return this.usersService.queryUsers(paginationDTOStream);
  }
}
