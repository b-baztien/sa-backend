import { JsonConfig } from './json.config';
import { Student } from './student/interfaces/student.interface';

export class ExportExcel {
  private xl = require('excel4node');

  async createExcelFile() {
    let workbook = new this.xl.Workbook();

    let workSheet = workbook.addWorksheet('รายชื่อ');

    workSheet.cell(1, 1).string('รหัสนักศึกษา');
    workSheet.cell(1, 2).string('ชื่อ - นามสกุล');
    workSheet.cell(1, 3).string('ชั้นปี');

    const jsonConfig = new JsonConfig();

    let students: Student[] = await jsonConfig.readJsonFile();

    for (let i = 0; i < students.length; i++) {
      workSheet.cell(i + 2, 1).string(students[i].studentId);
      workSheet.cell(i + 2, 2).string(students[i].fullname);
      workSheet.cell(i + 2, 3).string(students[i].year);
    }

    workbook.write('assets/Excel.xlsx');
  }
}
