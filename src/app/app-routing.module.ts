import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaporamaComponent } from './diaporama/diaporama.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [ { path: 'upload', component: UploadComponent },{ path: 'photo-list', component: PhotoListComponent },{ path: 'diaporama', component: DiaporamaComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
