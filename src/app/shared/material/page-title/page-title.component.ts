import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  @Input() title!: string;
  @Input() actionsList!: any[];

  @Output() onClickAction = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public onClick(action: any): void {
    this.onClickAction.emit(action);
  }

}
