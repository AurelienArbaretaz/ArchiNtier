import { Injectable,Input } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  //@Input() user: User;
  baseURL = "http://localhost:4000/api";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new BehaviorSubject<User>({
    _id: '',
    comment: '',
    photo: ''
  });
  users:  BehaviorSubject<User[]>;

  constructor(private http: HttpClient) { }

 
  getUsers() {
    return this.http.get<User[]>(this.baseURL);
  }

  addUser(name: string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("comment", name);
    formData.append("photo", profileImage);

    return this.http.post<User>(`${this.baseURL}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  delete(image_id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/`+image_id, { responseType: 'json' });
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}