/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface Empty {}

export interface PaginationDTO {
  page: number;
  skip: number;
}

export interface Users {
  users: User[];
}

export interface FindOneUserDTO {
  id: string;
}

export interface UpdateUseDTO {
  id: string;
  socialMedia: SocialMedia | undefined;
}

export interface CreateUserDTO {
  username: string;
  password: string;
  age: number;
}

export interface User {
  id: string;
  username: string;
  password: string;
  age: number;
  subscribed: boolean;
  socialMedia: SocialMedia | undefined;
}

export interface SocialMedia {
  twiterURI?: string | undefined;
  facebookURI?: string | undefined;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface UserServiceClient {
  createUser(request: CreateUserDTO): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDTO): Observable<User>;

  updateUser(request: UpdateUseDTO): Observable<User>;

  removeUser(request: FindOneUserDTO): Observable<User>;

  queryUsers(request: Observable<PaginationDTO>): Observable<Users>;
}

export interface UserServiceController {
  createUser(request: CreateUserDTO): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDTO): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUseDTO): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserDTO): Promise<User> | Observable<User> | User;

  queryUsers(request: Observable<PaginationDTO>): Observable<Users>;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createUser',
      'findAllUsers',
      'findOneUser',
      'updateUser',
      'removeUser',
      'queryUsers',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = ['queryUsers'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
