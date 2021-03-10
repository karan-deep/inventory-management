import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Inventory } from 'src/app/shared/models/inventory';
import { InventoriesService } from 'src/app/shared/services/inventories.service';

@Component({
  selector: 'app-inventories-editor',
  templateUrl: './inventories-editor.component.html',
  styleUrls: ['./inventories-editor.component.css'],
})
export class InventoriesEditorComponent implements OnInit {
  id: number;
  formState: string;
  inventory: Inventory = {
    stockNumber: undefined,
    year: undefined,
    make: undefined,
    model: '',
    trim: '',
    status: undefined,
    VIN: '',
    stockDate: undefined,
  };
  onCloseModal = new Subject<boolean>();

  constructor(
    private inventoriesService: InventoriesService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    if (this.formState === 'Edit') {
      this.getInventory(this.id);
    }
  }

  getInventory(inventoryId) {
    this.inventoriesService.getInventory(inventoryId).subscribe(
      (resultGetInventory) => {
        if (resultGetInventory) {
          this.inventory = resultGetInventory;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  saveInventory() {
    let observable;
    const body: Inventory = {
      stockNumber: this.inventory.stockNumber,
      year: this.inventory.year,
      make: this.inventory.make,
      model: this.inventory.model,
      trim: this.inventory.trim,
      status:
        typeof this.inventory.status === 'string'
          ? parseInt(this.inventory.status)
          : this.inventory.status,
      VIN: this.inventory.VIN,
      stockDate: this.inventory.stockDate,
    };
    if (this.formState === 'Edit') {
      observable = this.inventoriesService.update(this.id, body);
    } else {
      observable = this.inventoriesService.create(body);
    }
    observable.subscribe(
      () => {
        this.onCloseModal.next(true);
        this.bsModalRef.hide();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onCancel() {
    this.onCloseModal.next(false);
    this.bsModalRef.hide();
  }
}
