import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @Length(3, 30)
  firstName: string;

  @IsString()
  @Length(3, 30)
  lastName: string;

  @IsNumber()
  @Min(18)
  @Max(70)
  age: number;

  @IsString()
  @Length(3, 30)
  workPosition: string;
}
