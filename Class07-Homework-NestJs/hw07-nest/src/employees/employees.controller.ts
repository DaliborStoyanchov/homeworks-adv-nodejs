import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  getAllEmployees(
    @Req() req: Request,
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('age') age: number,
    @Query('workPosition') workPosition: string,
  ) {
    return this.employeesService.getAllEmployees(
      firstName,
      lastName,
      age,
      workPosition,
    );
  }

  @Get('/:id')
  getEmployeeById(@Param('id') employeeId: string) {
    return this.employeesService.getEmployeeById(employeeId);
  }

  @Post()
  @HttpCode(201)
  createEmployee(@Body() employeeData: CreateEmployeeDto) {
    return this.employeesService.createEmployee(employeeData);
  }

  @Patch('/:id')
  @HttpCode(204)
  updateEmployee(
    @Param('id') employeeId: string,
    @Body() updateData: UpdateEmployeeDto,
  ) {
    return this.employeesService.updateEmployee(employeeId, updateData);
  }

  @Delete('/:id')
  deleteEmployee(@Param('id') employeeId: string) {
    return this.employeesService.deleteEmployee(employeeId);
  }

  @Delete()
  deleteAllEmployees() {
    return this.employeesService.deleteAllEmployees();
  }
}
