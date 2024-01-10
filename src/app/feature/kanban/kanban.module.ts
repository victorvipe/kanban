import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban.routing.module';
import { KanbanItemComponent } from './kanban-item/kanban-item.component';
import { KanbanComponent } from './kanban.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { KanbanItemDialogComponent } from './dialogs/kanban-item-dialog/kanban-item-dialog.component';
import { HttpErrorInterceptor } from 'src/app/core/interceptors/http-error-interceptor';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    KanbanItemComponent,
    KanbanComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    DragDropModule
  ],
})
export class KanbanModule { }
