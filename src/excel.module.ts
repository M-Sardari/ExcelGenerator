import { DynamicModule } from "@nestjs/common";
import { EXCEL_SERVICE, ExcelModuleOptions } from "./config/excel-module-options.interface";
import { ExcelService } from "./excel.service";

export class ExcelModule {
  static forRoot(options: ExcelModuleOptions):DynamicModule {
    return {
      global: true,
      module: ExcelModule,
      imports: [],
      providers: [
        {
          provide: EXCEL_SERVICE,
          useValue: options,
        },
        ExcelService
      ],
      exports:[ExcelService]
    };
  }
}
