import { Injectable } from '@angular/core';
import { OfferItem, OfferPhoto } from '../../shared/models/offeritem.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Massage } from '../../shared/models/massage.model';
import { Statuate } from '../../shared/models/statuate.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  info() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(`/mod/test123`, {headers})
  }

  addMassage(item : Massage) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(`/mod/massage`, item, { headers })
  }

  editMassage(item : Massage) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put(`/mod/massage`, item, { headers })
  }

  addOffer(item : OfferItem) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(`/mod/offer`, item, { headers })
  }

  editOffer(item : OfferItem, id : number | undefined) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put(`/mod/offer/${id}`, item, { headers })
  }

  deleteOffer(id : number) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(`/mod/offer/${id}`, { headers })
  }

  deleteMassage(id : number) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(`/mod/massage/${id}`, { headers })
  }

  addOfferPhoto(offerPhoto: OfferPhoto) {
    debugger
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(`/guest/offer-photo`, offerPhoto, {headers})
  }

  editOfferPhoto(offerPhoto: OfferPhoto, id? : number) {
    debugger
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put(`/guest/offer-photo/${id}`, offerPhoto, {headers})
  }

  deleteOfferPhoto(id? : number) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(`/guest/offer-photo/${id}`, {headers})
  }



  addStatuate(statuate : Statuate) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(`/mod/statuate`, statuate, { headers })
  }

  editStatuate(statuate : Statuate) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put(`/mod/statuate`, statuate, { headers })
  }
  
  getAllOfferPhoto() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<OfferPhoto[]>(`/guest/offer-photo/all`, { headers })
  }
}
