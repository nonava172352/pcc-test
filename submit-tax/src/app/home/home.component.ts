import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaxData } from '../models/tax-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }

  filingType: string = '0';
  surcharge: number = 0;
  penalty: number = 200.00;
  month: string = '';
  year: string = '';
  type: string = '';
  totalAmount: string = '0.00';

  months: { value: string, label: string }[] = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  years: string[] = [];
  currentYear: number;
  currentMonth: number;

  onFilingTypeChange() {
    if (this.filingType === '1') {
      this.surcharge = 0;
      this.penalty = 0;
    }
  }

  constructor(private router: Router) {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
    for (let year = 2020; year <= this.currentYear; year++) {
      this.years.push(year.toString());
    }
  }

  get filteredMonths(): { value: string, label: string }[] {
    if (this.year === this.currentYear.toString()) {
      return this.months.slice(0, this.currentMonth);
    }
    return this.months;
  }

  saleAmount: string = '';
  taxAmount: string = '';
  calculatedTax: number = 0;
  invalidTax: boolean = false;

  onSaleAmountChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/,/g, '');

    if (this.validateNumber(value)) {
      this.saleAmount = value;
      this.calculateTax();
    } else {
      input.value = this.formatCurrency(this.saleAmount);
    }
  }

  onSaleAmountBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = this.formatCurrency(this.saleAmount);
  }

  onTaxAmountChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/,/g, '');

    if (this.validateNumber(value)) {
      this.taxAmount = value;
      this.validateTaxRange();
      this.calculateSurcharge();
      this.calculateTotalAmount();
    } else {
      input.value = this.formatCurrency(this.taxAmount);
    }
  }

  onTaxAmountBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = this.formatCurrency(this.taxAmount);
  }

  private calculateTax() {
    const amount = parseFloat(this.saleAmount) || 0;
    this.calculatedTax = parseFloat((amount * 0.07).toFixed(3));
    this.taxAmount = this.calculatedTax.toFixed(2);
    this.calculateSurcharge();
    this.calculateTotalAmount();
  }

  private calculateSurcharge() {
    const taxAmount = parseFloat(this.taxAmount) || 0;
    this.surcharge = parseFloat((taxAmount * 0.1).toFixed(3));
  }

  private calculateTotalAmount() {
    const taxAmount = parseFloat(this.taxAmount) || 0;
    this.totalAmount = (taxAmount + this.surcharge + this.penalty).toFixed(2);
  }

  private validateTaxRange() {
    const enteredTax = parseFloat(this.taxAmount) || 0;
    const min = this.calculatedTax - 20;
    const max = this.calculatedTax + 20;
    this.invalidTax = enteredTax < min || enteredTax > max;
  }

  private validateNumber(value: string): boolean {
    return /^\d*\.?\d{0,2}$/.test(value);
  }

  private formatCurrency(value: string): string {
    return parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  onNext() {
    if (this.isValid()) {
      const taxData: TaxData = {
        filingType: this.filingType,
        month: this.month,
        year: this.year,
        saleAmount: parseFloat(this.saleAmount),
        taxAmount: parseFloat(this.taxAmount),
        surcharge: this.surcharge,
        penalty: this.penalty,
        totalAmount: parseFloat(this.totalAmount)
      };
      this.router.navigate(['/sve'], { state: { taxData } });
    } else {
      alert('Invalid Data');
    }
  }

  isValid(): boolean {
    return this.filingType !== '' && this.month !== '' && this.year !== '' && !this.invalidTax;
  }
}
