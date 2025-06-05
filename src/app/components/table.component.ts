import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    @if (title()) {
    <h2 class="title">{{ title() }}</h2>
    }
    <div class="table-container">
      <table
        [style.margin.px]="margin()"
        [style.padding.px]="padding()"
        [style.width.%]="width()"
        [style.height.%]="height()"
        [style.borderCollapse]="borderCollapse()"
        [style.tableLayout]="tableLayout()"
        [style.borderRadius.px]="borderRadius()"
        [style.overflow]="overflow()"
        [style.boxShadow]="boxShadow()"
        [style.backgroundColor]="backgroundColor()"
        [style.border]="border()"
        [style.fontSize.rem]="fontSize()"
        [style.fontFamily]="fontFamily()"
        [style.color]="color()"
        [style.textAlign]="textAlign()"
        [style.fontWeight]="fontWeight()"
      >
        <thead>
          <tr>
            @for (column of columns; track $index) {
            <th
              [style.padding.px]="thPadding()"
              [style.width.px]="thWidth()"
              [style.height.px]="thHeight()"
              [style.overflow]="thOverflow()"
              [style.boxShadow]="thBoxShadow()"
              [style.backgroundColor]="thBackgroundColor()"
              [style.textAlign]="thTextAlign()"
              [style.fontSize.rem]="thFontSize()"
              [style.fontWeight]="thFontWeight()"
              [style.fontFamily]="thFontFamily()"
              [style.color]="thColor()"
              [style.borderRadius.px]="thBorderRadius()"
              [style.border]="thBorder()"
            >
            
             <span> {{ column }}</span>
              @if (isColumnSortable(column)) {
              <app-button
                [width]="3"
                [height]="2.5"
                [minHeight]="30"
                [bgColor]="'transparent'"
                [border]="'none'"
                [icon]="getSortIcon(column)"
                [boxShadow]="'none'"
                [padding]="'0'"
                [margin]="'0'"
                (click)="sort(column)"
              />
              }
            </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (obj of showData; track $index) {
          <tr>
            @for (cellData of getRowCells(obj); track $index) {
            <td
              [style.padding.px]="tdPadding()"
              [style.width.px]="tdWidth()"
              [style.height.px]="tdHeight()"
              [style.borderRadius.px]="tdBorderRadius()"
              [style.overflow]="tdOverflow()"
              [style.boxShadow]="tdBoxShadow()"
              [style.backgroundColor]="tdBackgroundColor()"
              [style.border]="tdBorder()"
              [style.fontSize.rem]="tdFontSize()"
              [style.fontFamily]="tdFontFamily()"
              [style.fontWeight]="tdFontWeight()"
              [style.color]="tdColor()"
              [style.textAlign]="tdTextAlign()"
            >
              @if (cellData.type === 'text') {
              {{ cellData.value }}
              } @else if (cellData.type === 'icons') { @for (icon of
              cellData.icons; track $index) {
              <button
                class="icon-button"
                (click)="onIconClick(icon, obj)"
                [title]="icon.tooltip || ''"
              >
                {{ icon.icon }}
              </button>
              } }
            </td>
            }
          </tr>
          }
        </tbody>
      </table>
      <ng-content />
    </div>
  `,
  styles: `  
   

    
    .title{
      margin-top: 0;
      font-size: 1.5rem;
      margin-bottom: 8px;  
      padding-left: 8px;   
    }
    
    .icon-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      margin: 0 2px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .icon-button:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    `,
})
export class TableComponent {
  margin = input<number>(0);
  padding = input<number>(0);
  width = input<number>(100);
  height = input<number>(100);
  borderCollapse = input<string>('collapse');
  tableLayout = input<string>('fixed');
  borderRadius = input<number>(8);
  overflow = input<string>('auto');
  boxShadow = input<string>('0 2px 4px rgba(0, 0, 0, 0.1)');
  backgroundColor = input<string>('rgb(249, 249, 249)');
  border = input<string>('1px solid #ccc');
  fontSize = input<number>(1);
  fontFamily = input<string>('Arial, sans-serif');
  textAlign = input<string>('left');
  fontWeight = input<string>('normal');
  color = input<string>('rgb(0, 0, 0)');

  thTextAlign = input<string>('left');
  thFontSize = input<number>(1);
  thFontWeight = input<string>('bold');
  thFontFamily = input<string>('Arial, sans-serif');
  thColor = input<string>('rgb(0, 0, 0)');
  thBackgroundColor = input<string>('rgb(240, 240, 240)');
  thBorderRadius = input<number>(0);
  thBorder = input<string>('1px solid rgb(0, 0, 0)');
  thPadding = input<number>(8);
  thWidth = input<number>(100);
  thHeight = input<number>(40);
  thOverflow = input<string>('hidden');
  thBoxShadow = input<string>('0 1px 2px rgba(0, 0, 0, 0.1)');

  tdPadding = input<number>(8);
  tdWidth = input<number>(100);
  tdHeight = input<number>(40);
  tdBorderRadius = input<number>(0);
  tdOverflow = input<string>('hidden');
  tdBoxShadow = input<string>('0 1px 2px rgba(0, 0, 0, 0.1)');
  tdBackgroundColor = input<string>('rgb(255, 255, 255)');
  tdBorder = input<string>('1px solid rgb(0, 0, 0)');
  tdFontSize = input<number>(1);
  tdFontFamily = input<string>('Arial, sans-serif');
  tdFontWeight = input<string>('normal');
  tdColor = input<string>('rgb(0, 0, 0)');
  tdTextAlign = input<string>('left');

  title = input<string>('Table Title');
  data = input<TableData[]>([]);
  showColumns = computed(() => {
    return Array.from(this.columnConfig()).map((col) => col.name);
  });
  columnConfig = input<ColumnConfig[]>([
    { name: 'header1', sortable: true, filterable: true },
    { name: 'header2', sortable: true, filterable: true },
    { name: 'header3', sortable: true, filterable: true },
    { name: 'header4', sortable: true, filterable: true },
    { name: 'header5', sortable: true, filterable: true },
  ]);
  extraColumn = input<string>('');
  sortColumn = output<{column: string, direction: SortDirection}>();

  // Track sort state for each column
  private columnSortStates = new Map<string, SortDirection>();

  // New icon-related inputs
  icons = input<IconConfig[]>([]);
  iconDistribution = input<'single-column' | 'distributed'>('single-column');
  iconColumnMapping = input<{ [key: string]: string[] }>({});

  // Output for icon clicks
  iconClick = output<{ icon: IconConfig; rowData: any }>();

  get displayedData() {
    return this.data().map((row) => {
      const filteredRow: Partial<TableData> = {};
      this.showColumns().forEach((column) => {
        if (column in row) {
          (filteredRow as any)[column] = (row as any)[column];
        }
      });
      return filteredRow;
    });
  }

  get showData() {
    return this.displayedData;
  }

  get columns() {
    if (this.iconDistribution() === 'distributed') {
      return [...this.showColumns(), ...Object.keys(this.iconColumnMapping())];
    }
    return [...this.showColumns(), this.extraColumn()];
  }

  getRowCells(row: any): CellData[] {
    const cells: CellData[] = [];

    // Add regular data cells
    this.showColumns().forEach((column) => {
      cells.push({
        type: 'text',
        value: row[column] || '',
      });
    });

    // Add icon cells based on distribution mode
    if (this.iconDistribution() === 'single-column') {
      // All icons in one column
      cells.push({
        type: 'icons',
        icons: this.icons(),
      });
    } else {
      // Icons distributed across multiple columns
      const mapping = this.iconColumnMapping();
      Object.keys(mapping).forEach((columnName) => {
        const columnIcons = this.icons().filter((icon) =>
          mapping[columnName].includes(icon.id)
        );
        cells.push({
          type: 'icons',
          icons: columnIcons,
        });
      });
    }

    return cells;
  }

  onIconClick(icon: IconConfig, rowData: any) {
    this.iconClick.emit({ icon, rowData });
  }

  isColumnSortable(columnName: string): boolean {
    const config = this.columnConfig().find(col => col.name === columnName);
    return config?.sortable === true;
  }

  getSortIcon(column: string): string {
    const sortState = this.columnSortStates.get(column) || SortDirection.none;
    switch (sortState) {
      case SortDirection.asc: return SortIcon.ascSort;
      case SortDirection.desc: return SortIcon.descSort;
      default: return SortIcon.noneSort;
    }
  }

  sort(column: string) {
    if (!this.isColumnSortable(column)) return;
    
    const currentState = this.columnSortStates.get(column) || SortDirection.none;
    let newState: SortDirection;
    
    switch (currentState) {
      case SortDirection.none: newState = SortDirection.asc; break;
      case SortDirection.asc: newState = SortDirection.desc; break;
      case SortDirection.desc: newState = SortDirection.asc; break;
      default: newState = SortDirection.asc; break;
    }
    
    // Reset all other columns to none
    this.columnSortStates.clear();
    this.columnSortStates.set(column, newState);
    console.log(`Sorting column: ${column}, new state: ${newState}`);
    this.sortColumn.emit({ column, direction: newState });
  }
}

interface TableData {
  header1: string;
  header2: string;
  header3: string;
  header4: string;
  header5: string;
}

interface IconConfig {
  id: string;
  icon: string;
  tooltip?: string;
}

interface CellData {
  type: 'text' | 'icons';
  value?: string;
  icons?: IconConfig[];
}

interface ColumnConfig {
  name: string;
  sortable?: boolean;
  filterable?: boolean;
}

enum SortIcon {
  noneSort = '🔄',
  ascSort = '🔼',
  descSort = '🔽',
}

enum SortDirection {
  none = 'none',
  asc = 'asc', 
  desc = 'desc'
}
