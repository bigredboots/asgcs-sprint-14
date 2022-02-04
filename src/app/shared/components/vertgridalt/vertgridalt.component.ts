import { NgModule } from '@angular/core';
import { OnInit, Component, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
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
    public data = [{
        "ProductID": 1,
        "ProductName": "Chai",
        "UnitPrice": 18.0000,
        "Discontinued": false,
        "secondLevelData": [{id: 1, text: 'foo', thirdLevelData: [{id: 1, text: 'deeper foo'}, {id: 1, text: 'deeper bar'}]}, {id: 2, text: 'bar', thirdLevelData: [{id: 1, text: 'deeper foo'}, {id: 1, text: 'deeper bar'}]}]
      }, {
        "ProductID": 2,
        "ProductName": "Chang",
        "UnitPrice": 19.0000,
        "Discontinued": false,
        "secondLevelData": [{id: 1, text: 'foo', thirdLevelData: [{id: 1, text: 'deeper foo'}, {id: 1, text: 'deeper bar'}]}, {id: 2, text: 'bar', thirdLevelData: [{id: 1, text: 'deeper foo'}, {id: 1, text: 'deeper bar'}]}]
      }, {
        "ProductID": 3,
        "ProductName": "Aniseed Syrup",
        "UnitPrice": 10.0000,
        "Discontinued": false,
        "secondLevelData": [{id: 1, text: 'foo', thirdLevelData: [{id: 1, text: 'deeper foo'}, {id: 1, text: 'deeper bar'}]}, {id: 2, text: 'bar', thirdLevelData: [{id: 1, text: 'deeper foo'}, {id: 1, text: 'deeper bar'}]}]
    }];

    public collapseAll(topGrid) {
      this.data.forEach((item, idx) => {
        topGrid.collapseRow(idx);
      })
    }

    public expandAll(topGrid) {
      this.data.forEach((item, idx) => {
        topGrid.expandRow(idx);
      })

      setTimeout(() => {
        this.grids.toArray().forEach(grid => {
          if((<any[]>grid.data).length) {
            (<any[]>grid.data).forEach((item, idx) => {
              grid.expandRow(idx);
            })
          } else {
            (<GridDataResult>grid.data).data.forEach((item, idx) => {
              grid.expandRow(idx);
            })
          }
        })
      })
    }
}
