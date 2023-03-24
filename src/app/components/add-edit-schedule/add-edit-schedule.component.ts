import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Patient} from 'src/app/models/patient';
import {Schedule} from 'src/app/models/schedule';
import {PatientService} from 'src/app/services/patient.service';
import * as moment from 'moment'

import {ScheduleService} from '../../services/schedule.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddEditScheduleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.fb.group({
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      notes: [''],
      patient: [null, [Validators.required]],
    })
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
      this.operation = 'Edit ';
      this.getSchedule(id);
      return true;
    }
    return false;
  }

  getSchedule(id: number) {
    this.scheduleService.getScheduleById(id.toString()).then(data => {
      this.form.setValue({
        date: data.date ? new Date(data.date) : undefined,
        time: data.date ? new Date(data.date) : undefined,
        notes: data.notes,
        patient: data.pId,
      });
    })
  }

  getPatientList() {
    this.patientService.getAllPatients().subscribe((res) => {
      this.patientList = res;
    })
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
        this.openSnackBar(res);
      })
    } else {
      schedule.id = this.id;
      this.scheduleService.patchSchedule(this.id!, schedule).then((res) => {
        this.openSnackBar(res);
      })
    }
  }

  openSnackBar(data: any) {
    console.log(data)
    this.snackBar.open(`Informacion guardada correctamente ${data.changedRows}`, 'Cerrar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
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

}
