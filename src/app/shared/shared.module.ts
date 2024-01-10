import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KanbanItemDialogComponent } from '../feature/kanban/dialogs/kanban-item-dialog/kanban-item-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    NavigationBarComponent,
    KanbanItemDialogComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule
  ],
  exports: [
    NavigationBarComponent,
    KanbanItemDialogComponent,
    TranslateModule
  ]
})
export class SharedModule { }
