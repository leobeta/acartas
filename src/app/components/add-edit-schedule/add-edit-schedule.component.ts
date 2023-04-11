import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../models/patient';
import { Schedule } from '../../models/schedule';
import { PatientService } from '../../services/patient.service';
import * as moment from 'moment'

import { ScheduleService } from '../../services/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditPatientComponent } from "../add-edit-patient/add-edit-patient.component";
import { ConsultationService } from '../../services/consultation.service';
import { Consultation } from 'src/app/models/consultation';

@Component({
  selector: 'app-add-edit-schedule',
  templateUrl: './add-edit-schedule.component.html',
  styleUrls: ['./add-edit-schedule.component.scss']
})
export class AddEditScheduleComponent implements OnInit {
  form: FormGroup;
  id: number;
  operation: string = 'Agregar ';
  patientList: Patient[];
  minValue: Date;
  maxValue: Date;

  constructor(private scheduleService: ScheduleService,
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddEditScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.fb.group({
      date: [null, [Validators.required]],
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
      this.getSchedule(id);
      return true;
    }
    return false;
  }

  getSchedule(id: number) {
    this.scheduleService.getScheduleById(id.toString()).then(data => {
      this.form.setValue({
        date: data[0].date ? new Date(data[0].date) : undefined,
        time: data[0].date ? new Date(data[0].date) : undefined,
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

  addEditSchedule() {
    if (this.form.invalid) {
      return;
    }

    const schedule: Schedule = {
      date: this.getFullDate(this.form.value.date, this.form.value.time),
      notes: this.form.value.notes || null,
      patientId: this.form.value.patient,
      userId: Number(localStorage.getItem('userId')),
      active: true,
    }

    if (!this.isEdit(this.id)) {
      this.scheduleService.postSchedule(schedule).then((res) => {
        if (res) {
          this.consultationService.getConsultationByPatientId(Number(schedule.patientId)).then((cRes) => {
            if (res.size === 0) {
              const consultation: Consultation = {
                consultationDate: new Date(schedule.date),
                date: new Date(schedule.date),
                idPatient: Number(schedule.patientId),
                idUser: Number(localStorage.getItem('userId')),
                active: true
              }
              this.consultationService.postConsultation(consultation).then((resp) => {
                console.log(resp);
              })
                .catch((err) => {
                  console.error(err);
                })
            }
          })
          this.openSnackBar();
          this.closeDialog();
        } else {
          this.openSnackBar('No se puede crear cita por conflicto con otra cita');
        }
      });
    } else {
      schedule.id = this.id;
      this.scheduleService.patchSchedule(this.id!, schedule).then((res) => {
        this.openSnackBar();
        this.closeDialog();
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

  getFullDate(date: Date, time: Date): string {
    const dateString = `${date.toLocaleDateString('en-US')} ${time.toLocaleTimeString('en-GB')}`;
    const [month, day, year, hour, minutes, seconds] = dateString.split(/\D/).map(Number);

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
