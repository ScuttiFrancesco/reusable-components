import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="date-range-picker" [style.width]="width()">
      <div 
        class="date-inputs"
        [style.padding.px]="padding()"
        [style.border]="border()"
        [style.borderRadius.px]="borderRadius()"
        [style.backgroundColor]="backgroundColor()"
        [style.gap.px]="gap()"
      >
        <div class="input-group">
          <label 
            [style.fontSize.px]="labelFontSize()"
            [style.color]="labelColor()"
          >{{ startLabel() }}</label>
          <input
            type="date"
            [value]="startDate()"
            (change)="onStartDateChange($event)"
            [max]="endDate() || undefined"
            [disabled]="disabled()"
            class="date-input"
            [style.fontSize.px]="inputFontSize()"
            [style.width.px]="inputWidth()"
            [style.color]="inputColor()"
          />
        </div>
        
        <div 
          class="separator"
          [style.color]="separatorColor()"
          [style.fontSize.px]="separatorFontSize()"
        >{{ separator() }}</div>
        
        <div class="input-group">
          <label 
            [style.fontSize.px]="labelFontSize()"
            [style.color]="labelColor()"
          >{{ endLabel() }}</label>
          <input
            type="date"
            [value]="endDate()"
            (change)="onEndDateChange($event)"
            [min]="startDate() || undefined"
            [disabled]="disabled()"
            class="date-input"
            [style.fontSize.px]="inputFontSize()"
            [style.width.px]="inputWidth()"
            [style.color]="inputColor()"
          />
        </div>
        
        @if ((startDate() || endDate()) && showClearButton()) {
          <button 
            class="clear-btn"
            (click)="resetDateRange()"
            type="button"
            [style.color]="clearButtonColor()"
            [style.fontSize.px]="clearButtonSize()"
          >
            {{ clearButtonIcon() }}
          </button>
        }
        
        @if (showCalendarToggle()) {
          <button
            class="calendar-toggle"
            (click)="toggleCalendar()"
            type="button"
            [style.color]="calendarToggleColor()"
            [style.fontSize.px]="calendarToggleSize()"
          >
            {{ calendarIcon() }}
          </button>
        }
      </div>
      
      @if (showCalendar()) {
        <div class="calendar-overlay" (click)="closeCalendar()">
          <div 
            class="calendar" 
            (click)="$event.stopPropagation()"
            [style.borderRadius.px]="calendarBorderRadius()"
            [style.backgroundColor]="calendarBackgroundColor()"
            [style.minWidth.px]="calendarWidth()"
          >
            <div class="calendar-header" [style.marginBottom.px]="calendarHeaderMargin()">
              <button 
                (click)="previousMonth()" 
                type="button"
                [style.fontSize.px]="calendarNavSize()"
                [style.color]="calendarNavColor()"
              >{{ prevIcon() }}</button>
              <span 
                [style.fontSize.px]="calendarHeaderFontSize()"
                [style.color]="calendarHeaderColor()"
                [style.fontWeight]="calendarHeaderFontWeight()"
              >{{ currentMonth() }} {{ currentYear() }}</span>
              <button 
                (click)="nextMonth()" 
                type="button"
                [style.fontSize.px]="calendarNavSize()"
                [style.color]="calendarNavColor()"
              >{{ nextIcon() }}</button>
            </div>
            
            <div class="calendar-grid">
              <div class="weekdays" [style.gap.px]="calendarGap()">
                @for (day of weekdays(); track day) {
                  <div 
                    class="weekday"
                    [style.fontSize.px]="weekdayFontSize()"
                    [style.color]="weekdayColor()"
                    [style.fontWeight]="weekdayFontWeight()"
                  >{{ day }}</div>
                }
              </div>
              
              <div class="days" [style.gap.px]="calendarGap()">
                @for (day of calendarDays(); track day.date) {
                  <button
                    type="button"
                    class="day"
                    [class.other-month]="!day.currentMonth"
                    [class.selected]="isSelected(day.date)"
                    [class.in-range]="isInRange(day.date)"
                    [class.range-start]="isRangeStart(day.date)"
                    [class.range-end]="isRangeEnd(day.date)"
                    [style.padding.px]="dayPadding()"
                    [style.borderRadius.px]="dayBorderRadius()"
                    [style.fontSize.px]="dayFontSize()"
                    (click)="selectDate(day.date)"
                  >
                    {{ day.day }}
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .date-range-picker {
      position: relative;
      
    }

    .date-inputs {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      
    }

    .input-group label {
      font-size: 12px;
      color: #666;
      margin-bottom: 2px;
    }

    .date-input {
      border: none;
      outline: none;
      font-size: 14px;
      width: 100px;
    }

    .separator {
      color: #999;
      font-weight: bold;
    }

    .clear-btn {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      font-size: 16px;
      padding: 2px;
    }

    .clear-btn:hover {
      color: #333;
    }

    .calendar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .calendar {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      padding: 20px;
      min-width: 280px;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .calendar-header button {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 5px;
    }

    .calendar-grid .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      margin-bottom: 10px;
    }

    .weekday {
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      color: #666;
      padding: 5px;
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }

    .day {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .day:hover {
      background: #f0f0f0;
    }

    .day.other-month {
      color: #ccc;
    }

    .day.selected {
      background: #007bff;
      color: white;
    }

    .day.in-range {
      background: #e3f2fd;
    }

    .day.range-start,
    .day.range-end {
      background: #007bff;
      color: white;
    }

    .calendar-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px;
    }
    
    .calendar-toggle:hover {
      opacity: 0.7;
    }

    @media (max-width: 350px) {
      .date-range-picker {
        width: 100%;
      }
      
      .date-inputs {
        flex-direction: column;
        margin: 20px;
        width: 40% !important;
        height: 100px !important;
        gap: 0 !important;
      }
      
      .input-group {
        width: 100%;
      }
      
      .date-input {
        width: 100%;
      }
      
      .calendar {
        min-width: 100%;
      }
    }
  `
})
export class DateRangePickerComponent {
  // Container inputs
  width = input<string>('300px');
  padding = input<number>(10);
  border = input<string>('1px solid #ddd');
  borderRadius = input<number>(4);
  backgroundColor = input<string>('white');
  gap = input<number>(15);
  disabled = input<boolean>(false);
  
  // Label inputs
  startLabel = input<string>('Data inizio');
  endLabel = input<string>('Data fine');
  labelFontSize = input<number>(12);
  labelColor = input<string>('#666');
  
  // Input inputs
  inputFontSize = input<number>(14);
  inputWidth = input<number>(100);
  inputColor = input<string>('#333');
  
  // Separator inputs
  separator = input<string>('-');
  separatorColor = input<string>('#999');
  separatorFontSize = input<number>(16);
  
  // Button inputs
  showClearButton = input<boolean>(true);
  clearButtonIcon = input<string>('✕');
  clearButtonColor = input<string>('#999');
  clearButtonSize = input<number>(16);
  
  showCalendarToggle = input<boolean>(false);
  calendarIcon = input<string>('📅');
  calendarToggleColor = input<string>('#666');
  calendarToggleSize = input<number>(16);
  
  // Calendar inputs
  calendarWidth = input<number>(280);
  calendarBorderRadius = input<number>(8);
  calendarBackgroundColor = input<string>('white');
  calendarHeaderMargin = input<number>(20);
  calendarGap = input<number>(2);
  
  // Calendar header inputs
  calendarHeaderFontSize = input<number>(16);
  calendarHeaderColor = input<string>('#333');
  calendarHeaderFontWeight = input<string>('bold');
  calendarNavSize = input<number>(18);
  calendarNavColor = input<string>('#666');
  prevIcon = input<string>('‹');
  nextIcon = input<string>('›');
  
  // Calendar days inputs
  weekdayFontSize = input<number>(12);
  weekdayColor = input<string>('#666');
  weekdayFontWeight = input<string>('bold');
  dayPadding = input<number>(8);
  dayBorderRadius = input<number>(4);
  dayFontSize = input<number>(14);
  
  // Date format inputs
  locale = input<string>('it-IT');
  weekdays = input<string[]>(['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']);
  
  // Behavior inputs
  autoClose = input<boolean>(false);
  placeholder = input<string>('Seleziona intervallo date');
  
  // Outputs
  dateRangeChange = output<{start: string | null, end: string | null}>();
  
  // Internal state
  startDate = signal<string | null>(null);
  endDate = signal<string | null>(null);
  showCalendar = signal<boolean>(false);
  currentDate = signal<Date>(new Date());
  
  toggleCalendar() {
    this.showCalendar.set(!this.showCalendar());
  }

  onStartDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.startDate.set(value || null);
    this.emitChange();
  }

  onEndDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.endDate.set(value || null);
    this.emitChange();
  }

  resetDateRange() {
    this.startDate.set(null);
    this.endDate.set(null);
    this.emitChange();
  }

  openCalendar() {
    this.showCalendar.set(true);
  }

  closeCalendar() {
    this.showCalendar.set(false);
  }

  previousMonth() {
    const current = this.currentDate();
    this.currentDate.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  nextMonth() {
    const current = this.currentDate();
    this.currentDate.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  selectDate(date: string) {
    if (!this.startDate() || (this.startDate() && this.endDate())) {
      this.startDate.set(date);
      this.endDate.set(null);
    } else if (date < this.startDate()!) {
      this.startDate.set(date);
    } else {
      this.endDate.set(date);
      if (this.autoClose()) {
        this.closeCalendar();
      }
    }
    this.emitChange();
  }

  currentMonth = computed(() => {
    return this.currentDate().toLocaleDateString(this.locale(), { month: 'long' });
  });
  
  currentYear = computed(() => {
    return this.currentDate().getFullYear();
  });
  
  calendarDays = computed(() => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push({
        date: current.toISOString().split('T')[0],
        day: current.getDate(),
        currentMonth: current.getMonth() === month
      });
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  });

  isSelected(date: string): boolean {
    return date === this.startDate() || date === this.endDate();
  }

  isInRange(date: string): boolean {
    const start = this.startDate();
    const end = this.endDate();
    return !!(start && end && date > start && date < end);
  }

  isRangeStart(date: string): boolean {
    return date === this.startDate();
  }

  isRangeEnd(date: string): boolean {
    return date === this.endDate();
  }

  private emitChange() {
    this.dateRangeChange.emit({
      start: this.startDate(),
      end: this.endDate()
    });
  }
}
