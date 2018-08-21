import {Component, ViewEncapsulation, NgZone} from '@angular/core';

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

  constructor(private zone: NgZone) {
    this.apiKey = '46171312';
    this.sessionId = '1_MX40NjE3MTMxMn5-MTUzNDMxOTg1MTUwN35zdmtveDc5ZG1heitxUU5Ra3FYZzg0VVF-fg';
    this.token = 'T1==cGFydG5lcl9pZD00NjE3MTMxMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9YzNjNTMzMjA5NWFjODA5YTYxZDQ3NmRhNmZlZDBjYzhlZjMzMzcyMzpzZXNzaW9uX2lkPTFfTVg0ME5qRTNNVE14TW41LU1UVXpORE14T1RnMU1UVXdOMzV6ZG10dmVEYzVaRzFoZWl0eFVVNVJhM0ZZWnpnMFZWRi1mZyZjcmVhdGVfdGltZT0xNTM0MzE5ODUxJnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1MzQzMTk4NTEuNTIyNjExNjg0NzgyNjcmZXhwaXJlX3RpbWU9MTUzNjkxMTg1MQ==';
  }

  leaveRoom() {
    this.session.disconnect();
    this.roomJoined = false;
  }

  joinRoom() {
    this.session = OT.initSession(this.apiKey, this.sessionId);

    this.session.on({
      streamCreated: (event) => {
        this.session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append'
        });
      },
      streamDestroyed: () => {
      }
    });

    this.session.connect(this.token, () => {
      this.publisher = OT.initPublisher('publisher');
      this.session.publish(this.publisher);
      this.zone.run(() => this.roomJoined = true);
    });
  }
}
