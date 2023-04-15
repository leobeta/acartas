import Chart, { ChartData } from 'chart.js/auto';
import { Component, OnInit } from "@angular/core";

import { AgendaService } from "src/app/services/agenda.service";

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

  constructor(private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.agendaService.getAgendaStatistics().then(async (res) => {
      const dataSet = res;
      const chartData = await this.processDataSet(dataSet);

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart('myChart', {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
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

  private filterAndMapData(data: DataItem[], active: number) {
    return data
      .filter(x => x.active === active)
      .map(x => ({
        year: x.year,
        month: this.getMonthNames(x.month),
        row_count: x.row_count
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
