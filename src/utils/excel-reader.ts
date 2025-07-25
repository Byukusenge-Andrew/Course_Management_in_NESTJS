/* eslint-disable prettier/prettier */

import * as XLSX from 'xlsx';

export interface CourseImportDto {
  title: string;
  description: string;
}

export function extractCoursesfromExcelBuffer(buffer: Buffer): CourseImportDto[] {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: CourseImportDto[] = XLSX.utils.sheet_to_json(worksheet);
  return data;
}