import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { CacheStore } from '../interfaces/cache-store.interface';
import { Country } from '../interfaces/country';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
    private apiUrl: string = 'https://restcountries.com/v3.1/';

    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] }
    };

    constructor(private http: HttpClient) { }
    
    private getCountriesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(error => of([])),
                // delay(1500)
            );
    }

    public searchByCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}capital/${term}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap(countries => this.cacheStore.byCapital = { term: term, countries } )
            );
    }

    public searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}name/${term}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byCountries = { term: term, countries } )
        );
    }

    public searchRegion(region: Region): Observable<Country[]> {
        const url = `${this.apiUrl}region/${region}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byRegion = { region: region, countries } )
        );
    }

    public searchByAlphaCode(code: string): Observable<Country | null> {
        return this.http.get<Country[]>(`${this.apiUrl}alpha/${code}`)
            .pipe(
                map(c => c.length > 0 ? c[0] : null),
                catchError(() => of(null))
            );
    }
}