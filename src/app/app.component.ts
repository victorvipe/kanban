import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorType, ToastService } from './shared/services/toast/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public title = 'procurator';
    public errorType = ErrorType.ERROR;
	public warningType = ErrorType.WARNING;
	public successType = ErrorType.SUCCESS;

    constructor(private translate: TranslateService,
        private readonly toastService: ToastService) {
        this.translate.use('es');
    }

    public changeLanguage(lang: string): void {
        this.translate.use(lang);
    }

    public doHandleError(errorType: ErrorType): void {
		this.toastService.setErrorType(errorType);
		this.getFakeError();
	}

	private getFakeError(): void {
		this.toastService.getFakeError().subscribe();
	}
    


}
