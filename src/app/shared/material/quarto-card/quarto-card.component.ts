import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movimentacao } from '../../models/movimentacao.model';
import { Pessoa } from '../../models/pessoa.model';
import { Quarto } from '../../models/quarto.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-quarto-card',
  templateUrl: './quarto-card.component.html',
  styleUrls: ['./quarto-card.component.css']
})
export class QuartoCardComponent implements OnInit {

  @Input() quarto!: Quarto;
  @Output() onLocate = new EventEmitter<any>();

  public hospede!: Pessoa;
  public garagem!: boolean;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '850px',
      height:'600px',
      data: { type: 'search'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.hospede = result;
      this.emit();
    });
  }

  public emit(): void {
    this.onLocate.emit(new Movimentacao({ 
      quarto:this.quarto, 
      pessoa: this.hospede,
      entrada: new Date()
    }))
  }  
}
