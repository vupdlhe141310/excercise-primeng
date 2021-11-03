import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Student{
  masv:string;
  hoDem:string;
  ten:string;
  gioiTinh:string;
  ngaySinh:Date;
  tinh:string;
  maLop:string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  api="http://localhost:8080/api/sv";
  //http://localhost:3000/Students


  getStudents() {
    return this.http.get<Student[]>(this.api);
    }

    public updateStudent(sv: any) {
      return this.http.put<Student>(this.api + "/"+ sv.name,sv);
      }

      public deleteStudent(sv: any) {
        return this.http.delete<Student>(this.api + "/"+ sv.name);
      }

      public createStudent(sv: any) {
        return this.http.post<Student>(this.api, sv);
      }
}
