import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../lista-reportes-lonas/lista-reportes-lonas';
import { HomePage } from '../valla-maps/vallas-maps';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
