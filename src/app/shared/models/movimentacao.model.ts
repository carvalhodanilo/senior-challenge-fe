import { Pessoa } from "./pessoa.model";
import { Quarto } from "./quarto.model";

export class Movimentacao {

    public id?: number;
    public quarto?: Quarto | null;
    public pessoa?: Pessoa | null;
    public entrada?: Date | null;
    public saida?: Date | null;
    public closed?: boolean;
    public garagem?: boolean;
    public valorTotal?: number | null;

    constructor(data: any){
        if (data?.id) { this.id = Number(data.id) }
        this.quarto = (data?.quarto) ? new Quarto(data.quarto) : null;
        this.pessoa = (data?.pessoa) ? new Pessoa(data.pessoa) : null;
        this.entrada = (data?.entrada) ? new Date(data.entrada) : null;
        this.saida = (data?.saida) ? new Date(data.saida) : null;
        this.valorTotal = (data?.valorTotal) ? Number(data.valorTotal) : null;
        this.closed = (data?.closed) ? true : false;   
        this.garagem = (data?.garagem) ? true : false;       
    }
}