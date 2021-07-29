import { HttpParams } from "@angular/common/http";

export class HttpParamsUtils {

    public static getFilter(key: any, value: any){
        return new HttpParams().set(key, value);
    }

    public static getFilters(filters: any){
        let httpParams = new HttpParams();
        if(filters){
            Object.keys(filters).forEach(key =>{
                if(filters[key] !== null && filters[key] !== undefined){
                    httpParams = httpParams.set(key, filters[key]);
                }
            })
        }
        return httpParams;
    }

    public static getPagination(pagination: any): HttpParams{
        let httpParams = new HttpParams();

        Object.keys(pagination).forEach(key =>{
            if(pagination[key] !== null && pagination[key] !== undefined){
                httpParams = httpParams.set(key, pagination[key]);
            }
        })
        return httpParams;    
    }

    public static getFiltersAndPagination(filters: any, pagination: any){
        const paramsFilters = this.getFilters(filters);
        let httpParams = this.getPagination(pagination);
        
        paramsFilters.keys().forEach(key => httpParams = httpParams.set(key, paramsFilters.get(key) as string));

        return httpParams;    
    }
}