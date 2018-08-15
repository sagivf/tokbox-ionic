import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';

declare var OT:any;
declare var Cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  session: any;
  publisher: any;
  apiKey: any;
  sessionId: string;
  token: string;
  // 60e42bff5a310be0f2254cfbc14a241c1817d237

  constructor(public navCtrl: NavController) {
    this.apiKey = '46171312';
    this.sessionId = '1_MX40NjE3MTMxMn5-MTUzNDMxOTg1MTUwN35zdmtveDc5ZG1heitxUU5Ra3FYZzg0VVF-fg';
    this.token = 'T1==cGFydG5lcl9pZD00NjE3MTMxMiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9YzNjNTMzMjA5NWFjODA5YTYxZDQ3NmRhNmZlZDBjYzhlZjMzMzcyMzpzZXNzaW9uX2lkPTFfTVg0ME5qRTNNVE14TW41LU1UVXpORE14T1RnMU1UVXdOMzV6ZG10dmVEYzVaRzFoZWl0eFVVNVJhM0ZZWnpnMFZWRi1mZyZjcmVhdGVfdGltZT0xNTM0MzE5ODUxJnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1MzQzMTk4NTEuNTIyNjExNjg0NzgyNjcmZXhwaXJlX3RpbWU9MTUzNjkxMTg1MQ==';
  }

  startCall() {
    alert('aaa')
    this.session = OT.initSession(this.apiKey, this.sessionId);

    alert('bbbb')
    this.session.on({
      streamCreated: (event) => {
        alert('ccc')
        this.session.subscribe(event.stream, 'subscriber');
        alert('dddd')
        OT.updateViews();
      },
      streamDestroyed: (event) => {
        console.log(`Stream ${event.stream.name} ended because ${event.reason}`);
        OT.updateViews();
      }
    });
    alert('111')
    this.session.connect(this.token, () => {
      alert('222')
      this.publisher = OT.initPublisher('publisher');
      this.session.publish(this.publisher);
    });
  }
}
