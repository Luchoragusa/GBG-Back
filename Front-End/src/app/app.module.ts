import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { AutopartComponent } from './modules/admin/autopart/autopart.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';

// Angular Material Modules
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { FuseDrawerModule } from '@fuse/components/drawer';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { CarBrandComponent } from './modules/admin/car-brand/car-brand.component';
import { PartBrandComponent } from './modules/admin/part-brand/part-brand.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { PartTypeComponent } from './modules/admin/part-type/part-type.component';
import { AlertComponent } from './modules/admin/alert/alert.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    useHash                  : true
};

@NgModule({
    declarations: [
        AppComponent,
        AutopartComponent,
        DashboardComponent,
        CarBrandComponent,
        PartBrandComponent,
        PartTypeComponent,
        AlertComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),

        // Angular Material imports

        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatSidenavModule,
        MatDividerModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        FuseDrawerModule,
        MatIconModule,
        MatSelectModule,
        FuseAlertModule,
        MatToolbarModule,
        MatProgressBarModule,
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
