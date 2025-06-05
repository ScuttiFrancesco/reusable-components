import { Component, HostListener, input, OnInit, output } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="table-footer">
      <div class="pagination">
        @if(currentPage > totalButtonsPage){
        <div class="icon-buttons">
          <app-button
            [width]="3"
            [height]="2.5"
            [minHeight]="30"
            [bgColor]="'rgb(255, 255, 255)'"
            [border]="'none'"
            [icon]="iconFirstPage()"
            [boxShadow]="'none'"
            [padding]="'0'"
            (click)="showFirstPage()"
          />
          <app-button
            [width]="3"
            [height]="2.5"
            [minHeight]="30"
            [bgColor]="'rgb(255, 255, 255)'"
            [border]="'none'"
            [icon]="iconPrevPage()"
            [boxShadow]="'none'"
            [padding]="'0'"
            (click)="showPrevPage()"
          />
        </div>

        } @for(page of pageRange; track $index){ @if(page !== 0){

        <app-button
          [width]="3"
          [height]="2.5"
          [minHeight]="30"
          [bgColor]="'rgb(235, 235, 235)'"
          [color]="'brown'"
          [text]="page.toString()"
          [fontSize]="0.9"
          [fontWeight]="'bold'"
          (click)="currentPage = page; currentPageOuput.emit(page)"
        />
        }} @if(currentPage !== totalPages() && currentPage < totalPages() -
        pageRange.length + 1){

        <div class="icon-buttons">
          <app-button
            [width]="3"
            [height]="2.5"
            [minHeight]="30"
            [bgColor]="'rgb(255, 255, 255)'"
            [border]="'none'"
            [icon]="iconNextPage()"
            [boxShadow]="'none'"
            [padding]="'0'"
            (click)="showNextPage()"
          />
          <app-button
            [width]="3"
            [height]="2.5"
            [minHeight]="30"
            [bgColor]="'rgb(255, 255, 255)'"
            [border]="'none'"
            [icon]="iconLastPage()"
            [boxShadow]="'none'"
            [padding]="'0'"
            (click)="showLastPage()"
          />
        </div>
        } @if (!isMobile) {
        <div class="page-info">
          Pagina {{ currentPage }} di {{ totalPages() }}
        </div>
        }
        <select
          name="totalElements"
          [value]="currentPageSize()"
          (change)="onPageSizeChange($event)"
        >
          @for(size of [5, 8, 10, 15, 20, 50]; track $index){
          <option [value]="size">
            {{ size }}
          </option>
          }
        </select>
      </div>
    </div>
  `,
  styles: `
  
  .table-footer{
    display: grid;
    grid-template-columns: 85% 15%;
    align-items: center;
    padding: 20px 50px 0 50px;
  }
  
 
.icon-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    
  }
  
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    gap: 10px;
  }

  .page-info {
    margin: 15px;
    font-size: 0.9rem;
    color: #666;
  white-space: nowrap;
  }

  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  `,
})
export class PaginationComponent implements OnInit {
  isMobile: boolean = false;
  iconFirstPage = input<string>('⏮️');
  iconPrevPage = input<string>('⬅️');
  iconNextPage = input<string>('➡️');
  iconLastPage = input<string>('⏭️');
  currentPageOuput = output<number>();
  currentPage: number = 1;
  pageRange: number[] = [];
  totalPages = input<number>(10);
  currentPageSize = input<number>(5);
  pageSize = output<number>();
  orderBy = output<string>();
  totalButtonsPageInput = input<number>(5);
  totalButtonsPage: number = 0;

  ngOnInit(): void {
    this.verifyPageRange();
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth <= 550) {
      this.totalButtonsPage = 1;
      this.isMobile = true;
      this.verifyPageRange();
    } else if (window.innerWidth > 550 && window.innerWidth <= 800) {
      this.totalButtonsPage = 3;
      this.isMobile = false;
      this.verifyPageRange();
    } else {
      this.totalButtonsPage = this.totalButtonsPageInput();
      this.verifyPageRange();
    }
  }

  verifyPageRange() {
    if (this.totalPages() >= this.totalButtonsPage) {
      this.pageRange = Array.from(
        { length: this.totalButtonsPage },
        (_, i) => i + 1
      );
    } else {
      this.pageRange = Array.from(
        { length: this.totalPages() },
        (_, i) => i + 1
      );
    }
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newSize = parseInt(target.value, 10);
    this.pageSize.emit(newSize);
  }

  showFirstPage() {
    this.verifyPageRange();
    this.currentPage = 1;
    this.currentPageOuput.emit(this.currentPage);
  }

  showNextPage() {
    let pageRange = this.pageRange.map((page) => {
      if (this.totalPages() < page + this.totalButtonsPage) {
        return 0;
      }
      return page + this.totalButtonsPage;
    });
    this.pageRange = pageRange;
    this.currentPage = pageRange[0];
    this.currentPageOuput.emit(this.currentPage);
  }

  showPrevPage() {
    let pageRange = [];

    let startPage = this.pageRange[0] - this.totalButtonsPage;
    if (startPage <= 0) {
      startPage = 1;
    }
    pageRange = Array.from(
      { length: this.totalButtonsPage },
      (_, i) => startPage + i
    );

    this.pageRange = pageRange;
    this.currentPage = pageRange[0];
    this.currentPageOuput.emit(this.currentPage);
  }

  showLastPage() {
    let lastpageButtons =
      this.totalPages() -
      Math.floor(this.totalPages() / this.totalButtonsPage) *
        this.totalButtonsPage;

    let pageRange = Array.from(
      { length: lastpageButtons },
      (_, i) =>
        i +
        Math.floor(this.totalPages() / this.totalButtonsPage) *
          this.totalButtonsPage +
        1
    );
    this.pageRange = pageRange;
    this.currentPage = this.totalPages();
    this.currentPageOuput.emit(this.currentPage);
  }
}
