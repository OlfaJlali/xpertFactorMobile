import { User as UserType } from '../../types/User';

export class User {
  token: string;
  identifier: string;
  name: string;
  email: string;
  phoneNumber: string;

  constructor({ token, identifier, name, email, phoneNumber }: UserType) {
    this.token = token;
    this.identifier = identifier;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
