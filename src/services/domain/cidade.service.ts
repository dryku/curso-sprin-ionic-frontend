import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
//import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs/Rx";

import "rxjs/operator/map";
import "rxjs/operator/retry";

@Injectable()
export class CidadeService{

    constructor(public http: HttpClient) {
    }

    buscarCidades(estado_id : string ) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
//     .map((resposta: Response) => resposta.json());
    }
    
}