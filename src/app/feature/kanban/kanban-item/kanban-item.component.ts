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
  public statusClass = '';

  constructor() { }

  ngOnInit(): void {
    this.statusClass = this._calculateStatusClass();
  }

  public doDelete(event: Event): void {
    this.onDelete.emit(true);
    event.stopPropagation();
  }

  public doSelectKanbanItem(): void {
    this.onSelect.emit(this.content);
  }

  private _calculateStatusClass(): string {
    switch(this.content.status) {
        case KanbanStatus.TODO:
            return 'is-todo';
        case KanbanStatus.DOING: 
            return 'is-doing';
        case KanbanStatus.DONE:
            return 'is-done';
        default:
            return '';
    }
  }


}
