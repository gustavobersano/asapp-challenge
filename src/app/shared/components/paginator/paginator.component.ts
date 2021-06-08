import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NavigationLinks } from '../../models/navigation-links';

import { PaginatorOperationCodeConstants } from '../../constants/pagination-operation-code-constants';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() navigationLinks: NavigationLinks;
  @Input() total: number;
  @Output() onClickButton = new EventEmitter<string>();


  get paginatorOperationCodeConstants() {
    return PaginatorOperationCodeConstants;
  }

  constructor() { }

  onClick(operationCode: string): void {
    this.onClickButton.next(operationCode);
  }

}
