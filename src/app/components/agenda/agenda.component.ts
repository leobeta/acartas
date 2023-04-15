import { Component, OnInit, ViewChild } from '@angular/core';

import { AddEditAgendaComponent } from '../add-edit-agenda/add-edit-agenda.component';
import { Agenda } from '../../models/agenda';
import { AgendaService } from '../../services/agenda.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'appointmentDate', 'patient', 'notes', 'status', 'actions'];
  dataSourceActive!: MatTableDataSource<Agenda>;
  dataSourcePast!: MatTableDataSource<Agenda>;
  dataSourceCancelled!: MatTableDataSource<Agenda>;
  activeAgendas: Agenda[] = [];
  pastAgendas: Agenda[] = [];
  cancelledAgendas: Agenda[] = [];


  @ViewChild('activePaginator') activePaginator!: MatPaginator;
  @ViewChild('pastPaginator') pastPaginator!: MatPaginator;
  @ViewChild('cancelledPaginator') cancelledPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private agendaService: AgendaService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.agendaService.getAllAgenda().then((res: any) => {
      this.activeAgendas = [];
      this.pastAgendas = [];
      this.cancelledAgendas = [];
      const now = new Date();
      res.forEach((agenda: any) => {
        if (agenda.sActive) {
          if (new Date(agenda.fecha) >= now) {
            this.activeAgendas.push(agenda);
          } else {
            this.pastAgendas.push(agenda);
          }
        } else {
          this.cancelledAgendas.push(agenda);
        }
      });

      this.dataSourceActive = new MatTableDataSource(this.activeAgendas);
      this.dataSourceActive.paginator = this.activePaginator;
      this.dataSourceActive.sort = this.sort;

      this.dataSourcePast = new MatTableDataSource(this.pastAgendas);
      this.dataSourcePast.paginator = this.pastPaginator;
      this.dataSourceActive.sort = this.sort

      this.dataSourceCancelled = new MatTableDataSource(this.cancelledAgendas);
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
    const dialogRef = this.dialog.open(AddEditAgendaComponent, {
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
    this.agendaService.deleteAgenda(id).then(() => {
      this.getData();
    })
      .catch((err) => {
        console.error(err);
      })
  }

  activeAppointment(sId: any) {

  }
}
