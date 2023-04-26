import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  lastName: string;

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(70)
  age: number;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  workPosition: string;
}
