import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/Categoria.dto";
//import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs/Rx";


import "rxjs/operator/map";
import "rxjs/operator/retry";

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient) {
    }

    buscarCategorias() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
//     .map((resposta: Response) => resposta.json());
    }
    findAll() : Observable<CategoriaDTO[]>  {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
     }


    
    testeCategoria() {
    console.log("Acessando O serviço de categorias");
    }


}