import {Component, OnInit} from '@angular/core';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {
    const app = initializeApp(firebaseConfig)
  }
  title = 'app1';
  rate: number = 1100;
  rateAmount: number = 100000;
  amount: number = 1000000;
  monthlyPayment: number = 200000;
  arr: any | undefined = [{month: 0, remain: 0, intrest: 0, bulk: 0, monthly: 0}]
  percentage = 0;
  totalIntrest = 0

  calculate() {
    this.arr = []
    let intrest = this.amount * this.percentage / 100;
    let months = 1;
    this.arr[0] = {month: months, remain: this.amount, intrest, bulk: 0, monthly: this.monthlyPayment}
    let amount = this.amount - (this.monthlyPayment - intrest)
    while (amount > 0) {
      intrest = parseFloat((amount * this.percentage / 100).toFixed(2));
      this.arr.push({month: months, remain: amount, intrest, bulk: 0, monthly: this.monthlyPayment})
      amount = parseFloat((amount - (this.monthlyPayment - intrest)).toFixed(2));
      months++
    }
    this.totalIntrest = this.arr.reduce((previousValue: any, currentValue: { intrest: any; }) => previousValue + currentValue.intrest, 0)
  }

  recal() {
    let tempArr = []
    for (let i = 0; i < this.arr.length; i++) {
      if (i != 0) {
        if (this.arr[i - 1].remain < 0) {
          this.arr = tempArr;
          this.totalIntrest = tempArr.reduce((previousValue, currentValue) => previousValue + currentValue.intrest, 0)
          return;
        }
        this.arr[i].remain = parseFloat((this.arr[i - 1].remain - (this.arr[i - 1].bulk + (this.monthlyPayment - this.arr[i - 1].intrest))).toFixed(2))
        this.arr[i].intrest = parseFloat((this.arr[i].remain * this.percentage / 100).toFixed(2))
      }
      tempArr.push(this.arr[i]);
    }
    this.arr = tempArr;
    this.totalIntrest = tempArr.reduce((previousValue, currentValue) => previousValue + currentValue.intrest, 0)
  }

  ngOnInit(): void {
    this.percentage = parseFloat(((this.rate / this.rateAmount) * 100).toFixed(2));
  }
}
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0g-MyBdnR89lx5N0PHqSaFfeVWapR7O0",
  authDomain: "speedloan-8f3f0.firebaseapp.com",
  projectId: "speedloan-8f3f0",
  storageBucket: "speedloan-8f3f0.firebasestorage.app",
  messagingSenderId: "116998751373",
  appId: "1:116998751373:web:1f28f9ecce47152e978ec4"
};

// Initialize Firebase
