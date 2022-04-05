/* tslint:disable:max-line-length */

import {
  Component,
  Inject,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
// import { images } from './images';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'app-vertgrid',
  templateUrl: './vertgrid.component.html',
  styleUrls: ['./vertgrid.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class VertgridComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: any) {}
  elem;

  ngOnInit() {
    this.gridView = this.gridData;
    this.elem = document.getElementById('vertical-grid-container');
  }
  public listItems: Array<string> = [
    'Last Year',
    'Last Quarter',
    'This Calendar year',
    'Long explanation of time range',
    'Custom Range',
  ];
  public defaultItem: { text: string } = {
    text: 'Last Fiscal Year to Present',
  };

  openFullscreen(event) {
    this.elem.classList.add('fullscreened');
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen(event) {
    this.elem.classList.remove('fullscreened');
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  openModal(event) {
    document.body.classList.add('modal-open');
  }

  @HostListener('document:fullscreenchange', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (!document.fullscreenElement) {
      this.elem.classList.remove('fullscreened');
    } else {
      this.elem.classList.add('fullscreened');
    }
    // if (this.document.exitFullscreen) {
    //   console.log('boom');
    //   this.elem.classList.remove('fullscreened');
    // } else
    // if (this.document.mozCancelFullScreen) {
    //   //   /* Firefox */
    //   this.elem.classList.remove('fullscreened');
    // }
    // else if (this.document.webkitExitFullscreen) {
    //   /* Chrome, Safari and Opera */
    //   console.log('boom');
    //   this.elem.classList.remove('fullscreened');
    // } else if (this.document.msExitFullscreen) {
    //   /* IE/Edge */
    //   console.log('boom');
    //   this.elem.classList.remove('fullscreened');
    // }
  }

  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  public showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (
      (element.nodeName === 'TD' || element.nodeName === 'TH') &&
      element.offsetWidth < element.scrollWidth
    ) {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData: any[] = employees;
  public gridView: any[];

  public mySelection: string[] = [];

  public buttonCount = 5;
  public info = true;
  public pageSizes = true;
  public previousNext = true;
  public position = 'bottom';

  public pageSize = 13;

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'full_name',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'job_title',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'budget',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  private photoURL(dataItem: any): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: any = images;

    return image[code];
  }

  private flagURL(dataItem: any): string {
    const code: string = dataItem.country;
    const image: any = images;

    return image[code];
  }
}
