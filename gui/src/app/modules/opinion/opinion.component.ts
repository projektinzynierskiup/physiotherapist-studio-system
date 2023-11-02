import {Component, OnInit} from '@angular/core';
import {OpinionPage} from "../shared/models/opinion-page";
import {OpinionService} from "../shared/services/opinion.service";

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent implements OnInit{
  opinionPage: OpinionPage | undefined;

  constructor(private opinionService: OpinionService) { }

  ngOnInit(): void {
    this.getOpinions(0);
  }

  getOpinions(page: number): void {
    if (page < 0) {
      page = 0; // Ustaw stronę na 0, jeśli argument jest mniejszy niż 0
    }
    this.opinionService.getOpinions(page).subscribe({
      next: (data) => {
        this.opinionPage = data;
        console.log(this.opinionPage);
      },
      error: (e) => console.error(e)
    });
  }

  submitOpinion(formValue: any): void {
    this.opinionService.createOpinion(formValue).subscribe(
      response => {
        this.ngOnInit();
        console.log(response);
        },
      error => {
        console.error(error);
      }
    );
  }
}
