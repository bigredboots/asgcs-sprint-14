import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from './common/global-constants';
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
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

  idleState = "Not started.";
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
    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => (this.idleState = "No longer idle."));
    this.idle.onTimeout.subscribe(() => {
      this.idleState = "Timed out!";
      this.timedOut = true;
    });
    this.idle.onIdleStart.subscribe(
      () => (this.idleState = "You've gone idle!")
    );
    this.idle.onTimeoutWarning.subscribe(
      countdown =>
        (this.idleState = "You will time out in " + countdown + " seconds!")
    );
    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = "Started.";
    this.timedOut = false;
  }
  }
}
