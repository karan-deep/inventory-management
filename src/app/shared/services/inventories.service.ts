import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoriesService {
  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(environment.apiBasePath + 'inventories');
  }

  getInventory(id): Observable<Inventory> {
    return this.http.get<Inventory>(
      environment.apiBasePath + 'inventories/' + id
    );
  }

  create(body) {
    return this.http.post(environment.apiBasePath + 'inventories', body);
  }

  update(id, body) {
    return this.http.put(environment.apiBasePath + 'inventories/' + id, body);
  }

  delete(id) {
    return this.http.delete(environment.apiBasePath + 'inventories/' + id);
  }

  constructor(private http: HttpClient) {}
}
