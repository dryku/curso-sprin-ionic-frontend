import { Injectable } from "@angular/core";
//import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (public storage : StorageService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let localUser = this.storage.getLocalUser();
        if (localUser) {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+ localUser.token)});
            return next.handle(authReq);    
  
            } 
            else {
                console.log("Passou no erro do interceptor de autenticação!");
                return next.handle(req)
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi : true,
};