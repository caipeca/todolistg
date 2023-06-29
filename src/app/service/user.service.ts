import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = 'localhost/8081';

  constructor(private http: HttpClient) { }


  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.host}/user`);
  }

  public addUser(user: FormData): Observable<User>{
    return this.http.post<User>(`${this.host}/register`,user);
  }

  public updateUser(user: FormData): Observable<User>{
    return this.http.put<User>(`${this.host}/update`,user);
  }

  public resetUserPassword(email: string): Observable<any>{
    return this.http.get<any>(`${this.host}/resetpassword/${email}`);
  }

  public deleteUser(userId: string): Observable<any>{
    return this.http.delete<any>(`${this.host}/delete/${userId}`);
  }

  public addUserToLocalCache(user: User[]): void{
    localStorage.setItem('users', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User[] {
    if (localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users'))
    }
    return null;
  }

  public createUserFormDate(loggedInUsername: string, user: User): FormData {
    const formData = new FormData();
    return formData;
  }

}
