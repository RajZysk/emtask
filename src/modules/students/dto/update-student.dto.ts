import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsNotEmpty()
  studentName: string;
  DOB: string;
}
