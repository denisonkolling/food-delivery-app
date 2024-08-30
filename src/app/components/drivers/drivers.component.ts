import { Component, ViewChild } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DriverFormComponent } from '../driver-form/driver-form.component';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [LayoutComponent, DialogModule, ButtonModule, DriverFormComponent,],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent {

  visible: boolean = false;

  @ViewChild(DriverFormComponent) driverFormComponent!: DriverFormComponent;

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.driverFormComponent.resetForm();
  }

}

