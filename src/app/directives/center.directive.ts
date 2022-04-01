import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCenter]'
})
export class CenterDirective {

  constructor(private element: ElementRef, private render: Renderer2) {
    render.setStyle(element.nativeElement,"text-align", "center");
  }

}
