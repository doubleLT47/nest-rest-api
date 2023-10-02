import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class UpdateCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
