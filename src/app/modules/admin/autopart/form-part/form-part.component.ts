import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Autopart } from 'app/core/autopart/autopart';
import { AutopartComponent } from '../autopart.component';

@Component({
  selector: 'app-form-part',
  templateUrl: './form-part.component.html',
  styleUrls: ['./form-part.component.scss']
})
export class FormPartComponent implements OnInit {

  autoPart: Autopart;
  autoPartForm !: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _autopartComponent: AutopartComponent,
  ) { }

  ngOnInit(): void {

            // Open the drawer
            this._autopartComponent.matDrawer.open();

            console.log("Estoy en el onInit del form-part")

            // Create the task form
            this.autoPartForm = this._formBuilder.group({
                id       : [''],
                type     : [''],
                title    : ['']
            });
  }
  ngAfterViewInit(): void
  {
      // Listen for matDrawer opened change
      this._autopartComponent.matDrawer.openedChange.subscribe((opened: boolean) => {
          if ( !opened )
          {
              // Reset the form
              this.autoPartForm.reset();
          }
      }
      );
    }
}
