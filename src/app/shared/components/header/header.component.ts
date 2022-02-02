import { BreadcrumbService } from './../../../services/breadcrumb.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { GlobalConstants } from '../../../common/global-constants';
import { SidePanelService } from '../../../core/';
import { SidePanelState } from '../../../core/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;
  constructor(
    private _sidePanelService: SidePanelService,
    public breadcrumbService: BreadcrumbService,
    private router: Router
  ) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  @ViewChild('overview') overview: ElementRef;
  @ViewChild('filters') filters: ElementRef;
  @ViewChild('hubfilters') hubfilters: ElementRef;
  @ViewChild('outboundfilters') outboundfilters: ElementRef;
  @ViewChild('supplyfilters') supplyfilters: ElementRef;
  @ViewChild('reportfilters') reportfilters: ElementRef;

  breadCrumb = GlobalConstants.breadCrumb;

  toggleSidebar() {
    this.overview.nativeElement.classList.toggle('sidebar-active');
  }
  toggleFilters() {
    this.filters.nativeElement.classList.toggle('filter-active');
    this.overview.nativeElement.classList.toggle('filter-active');
  }
  toggleHubFilters() {
    this.hubfilters.nativeElement.classList.toggle('filter-active');
    this.overview.nativeElement.classList.toggle('filter-active');
  }
  toggleSupplyFilters() {
    this.supplyfilters.nativeElement.classList.toggle('filter-active');
    this.overview.nativeElement.classList.toggle('filter-active');
  }
  toggleOutboundFilters() {
    this.outboundfilters.nativeElement.classList.toggle('filter-active');
    this.overview.nativeElement.classList.toggle('filter-active');
  }
  toggleReportFilters() {
    this.reportfilters.nativeElement.classList.toggle('filter-active');
    this.overview.nativeElement.classList.toggle('filter-active');
  }

  myBreadCrumb = this.breadCrumb;
  hideFilters: boolean = false;

  ngOnInit(): void {
    this._sidePanelService.panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => (this.currentPanelState = state));
    this.breadcrumbService.currentModule$.subscribe((parent) => {
      this.myBreadCrumb = parent;
    });

    this.breadcrumbService.filter$.subscribe((hideFilters) => {
      this.hideFilters = hideFilters;
    });
  }

  public handleSingleClicks(): void {
    const width: number = window.innerWidth;
    if (width < 769 && this.currentPanelState === SidePanelState.MOBILE) {
      this._sidePanelService.changeState(SidePanelState.MOBILEOPEN);
    } else if (this.currentPanelState === SidePanelState.MOBILEOPEN) {
      this._sidePanelService.changeState(SidePanelState.MOBILE);
    } else if (this.currentPanelState === SidePanelState.COLLAPSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN);
    } else {
      this._sidePanelService.changeState(SidePanelState.COLLAPSE);
    }
  }

  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}
