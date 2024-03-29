import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.scss']
})
export class AddEditPatientComponent implements OnInit {

  form: FormGroup;
  id: number;
  operation: string = 'Agregar ';

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditPatientComponent>,
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
      this.operation = 'Editar ';
      this.getPatient(id);
      return true;
    }
    return false;
  }

  getPatient(id: number) {
    this.patientService.getPatientById(id).then((data) => {
      this.form.setValue({
        firstname: data.firstname,
        lastname: data.lastname,
        dob: data.dob ? new Date(data.dob) : undefined,
        nationality: data.nationality,
        residenceCountry: data.residenceCountry,
        locality: data.locality,
        occupation: data.occupation,
        telephone: data.telephone,
        email: data.email,
      })
    }).catch((err) => {
      console.error(err);
    });
  }

  addEditPatient() {
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
      telephone: this.form.value.telephone || null,
      email: this.form.value.email || null,
      active: true
    }
    if (!this.isEdit(this.id)) {
      this.patientService.postPatient(patient).then((res) => {
        this.openSnackBar();
        this.closeDialog(res);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      patient.id = this.id;
      this.patientService.patchPatient(patient).then((res) => {
        this.openSnackBar();
        this.closeDialog(res);
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  openSnackBar() {
    this.snackBar.open(`Informacion guardada correctamente!`, 'Cerrar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  closeDialog(data: any) {
    this.dialogRef.close(data);
  }
}
