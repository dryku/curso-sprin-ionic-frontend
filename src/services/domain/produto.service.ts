import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/Produto.dto";
import { Observable } from "rxjs/Rx";

import "rxjs/operator/map";
import "rxjs/operator/retry";

@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient) {
    }

    buscarCategorias(categoria_id: string)  {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
//     .map((resposta: Response) => resposta.json());
    }
    

}