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

    constructor(private http: HttpClient) { 
        this.loadFromLocalStorage();
    }
    
    private saveToLocalStorage(): void {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage(): void {
        if(!localStorage.getItem('cacheStore')) return;

        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }

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
                tap(countries => this.cacheStore.byCapital = { term: term, countries } ),
                tap(() => this.saveToLocalStorage())
            );
    }

    public searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}name/${term}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byCountries = { term: term, countries } ),
            tap(() => this.saveToLocalStorage())
        );
    }

    public searchRegion(region: Region): Observable<Country[]> {
        const url = `${this.apiUrl}region/${region}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byRegion = { region: region, countries } ),
            tap(() => this.saveToLocalStorage())
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