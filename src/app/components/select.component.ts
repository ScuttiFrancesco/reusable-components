import { Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  template: `
    <div class="select-container">
      @if (label()) {
      <label
        [style.fontSize.rem]="labelFontSize()"
        [style.color]="labelColor()"
        [style.fontWeight]="labelFontWeight()"
        [style.marginBottom.px]="labelMargin()"
      >
        {{ label() }}
      </label>
      }
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
      <select
        class="select"
        [value]="selectedValue()"
        [disabled]="disabled()"
        [style.width]="width()"
        [style.height.px]="height()"
        [style.padding.px]="padding()"
        [style.fontSize.rem]="fontSize()"
        [style.fontFamily]="fontFamily()"
        [style.color]="color()"
        [style.backgroundColor]="backgroundColor()"
        [style.border]="border()"
        [style.borderRadius.px]="borderRadius()"
        [style.boxShadow]="boxShadow()"
        [style.outline]="outline()"
        (change)="onSelectionChange($event)"
      >
        @if (placeholder()) {
        <option value="" disabled selected>{{ placeholder() }}</option>
        } @for (option of options(); track option.value) {
        <option [value]="option.value" [disabled]="option.disabled || false">
          {{ option.label }}
        </option>
        }
      </select>

      @if (showIcon()) {
      <div class="select-icon" [style.color]="iconColor()">
        {{ icon() }}
      </div>
      }</div>
    </div>
  `,
  styles: `
    .select-container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: fit-content;
    }

    .select {
      cursor: pointer;
      appearance: none;
      transition: all 0.3s ease;
      
    }

    .select:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .select:focus {
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }

    .select:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .select-icon {
        position: absolute;
        right: 10px;
        top: 45px;
     
      transform: translateY(-50%);
      pointer-events: none;
      font-size: 1rem;
    }

    label {
      display: block;
    }
  `,
})
export class SelectComponent {
  // Data inputs
  options = input<SelectOption[]>([]);
  selectedValue = input<string>('');
  placeholder = input<string>('Select an option');
  label = input<string>('');
  disabled = input<boolean>(false);

  // Styling inputs
  width = input<string>('200px');
  height = input<number>(40);
  padding = input<number>(12);
  fontSize = input<number>(1);
  fontFamily = input<string>('Arial, sans-serif');
  color = input<string>('#333');
  backgroundColor = input<string>('#fff');
  border = input<string>('1px solid #ccc');
  borderRadius = input<number>(6);
  boxShadow = input<string>('0 2px 4px rgba(0, 0, 0, 0.1)');
  outline = input<string>('none');

  // Label styling
  labelFontSize = input<number>(0.9);
  labelColor = input<string>('#555');
  labelFontWeight = input<string>('500');
  labelMargin = input<number>(6);

  // Icon
  showIcon = input<boolean>(true);
  icon = input<string>('▼');
  iconColor = input<string>('#666');

  // Outputs
  selectionChange = output<SelectOption>();

  // Computed
  selectedOption = computed(() => {
    return this.options().find((opt) => opt.value === this.selectedValue());
  });

  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = this.options().find(
      (opt) => opt.value === target.value
    );
    if (selectedOption) {
      this.selectionChange.emit(selectedOption);
    }
  }
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
