import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import { Observable } from "rxjs";
import { Tarefa } from '../model/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaServiceService {

  private host = "http://localhost:8083";

  constructor(private http: HttpClient) { }

  getToDoList(): Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(`${this.host}/`)
  }
}
