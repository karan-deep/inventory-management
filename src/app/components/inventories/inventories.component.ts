import { Component, OnInit, Optional } from '@angular/core';
import { Inventory } from 'src/app/shared/models/inventory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InventoriesService } from 'src/app/shared/services/inventories.service';
import { InventoriesEditorComponent } from './inventories-editor/inventories-editor.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.css'],
})
export class InventoriesComponent implements OnInit {
  displayedColumns: string[] = [
    'stockNumber',
    'model',
    'year',
    'make',
    'trim',
    'status',
    'VIN',
    'stockDate',
    'action',
  ];
  inventories: Inventory[];

  constructor(
    public authService: AuthService,
    private inventoriesService: InventoriesService,
    @Optional() public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getInventories();
  }

  getInventories() {
    this.inventories = [];
    this.inventoriesService.getInventories().subscribe(
      (resultGetInventories) => {
        if (resultGetInventories && (resultGetInventories || []).length) {
          this.inventories = resultGetInventories;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editInventory(inventoryId) {
    const bsModalRef = this.modalService.show(InventoriesEditorComponent, {
      animated: true,
      keyboard: false,
      class: 'modal-lg',
      initialState: {
        id: inventoryId,
        formState: 'Edit',
      },
    });
    const subscription = bsModalRef.content.onCloseModal.subscribe((result) => {
      if (result) {
        this.getInventories();
      }
      subscription.unsubscribe();
    });
  }

  deleteInventory(inventoryId) {
    this.inventoriesService.delete(inventoryId).subscribe(
      () => {
        this.getInventories();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  newInventory() {
    const bsModalRef = this.modalService.show(InventoriesEditorComponent, {
      animated: true,
      keyboard: false,
      class: 'modal-lg',
      initialState: {
        formState: 'New',
      },
    });
    const subscription = bsModalRef.content.onCloseModal.subscribe((result) => {
      if (result) {
        this.getInventories();
      }
      subscription.unsubscribe();
    });
  }
}
