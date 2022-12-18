import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { CompactLayoutModule } from 'app/layout/layouts/compact/compact.module';
import { SharedModule } from 'app/shared/shared.module';

const layoutModules = [
    CompactLayoutModule  //  Distibucion de los botones
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
