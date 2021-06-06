import { Component } from '@angular/core';
import { MessageModalService } from './message-modal.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {

  constructor(public messageModalService: MessageModalService) { }

  close(): void {
    this.messageModalService.hide();
  }
}
