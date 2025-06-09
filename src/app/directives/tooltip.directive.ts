import { Directive, ElementRef, HostListener, Input, Renderer2, ViewContainerRef, ComponentRef, input } from '@angular/core';
import { TooltipComponent } from '../components/tooltip.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
 tooltipText = input<string>('', { alias: 'appTooltip' });
  tooltipDelay = input<number>(100); 
  
  private tooltipComponent: ComponentRef<TooltipComponent> | null = null;
  private showTimeout: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef
  ) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    if (this.tooltipText()) {
      this.showTimeout = setTimeout(() => {
        this.showTooltip(event);
      }, this.tooltipDelay());
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    clearTimeout(this.showTimeout);
    this.hideTooltip();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.hideTooltip();
  }

  private showTooltip(event: MouseEvent): void {
    this.hideTooltip();
    
    this.tooltipComponent = this.viewContainer.createComponent(TooltipComponent);
    this.tooltipComponent.setInput('text', this.tooltipText());
    this.tooltipComponent.setInput('left', event.clientX);
    this.tooltipComponent.setInput('top', event.clientY);
    
    document.body.appendChild(this.tooltipComponent.location.nativeElement);
  }

  private hideTooltip(): void {
    if (this.tooltipComponent) {
      this.tooltipComponent.destroy();
      this.tooltipComponent = null;
    }
  }
}
