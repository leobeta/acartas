import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {ConsultationService} from "../../services/consultation.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'add-edit-observation',
  templateUrl: './add-edit-observation.html',
  styleUrls: ['./add-edit-observation.sass']
})

export class AddEditObservation implements OnInit {
  form: FormGroup;
  operation: string = 'Agregar ';
  constructor(private consultationService: ConsultationService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    console.log('component loaded');
  }

  addEditObservation() {
    console.log('addEditObservation');
  }
}
