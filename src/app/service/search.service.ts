import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../model/employee';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private URL = 'https://apiodm20201027235019.azurewebsites.net/api/Empleados';
  actualizar = {};

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URL);
  }

  getEmployeeById(matricula: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.URL}?matricula=${matricula}`);
  }

  putEmployee(matricula: number, data: Employee): Observable<Employee> {
    console.log(data);
    return this.http.put<Employee>(`${this.URL}?matricula=${matricula}`, data);
  }

  postEmployee(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.URL, data)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteEmployee(matricula: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.URL}?matricula=${matricula}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
}
