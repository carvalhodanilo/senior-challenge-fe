import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { mappingUrls } from 'src/app/shared/constants/constants';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';
import { TableComponent } from 'src/app/shared/material/table/table.component';
import { Movimentacao } from 'src/app/shared/models/movimentacao.model';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { GenericService } from 'src/app/shared/services/generic.service';
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

  public displayedColumns = ["pessoa", "quarto", "valorTotal", "garagem", "closed"];
  public actions!: any[];
  public service = mappingUrls.movimentacaoService.context;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private genericService: GenericService,
              public dialog: MatDialog) { }

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

  public onClickRow(row: any): void{
      this.openDialogCheckout(row);
  }

  openDialogCheckout(row: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { type: 'check-out', row}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const movimentacao = new Movimentacao(result);
        movimentacao.closed = true;
              
        this.genericService.edit(movimentacao, this.service).subscribe(res =>{
          // this.openSnackBar("Quarto locado!", "Sucesso!");
          this.router.navigate(['/home']);
        })
      }   
    });
  }
}
