import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MomentModule } from 'angular2-moment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToasterService, ToasterModule } from 'angular5-toaster';

import { LoadingIconComponent } from './components/loading-icon/loading-icon.component';
import { TruncatePipe } from './pipes/truncate.pipe'



@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        MomentModule,
        ToasterModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot()
    ],
    exports: [
        MomentModule,
        LoadingIconComponent,
        TruncatePipe,
        MDBBootstrapModule,
        FormsModule,
        ToasterModule,
        BrowserAnimationsModule
    ],
    declarations: [
        LoadingIconComponent,
        TruncatePipe
    ],
    providers: [ ToasterService ]

})

export class SharedModule {

}
