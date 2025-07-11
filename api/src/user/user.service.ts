import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from '../dto/user.dto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(data: UpdateUserDto, userId: string) {
    const user = await this.userRepository.getById(userId);
    if (!user || user.deletedAt) {
      throw new NotFoundException('User not found');
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('No data to update');
    }

    if (user.username !== data.username && data.username) {
      const existUserName = await this.userRepository.getByUsername(
        data.username,
      );
      if (existUserName) {
        throw new BadRequestException('Username already exists');
      }
    }
    const updatedUser = await this.userRepository.updateUser(userId, data);
    return { message: 'User updated successfully', data: updatedUser };
  }

  async getUser(userId: string) {
    const user = await this.userRepository.getById(userId);
    if (!user || user.deletedAt) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User fetched successfully', data: user };
  }
}
