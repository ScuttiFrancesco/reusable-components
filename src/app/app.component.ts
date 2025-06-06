import { Component, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button.component';
import { InputComponent } from './components/input.component';
import { TableComponent } from './components/table.component';
import { PaginationComponent } from './components/pagination.component';
import { BadgeComponent } from './components/badge.component';
import { CheckboxComponent } from './components/checkbox.component';
import { ToogleComponent } from './components/toogle.component';
import { SelectComponent, SelectOption } from './components/select.component';
import { AlertconfirmComponent } from './components/alertconfirm.component';
import { AlertconfirmService } from './services/alertconfirm.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    TableComponent,
    PaginationComponent,
    BadgeComponent,
    CheckboxComponent,
    ToogleComponent,
    SelectComponent,
    AlertconfirmComponent,
  ],
  template: `
    <div class="container">
      <!-- <app-button
    [text]="'Button'"
    /> -->
      <div>
        <app-input [type]="'number'" />

        <!--  <app-table
    [data]="[{
          header1: 'Row 1 Col 1',
          header2: 'Row 1 Col 2',
          header3: 'Row 1 Col 3',
          header4: 'Row 1 Col 4',
          header5: 'Row 1 Col 5',
        },
        {
          header1: 'Row 2 Col 1',
          header2: 'Row 2 Col 2',
          header3: 'Row 2 Col 3',
          header4: 'Row 2 Col 4',
          header5: 'Row 2 Col 5',
        },
        {
          header1: 'Row 3 Col 1',
          header2: 'Row 3 Col 2',
          header3: 'Row 3 Col 3',
          header4: 'Row 3 Col 4',
          header5: 'Row 3 Col 5',
          },
          {
            header1: 'Row 4 Col 1',
            header2: 'Row 4 Col 2',
            header3: 'Row 4 Col 3',
            header4: 'Row 4 Col 4',
            header5: 'Row 4 Col 5',
            },]"
        
        [iconColumnMapping]="iconColumnMapping"
        [iconDistribution]="'single-column'"
        [extraColumn]="'Actions'"
        [icons]="tableIcons"
        (iconClick)="onIconClick($event)"
        [thTextAlign]="'center'"
        [tdTextAlign]="'center'"

        
    /><app-pagination
          [totalPages]="23"
         
        /> -->
      </div>
      <app-checkbox (badgeSelection)="badgeSelection($event)" />
      <app-toogle (selection)="toogleSelection($event)" />

      <app-select
        [label]="'Choose an option'"
        [options]="selectOptions"
        [selectedValue]="selectedOption"
        [placeholder]="'Please select...'"
        (selectionChange)="onSelectChange($event)"
      />
      @if (alertconfirmMessage() && alertconfirmTitle()) {
      <app-alertconfirm
        [message]="alertconfirmMessage()"
        [title]="alertconfirmTitle()"
        [confirmation]="alertconfirmConfirmation()"
      />}
    </div>

    <router-outlet />
  `,
  styles: `
    .container {
      position: fixed;
      top: 16px;
      left: 16px;
      right: 16px;
      bottom: 16px;
      padding: 16px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      overflow: auto;
    }


    
    `,
})
export class AppComponent {
  title = 'reusable-components';
  alertconfirmMessage = computed(() => this.alertconfirmService.message());
  alertconfirmTitle = computed(() => this.alertconfirmService.title());
  alertconfirmConfirmation = computed(() =>
    this.alertconfirmService.confirmation()
  );
  constructor(private alertconfirmService: AlertconfirmService) {
    effect(() => {
      if (this.alertconfirmService.confirmed()) {
       this.alertconfirm();
      }
    }, { allowSignalWrites: true });
  }

  // Icon configuration
  tableIcons = [
    { id: 'edit', icon: '✏️', tooltip: 'Edit' },
    { id: 'delete', icon: '🗑️', tooltip: 'Delete' },
    { id: 'view', icon: '👁️', tooltip: 'View' },
  ];

  // Example with distributed icons across columns
  iconColumnMapping = {
    Edit: ['edit'],
    Actions: ['delete', 'view'],
  };

  onIconClick(event: { icon: any; rowData: any }) {
    console.log('Icon clicked:', event.icon.id, 'Row data:', event.rowData);

    switch (event.icon.id) {
      case 'edit':
        console.log('Editing row:', event.rowData);
        break;
      case 'delete':
        console.log('Deleting row:', event.rowData);
        break;
      case 'view':
        console.log('Viewing row:', event.rowData);
        break;
    }
  }

  badgeSelection(selectedBadges: string[]) {
    console.log('Selected Badges:', selectedBadges);
  }

  // Select options
  selectOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4' },
  ];

  selectedOption = '';

  onSelectChange(option: SelectOption) {
    this.selectedOption = option.value;
    console.log('Selected option:', option);
  }

  toogleSelection(selection: boolean) {
    console.log('Toogle selection:', selection);
    if (selection) {
      this.alertconfirmService.setAlert({
        title: 'Toogle Activated',
        message: 'You have activated the toogle.',
        confirmation: true,
      });
    }
  }

  alertconfirm() {
    this.alertconfirmService.setAlert({
      title: 'Alert Confirmed',
      message: 'This is the alert message  confirmation.',
      confirmation: false,
    });
    this.alertconfirmService.confirmed.set(false); 
  }
}
