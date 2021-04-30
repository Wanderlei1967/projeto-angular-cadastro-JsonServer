import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { AlunoModel } from './aluno.model';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  aluno: AlunoModel = new AlunoModel();
  alunos: Array<any> = new Array();
  AlunoModel: any;

  constructor(private alunosService: AlunosService) { }


  ngOnInit(): void {
    this.listarAlunos();
  }

  atualizar(id: number) {
    this.alunosService.atualizarAluno(id, this.aluno).subscribe(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
    }, err =>{
      console.log('Erro ao atualizar o aluno', err)
    })

  }

  remover(id: number) {
    var nomealu = this.alunos.find((alunos) => alunos.id === id );
    var resultado = confirm("Deseja excluir o aluno: " + nomealu.nome + " ?");
    if (resultado == true) {
      this.alunosService.removerAluno(id).subscribe(aluno => {
        this.aluno = new AlunoModel();
        this.listarAlunos();
      }, err =>{
        console.log('Erro ao remover o aluno', err)
      })
    }
  }

  cadastrar(){
    console.log(this.aluno);
    this.alunosService.cadastrarAluno(this.aluno).subscribe(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
    }, err =>{
      console.log('Erro ao cadastrar o aluno', err)
    })
  }

  listarAlunos() {

    this.alunosService.listarAlunos().subscribe(alunos => {
      this.alunos = alunos;
    }, err => {
      console.log('Erro ao Listar os Alunos',err);
    })

  }

  popularInputs(id: any) {
    var nomealu = this.alunos.find((alunos) => alunos.id === id );
    this.aluno.nome = nomealu.nome;
    this.aluno.idade   = nomealu.idade;  
  }  
}
