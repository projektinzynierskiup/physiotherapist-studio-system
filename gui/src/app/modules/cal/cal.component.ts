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
    this.pobierzDaneTygodnia(new Date());
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
    const poniedzialek = new Date(dzisiaj);
    poniedzialek.setDate(dzisiaj.getDate() - (dzienTygodnia === 0 ? 6 : dzienTygodnia - 1));

    for (let i = 0; i < 7; i++) {
      const dzien = new Dzien(new Date(poniedzialek));
      dzien.data.setDate(poniedzialek.getDate() + i);
      this.dni.push(dzien);

      for (let h = 10; h <= 22; h++) {
        dzien.godziny.push(h);
      }
    }
  }

  pobierzDaneTygodnia(tydzien: Date) {
    const formattedDate = this.formatujDate(tydzien);
    this.http.get<Day[]>(`http://localhost:8080/guest/calendar/${formattedDate}`).subscribe(jsonData => {
      this.dni = []; // Wyczyszczamy aktualne dni
      this.ustawTydzien(tydzien);
      this.przypiszDane(jsonData);
    });
  }

  przewinTydzien(liczbaTygodni: number) {
    const aktualnyTydzien = this.dni[0].data;
    aktualnyTydzien.setDate(aktualnyTydzien.getDate() + liczbaTygodni * 7);
    this.pobierzDaneTygodnia(aktualnyTydzien);
  }

  formatujDate(data: Date): string {
    const year = data.getFullYear();
    const month = (data.getMonth() + 1).toString().padStart(2, '0');
    const day = data.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
