import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/auth.interface';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Post('files')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addPrivateFile(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Get('files/:id')
  @UseGuards(JwtAuthenticationGuard)
  async getPrivateFile(
    @Req() request: RequestWithUser,
    @Param() { id }: { id: string },
    @Res() res: Response,
  ) {
    const file = await this.usersService.getPrivateFile(
      request.user.id,
      Number(id),
    );
    file.stream.pipe(res);
  }

  @Get('files')
  @UseGuards(JwtAuthenticationGuard)
  async getAllPrivateFiles(@Req() request: RequestWithUser) {
    return this.usersService.getAllPrivateFiles(request.user.id);
  }
}
