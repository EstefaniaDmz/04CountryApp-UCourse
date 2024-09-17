import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  constructor(private _countriesService: CountriesService){}

  public countries: Country[] = [];
  public isLoading: boolean = false;

  public searchByName(term: string): void {
    this.isLoading = true;
    this._countriesService.searchCountry(term)
      .subscribe(c => {
        this.countries = c;
        this.isLoading = false;
      });
  };
}
