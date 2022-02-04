import { NgModule } from '@angular/core';
import {
  OnInit,
  Component,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-vertgridalt',
  templateUrl: './vertgridalt.component.html',
  styleUrls: ['./vertgridalt.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class VertgridaltComponent {
  @ViewChildren(GridComponent) private grids: QueryList<GridComponent>;
  public mySelection: string[] = [];

  public data = [
    {
      EricssonPN: '00302-0028',
      Suppliers: 'XILINX',
      SupplierPNs: 'XC3S1500-4FGG456C',
      Stdlead: '52',
      2204: '664',
      2205: '222',
      2206: '111',
      2207: '222',
      2208: '232',
      2209: '100',
      2210: '222',
      2211: '224',
      2212: '101',
      Uncomfirmed: '0',
      OutsideWindow: '0',
      secondLevelData: [
        {
          EricssonPN: '00302-0028',
          Region: 'Europe',
          Suppliers: 'XILINX',
          SupplierPNs: 'XC3S1500-4FGG456C',
          Stdlead: '52',
          2204: '664',
          2205: '222',
          2206: '111',
          2207: '222',
          2208: '232',
          2209: '100',
          2210: '222',
          2211: '224',
          2212: '101',
          Uncomfirmed: '0',
          OutsideWindow: '0',
          thirdLevelData: [
            {
              EricssonPN: '00302-0028',
              ArrowPN: 'XC3S1500-4FGG456C',
              SupplierPN: 'XC3S1500-4FGG456C',
              Logistic: 'SPMI',
              Region: 'Europe',
              Supplier: 'XILINX',
              Suppliers: 'XILINX',
              SupplierPNs: 'XC3S1500-4FGG456C',
              Inventory: 'inventory',
              Customer: '-',
              Stdlead: '52',
              2204: '664',
              2205: '-',
              2206: '-',
              2207: '-',
              2208: '-',
              2209: '-',
              2210: '-',
              2211: '-',
              2212: '-',
              Uncomfirmed: '0',
              OutsideWindow: '0',
            },
          ],
        },
        {
          EricssonPN: '00302-0028',
          text: 'bar',
          thirdLevelData: [
            { id: 1, text: 'deeper foo' },
            { id: 1, text: 'deeper bar' },
          ],
        },
      ],
    },
    {
      ProductID: 2,
      ProductName: 'Chang',
      UnitPrice: 19.0,
      Discontinued: false,
      secondLevelData: [
        {
          id: 1,
          text: 'foo',
          thirdLevelData: [
            { id: 1, text: 'deeper foo' },
            { id: 1, text: 'deeper bar' },
          ],
        },
        {
          id: 2,
          text: 'bar',
          thirdLevelData: [
            { id: 1, text: 'deeper foo' },
            { id: 1, text: 'deeper bar' },
          ],
        },
      ],
    },
    {
      ProductID: 3,
      ProductName: 'Aniseed Syrup',
      UnitPrice: 10.0,
      Discontinued: false,
      secondLevelData: [
        {
          id: 1,
          text: 'foo',
          thirdLevelData: [
            { id: 1, text: 'deeper foo' },
            { id: 1, text: 'deeper bar' },
          ],
        },
        {
          id: 2,
          text: 'bar',
          thirdLevelData: [
            { id: 1, text: 'deeper foo' },
            { id: 1, text: 'deeper bar' },
          ],
        },
      ],
    },
  ];

  public collapseAll(topGrid) {
    this.data.forEach((item, idx) => {
      topGrid.collapseRow(idx);
    });
  }

  public expandAll(topGrid) {
    this.data.forEach((item, idx) => {
      topGrid.expandRow(idx);
    });

    setTimeout(() => {
      this.grids.toArray().forEach((grid) => {
        if ((<any[]>grid.data).length) {
          (<any[]>grid.data).forEach((item, idx) => {
            grid.expandRow(idx);
          });
        } else {
          (<GridDataResult>grid.data).data.forEach((item, idx) => {
            grid.expandRow(idx);
          });
        }
      });
    });
  }
}
