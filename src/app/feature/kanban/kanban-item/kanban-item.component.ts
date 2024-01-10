import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { KanbanItem, KanbanStatus } from 'src/app/model/kanbanModel';

@Component({
  selector: 'app-kanban-item',
  templateUrl: './kanban-item.component.html',
  styleUrls: ['./kanban-item.component.scss']
})
export class KanbanItemComponent implements OnInit {

  @Input() content: KanbanItem = {title: '', status: 0};
  @Output() public onDelete: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() public onSelect: EventEmitter<KanbanItem> = new EventEmitter<KanbanItem>();
  public isDoneClass = '';

  constructor() { }

  ngOnInit(): void {
    this.isDoneClass = this.content.status === KanbanStatus.DONE ? 'is-done' : '';
  }

  public doDelete(): void {
    this.onDelete.emit(true);
  }

  public doSelectKanbanItem(): void {
    this.onSelect.emit(this.content);
  }


}
