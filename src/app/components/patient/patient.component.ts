import {Component, OnInit, ViewChild} from '@angular/core';

import {AddEditPatientComponent} from '../add-edit-patient/add-edit-patient.component';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Patient} from '../../models/patient';
import {PatientService} from '../../services/patient.service';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

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

  @ViewChild('activePaginator') activePaginator!: MatPaginator;
  @ViewChild('inactivePaginator') inactivePaginator!: MatPaginator;
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
    this.activePatients = [];
    this.inactivePatients = [];
    this.patientService.getAllPatients().then((res: Patient[]) => {
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

  patientStatusChange(patient: Patient) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: `Seguro que desea borrar el paciente ${patient.firstname} ${patient.lastname}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if (patient.id != null) {
          this.patientService.deletePatient(patient.id).then(() => {
            this.getData();
          }).catch((err) => {
            console.error(err);
          });
        }
      }
    });
  }

  deletePatient(patient: Patient) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: `Seguro que desea borrar el paciente ${patient.firstname} ${patient.lastname}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if (patient.id != null) {
          this.patientService.deletePatient(patient.id).then(() => {
            this.getData();
          }).catch((err) => {
            console.error(err);
          });
        }
      }
    });
  }
}
