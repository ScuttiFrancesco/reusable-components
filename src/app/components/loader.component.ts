import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `
    <div 
      class="loader-container"
      [style.backgroundColor]="overlayColor()"
      [style.position]="position()"
      [style.zIndex]="zIndex()"
    >
      @switch (type()) {
        @case ('spinner') {
          <div 
            class="spinner"
            [style.width.px]="size()"
            [style.height.px]="size()"
            [style.borderColor]="spinnerColor"
          ></div>
        }
        @case ('dots') {
          <div class="dots-loader">
            <div class="dot" [style.backgroundColor]="primaryColor()"></div>
            <div class="dot" [style.backgroundColor]="primaryColor()"></div>
            <div class="dot" [style.backgroundColor]="primaryColor()"></div>
          </div>
        }
        @case ('pulse') {
          <div 
            class="pulse-loader"
            [style.width.px]="size()"
            [style.height.px]="size()"
            [style.backgroundColor]="primaryColor()"
          ></div>
        }
        @case ('wave') {
          <div class="wave-loader">
            @for (bar of wavesBars; track $index) {
              <div 
                class="wave-bar"
                [style.backgroundColor]="primaryColor()"
                [style.animationDelay.ms]="$index * 100"
              ></div>
            }
          </div>
        }
        @default {
          <div 
            class="spinner"
            [style.width.px]="size()"
            [style.height.px]="size()"
            [style.borderColor]="spinnerColor"
          ></div>
        }
      }
      
      @if (showText()) {
        <div 
          class="loader-text"
          [style.color]="textColor()"
          [style.fontSize.rem]="textSize()"
        >
          {{ text() }}
        </div>
      }
    </div>
  `,
  styles: `
    .loader-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      gap: 20px;
    }

    /* Spinner Loader */
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Dots Loader */
    .dots-loader {
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite both;
    }

    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Pulse Loader */
    .pulse-loader {
      border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    /* Wave Loader */
    .wave-loader {
      display: flex;
      gap: 4px;
      align-items: end;
    }

    .wave-bar {
      width: 6px;
      height: 40px;
      border-radius: 3px;
      animation: wave 1.2s ease-in-out infinite;
    }

    @keyframes wave {
      0%, 40%, 100% {
        transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1);
      }
    }

    /* Text */
    .loader-text {
      font-family: 'Arial', sans-serif;
      font-weight: 500;
      text-align: center;
      animation: textPulse 2s ease-in-out infinite;
    }

    @keyframes textPulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }
  `
})
export class LoaderComponent {
  // Loader configuration
  type = input<'spinner' | 'dots' | 'pulse' | 'wave'>('spinner');
  size = input<number>(50);
  primaryColor = input<string>('rgb(184, 0, 0)');
  overlayColor = input<string>('rgba(255, 255, 255, 0.75)');
  position = input<string>('fixed');
  zIndex = input<number>(9999);
  
  // Text configuration
  showText = input<boolean>(true);
  text = input<string>('Loading...');
  textColor = input<string>('#374151');
  textSize = input<number>(1.1);
  
  // Computed properties
  get spinnerColor() {
    return `rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) ${this.primaryColor()}`;
  }
  
  // Wave bars array
  wavesBars = Array(5).fill(0);
}
