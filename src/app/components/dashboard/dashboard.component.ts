import { Component, OnInit } from "@angular/core";

import Chart from 'chart.js/auto';
import { ScheduleService } from "src/app/services/schedule.service";

@Component({
  selector: 'app-user',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  dataSet = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getData();
    console.log(this.dataSet)
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Número de visitantes',
          data: [100, 200, 150, 300, 250, 400, 350],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Número de visitantes',
          data: [100, 200, 150, 300, 250, 400, 350],
          backgroundColor: '#00DDDD',
          borderColor: '#0000CC',
          borderWidth: 1,
        },
      ],
    };

    const myChart = new Chart('myChart', {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  getData() {
    this.scheduleService.getScheduleStatistics().then((res) => {
      this.dataSet = res;
    })
      .catch((error) => {
        console.error(error);
      });
  }

}
