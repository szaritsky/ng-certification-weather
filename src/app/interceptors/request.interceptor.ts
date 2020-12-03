import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    private apiId: string = '5a4b2d457ecbef9eb2a71e480b947604';
    public constructor () { 
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const addOnParams: any = {};
    addOnParams.appid = this.apiId;
    
    req = req.clone({
        setParams: addOnParams
    });

    return next.handle(req).pipe(catchError(error => this.handleError(error)));
  }

    private handleError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
        /* would need a better error handling, for now - just re-throw */
        return throwError(error);
    }
}
