import {AddEditCasesComponent} from '../add-edit-cases/add-edit-cases.component';
import {Consultation} from '../../models/consultation';
import {ConsultationService} from '../../services/consultation.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PatientService} from "../../services/patient.service";
import {Patient} from "../../models/patient";
import {catchError, combineLatest, forkJoin, map, Observable, of, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'consultationDate', 'appointmentDate', 'patient', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getData() {
    this.consultationService.getAllConsultation().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  addEditCase(id ?: number) {
    const dialogRef = this.dialog.open(AddEditCasesComponent, {
      width: '70%',
      disableClose: true,
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  addObservation(id: number) {

  }

  deleteCase(id
               :
               number
  ) {
    this.consultationService.deleteConsultation(id).subscribe(() => {
      this.getData();
    })
  }
}
