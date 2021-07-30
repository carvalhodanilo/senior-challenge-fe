import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mappingUrls } from '../../constants/constants';
import { Movimentacao } from '../../models/movimentacao.model';
import { Pessoa } from '../../models/pessoa.model';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @ViewChild('searchPersonForm') searchPersonForm!: FormGroup;
  @ViewChild('table') table!: TableComponent;

  public form!: FormGroup;
  public submitted = false;
  public type!: string;
  public row!: any;

  public displayedColumns = ["id", "nome", "cpf"];
  public service = mappingUrls.pessoaService.context;
  
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.type = this.data?.type;
    this.row = new Movimentacao(this.data?.row);
    if(!this.row.saida) { this.row.saida = new Date(); }
    this.buildForm();
  }

  buildForm(){
    let fields = {};
    if(this.type == 'search') { 
      fields = { nome: ['', []],  cpf: ['', []], telefone: ['', []] }
    }
    if(this.type == 'check-out') { 
      fields = { 
        pessoa: [{ value: this.row.pessoa.nome, disabled: true}, []],  
        telefone: [{ value: this.row.pessoa.telefone, disabled: true}, []], 
        cpf: [{ value: this.row.pessoa.cpf, disabled: true}, []], 
        garagem: [{ value: this.row.garagem, disabled: true}, []],
        quarto: [{ value: this.row.quarto.nome, disabled: true}, []],
        entrada: [{ value: this.row.entrada, disabled: true}, []],
        saida: [{ value: this.row.saida, disabled: true}, []],
        valorTotal: [{ value: this.row.valorTotal, disabled: true}, []],
        id: [{ value: this.row.id, disabled: true}, []],
      }
    }
    this.form = this.formBuilder.group(fields);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(tableRef: TableComponent): void {
    this.submitted = true;
    tableRef.externalSearch(new Pessoa(this.form.value));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  onClickRow(event: any): void {
    this.data = event;
  }

}
