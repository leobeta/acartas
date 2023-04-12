import { Component, OnInit, ViewChild } from '@angular/core';

import { AddEditCasesComponent } from '../add-edit-cases/add-edit-cases.component';
import { Consultation } from "../../models/consultation";
import { ConsultationService } from '../../services/consultation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from "../../services/patient.service";

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'consultationDate', 'appointmentDate', 'patient', 'actions'];
  dataSourceActive!: MatTableDataSource<any>;
  dataSourceInactive!: MatTableDataSource<any>;
  activeCases: Consultation[] = [];
  inactiveCases: Consultation[] = [];

  @ViewChild('activeCases') activePaginator!: MatPaginator;
  @ViewChild('inactiveCases') inactivePaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private consultationService: ConsultationService,
    private patientService: PatientService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActive.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceActive.paginator) {
      this.dataSourceActive.paginator.firstPage();
    }
  }

  private getData() {
    this.activeCases = [];
    this.inactiveCases = [];
    this.consultationService.getAllConsultation().then((res: any) => {
      res.forEach((cases: any) => {
        if (cases.active) {
          this.activeCases.push(cases);
        } else {
          this.inactiveCases.push(cases);
        }
      });

      this.dataSourceActive = new MatTableDataSource(this.activeCases);
      this.dataSourceActive.paginator = this.activePaginator;
      this.dataSourceActive.sort = this.sort;

      this.dataSourceInactive = new MatTableDataSource(this.inactiveCases);
      this.dataSourceInactive.paginator = this.inactivePaginator;
      this.dataSourceInactive.sort = this.sort;
    });
  }

  addEditCase(id?: number) {
    const dialogRef = this.dialog.open(AddEditCasesComponent, {
      width: '70%',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  addObservation(id: number) {

  }

  deleteCase(id: number) {
    this.consultationService.deleteConsultation(id).then(() => {
      this.getData();
    }).catch((err) => {
      console.error(err);
    });
  }
}
