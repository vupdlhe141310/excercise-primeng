import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  Students: Student[] = [];
  displayDialog: boolean = false;
  studentForDialog: Student | undefined;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => this.Students = students);
  }

  clonedStudents: { [s: string]: Student; } = {};

  onRowEditInit(student: Student) {
    console.log('Row edit initialized');
    this.clonedStudents[student.masv] = { ...student };
  }

  onRowEditSave(student: Student) {
    console.log('Row edit saved');
    this.studentService.updateStudent(student)
    .subscribe( data => {
      this.ngOnInit();
      alert("Student Updated successfully.");
    });

  }

  onRowEditCancel(student: Student, index: number) {
    console.log('Row edit cancelled');
    this.Students[index] = this.clonedStudents[student.masv];
    delete this.clonedStudents[student.masv];
  }


  deleteStudent(student: Student) {
    console.log('Student Deleted');

    this.studentService.deleteStudent(student)
      .subscribe( data => {
        this.ngOnInit();
        alert("Student Deleted successfully.");
      });

  }

  onStudentAdd(){
    this.studentForDialog = {
      masv:"",
      hoDem:"",
      ten:"",
      gioiTinh:"",
      ngaySinh: new Date,
      tinh:"",
      maLop:"",
  };
    this.displayDialog = true;
  }

  saveStudent(){
    console.log('Student Saved');
    this.studentService.createStudent(this.studentForDialog)
    .subscribe( data => {
      this.ngOnInit();
      alert("Student Created successfully.");
    });

    this.displayDialog = false;
  }
}
