import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { OrderCreateComponent } from './components/order-create-dropdown/orders-create-dropdown.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { OrderCreateV2Component } from './components/order-create-table/order-create-table.component';
import { ProductsComponent } from './components/products/products.component';

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
        path: 'products/new',
        component: ProductFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'drivers',
        component: DriversComponent,
        canActivate: [authGuard]
    },
    {
        path: 'orders/create-new',
        component: OrderCreateV2Component,
        canActivate: [authGuard]
    },
    {
        path: 'products/all',
        component: ProductsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'orders/edit/:id',
        component: OrderCreateV2Component,
        canActivate: [authGuard]
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
];

