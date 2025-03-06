import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaxData } from '../models/tax-data.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  taxData: TaxData | undefined;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.taxData = navigation?.extras.state?.taxData;
  }

  ngOnInit(): void {
  }

  getMonthName(month: string): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = parseInt(month, 10) - 1;
    return monthNames[monthIndex] || '';
  }

  onConfirm() {
    alert(JSON.stringify(this.taxData, null, 2));
  }
}
