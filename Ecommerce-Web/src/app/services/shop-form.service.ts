import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until the last month

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" dropdown list
    // - start at current year and loop until the next 10 years    

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;


    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);    // the of operator from rxjs will wrap an object as an observable
  }
}
