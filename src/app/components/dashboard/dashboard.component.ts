import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { LayoutComponent } from '../layout/layout.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ButtonModule, HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet, LayoutComponent, ChartModule, TableModule, CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    dataLineChart: any;
    optionsLineChart: any;

    dataDonutChart: any;
    optionsDonutChart: any;

    optionsBarChart: any;
    dataBarChart: any;

    orders: any[] = [];


    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.dataLineChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Total Order',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Recurring Orders',
                    data: [28, 48, 40, 19, 46, 27, 20],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
                ,
                {
                    label: 'New Customers',
                    data: [8, 18, 10, 9, 16, 17, 10],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    tension: 0.4
                }
            ]
        };

        this.optionsLineChart = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.dataDonutChart = {
            labels: ['California', 'Nevada', 'Texas'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.optionsDonutChart = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };

        this.orders = [
            {
                customer: 'John Doe',
                date: new Date('2023-08-15'),
                value: 120.50,
                itemsQuantity: 3
            },
            {
                customer: 'Jane Smith',
                date: new Date('2023-08-20'),
                value: 85.75,
                itemsQuantity: 2
            },
            {
                customer: 'Lucas Brown',
                date: new Date('2023-08-22'),
                value: 150.00,
                itemsQuantity: 5
            },
            {
                customer: 'Olivia Johnson',
                date: new Date('2023-08-25'),
                value: 210.30,
                itemsQuantity: 7
            },
            {
                customer: 'Maria Cabello',
                date: new Date('2023-08-15'),
                value: 102.30,
                itemsQuantity: 5
            }
        ];

        this.optionsBarChart = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
        }

        this.dataBarChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [65000, 59000, 80000, 81000, 56000, 55000, 40000],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Profit',
                    data: [15000, 18000, 20000, 22000, 14000, 13000, 10000],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    tension: 0.4
                },
                {
                    label: 'Sales',
                    data: [18009, 19209, 15509, 17409, 14309, 18109, 9009],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    tension: 0.4
                }
            ]
        };
    }
}

