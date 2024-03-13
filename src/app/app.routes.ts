import { Routes } from '@angular/router';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:"",component:ChatContainerComponent},
    {path:"login",component:LoginComponent},
];
