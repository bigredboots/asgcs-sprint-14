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

  breadCrumb = GlobalConstants.breadCrumb;

  public configuration: DashboardLayoutConfiguration;
  public links: NavigationLink[];

  constructor(private idle: Idle) {
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT,
      SidePanelState.OPEN
    );
  }

  // onActivate(event) {
  //   window.scroll(0, 0);
  //   document.querySelector('main-content').scrollTo(0, 0);
  // }

  ngOnInit() {
    window.scroll(0, 0);

    // sets an idle timeout of 15 seconds.
    this.idle.setIdle(15);

    // sets an  timer for 30 seconds.
    this.idle.setTimeout(60);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    this.idle.onIdleStart.subscribe(
      () => (this.idleState = "You've gone idle!")
    );

    // this.idle.onIdleStart.subscribe(() =>
    //   document.body.classList.add('modal-open')
    // );

    // document.body.classList.add('modal-open')
    this.idle.onTimeoutWarning.subscribe(
      (countdown) =>
        (this.idleState =
          'Are you still here? This is a timeout message.  The login screen will happen in ' +
          countdown +
          ' seconds.')
    );

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
