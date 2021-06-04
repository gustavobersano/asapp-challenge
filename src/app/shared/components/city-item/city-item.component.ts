import { Component, Input, OnInit } from '@angular/core';

import { CityInfo } from '../../models/city-info';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent implements OnInit {
  @Input() city: CityInfo;

  constructor() { }

  ngOnInit() {
  }

}
