import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GenerateExcelFileDto } from './config/generate-excel-file.dto';
import * as fs from 'fs';
import { EXCEL_SERVICE, ExcelModuleOptions } from "./config/excel-module-options.interface";
const ExcelJS = require('exceljs');

@Injectable()
export class ExcelService {

  private config: ExcelModuleOptions;
  constructor(@Inject(EXCEL_SERVICE) config: ExcelModuleOptions) {
    this.config = config
  }

  async generateExcelFile(body: GenerateExcelFileDto) {
    const { data, path, fileName } = body;
    const header = data.map(header => Object.keys(header))[0];
    const rows = [header];

    data.forEach(d => rows.push([Object.values(d).toString()]));

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('report', {
      pageSetup: this.config.options.pageSetup,
      properties: this.config.options.properties
    });

    worksheet.addRows(rows);

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
