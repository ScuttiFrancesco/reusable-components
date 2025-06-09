import { Component, HostListener, input, OnInit, output } from '@angular/core';
import { BadgeComponent } from './badge.component';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [BadgeComponent, TooltipDirective],
  template: `
    <div
      [style]="checkboxContainer()"
      [style.backgroundColor]="backgroundColor()"
      [style.boxShadow]="boxShadow()"
      [style.width]="width()"
      [style.maxWidth]="maxWidth()"
      [style.height]="height()"
      [style.border]="border()"
      [style.borderRadius.px]="borderRadius()"
      [style.fontSize.rem]="fontSize()"
      [style.padding.px]="padding()"
      [style.display]="display()"
      [style.alignItems]="alignItem()"
      [style.justifyContent]="justifyContent()"
      [style.gap.px]="gap()"
      [style.gridTemplateColumns]="gridTemplateColumns"
      [style.gridAutoRows]="gridAutoRows()"
    >
      @for(badge of badgeList(); track $index){
      <div>
        <app-badge
          [title]="badge"
          [fontSize]="1.25"
          [appTooltip]="badge"
          [tooltipDelay]="300"
          (selection)="selectBadge($event)"
        />
      </div>
      }
    </div>
  `,
  styles: `
  .container{
    display: grid;
  }
  `,
})
export class CheckboxComponent implements OnInit {
  checkboxContainer = input<string>('');

  backgroundColor = input<string>('rgb(255, 255, 255)');
  boxShadow = input<string>('0 2px 4px rgba(0, 0, 0, 0.1)');
  width = input<string>('fit-content');
  maxWidth = input<string>('300px');
  height = input<string>('auto');
  border = input<string>('1px solid rgb(255, 255, 255)');
  borderRadius = input<number>(5);
  fontSize = input<number>(0.75);
  padding = input<number>(15);
  display = input<string>('grid');
  alignItem = input<string>('center');
  justifyContent = input<string>('center');
  gap = input<number>(16);
  gridColumn = input<string>('repeat(auto-fit, minmax(80px, max-content))');
  gridTemplateColumns = '';
  gridAutoRows = input<string>('min-content');
  badgeSelection = output<string[]>();
  selectedBadges: string[] = [];
  isMobile = false;

  badgeList = input<string[]>([
    'Piega',
    'Taglio',
    'Colore',
    'Shampoo',
    'Trattamento',
    'Acconciatura',
    'Extension',
    'Barba',
    'Sopracciglia',
    'Manicure',
  ]);

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth <= 375) {
      this.gridTemplateColumns = 'auto auto';
      this.isMobile = true;
    } else {
      this.gridTemplateColumns = this.gridColumn();
      this.isMobile = false;
    }
  }

  selectBadge(event: { isSelected: boolean; title: string }) {
    const { isSelected, title } = event;

    if (isSelected && !this.selectedBadges.includes(title)) {
      this.selectedBadges.push(title);
    } else {
      this.selectedBadges = this.selectedBadges.filter(
        (badge) => badge !== title
      );
    }
    this.badgeSelection.emit(this.selectedBadges);
  }
}
