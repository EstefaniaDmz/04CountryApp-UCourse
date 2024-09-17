import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {
  constructor(private _countriesService: CountriesService){}

  public countries: Country[] = [];
  public isLoading: boolean = false;

  public searchByCapital(term: string): void {
    this.isLoading = true;
    this._countriesService.searchByCapital(term)
      .subscribe(c => {
        this.countries = c;
        this.isLoading = false;
      });
  }
}
