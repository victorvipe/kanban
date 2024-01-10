import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ErrorType, ToastService } from "src/app/shared/services/toast/toast.service";



@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private toastService: ToastService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error ocurred';
                if (error.error instanceof ErrorEvent) {
                    // Error del lado del cliente
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // Error del lado del servidor
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                // Mostrar el mensaje de error utilizando ngx-toastr
                this.toastService.handleError(errorMessage);
                return throwError(errorMessage);
            })
        )

    }


}