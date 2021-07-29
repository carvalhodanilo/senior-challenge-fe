import { Component, OnInit } from '@angular/core';
import { mappingUrls } from 'src/app/shared/constants/constants';
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
  public pager: TablePagination = new TablePagination({ page: 0, size: 3 });
  public quartos: Quarto[] = new Array<Quarto>();

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.genericService.getWithFiltersAndPAgination(this.pager, this.service).subscribe(res => {
      if(res['content'] && res['content'].length){
        this.quartos = res['content'].map((quarto: any) => quarto as Quarto)
      }
    })
  }
}
