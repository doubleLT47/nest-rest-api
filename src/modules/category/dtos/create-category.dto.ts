import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
