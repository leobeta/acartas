import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule';

import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-add-edit-schedule',
  templateUrl: './add-edit-schedule.component.html',
  styleUrls: ['./add-edit-schedule.component.scss']
})
export class AddEditScheduleComponent implements OnInit {
  form: FormGroup;
  id: number;
  operation: string = 'Create ';

  constructor(
    private scheduleService: ScheduleService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      appointmentDate: [null, [Validators.required]],
      notes: [''],
      patient: [null, [Validators.required]],
    })
    this.id = data.id;
  }

  ngOnInit(): void {
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
    this.scheduleService.getScheduleById(id.toString()).subscribe(data => {
      this.form.setValue({
        appointmentDate: data[0].appointmentDate ? new Date(data[0].appointmentDate) : undefined,
        notes: data[0].notes,
        patient: data[0].patient,
      });
    })
  }

  addEditPatient() {
    if (this.form.invalid) {
      return;
    }

    const schedule: Schedule = {
      appointmentDate: this.form.value.appointmentDate.toISOString().slice(0, 10),
      notes: this.form.value.notes || null,
      patient: this.form.value.patient,
    }

    if (!this.isEdit(this.id)) {
      this.scheduleService.postSchedule(schedule).subscribe((res) => {
        console.log(res);
      })
    } else {
      schedule.id = this.id;
      this.scheduleService.patchSchedule(this.id!, schedule).subscribe((res) => {
        console.log(res);
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
