import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicFile from './entities/public-file.entity';
import User from '../user/entities/user.entity';
import PrivateFile from './entities/private-file';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PublicFile, User, PrivateFile]),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
