import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mappingUrls } from '../../constants/constants';
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
  
  public displayedColumns = ["id", "nome", "cpf"];
  public service = mappingUrls.pessoaService.context;
  
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.type = this.data?.type;

    this.form = this.formBuilder.group({
      nome: ['', []],
      cpf: ['', []],
      telefone: ['', []]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(tableRef: TableComponent): void {
    this.submitted = true;

    console.log(new Pessoa(this.form.value))
    tableRef.externalSearch(new Pessoa(this.form.value));

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  onClickRow(event: any): void {
    this.data = event;
  }

}
