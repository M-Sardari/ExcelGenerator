import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenerateExcelFileDto } from './dto/generate-excel-file.dto';
import * as fs from 'fs';

const ExcelJS = require('exceljs');

@Injectable()
export class ReportService {

  async generateExcelFile(body: GenerateExcelFileDto) {
    const { data, path, fileName } = body;
    const header = data.map(header => Object.keys(header))[0];
    const rows = [header];

    data.forEach(d => rows.push([Object.values(d).toString()]));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('report', {
      pageSetup: {
        fitToPage: true,
        fitToHeight: 15,
        fitToWidth: 15,
      },
      properties: {
        defaultRowHeight : 25,
        defaultColWidth : 20
      }
    });

    worksheet.addRows(rows);

    // const buffer = await workbook.xlsx.writeBuffer();

    const file = this.makeFile(path, fileName)

    try {
      await workbook.xlsx.writeFile(file);
    } catch (e) {
      throw new HttpException(`error in generate excel file and errorMessage is: ${e}`,HttpStatus.BAD_REQUEST);
    }
  }

  makeFile(path: string, fileName: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    fileName = fileName ? fileName + '-' : 'report-';
    return path + '/' + fileName + new Date().getTime() + '.xlsx';
  }
}
