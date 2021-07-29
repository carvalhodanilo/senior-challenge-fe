export class TablePagination {
    public page: number = 0;
    public size: number = 1;
    public dir: string = 'asc'; 
    public sort: string = 'id';
    public total: number = 0;

    constructor(pager: any){
        this.dir = (pager && pager.dir) ? String(pager.dir): 'asc'
        if(pager && pager.sort) { this.sort = String(pager.sort); }
        if(pager && pager.size) { this.size = Number(pager.size); }
        if(pager && pager.page) { this.page = Number(pager.page); }
        if(pager && pager.total) { this.total = Number(pager.total); }
    }
}