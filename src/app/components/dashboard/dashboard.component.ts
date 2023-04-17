import Chart, { ChartData } from 'chart.js/auto';
import { Component, OnInit } from "@angular/core";

import { DashboardService } from 'src/app/services/dashboard.service';

type DataItem = {
  year: number,
  month: number,
  active: number,
  row_count: number
}

@Component({
  selector: 'app-user',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  private chartInstance: Chart | null = null;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.getAgendaStats();
    this.getAgendaPatientsWithoutAppointment();
    this.getAgendaByQuarter();
  }

  private getAgendaStats() {
    this.dashboardService.getAgendaStats().then(async (res) => {
      const dataSet = res;
      const chartData = await this.processDataSet(dataSet);

      const myChart = new Chart('myChart', {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: false,
        },
      });
    })
      .catch((error) => {
        console.error(error);
      });
  }

  async processDataSet(data: DataItem[]): Promise<ChartData> {
    const filteredDataSuccess = this.filterAndMapData(data, 1);
    const monthsSuccess = filteredDataSuccess.map(item => item.month);
    const rowCountsSuccess = filteredDataSuccess.map(item => item.row_count);

    const filteredDataCancelled = this.filterAndMapData(data, 0);
    const rowCountsCancelled = filteredDataCancelled.map(item => item.row_count);

    return {
      labels: monthsSuccess,
      datasets: [
        {
          label: 'Citas Exitosas',
          data: rowCountsSuccess,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
        },
        {
          label: 'Citas Canceladas',
          data: rowCountsCancelled,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        }
      ]
    };
  }

  private getAgendaPatientsWithoutAppointment() {
  }

  private getAgendaByQuarter() {
    this.dashboardService.getAgendaByQuarter().then(async (res) => {
      const dataSet = res;
      const pieData = await this.processPieDataSet(dataSet);

      const myChart3 = new Chart('myChart3', {
        type: 'pie',
        data: pieData,
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Citas por trimestre'
            }
          }
        },
      });
    })
      .catch((error) => {
        console.error(error);
      });
  }

  private processPieDataSet(data: DataItem[]) {
    const filteredData = this.filterPieAndMapData(data);
    const rowCounts = filteredData.map(item => item.patients);
    const labels = filteredData.map(item => item.label);
    return {
      labels: labels,
      datasets: [
        {
          label: 'Citas por trimestre',
          data: rowCounts,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
          ],
          hoverOffset: 4
        }
      ]
    };

  }

  private filterAndMapData(data: DataItem[], active: number) {
    return data
      .filter(x => x.active === active)
      .map(x => ({
        year: x.year,
        month: this.getMonthNames(x.month),
        row_count: x.row_count
      }));
  }

  filterPieAndMapData(data: any[]) {
    return data.map(x => ({
      label: x.year + ' - ' + x.quarter,
      patients: x.num_patients,
    }));
  }

  getMonthNames(monthNumber?: number) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    if (monthNumber) {
      return monthNames[monthNumber - 1];
    }
    return monthNames;
  }
}
