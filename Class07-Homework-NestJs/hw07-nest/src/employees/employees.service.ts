import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Employee } from './interfaces/employee.interface';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { v4 as uuid } from 'uuid';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';

@Injectable()
export class EmployeesService {
  async getAllEmployees(
    firstName?: string,
    lastName?: string,
    age?: number,
    workPosition?: string,
  ) {
    const employeesJson = await readFile(
      join(process.cwd(), 'src', 'employees', 'data', 'employees.json'),
      'utf-8',
    );

    let employees: Employee[] = JSON.parse(employeesJson);

    if (firstName) {
      employees = employees.filter((employee) =>
        employee.firstName.toLowerCase().includes(firstName.toLowerCase()),
      );
    }

    if (lastName) {
      employees = employees.filter((employee) =>
        employee.lastName.toLowerCase().includes(lastName.toLowerCase()),
      );
    }

    if (age) {
      employees = employees.filter((employee) => employee.age == age);
    }

    if (workPosition) {
      employees = employees.filter((employee) =>
        employee.workPosition
          .toLowerCase()
          .includes(workPosition.toLowerCase()),
      );
    }

    return employees;
  }

  async saveEmployees(employees: Employee[]) {
    await writeFile(
      join(process.cwd(), 'src', 'employees', 'data', 'employees.json'),
      JSON.stringify(employees, null, 2),
    );
  }

  async getEmployeeById(employeeId: string) {
    const employees = await this.getAllEmployees();

    const foundEmployee = employees.find(
      (employee) => employeeId === employee.id,
    );

    if (!foundEmployee) throw new NotFoundException('!Employee not found!');

    return foundEmployee;
  }

  async createEmployee(employeeData: CreateEmployeeDto) {
    const employees = await this.getAllEmployees();

    const newEmployee: Employee = {
      ...employeeData,
      id: uuid(),
    };

    employees.push(newEmployee);

    await this.saveEmployees(employees);

    return newEmployee;
  }

  async updateEmployee(employeeId: string, updateData: UpdateEmployeeDto) {
    const employees = await this.getAllEmployees();

    const foundEmployee = await this.getEmployeeById(employeeId);

    Object.assign(foundEmployee, updateData);

    const updatedEmployee = employees.map((employee) =>
      employee.id === foundEmployee.id ? foundEmployee : employee,
    );

    await this.saveEmployees(updatedEmployee);
  }

  async deleteEmployee(employeeId: string) {
    const employees = await this.getAllEmployees();

    const updatedEmployees = employees.filter(
      (employee) => employee.id !== employeeId,
    );

    if (employees.length === updatedEmployees.length)
      throw new NotFoundException('Employee not found');

    await this.saveEmployees(updatedEmployees);
  }

  async deleteAllEmployees() {
    await this.saveEmployees([]);
  }
}
