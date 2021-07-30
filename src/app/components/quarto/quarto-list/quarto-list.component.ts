import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mappingUrls } from 'src/app/shared/constants/constants';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';
import { Movimentacao } from 'src/app/shared/models/movimentacao.model';
import { Quarto } from 'src/app/shared/models/quarto.model';
import { GenericService } from 'src/app/shared/services/generic.service';
import { TablePagination } from 'src/app/shared/utils/table-pagination.model';

@Component({
  selector: 'app-quarto-list',
  templateUrl: './quarto-list.component.html',
  styleUrls: ['./quarto-list.component.css']
})
export class QuartoListComponent implements OnInit {

  public service = mappingUrls.quartoService.context;
  public movimentacaoService = mappingUrls.movimentacaoService.context;

  public pager: TablePagination = new TablePagination({ page: 0, size: 3 });
  public quartos: Quarto[] = new Array<Quarto>();
  public mov!: Movimentacao;

  constructor(private genericService: GenericService, 
              private router: Router,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getQuartos();
  }

  public onLocate(event: any): void {
    this.mov = event as Movimentacao;
    this.openDialogConfirmGaragem();
  }

  public getQuartos(): void {
    this.genericService.getWithFiltersAndPAgination(this.pager, this.service).subscribe(res => {
      if(res['content'] && res['content'].length){
        this.quartos = res['content'].map((quarto: any) => quarto as Quarto)
      }
    })
  }

  public openSnackBar(message: string, status: string): void {
    this._snackBar.open(message, status, {
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  openDialogConfirmGaragem(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { type: 'confirm'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mov.garagem = result === true ? true : false;
      
      this.genericService.save(this.mov, this.movimentacaoService).subscribe(res =>{
        this.openSnackBar("Quarto locado!", "Sucesso!");
        this.router.navigate(['/pessoas']);
      })

    });
  }
}
