import { Directive, AfterContentInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {
  @Input() public appAutoFocus: boolean;


  public constructor(private el: ElementRef) { }

  public ngAfterContentInit() {
    setTimeout(() => {

      this.el.nativeElement.focus();

    }, 500);
  }

}
