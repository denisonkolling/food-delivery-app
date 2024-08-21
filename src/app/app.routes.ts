import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersCreateComponent } from './components/orders-create/orders-create.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { OrderCreateComponent } from './components/order-create/orders-create.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard]
    },
    {
        path: 'dashboard/overview',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'settings/account',
        component: AccountSettingsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'orders/create',
        component: OrderCreateComponent,
        canActivate: [authGuard]
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
];

