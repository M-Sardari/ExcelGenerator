import { Module } from '@nestjs/common';
import { ReportService } from './report.service';

@Module({
  imports: [],
  providers: [ReportService],
})
export class AppModule {}
