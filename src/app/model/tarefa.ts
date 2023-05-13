export interface Tarefa{
  identificador: number;
  nomeTarefa: string;
  estadoTarefa: string;
}

export interface IUpdateTarefa {
  adicionar: Tarefa;
  updatatualizar: Tarefa;
  removerTarefa: Tarefa;
}

export class ITarefa implements Tarefa {
  constructor(
        public identificador: any,
        public nomeTarefa: string,
        public estadoTarefa: string
    ) {
        this.identificador = identificador;
        this.nomeTarefa = nomeTarefa;
        this.estadoTarefa = estadoTarefa;
    }
  }
