export class Pessoa {
    public id?: number;
    public nome?: string;
    public cpf?: string;
    public telefone?: string;

    constructor(data: any){
        if (data?.id) { this.id = Number(data.id) }
        this.nome = (data?.nome) ? String(data.nome) : '';
        this.cpf = (data?.cpf) ? String(data.cpf) : '';
        this.telefone = (data?.telefone) ? String(data.telefone) : ''
    }
}