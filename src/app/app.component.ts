import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DecimalPipe]
})
export class AppComponent implements OnInit {
  title = 'app1';
  rate: number = 1100;
  rateAmount: number = 100000;
  amount: number = 1000000;
  monthlyPayment: number = 200000;
  arr: any = [{ month: 0, remain: 0, intrest: 0, bulk: null, monthly: 0 }];
  percentage = 0;
  totalIntrest = 0;
  totalIntrestVal = 0;

  constructor(private decimalPipe: DecimalPipe) {}

  formatNumber(value: number): string {
    return this.decimalPipe.transform(value, '1.0-0') || '';
  }

  parseNumber(value: string): number {
    const clean = value.replace(/,/g, '');
    return clean ? parseFloat(clean) : 0;
  }

  roundNumber(value: number): number {
    return Math.round(value);
  }

  calculate() {
    this.arr = [];
    this.percentage = parseFloat(((this.rate / this.rateAmount) * 100).toFixed(2));
    let intrest = this.amount * this.percentage / 100;
    let months = 1;
    this.arr[0] = { month: months, remain: this.amount, intrest, bulk: null, monthly: this.monthlyPayment };
    let amount = this.amount - (this.monthlyPayment - intrest);
    while (amount > 0) {
      intrest = parseFloat((amount * this.percentage / 100).toFixed(2));
      this.arr.push({ month: months, remain: amount, intrest, bulk: null, monthly: this.monthlyPayment });
      amount = parseFloat((amount - (this.monthlyPayment - intrest)).toFixed(2));
      months++;
    }
    this.totalIntrest = this.arr.reduce((prev: any, curr: { intrest: any; }) => prev + curr.intrest, 0);
  }

  recal() {
    const tempArr = [];
    for (let i = 0; i < this.arr.length; i++) {
      if (i !== 0) {
        if (this.arr[i - 1].remain < 0) {
          this.arr = tempArr;
          this.totalIntrest = tempArr.reduce((prev, curr) => prev + curr.intrest, 0);
          return;
        }
        this.arr[i].remain = parseFloat((
            this.arr[i - 1].remain - (this.arr[i - 1].bulk + (this.monthlyPayment - this.arr[i - 1].intrest))
        ).toFixed(2));
        this.arr[i].intrest = parseFloat((this.arr[i].remain * this.percentage / 100).toFixed(2));
      }
      tempArr.push(this.arr[i]);
    }
    this.arr = tempArr;
    this.totalIntrest = tempArr.reduce((prev, curr) => prev + curr.intrest, 0);
  }

  ngOnInit(): void {
    this.percentage = parseFloat(((this.rate / this.rateAmount) * 100).toFixed(2));
  }
}
