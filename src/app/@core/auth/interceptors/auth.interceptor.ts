import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    accessToken: string;
    constructor(
        private authService: NbAuthService,
        private toastr: NbToastrService,
        private _router: Router,
    ) { }

    getUserToken() {
        //console.log('getting token on Interceptor')
        return this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
                if (token.isValid()) {
                    this.accessToken = token.getValue()
                    return
                }
            });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.getUserToken()
        if (!this.accessToken) {
            this.getUserToken()
            const headers = req.headers.set('Authorization', `Bearer ${this.accessToken}`);
            const authReq = req.clone({ headers });
            return next.handle(authReq)
                // .pipe(
                //     catchError((err: HttpErrorResponse): Observable<any> => {
                //         return this.handleAuthError(err)
                //     })
                // )
        } else {
            const headers = req.headers.set('Authorization', `Bearer ${this.accessToken}`);
            const authReq = req.clone({ headers });
            return next.handle(authReq)
                // .pipe(
                //     catchError((err: HttpErrorResponse): Observable<any> => {
                //         return this.handleAuthError(err)
                //     })
                // )
        }
    }

    handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 500) {
            // if (!this._router.url.includes('/auth')) {

            // }
            //delete cookies or whatever
            this.showToast('info', `Sorry we ran into an error, we are looking into it now.`)
            console.log('handled error ' + err.status);
            // this._router.navigate(['/commercial-trucking/dashboard'])
            return of(err.message);
        }
    }

    showToast(status, message: string) {
        if (!message) {
            message = `Our Application Is Undergoing Maintinance`
        }
        this.toastr.show('Please Standby', message, { status, duration: 6000, preventDuplicates: true });
    }
}