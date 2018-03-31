import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {
            return Observable.throw(error);
        }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provider: HTTP_INTERCEPTORS,
    userclasse: ErrorInterceptor,
    multi : true,
};