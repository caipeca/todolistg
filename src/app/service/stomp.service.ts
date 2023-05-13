import { Injectable } from '@angular/core';
import { Observable, Subject, of } from "rxjs";
import * as sockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ITarefa, IUpdateTarefa, Tarefa } from '../model/tarefa';
import { HttpClient } from '@angular/common/http';


const SERVER_URL = 'http://localhost:8085/ws'
@Injectable({
  providedIn: 'root'
})
export class StompService {


  public updateEvents: Subject<IUpdateTarefa>;
  private stompClient;
  private host = "http://localhost:8085";

  constructor(private http: HttpClient){
      this.updateEvents = new Subject<IUpdateTarefa>();
      const ws = new sockJS(SERVER_URL);
      this.stompClient = Stomp.over(ws);
      this.stompClient.connect({}, () =>{
        this.stompClient.subscribe('/tarefa/tarefas', (message)=>{
          if(message.body){
            this.updateEvents.next(JSON.parse(message.body));
          }
        });
      });
  }

  getAll(): Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(`${this.host}/tarefa`);
  }

  save(word: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.host}/registar`, word);
  }

  private subscribeToTopic(topic: String, callback: any): void {
    this.stompClient.subscribe(topic, (): any =>{
      callback();
    });
  }

}
