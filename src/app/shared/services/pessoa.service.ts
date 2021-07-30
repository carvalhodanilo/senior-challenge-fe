import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa.model';
import { HttpParamsUtils } from '../utils/http-client.utils';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private API = "http://localhost:8080/api/pessoas";
  constructor(private httpClient: HttpClient) { }

  public getWithFiltersAndPAgination(filters: any, pagination: any): Observable<Pessoa[]> {
    const params = HttpParamsUtils.getFiltersAndPagination(filters, pagination);
    return this.httpClient.get<any>(`${this.API}`, { params }).pipe(
      map(resp => this.mappingPersons(resp))
    );
  }

  public getAllPersons(): Observable<Pessoa[]> {
    return this.httpClient.get<any>(`${this.API}`).pipe(
      map(resp => this.mappingPersons(resp))
    );
  }

  private mappingPersons(resp: any): Pessoa[] {
    let pessoa: Pessoa[] = new Array<Pessoa>();
    return pessoa;
  }
}
