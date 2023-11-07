import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: NbToastrService) { }

  show(type: string, content: string, title: string, position: string, timeOut: number) {
    this.toastrService.show(title, content, {
      // @ts-ignore
      position: position,
      // @ts-ignore
      status: type,
      // @ts-ignore
      duration: timeOut
    });
  }
}