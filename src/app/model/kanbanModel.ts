export enum KanbanStatus {
    TODO,
    DOING,
    DONE
}

export interface KanbanItem {

    id?: number;
    title: string;
    body?: string;
    status: KanbanStatus;

}