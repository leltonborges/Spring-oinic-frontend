import { CidadeDTO } from './cidade.dto';

export interface EnderecoDTO{
    id: string;
    logradouro: string;
    number: string;
    complement: string;
    neighborhood: string;
    cep: string;
    city: CidadeDTO;
}