import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  form: FormGroup;
  id: number;
  operation: string = 'Add '

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPatientComponent>,
    private snackBar: MatSnackBar,
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

  isEdit(id: number | undefined): boolean {
    if (id !== undefined) {
      this.operation = 'Edit ';
      this.getPatient(id);
      return true;
    }
    return false;
  }

  getPatient(id: number) {
    this.patientService.getPatientById(id.toString()).subscribe(data => {
      this.form.setValue({
        firstname: data[0].firstname,
        lastname: data[0].lastname,
        dob: data[0].dob ? new Date(data[0].dob) : undefined,
        nationality: data[0].nationality,
        residenceCountry: data[0].residenceCountry,
        locality: data[0].locality,
        occupation: data[0].occupation,
        telephone: data[0].telephone,
        email: data[0].email,
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
    if (!this.isEdit(this.id)) {
      this.patientService.postPatient(patient).subscribe((res) => {
        this.openSnackBar(res);
      })
    } else {
      patient.id = this.id;
      this.patientService.patchPatient(this.id!, patient).subscribe((res) => {
        this.openSnackBar(res);
      })
    }
  }

  openSnackBar(data: any) {
    this.snackBar.open(data, 'Splash', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
