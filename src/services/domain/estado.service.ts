import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
//import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs/Rx";

import "rxjs/operator/map";
import "rxjs/operator/retry";

@Injectable()
export class EstadoService{

    constructor(public http: HttpClient) {
    }

    buscarEstados() : Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
//     .map((resposta: Response) => resposta.json());
    }
    
}