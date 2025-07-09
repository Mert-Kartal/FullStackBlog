import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { LoginUserDto, RegisterUserDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: RegisterUserDto) {
    const user = await this.userRepository.getByUsername(data.username);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }

  async login(data: LoginUserDto) {
    const user = await this.userRepository.getByUsername(data.username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    return {
      id: user.id,
      username: user.username,
      name: user.name,
    };
  }
}
