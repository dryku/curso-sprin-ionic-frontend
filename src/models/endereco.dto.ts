import { CidadeDTO } from "./cidade.dto";

export interface EnderecoDTO {
    //id : string;
    idendereco : string;
    logradouro : String;
    numero : String;
    complemento : String;
    bairro : String;
    cep : String;
    cidade : CidadeDTO;


}