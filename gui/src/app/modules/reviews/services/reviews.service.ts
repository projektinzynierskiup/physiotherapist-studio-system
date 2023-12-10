import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewsPage } from '../../shared/models/reviewspage.model';
import { Review } from '../../shared/models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private baseUrl = 'http://localhost:8080/guest/opinion'; // adres URL do API

  constructor(private http: HttpClient) { }

  getOpinions(page: number): Observable<ReviewsPage> {
    return this.http.get<ReviewsPage>(`${this.baseUrl}/${page}`);
  }

  createOpinion(opinionDTO: Review): Observable<string> {
    return this.http.post<string>(this.baseUrl, opinionDTO);
  }
}