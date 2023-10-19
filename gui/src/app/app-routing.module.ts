import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/main/main/main.component';
import { HomeComponent } from './modules/main/home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: MainComponent,
    
    children: [
      
      {
        path: 'home',
        canActivate: [],
        component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
