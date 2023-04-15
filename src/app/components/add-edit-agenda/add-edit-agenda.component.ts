import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../models/patient';
import { Agenda } from '../../models/agenda';
import { PatientService } from '../../services/patient.service';
import * as moment from 'moment'

import { AgendaService } from '../../services/agenda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditPatientComponent } from "../add-edit-patient/add-edit-patient.component";
import { ConsultationService } from '../../services/consultation.service';

@Component({
  selector: 'app-add-edit-agenda',
  templateUrl: './add-edit-agenda.component.html',
  styleUrls: ['./add-edit-agenda.component.scss']
})
export class AddEditAgendaComponent implements OnInit {
  form: FormGroup;
  id: number;
  operation: string = 'Agregar ';
  patientList: Patient[];
  minValue: Date;
  maxValue: Date;

  constructor(private agendaService: AgendaService,
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddEditAgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.fb.group({
      fecha: [null, [Validators.required]],
      time: [null, [Validators.required]],
      notes: [''],
      patient: [null, [Validators.required]],
    });

    this.form.get('patient')?.valueChanges.subscribe(value => {
      if (value === 'new-patient') {
        this.openAddEditPatientComponent();
      }
    });

    this.id = data.id;
    this.patientList = [];
    const minValue = new Date();
    minValue.setHours(8);
    minValue.setMinutes(0);
    this.minValue = minValue;

    const maxValue = new Date();
    maxValue.setHours(17);
    maxValue.setMinutes(0);
    this.maxValue = maxValue;
  }

  ngOnInit(): void {
    this.getPatientList();
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined): boolean {
    if (id !== undefined) {
      this.operation = 'Editar ';
      this.getAgenda(id);
      return true;
    }
    return false;
  }

  getAgenda(id: number) {
    this.agendaService.getAgendaById(id.toString()).then(data => {
      this.form.setValue({
        fecha: data[0].fecha ? new Date(data[0].fecha) : undefined,
        time: data[0].fecha ? new Date(data[0].fecha) : undefined,
        notes: data[0].notes,
        patient: data[0].pId,
      });
    }).catch((err) => {
      console.error(err);
    })
  }

  getPatientList(idCreated?: number) {
    this.patientService.getAllPatients().then((res) => {
      this.patientList = res.sort((a, b) => a.firstname.localeCompare(b.firstname));
    }).catch((err) => {
      console.error(err);
    });

    if (idCreated) {
      this.form.get('patient')?.setValue(idCreated);
    }
  }

  addEditAgenda() {
    if (this.form.invalid) {
      return;
    }

    const agenda: Agenda = {
      fecha: this.getFullDate(this.form.value.date, this.form.value.time),
      notes: this.form.value.notes || null,
      patientId: this.form.value.patient,
      userId: Number(localStorage.getItem('userId')),
      active: true,
    }

    if (!this.isEdit(this.id)) {
      this.agendaService.postAgenda(agenda).then((res) => {
        if (!res.message) {
          this.openSnackBar();
          this.closeDialog();
        } else {
          this.openSnackBar(res.message);
          this.closeDialog();
        }
      });
    } else {
      agenda.id = this.id;
      this.agendaService.patchAgenda(this.id!, agenda).then((res) => {
        if (!res.message) {
          this.openSnackBar();
          this.closeDialog();
        } else {
          this.openSnackBar(res.message);
          this.closeDialog();
        }
      })
    }
  }

  openSnackBar(mensaje?: string) {
    this.snackBar.open(mensaje ? mensaje : `Informacion guardada correctamente!`, 'Cerrar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    });
  }

  getFullDate(fecha: Date, time: Date): string {
    const fechaString = `${fecha.toLocaleDateString('en-US')} ${time.toLocaleTimeString('en-GB')}`;
    const [month, day, year, hour, minutes, seconds] = fechaString.split(/\D/).map(Number);

    return moment(new Date(year, month - 1, day, hour, minutes, seconds)).format("YYYY-MM-DD HH:mm:ss");
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private openAddEditPatientComponent() {
    const dialogRef = this.dialog.open(AddEditPatientComponent, {
      width: '550px',
      disableClose: true,
      data: { id: undefined },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPatientList(result.patient.id);
    });
  }
}
