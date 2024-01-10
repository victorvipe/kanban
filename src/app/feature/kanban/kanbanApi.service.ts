import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { KanbanItem } from 'src/app/model/kanbanModel';

@Injectable({
providedIn: 'root'
})
export class KanbanApiService {

	private apiUrl = environment.apiUrl + '/kanban-items';

	constructor(private readonly http: HttpClient) { }

	fetchKanbanItems(): Observable<KanbanItem[]> {
		return this.http.get<KanbanItem[]>(this.apiUrl);
	}

	addKanbanItem(kanbanItem: KanbanItem): Observable<KanbanItem> {
		return this.http.post<KanbanItem>(this.apiUrl, kanbanItem);
	}

	updateKanbanItem(id: number, updatedKanbanItem: KanbanItem): Observable<KanbanItem> {
		return this.http.put<KanbanItem>(`${this.apiUrl}/${id}`, updatedKanbanItem);
	}

	deleteKanbanItem(id: number): Observable<boolean> {
		return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
	}

}
