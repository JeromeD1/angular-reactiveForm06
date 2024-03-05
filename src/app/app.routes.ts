import { Routes } from '@angular/router';
import { MyReactiveFormComponent } from './my-reactive-form/my-reactive-form.component';

export const routes: Routes = [
    {path:"myForm", component: MyReactiveFormComponent},
    {path:"", redirectTo: "myForm", pathMatch: "full"}
];
