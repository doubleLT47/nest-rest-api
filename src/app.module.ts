import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './configs';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
    }),
    DatabaseModule,
    PostModule,
    UserModule,
    AuthModule,
    CategoryModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
