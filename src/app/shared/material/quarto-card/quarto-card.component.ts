import { Component, Input, OnInit } from '@angular/core';
import { Quarto } from '../../models/quarto.model';

@Component({
  selector: 'app-quarto-card',
  templateUrl: './quarto-card.component.html',
  styleUrls: ['./quarto-card.component.css']
})
export class QuartoCardComponent implements OnInit {

  @Input() quarto!: Quarto;
  
  constructor() { }

  ngOnInit(): void {
  }

}
