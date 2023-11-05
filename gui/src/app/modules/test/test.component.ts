import {Component, OnInit} from '@angular/core';
import {OpinionService} from "../shared/services/opinion.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
  opinionForm: FormGroup;
  constructor(private opinionService: OpinionService,
              private fb: FormBuilder) {
    this.createForm();
    this.opinionForm = this.fb.group({
      username: ['', Validators.required],
      description: [''],
      rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {}


  createForm() {
    this.opinionForm = this.fb.group({
      username: ['', Validators.required], // Pole wymagane
      description: [''],
      rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit() {
      const opinionDTO = {
        username: this.opinionForm.value.username,
        description: this.opinionForm.value.description,
        rate: this.opinionForm.value.rate
      };

      this.opinionService.createOpinion(opinionDTO).subscribe({
        next: (response) => {
          // Tutaj możesz zrobić coś z odpowiedzią, np. pokazać komunikat o sukcesie
          console.log('Opinia została wysłana:', response);
        },
        error: (error) => {
          // Tutaj obsługa błędu, np. pokazać komunikat o błędzie
          console.error('Wystąpił błąd:', error);
        }
      });
    }

}
