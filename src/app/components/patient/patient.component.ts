import { Component, OnInit, ViewChild } from '@angular/core';

import { AddPatientComponent } from '../add-patient/add-patient.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private patientService: PatientService) { }

  ngOnInit(): void {
    this.configureTable();
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  configureTable() {
    this.displayedColumns = ['id', 'name', 'dob', 'nationality', 'actions'];
  }

  getData() {
    this.patientService.getAllPatients().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
    });

    // this.patientService.getPatientById('1').subscribe((res) => {
    //   console.log(res)
    // })
  }

  addEditPatient(id?: number) {
    const dialogRef = this.dialog.open(AddPatientComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  deletePatient(id: number) {
    console.log('Delete patient ' + id);
    this.patientService.deletePatient(id).subscribe(() => {
      this.getData();
    })
  }
}
