import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-profile-settings-card',
  standalone: true,
  imports: [InputSwitchModule, DividerModule, ButtonModule, CardModule],
  templateUrl: './profile-settings-card.component.html',
  styleUrl: './profile-settings-card.component.css'
})
export class ProfileSettingsCardComponent {

}
