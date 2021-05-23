import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Student } from './interfaces/student.interface';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() student: Student) {
    if (
      student.studentId === undefined ||
      student.fullname === undefined ||
      student.year === undefined
    ) {
      throw new HttpException('ข้อมูลไม่ถูกต้อง', HttpStatus.BAD_REQUEST);
    }

    return this.studentService.create(student);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studentService.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() student: Student) {
  //   return this.studentService.update(id, student);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studentService.remove(id);
  // }
}
