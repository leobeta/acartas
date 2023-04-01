import {Component, OnInit, ViewChild} from '@angular/core';

import {AddEditPatientComponent} from '../add-edit-patient/add-edit-patient.component';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Patient} from 'src/app/models/patient';
import {PatientService} from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'dob', 'nationality', 'actions'];
  dataSourceActive!: MatTableDataSource<Patient>;
  dataSourceInactive!: MatTableDataSource<Patient>;
  activePatients: Patient[] = [];
  inactivePatients: Patient[] = [];

  @ViewChild(MatPaginator) activePaginator!: MatPaginator;
  @ViewChild(MatPaginator) inactivePaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActive.filter = filterValue.trim().toLowerCase();
    this.dataSourceInactive.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceActive.paginator) {
      this.dataSourceActive.paginator.firstPage();
    }

    if (this.dataSourceInactive.paginator) {
      this.dataSourceInactive.paginator.firstPage();
    }
  }

  getData() {
    this.patientService.getAllPatients().subscribe((res) => {
      res.forEach((patient: Patient) => {
        if (patient.active) {
          this.activePatients.push(patient);
        } else {
          this.inactivePatients.push(patient);
        }
      });

      this.dataSourceActive = new MatTableDataSource(this.activePatients);
      this.dataSourceActive.paginator = this.activePaginator;
      this.dataSourceActive.sort = this.sort;

      this.dataSourceInactive = new MatTableDataSource(this.inactivePatients)
      this.dataSourceInactive.paginator = this.inactivePaginator;
      this.dataSourceInactive.sort = this.sort;
    });
  }

  addEditPatient(id?: number) {
    const dialogRef = this.dialog.open(AddEditPatientComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe(() => {
      this.getData();
    })
  }
}
