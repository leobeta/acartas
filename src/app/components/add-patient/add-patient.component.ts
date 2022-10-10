import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  form: FormGroup;
  id: number | undefined;
  operation: string = 'Add '

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.maxLength(20)]],
      dob: [null, [Validators.required]],
      nationality: [''],
      residenceCountry: [''],
      locality: [''],
      occupation: [''],
      telephone: [''],
      email: ['', [Validators.email]],
    });
    this.id = data.id
  }

  ngOnInit(): void {
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operation = 'Edit ';
      this.getPatient(id);
    }
  }

  getPatient(id: number) {
    this.patientService.getPatientById(id.toString()).subscribe(data => {
      console.log(data.id);
      this.form.setValue({
        firstname: data.firstname,
        lastname: data.lastname,
        dob: data.dob,
        nationality: data.nationality,
        residenceCountry: data.residenceCountry,
        locality: data.locality,
        occupation: data.occupation,
        telephone: data.telephone,
        email: data.email,
      })
    })
  }

  addPatient() {
    if (this.form.invalid) {
      return;
    }
    const patient: Patient = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      dob: this.form.value.dob.toISOString().slice(0, 10),
      nationality: this.form.value.nationality || null,
      residenceCountry: this.form.value.residenceCountry || null,
      locality: this.form.value.locality || null,
      occupation: this.form.value.occupation || null,
      email: this.form.value.email || null,
      active: true
    }
    this.patientService.postPatient(patient).subscribe((res) => {
      console.log(res);
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
