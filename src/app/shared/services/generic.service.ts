import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa.model';
import { HttpParamsUtils } from '../utils/http-client.utils';
import { TablePagination } from '../utils/table-pagination.model';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private API = "http://localhost:8080/api";
  constructor(private httpClient: HttpClient) { }

  public getWithFiltersAndPAgination(pagination: TablePagination, endPoint: string, filters?: any): Observable<any> {
    const params = HttpParamsUtils.getFiltersAndPagination(filters, pagination);

    return this.httpClient.get(`${this.API}/${endPoint}`, { params }).pipe(
      map(resp => this.mappingData(resp))
    );
  }

  public getAll(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.API}`).pipe(
      map(resp => this.mappingData(resp))
    );
  }

  public save(entity: any, endPoint: string): Observable<any> {
    return this.httpClient.post(`${this.API}/${endPoint}`, entity).pipe(
      map(resp => this.mappingData(resp))
    );
  }

  public edit(entity: any, endPoint: string): Observable<any> {
    console.log(entity)
    return this.httpClient.put(`${this.API}/${endPoint}/${entity.id}`, entity).pipe(
      map(resp => this.mappingData(resp))
    );
  }

  public getById(endPoint: string, id: any): Observable<any> {
		return this.httpClient.get(`${this.API}/${endPoint}/${id}`).pipe(
			map(this.mappingData)
		);
	}

  public delete(endPoint: string, id: any): Observable<any> {
		return this.httpClient.delete(`${this.API}/${endPoint}/${id}`).pipe(
			map(this.mappingData)
		);
	}

  private mappingData(resp: any): any {
    return resp;
  }
}
