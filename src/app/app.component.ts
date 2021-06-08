import { Component } from '@angular/core';

import { MessageModalService } from './shared/components/message-modal/message-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 

  constructor(public messageModalService: MessageModalService) { }

}
