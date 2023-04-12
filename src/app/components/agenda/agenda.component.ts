import { Component, OnInit, ViewChild } from '@angular/core';

import { AddEditScheduleComponent } from '../add-edit-schedule/add-edit-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Schedule } from '../../models/schedule';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'appointmentDate', 'patient', 'notes', 'status', 'actions'];
  dataSourceActive!: MatTableDataSource<Schedule>;
  dataSourcePast!: MatTableDataSource<Schedule>;
  dataSourceCancelled!: MatTableDataSource<Schedule>;
  activeSchedules: Schedule[] = [];
  pastSchedules: Schedule[] = [];
  cancelledSchedules: Schedule[] = [];


  @ViewChild('activePaginator') activePaginator!: MatPaginator;
  @ViewChild('pastPaginator') pastPaginator!: MatPaginator;
  @ViewChild('cancelledPaginator') cancelledPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.scheduleService.getAllSchedule().then((res: any) => {
      this.activeSchedules = [];
      this.pastSchedules = [];
      this.cancelledSchedules = [];
      const now = new Date();
      res.forEach((schedule: any) => {
        if (schedule.sActive) {
          if (new Date(schedule.date) >= now) {
            this.activeSchedules.push(schedule);
          } else {
            this.pastSchedules.push(schedule);
          }
        } else {
          this.cancelledSchedules.push(schedule);
        }
      });

      this.dataSourceActive = new MatTableDataSource(this.activeSchedules);
      this.dataSourceActive.paginator = this.activePaginator;
      this.dataSourceActive.sort = this.sort;

      this.dataSourcePast = new MatTableDataSource(this.pastSchedules);
      this.dataSourcePast.paginator = this.pastPaginator;
      this.dataSourceActive.sort = this.sort

      this.dataSourceCancelled = new MatTableDataSource(this.cancelledSchedules);
      this.dataSourceCancelled.paginator = this.cancelledPaginator;
      this.dataSourceCancelled.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActive.filter = filterValue.trim().toLowerCase();
    this.dataSourcePast.filter = filterValue.trim().toLowerCase();
    this.dataSourceCancelled.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceActive.paginator) {
      this.dataSourceActive.paginator.firstPage();
    }

    if (this.dataSourcePast.paginator) {
      this.dataSourcePast.paginator.firstPage();
    }

    if (this.dataSourceCancelled.paginator) {
      this.dataSourceCancelled.paginator.firstPage();
    }
  }

  addEditAppointment(id?: number) {
    const dialogRef = this.dialog.open(AddEditScheduleComponent, {
      width: '30%',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    })
  }

  deleteAppointment(id: number) {
    this.scheduleService.deleteSchedule(id).then(() => {
      this.getData();
    })
      .catch((err) => {
        console.error(err);
      })
  }

  activeAppointment(sId: any) {

  }
}
