import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService) {
    }

//    findByEmail(email : string) : Observable<ClienteDTO> {   
// --------------------  INSERINDO CABECARIO SEM O INTERCEPTOR --------------------        
//        let token = this.storage.getLocalUser().token;
//        let authHeader = new HttpHeaders({"Authorization": "Bearer " + token});  
//        return  this.http.get<ClienteDTO>(
//            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
//            {'headers': authHeader});

//        return  this.http.get<ClienteDTO>(
//            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
//}


    findById(id : string) {   
          return  this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    
    findByEmail(email : string) {   
        return  this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }
  
    inserirCliente(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}