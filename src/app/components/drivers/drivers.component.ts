import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DriverFormComponent } from '../driver-form/driver-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX } from '../../shared/constants/regex.constants';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [LayoutComponent, DialogModule, ButtonModule, DriverFormComponent,],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent {

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

}

