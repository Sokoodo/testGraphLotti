import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraficoLottiComponent } from './grafico-lotti-module/grafico-lotti/grafico-lotti.component';
import { DiagramModule, HierarchicalTreeService, DataBindingService } from '@syncfusion/ej2-angular-diagrams';

@NgModule({
  declarations: [
    AppComponent,
    GraficoLottiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DiagramModule
  ],
  providers: [HierarchicalTreeService, DataBindingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
