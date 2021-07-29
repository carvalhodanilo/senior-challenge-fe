import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from 'src/app/shared/material/table/table.component';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoaService } from 'src/app/shared/services/pessoa.service';

import { mappingUrls } from './../../../shared/constants/constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {

  @ViewChild('searchPersonForm') searchPersonForm!: FormGroup;
  @ViewChild('table') table!: TableComponent;
  form!: FormGroup;
  submitted = false;

  public displayedColumns = ["id", "nome", "cpf"];
  public actions!: any[];
  public service = mappingUrls.pessoaService.context;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        nome: ['', []],
        cpf: ['', []]
      });

    this.actions = [{action: 'add', icon: 'person_add_alt_1' }]
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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

  public navigateToView(row: any): void{
    this.router.navigate([`/pessoas/visualizar/${row.id}`]);
  }

  public onClickAction(event: any): void {
    switch (event.action){
      case 'add':
        this.router.navigate([`/pessoas/novo`]);
        break;
    }
  }
}
