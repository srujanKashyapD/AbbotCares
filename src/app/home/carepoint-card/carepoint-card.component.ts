import { Component, Input, OnInit } from '@angular/core';
import { CustomerData } from '../models/cutomer-data.model';

@Component({
  selector: 'app-carepoint-card',
  templateUrl: './carepoint-card.component.html',
  styleUrls: ['./carepoint-card.component.css'],
})
export class CarepointCardComponent implements OnInit {
  @Input() customerData: CustomerData;

  constructor() {}

  ngOnInit(): void {
  }
}
