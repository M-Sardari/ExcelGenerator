import { EXCEL_SERVICE, ExcelModuleOptions } from "./config/excel-module-options.interface";

export class ExcelModule {
  static forRoot(options: ExcelModuleOptions) {
    return {
      global: true,
      module: ExcelModule,
      providers: [
        {
          provide: EXCEL_SERVICE,
          useValue: options,
        },
      ]
    };
  }
}
