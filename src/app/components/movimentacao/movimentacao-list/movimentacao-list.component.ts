import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { mappingUrls } from 'src/app/shared/constants/constants';
import { TableComponent } from 'src/app/shared/material/table/table.component';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoaService } from 'src/app/shared/services/pessoa.service';

@Component({
  selector: 'app-movimentacao-list',
  templateUrl: './movimentacao-list.component.html',
  styleUrls: ['./movimentacao-list.component.css']
})
export class MovimentacaoListComponent implements OnInit {

  @ViewChild('searchPersonForm') searchPersonForm!: FormGroup;
  @ViewChild('table') table!: TableComponent;
  form!: FormGroup;
  submitted = false;

  public displayedColumns = ["pessoa", "quarto", "valorTotal", "closed"];
  public actions!: any[];
  public service = mappingUrls.movimentacaoService.context;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

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
    tableRef.externalSearch(new Pessoa(this.form.value));
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
