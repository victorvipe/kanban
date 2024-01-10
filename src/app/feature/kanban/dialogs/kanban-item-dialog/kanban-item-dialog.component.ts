import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { DialogRef } from 'src/app/shared/services/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/shared/services/dialog/dialog-tokens';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KanbanItem, KanbanStatus } from 'src/app/model/kanbanModel';

@Component({
  selector: 'app-kanban-item-dialog',
  templateUrl: './kanban-item-dialog.component.html',
  styleUrls: ['./kanban-item-dialog.component.scss']
})
export class KanbanItemDialogComponent implements OnInit, AfterViewInit {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Enter key pressed
      if (this.form.valid) {
        this.doSubmit(this.form);
      }
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.close();
    }
  }

  @ViewChild('title', {static: false}) title!: ElementRef<HTMLInputElement>;
  public form!: FormGroup;
  public isDoneClass = '';

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
  }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: [''],
    });
    if (this.data && this.data.editMode) {
      this.form.get('title')?.patchValue(this.data.kanbanItem.title);
      this.form.get('body')?.patchValue(this.data.kanbanItem.body);
    }
  }

  public ngAfterViewInit() {
    this.title.nativeElement.focus();
  }

  public doSubmit(form: FormGroup) {

    const formValue: {title: string; body?: string} = form.getRawValue();
    const item = this.processFormToItem(formValue);
    this.close(item);

  } 

  public close(item?: KanbanItem) {
    this.dialogRef.close(item);
  }

  private processFormToItem(formValue: {title: string; body?: string}): KanbanItem {

    let item: KanbanItem = {title: formValue.title, body: formValue.body, status: KanbanStatus.TODO};
    if (this.data && this.data.editMode) {
      item = {...item, status: this.data.kanbanItem.status, id: this.data.kanbanItem.id};
    }
    return item;
    
  }

}
