type ExcelPageSetup = {
  fitToPage: boolean;
  fitToHeight: number;
  fitToWidth: number;
};

type ExcelProperties = {
  defaultRowHeight: number;
  defaultColWidth: number;
};

export class ExcelModuleOptions {
  options: {
    pageSetup:ExcelPageSetup,
    properties:ExcelProperties
  };
}

export const EXCEL_SERVICE = 'EXCEL_SERVICE';
