import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { AddEditScheduleComponent } from '../add-edit-schedule/add-edit-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'appointmentDate', 'patient', 'notes'];
  dataSource!: MatTableDataSource<Schedule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.scheduleService.getAllActiveSchedule().subscribe((res) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditAppointment(id?: number) {
    const dialogRef = this.dialog.open(AddEditScheduleComponent, {
      width: '60%',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    })
  }
}
