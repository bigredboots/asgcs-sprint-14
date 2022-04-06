import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from './common/global-constants';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import {
  SidePanelState,
  DashboardLayoutConfiguration,
  SidePanelPosition,
} from './core';
import { NavigationLink } from './shared';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  countdown = '';

  breadCrumb = GlobalConstants.breadCrumb;

  public configuration: DashboardLayoutConfiguration;
  public links: NavigationLink[];

  constructor(private idle: Idle) {
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT,
      SidePanelState.OPEN
    );
  }

  ngOnInit() {
    window.scroll(0, 0);

    // sets an idle timeout of 30 seconds.
    this.idle.setIdle(15);

    // sets an  timer for 60 seconds.
    this.idle.setTimeout(30);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'timedout';
      this.timedOut = true;
    });
    this.idle.onIdleStart.subscribe(() => (this.idleState = 'warning'));

    this.idle.onIdleStart.subscribe(() =>
      document.body.classList.add('timeout-modal-open')
    );

    this.idle.onTimeoutWarning.subscribe(
      (countdown) => (this.countdown = countdown)
    );

    this.reset();

  }

  reset() {
    this.idle.watch();
    this.idleState = 'started.';
    this.timedOut = false;
    document.body.classList.remove('timeout-modal-open');
  }
}
