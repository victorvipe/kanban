import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'procurator';

    constructor(private translate: TranslateService) {
        this.translate.use('es');
    }

    public changeLanguage(lang: string): void {
        this.translate.use(lang);
    }


}
