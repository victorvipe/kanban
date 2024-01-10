import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';


export enum ErrorType {
	ERROR,
	WARNING,
	SUCCESS
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

	private errorType: ErrorType | undefined;

	constructor(private http: HttpClient, private toastrService: ToastrService) {}

	public setErrorType(type: ErrorType) {
		this.errorType = type;
	}

	public getErrorType(): ErrorType | undefined {
		return this.errorType;
	}

	public getFakeError(): Observable<any> {
		return this.http.get('fake-url');
	}

	public handleError(errorMessage: string): void {

		switch (this.errorType) {
			case ErrorType.ERROR:
				this.toastrService.error(errorMessage, 'Error');
			break;
			case ErrorType.WARNING:
				this.toastrService.warning(errorMessage, 'Warning');
			break;
			case ErrorType.SUCCESS:
				this.toastrService.success(errorMessage, 'Success');
			break;
			default:
				this.toastrService.error(errorMessage, 'Error');
			break;
		}

	}

	public showSuccess(message?: string, title?: string): void {
		this.toastrService.success(message, title);
	}

}
