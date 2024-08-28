import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CardModule, AvatarModule, ImageModule, ButtonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {

  userProfilePhoto = sessionStorage.getItem('photo');

  userName = sessionStorage.getItem('name');

}
