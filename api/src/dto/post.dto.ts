import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(500)
  content: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(500)
  content?: string;

  @IsUUID()
  @IsOptional()
  @IsString()
  categoryId?: string;
}
