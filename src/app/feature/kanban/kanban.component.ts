import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { KanbanItemDialogComponent } from './dialogs/kanban-item-dialog/kanban-item-dialog.component';
import { KanbanApiService } from './kanbanApi.service';
import { KanbanItem, KanbanStatus } from 'src/app/model/kanbanModel';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorType, ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

	public kanbanItems: KanbanItem[] = [];
	public todoKanbanItems: KanbanItem[] = [];
	public doingKanbanItems: KanbanItem[] = [];
	public doneKanbanItems: KanbanItem[] = [];
	public errorType = ErrorType.ERROR;
	public warningType = ErrorType.WARNING;
	public successType = ErrorType.SUCCESS;

	constructor(
		private dialogService: DialogService,
		private readonly kanbanApiService: KanbanApiService,
		private readonly toastService: ToastService) { }

	ngOnInit(): void {
		this.kanbanApiService.fetchKanbanItems()
			.subscribe(res => {
				this.kanbanItems = res;
				this.filterItemsByStatus(res);
			});
	}

	public doAdd(): void {

		const dialogRef = this.dialogService.open(KanbanItemDialogComponent, {width: '40%'});
		dialogRef.afterClosed().subscribe((result: KanbanItem) => {
			if (result) {
				this.kanbanApiService.addKanbanItem(result).subscribe({
					next: (kanbanItem: KanbanItem) => {
						this.todoKanbanItems.push(kanbanItem);
						this.toastService.showSuccess(kanbanItem.title, 'Added item');
					}
				})
			}
		});

	}

	public drop(event: CdkDragDrop<KanbanItem[]>, status: KanbanStatus): void {

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			let droppedItem = event.previousContainer.data[event.previousIndex];
			droppedItem = {
				...droppedItem,
				status: status
			};
			if (droppedItem.id) {
				this.kanbanApiService.updateKanbanItem(droppedItem.id, droppedItem).subscribe({
					next: (res: KanbanItem) => {
						if (res) {
							transferArrayItem(
								event.previousContainer.data,
								event.container.data,
								event.previousIndex,
								event.currentIndex,
							);
							const kanbanItemsByStatus: Record<KanbanStatus, any[]> = {
								[KanbanStatus.TODO]: this.todoKanbanItems,
								[KanbanStatus.DOING]: this.doingKanbanItems,
								[KanbanStatus.DONE]: this.doneKanbanItems
							};
							const previousIndex = kanbanItemsByStatus[res.status].findIndex(item => item.id === res.id);
							if (previousIndex !== -1) {
								kanbanItemsByStatus[res.status][previousIndex] = res;
							}
						}
					}
				});
			}
		}

	}

	public doDelete(event: boolean, status: KanbanStatus, kanbanItemId?: number): void {

		if (event && kanbanItemId) {

			const kanbanItemsByStatus: Record<KanbanStatus, any[]> = {
				[KanbanStatus.TODO]: this.todoKanbanItems,
				[KanbanStatus.DOING]: this.doingKanbanItems,
				[KanbanStatus.DONE]: this.doneKanbanItems
			};
			this.kanbanApiService.deleteKanbanItem(kanbanItemId).subscribe({
				next: (res: boolean) => {
					if (res) {
					const kanbanList = kanbanItemsByStatus[status];
					const index = kanbanList.findIndex(item => item.id === kanbanItemId);
					if (index !== -1) {
						kanbanList.splice(index, 1);
					}
					}
				}
			});
		}

	}

	public doSelect(item: KanbanItem): void {

		this.dialogService.open(KanbanItemDialogComponent, {
			width: '40%',
			data: {
				kanbanItem: item,
				editMode: true
			}
		}).afterClosed().pipe(
			switchMap((item: KanbanItem) => {
				if (item && item.id) {
					return this.kanbanApiService.updateKanbanItem(item.id, item)
				}
				const emptyKanbanItem: KanbanItem = {title: '', status: KanbanStatus.TODO};
				return of(emptyKanbanItem);
			})
		).subscribe(updatedItem => {
			const kanbanItemsByStatus: Record<KanbanStatus, any[]> = {
				[KanbanStatus.TODO]: this.todoKanbanItems,
				[KanbanStatus.DOING]: this.doingKanbanItems,
				[KanbanStatus.DONE]: this.doneKanbanItems
			};
			const previousIndex = kanbanItemsByStatus[updatedItem.status].findIndex(item => item.id === updatedItem.id);
			if (previousIndex !== -1) {
				kanbanItemsByStatus[updatedItem.status][previousIndex] = updatedItem;
			}
		});

	}

	public doHandleError(errorType: ErrorType): void {
		this.toastService.setErrorType(errorType);
		this.getFakeError();
	}

	private getFakeError(): void {
		this.toastService.getFakeError().subscribe();
	}

	private filterItemsByStatus(kanbanItems: KanbanItem[]): void {

		this.todoKanbanItems = kanbanItems.filter(item => item.status === KanbanStatus.TODO);
		this.doingKanbanItems = kanbanItems.filter(item => item.status === KanbanStatus.DOING);
		this.doneKanbanItems = kanbanItems.filter(item => item.status === KanbanStatus.DONE);

	}


  


}

