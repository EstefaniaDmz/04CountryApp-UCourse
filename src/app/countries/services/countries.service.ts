import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
    private apiUrl: string = 'https://restcountries.com/v3.1/';

    constructor(private http: HttpClient) { }
    
    public searchByCapital(term: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.apiUrl}capital/${term}`)
        .pipe(
            catchError(error => of([]))
        );
    }

    public searchCountry(term: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.apiUrl}name/${term}`)
        .pipe(
            catchError(error => of([]))
        );
    }

    public searchRegion(region: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.apiUrl}region/${region}`)
        .pipe(
            catchError(error => of([]))
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