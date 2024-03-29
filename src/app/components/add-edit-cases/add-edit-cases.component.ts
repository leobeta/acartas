import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Consultation } from '../../models/consultation';
import { ConsultationService } from '../../services/consultation.service';
import { Patient } from "../../models/patient";
import { PatientService } from "../../services/patient.service";

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
  enableBasicField = true;
  reasonControl: any;

  constructor(
    private consultationService: ConsultationService,
    private patientService: PatientService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditCasesComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      consultationDate: [null, [Validators.required]],
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
    this.reasonControl = this.form.get('reason');

    this.reasonControl.valueChanges.subscribe((value: string) => {
      if (value !== null && value.length > 5000) {
        this.reasonControl.setValue(value.substring(0, 5000), { emitEvent: false });
      }
    })
  }

  isEdit(id: number | undefined): boolean {
    if (id !== undefined) {
      this.operation = 'Editar ';
      this.getCase(id);
      this.enableBasicField = false;
      return true;
    }
    return false;
  }

  getCase(id: number) {
    this.consultationService.getConsultationById(id).then(data => {
      const consultationData: Consultation = data;
      this.patientService.getPatientById(consultationData.idPatient).then(patient => {
      }).catch((err) => {
        console.error(err);
      });
      this.form.setValue({
        consultationDate: consultationData.consultationDate ? new Date(consultationData.consultationDate) : undefined,
        idPatient: consultationData.idPatient,
        idUser: consultationData.idUser,
        reason: consultationData.reason,
        topic: consultationData.topic,
        systemicDynamics: consultationData.systemicDynamics,
        solution: consultationData.solution,
      });
    });
  }

  getPatientList() {
    this.patientService.getAllPatients().then((res) => {
      this.patientList = res;
    }).catch((err) => {
      console.error(err);
    });
  }

  public addEditConsultation() {
    if (this.form.invalid) {
      return;
    }
    const consultation: Consultation = {
      consultationDate: this.form.value.consultationDate.toISOString().slice(0, 10),
      idPatient: this.form.value.idPatient,
      idUser: this.form.value.idUser,
      reason: this.form.value.reason,
      topic: this.form.value.topic,
      systemicDynamics: this.form.value.systemicDynamics,
      solution: this.form.value.solution,
      active: true,
    }
    if (!this.isEdit(this.id)) {
      this.consultationService.postConsultation(consultation).then((res) => {
        this.openSnackBar(res);
        this.closeDialog(res);
      })
    } else {
      consultation.id = this.id;
      this.consultationService.patchConsultation(consultation).then((res) => {
        this.openSnackBar(res);
        this.closeDialog(res);
      })
    }
  }

  openSnackBar(data: any) {
    this.snackBar.open(`Informacion guardada correctamente.`, 'Cerrar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  closeDialog(data: any) {
    this.dialogRef.close(data);
  }

}
