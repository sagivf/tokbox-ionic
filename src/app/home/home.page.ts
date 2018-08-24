import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import * as TB from '@opentok/client'; // code doesn't work in cordova version
import {Platform} from '@ionic/angular';
import {environment} from '../../environments/environment';

declare var OT: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  session: any;
  publisher: any;
  apiKey: any;
  sessionId: string;
  token: string;
  roomJoined = false;
  joinCount = 0;

  constructor(private zone: NgZone,
              private platform: Platform) {
    this.apiKey = environment.apiKey;
    this.sessionId = environment.sessionId;
    this.token = environment.token;
    if (!OT) {
      OT = TB;
    }
  }

  leaveRoom() {
    this.session.disconnect();
    this.roomJoined = false;
  }

  joinRoom() {
    const isDevice = this.platform.is('cordova') && !this.platform.is('core');
    this.session = OT.initSession(this.apiKey, this.sessionId);

    this.session.on({
      streamCreated: (event) => {
        this.zone.run(() => this.joinCount++);
        this.session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append'
        });

        if (isDevice) {
          (<any>OT).updateViews();
        }
      },
      streamDestroyed: () => {
        this.zone.run(() => this.joinCount--);

        if (isDevice) {
          (<any>OT).updateViews();
        }
      }
    });

    this.session.connect(this.token, () => {
      this.publisher = OT.initPublisher('publisher');
      this.session.publish(this.publisher);
      this.zone.run(() => this.roomJoined = true);
    });
  }
}
