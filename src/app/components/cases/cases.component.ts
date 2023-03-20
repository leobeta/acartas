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
import {forkJoin, map, Observable, switchMap} from "rxjs";

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
    this.combineData().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  combineData(): Observable<any[]> {
    return this.consultationService.getAllConsultation().pipe(
      switchMap((consultations: Consultation[]) => {
        const observables = consultations.map(consultation => {
          return this.patientService.getPatientById(consultation.idPatient.toString()).pipe(
            map(patient => {
              // Combine the data from the two methods
              return { ...consultation, patient };
            })
          );
        });
        return forkJoin(observables);
      })
    );
  }

  addEditCase(id ?: number) {
    const dialogRef = this.dialog.open(AddEditCasesComponent, {
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

  deleteCase(id
               :
               number
  ) {
    this.consultationService.deleteConsultation(id).subscribe(() => {
      this.getData();
    })
  }
}
