import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { count, switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute,
    private _countriesService: CountriesService,
    private _route: Router
  ){}


  ngOnInit(): void {
    this._activatedRoute.params
    .pipe(
      switchMap(({id}) => this._countriesService.searchByAlphaCode(id))
    )
    .subscribe(country => {
      if(!country){
        return this._route.navigateByUrl('');
      }
      console.log(country);
      return;
    });
  }
}
