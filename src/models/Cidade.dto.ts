import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    idcidade : string;
    nmcidade : string;
    estado? : EstadoDTO;
}