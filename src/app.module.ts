import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './configs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
    }),
    DatabaseModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
