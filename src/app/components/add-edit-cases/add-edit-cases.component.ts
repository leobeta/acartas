import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Consultation} from 'src/app/models/consultation';
import {ConsultationService} from 'src/app/services/consultation.service';
import {Patient} from "../../models/patient";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-add-edit-cases',
  templateUrl: './add-edit-cases.component.html',
  styleUrls: ['./add-edit-cases.component.scss']
})
export class AddEditCasesComponent implements OnInit {

  form: FormGroup;
  id: number;
  operation: String = 'Agregar ';
  patientList: Patient[];
  userId: string | null;

  constructor(
    private consultationService: ConsultationService,
    private patientService: PatientService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditCasesComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      consultationDate: [null, [Validators.required]],
      appointmentDate: [null, [Validators.required]],
      idPatient: ['', [Validators.required]],
      idUser: ['', [Validators.required]],
      reason: [''],
      topic: [''],
      systemicDynamics: [''],
      solution: [''],
    });
    this.id = data.id;
    this.patientList = [];
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit(): void {
    this.getPatientList();
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined): boolean {
    if (id !== undefined) {
      this.operation = 'Editar ';
      this.getCase(id);
      return true;
    }
    return false;
  }

  getCase(id: number) {
    this.consultationService.getConsultationById(id.toString()).subscribe(data => {
      this.form.setValue({
        consultationDate: data.consultationDate ? new Date(data.consultationDate) : undefined,
        appointmentDate: data.appointmentDate ? new Date(data.appointmentDate) : undefined,
        idPatient: data.idPatient,
        idUser: data.idUser,
        reason: data.reason,
        topic: data.topic,
        systemicDynamics: data.systemicDynamics,
        solution: data.solution,
      })
    })
  }

  getPatientList() {
    this.patientService.getAllPatients().subscribe((res) => {
      this.patientList = res;
    })
  }

  addEditConsultation() {
    if (this.form.invalid) {
      return;
    }
    const consultation: Consultation = {
      consultationDate: this.form.value.consultationDate.toISOString().slice(0, 10),
      appointmentDate: this.form.value.toISOString().slice(0, 10),
      idPatient: this.form.value.idPatient,
      idUser: this.form.value.idUser,
      reason: this.form.value.reason,
      topic: this.form.value.topic,
      systemicDynamics: this.form.value.systemicDynamics,
      solution: this.form.value.solution,
      active: true,
    }
    if (!this.isEdit(this.id)) {
      this.consultationService.postConsultation(consultation).subscribe((res) => {
        this.openSnackBar(res);
        this.closeDialog(res);
      })
    } else {
      consultation.id = this.id;
      this.consultationService.patchConsultation(this.id!, consultation).subscribe((res) => {
        this.openSnackBar(res);
        this.closeDialog(res);
      })
    }
  }

  openSnackBar(data: any) {
    this.snackBar.open(data, 'Splash', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  closeDialog(data: any) {
    this.dialogRef.close(data);
  }

}
