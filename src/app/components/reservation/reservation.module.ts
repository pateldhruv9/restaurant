import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationComponent} from './reservation.component';
import { SharedModule } from '../shared/shared.module';



const ROUTES: Routes = [
    {path: '', component: ReservationComponent}
];

@NgModule({
    declarations: [ReservationComponent],
    imports: [SharedModule,RouterModule.forChild(ROUTES)]
})

export class ReservationModule {

}
