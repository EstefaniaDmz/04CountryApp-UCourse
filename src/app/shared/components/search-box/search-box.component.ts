import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {
  //Subject: tipo especial de Observable, se puede hacer todo con lo que hacemos los observables
  private debouncer: Subject<string> = new Subject<string>();

  @ViewChild('txtInput') txtInput!: ElementRef<HTMLInputElement>;

  @Output() public onValue: EventEmitter<string> = new EventEmitter();
  
  @Output() public onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() public placeholder: string = '';

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    });
  }

  onKeyPress(searchTerm: string) { 
    this.debouncer.next(searchTerm);
  }

  public getInputText(): void { 
    const input = this.txtInput.nativeElement.value;
    this.onValue.emit(input);
    this.txtInput.nativeElement.value = '';
  }
}
