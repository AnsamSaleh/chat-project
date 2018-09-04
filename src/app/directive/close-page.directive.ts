import {Directive, ElementRef, HostBinding, HostListener, OnInit, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[appClosePage]'
})
export class ClosePageDirective implements OnInit, OnDestroy {

  constructor(private el: ElementRef , private renderer: Renderer2) {}
  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }
  ngOnDestroy() {
    document.body.style.overflow = '';
  }
  @HostListener('click') onClick() {
    this.el.nativeElement.style.display = 'none';
  }

}
