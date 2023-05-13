import { Component, OnInit } from '@angular/core';
import { TarefaServiceService } from './service/tarefa-service.service';
import { Tarefa } from './model/tarefa';
import { HttpErrorResponse } from '@angular/common/http';
import { StompService } from './service/stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todog';

  estados: Tarefa [];
  tarefa: Tarefa;

  constructor(private service: TarefaServiceService, private stompService: StompService){

  }
  ngOnInit(): void {
    this.mostrarListaTarefa();
    this.stompService.updateEvents.subscribe(event =>{
      if(event.adicionar){
        this.handleAddTarefa(event.adicionar);
      }
    })
  }

  mostrarListaTarefa(): void{
    this.stompService.getAll().subscribe(data=>{
      this.estados = data;
    })
  }

  private handleAddTarefa(addedTarefa: Tarefa){
    this.estados = [
      ... this.estados,
      addedTarefa,
    ];
  }


  onRegisterTarefa(tarefa: Tarefa){
    console.log(tarefa);
    this.stompService.save(tarefa).subscribe(Tarefa=>{
      Object.assign(tarefa,{
        nomeTarefa: Tarefa.nomeTarefa

      });
    },
    (errorResponse: HttpErrorResponse)=>{
      console.log(errorResponse);
    }
    )
  }

}
