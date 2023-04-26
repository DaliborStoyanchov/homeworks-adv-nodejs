import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { workerData } from 'worker_threads';
import { EmployeeFilters } from './interfaces/employees-filters.interface';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  getAllProducts(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('age') age: number,
    @Query('workPosition') workPosition: string,
    @Query('orderBy') orderBy: 'age',
  ) {
    const filters: EmployeeFilters = {
      firstName,
      lastName,
      age,
      workPosition,
      orderBy,
    };

    return this.employeesService.findAllEmployees(filters);
  }

  @Get('/:id')
  getEmployeeById(@Param('id') employeeId: string) {
    return this.employeesService.findEmployeeById(Number(employeeId));
  }

  @Post()
  createEmployee(@Body() productData: CreateEmployeeDto) {
    return this.employeesService.createEmployee(productData);
  }

  @Patch('/:id')
  updateEmployee(
    @Param('id') employeeId: string,
    @Body() updateData: UpdateEmployeeDto,
  ) {
    return this.employeesService.updateEmployee(Number(employeeId), updateData);
  }

  @Delete('/:id')
  deleteEmployee(@Param('id') employeeId: string) {
    return this.employeesService.deleteEmployee(Number(employeeId));
  }
}
