import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
  @ViewChild('txtInput') txtInput!: ElementRef<HTMLInputElement>;

  @Output() public onValue: EventEmitter<string> = new EventEmitter();

  @Input() public placeholder: string = '';

  public getInputText(): void { 
    const input = this.txtInput.nativeElement.value;
    this.onValue.emit(input);
    this.txtInput.nativeElement.value = '';
  }
}
