import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  //Subject: tipo especial de Observable, se puede hacer todo con lo que hacemos los observables
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;
  
  @ViewChild('txtInput') txtInput!: ElementRef<HTMLInputElement>;

  @Output() public onValue: EventEmitter<string> = new EventEmitter();
  
  @Output() public onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() public placeholder: string = '';

  @Input() public inputValue: string = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe() ;
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
