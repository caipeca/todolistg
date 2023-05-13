import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import { Observable } from "rxjs";
//import {WebSocketSubject} from 'rxjs/webSocket';
import { Tarefa } from '../model/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaServiceService {

  private host = "http://localhost:8085";

  constructor(private http: HttpClient) { }

  getToDoList(): Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(`${this.host}/tarefa`)
  }

  novaTarefa(tarefa: Tarefa): Observable<Tarefa>{
    return this.http.post<Tarefa>(`${this.host}/registar`, tarefa);
  }
}
