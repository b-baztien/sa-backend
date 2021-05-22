import { Injectable } from '@nestjs/common';
import { ExportExcel } from 'src/export-excel';
import { JsonConfig } from 'src/json.config';
import { Student } from './interfaces/student.interface';

@Injectable()
export class StudentService {
  private jsonConfig: JsonConfig = new JsonConfig();
  private exportExcel: ExportExcel = new ExportExcel();

  async create(student: Student) {
    let students: Student[] = await this.jsonConfig.readJsonFile();

    students.push(student);

    return this.jsonConfig.writeJsonFile(students);
  }

  findAll() {
    this.exportExcel.createExcelFile();
    return this.jsonConfig.readJsonFile();
  }

  async findOne(id: string) {
    let students: Student[] = await this.jsonConfig.readJsonFile();

    const student: Student = students.find((item) => item.studentId === id);

    return student;
  }

  async update(id: string, student: Student) {
    let students: Student[] = await this.jsonConfig.readJsonFile();

    const index = students.findIndex((item) => item.studentId === id);

    students[index] = student;

    return this.jsonConfig.writeJsonFile(students);
  }

  async remove(id: string) {
    let students: Student[] = await this.jsonConfig.readJsonFile();

    const index = students.findIndex((item) => item.studentId === id);

    students.splice(index, 1);

    return this.jsonConfig.writeJsonFile(students);
  }
}
