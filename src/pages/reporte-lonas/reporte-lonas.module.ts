import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReporteLonasPage } from './reporte-lonas';
import {VallaService} from "../../services/valla.service";

@NgModule({
  declarations: [
    ReporteLonasPage,
  ],
  imports: [
    IonicPageModule.forChild(ReporteLonasPage),
  ],
  providers: [
    VallaService,
  ]
})
export class ReporteLonasPageModule {}
