import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeeFilters } from './interfaces/employees-filters.interface';

@Injectable()
export class EmployeesService {
  @InjectRepository(Employee) private employeesRepo: Repository<Employee>;

  findAllEmployees(filters: EmployeeFilters) {
    const filterConfig: FindManyOptions<Employee> = {};

    if (filters.firstName)
      filterConfig.where = {
        ...filterConfig.where,
        firstName: filters.firstName,
      };

    if (filters.lastName)
      filterConfig.where = {
        ...filterConfig.where,
        lastName: filters.lastName,
      };

    if (filters.age)
      filterConfig.where = {
        ...filterConfig.where,
        age: filters.age,
      };

    if (filters.workPosition)
      filterConfig.where = {
        ...filterConfig.where,
        workPosition: filters.workPosition,
      };

    if (filters.orderBy) {
      if (filters.orderBy === 'age') filterConfig.order = { age: 'DESC' };
    }

    return this.employeesRepo.find(filterConfig);
  }

  async findEmployeeById(id: number) {
    const employee = await this.employeesRepo.findOneBy({ id });

    if (!employee) throw new NotFoundException('Employee not found');

    return employee;
  }

  async createEmployee(employeeData: CreateEmployeeDto) {
    const newEmployee = this.employeesRepo.create(employeeData);

    await this.employeesRepo.save(newEmployee);

    return newEmployee;
  }

  async updateEmployee(employeeId: number, updateData: UpdateEmployeeDto) {
    const employee = await this.findEmployeeById(employeeId);

    Object.assign(employee, updateData);

    await this.employeesRepo.save(employee);
  }

  async deleteEmployee(employeeId: number) {
    const employee = await this.findEmployeeById(employeeId);

    await this.employeesRepo.remove(employee);
  }
}
