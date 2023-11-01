import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dzien} from "../shared/models/dzien";
import {LoginSuccessData} from "../shared/models/loginsuccess.model";
import {Day} from "../shared/models/day";

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.scss']
})
export class CalComponent implements OnInit {
  dni: Dzien[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<LoginSuccessData>('http://localhost:8080/guest/c80f2044-78ec-11ee-b962-0242ac120002').subscribe(data => {
      const dzisiaj = new Date(data.token);
      this.ustawTydzien(dzisiaj);

      this.http.get<Day[]>('http://localhost:8080/guest/calendar/2023-10-30').subscribe(jsonData => {
        this.przypiszDane(jsonData);
      });
    });
  }

  przypiszDane(dane: Day[]) {
    dane.forEach(dzienDanych => {
      const dzienKalendarza = this.dni.find(d => {
        const dataKalendarza = new Date(d.data);
        const dataDanych = new Date(dzienDanych.localDate);
        return dataKalendarza.toDateString() === dataDanych.toDateString();
      });

      if (dzienKalendarza) {
        dzienDanych.usersDTOList.forEach(userDTO => {
          const godzina = parseInt(userDTO.localTime.split(':')[0], 10);
          dzienKalendarza.rezerwacje[godzina] = userDTO;
        });
      }
    });
  }

  ustawTydzien(dzisiaj: Date) {
    const dzienTygodnia = dzisiaj.getDay();
    console.log(dzienTygodnia);
    const poniedzialek = new Date(dzisiaj);
    poniedzialek.setDate(dzisiaj.getDate() - (dzienTygodnia === 0 ? 6 : dzienTygodnia - 1));

    for (let i = 0; i < 5; i++) { // Dla dni od poniedziałku do piątku
      const dzien = new Dzien(new Date(poniedzialek));
      dzien.data.setDate(poniedzialek.getDate() + i);
      this.dni.push(dzien);

      // Przypisujemy godziny
      for (let h = 10; h <= 22; h++) {
        dzien.godziny.push(h);
      }
    }
  }
}
