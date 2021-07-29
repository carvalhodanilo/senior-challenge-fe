export class Quarto {
    public id?: number;
    public nome?: string;
    public preco?: number;
    public imagem?: string;
    public locado?: boolean;

    constructor(data: any){
        if (data?.id) { this.id = Number(data.id) }
        this.nome = (data?.nome) ? String(data.nome) : '';
        this.preco = (data?.preco) ? Number(data.preco) : 0;
        this.imagem = (data?.imagem) ? String(data.imagem) : '';
        this.locado = (data?.locado) ? true : false;
    }
}