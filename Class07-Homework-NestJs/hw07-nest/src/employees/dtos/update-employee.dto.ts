import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @Length(2, 30)
  @IsOptional()
  firstName: string;

  @IsString()
  @Length(2, 30)
  @IsOptional()
  lastName: string;

  @IsNumber()
  @Min(18)
  @Max(70)
  @IsOptional()
  age: number;

  @IsString()
  @Length(2, 30)
  @IsOptional()
  workPosition: string;
}
