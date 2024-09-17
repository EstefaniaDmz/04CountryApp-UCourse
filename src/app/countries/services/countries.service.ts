import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
    private apiUrl: string = 'https://restcountries.com/v3.1/';

    constructor(private http: HttpClient) { }
    
    private getCountriesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(error => of([])),
                delay(1500)
            );
    }

    public searchByCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}capital/${term}`;
        return this.getCountriesRequest(url);
    }

    public searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}name/${term}`;
        return this.getCountriesRequest(url);
    }

    public searchRegion(region: string): Observable<Country[]> {
        const url = `${this.apiUrl}region/${region}`;
        return this.getCountriesRequest(url);
    }

    public searchByAlphaCode(code: string): Observable<Country | null> {
        return this.http.get<Country[]>(`${this.apiUrl}alpha/${code}`)
            .pipe(
                map(c => c.length > 0 ? c[0] : null),
                catchError(() => of(null))
            );
    }
}