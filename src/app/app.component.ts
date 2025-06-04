import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "./components/button.component";
import { InputComponent } from "./components/input.component";
import { TableComponent } from './components/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, InputComponent, TableComponent],
  template: `
   <div class="container">
    <!-- <app-button
    [text]="'Button'"
    /> -->
    <div >
    <app-input
    
    [type]="'number'"
    />
    <app-input/><app-input/>
    <app-table
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
        }]"
        [showColumns]="['header1', 'header2', 'header3', 'header4', 'header5']"
        [iconColumnMapping]="iconColumnMapping"
        [iconDistribution]="'single-column'"
        [extraColumn]="'Actions'"
        [icons]="tableIcons"
        (iconClick)="onIconClick($event)"
        [thTextAlign]="'center'"
        [tdTextAlign]="'center'"
    />
    </div>
   </div>

    <router-outlet />
  `,
  styles: [`
    .container {
      position: fixed;
      top: 16px;
      left: 16px;
      right: 16px;
      bottom: 16px;
      padding: 16px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
    `],
})
export class AppComponent {
  title = 'reusable-components';

  // Icon configuration
  tableIcons = [
    { id: 'edit', icon: '✏️', tooltip: 'Edit' },
    { id: 'delete', icon: '🗑️', tooltip: 'Delete' },
    { id: 'view', icon: '👁️', tooltip: 'View' }
  ];

  // Example with distributed icons across columns
  iconColumnMapping = {
    'Edit': ['edit'],
    'Actions': ['delete', 'view']
  };

  onIconClick(event: {icon: any, rowData: any}) {
    console.log('Icon clicked:', event.icon.id, 'Row data:', event.rowData);
    
    switch(event.icon.id) {
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
}
