import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GenericService } from '../../services/generic.service';
import { TablePagination } from '../../utils/table-pagination.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Input() displayedColumns!: string[];
  @Input() type!: string;
  @Input() service!: string;

  @Output() eventRow = new EventEmitter<any>();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public table = new MatTableDataSource<any>();
  public pager!: TablePagination;
  public filters!: any;
  public item: any;

  constructor(private genericService: GenericService) { }
  
  ngAfterViewInit(): void {
    this.table.sort = this.sort;
  }

  ngOnInit(): void {
    this.pager = new TablePagination({ page: 0, size: 3 });
    this.table = new MatTableDataSource();
    this.onSearch();
  }

  public externalSearch(filters: any){
    this.pager = new TablePagination({ page: 0, size: 3 });
    this.paginator.pageIndex = 0;
    this.filters = filters;
    this.onSearch();
  }

  onSearch(): void {
    this.loadingSubject.next(true);
    this.genericService.getWithFiltersAndPAgination(this.pager, this.service, this.filters).subscribe(resp =>{
      if(resp && resp['content']) { this.table.data = [...resp['content']]; }
      if(this.pager.page === 0){ this.pager.total = resp['totalElements']; }
      this.loadingSubject.next(false);
    })
  }

  public onPaginate(event: any){
    this.pager.size = event?.pageSize;
    this.pager.page = event?.pageIndex;
    this.onSearch();
  }

  onClickRow(row: any){
    if (this.type === 'select'){ this.item = row; }
    this.eventRow.emit(row);
  }
}
