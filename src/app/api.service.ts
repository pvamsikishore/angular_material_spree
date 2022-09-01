import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private itemsSubject = new BehaviorSubject<any[]>([]);
    items$ = this.itemsSubject.asObservable();
    constructor(private _http: HttpClient) {
        let existingCartItems: any = []
        if (localStorage.getItem('products')) {
            existingCartItems = JSON.parse(localStorage.getItem('products') as string);
        }
        this.itemsSubject.next(existingCartItems);
    }
    addToCart(product: any) {
        this.items$.pipe(
            take(1),
            map((products) => {
                products.push(product);
                localStorage.setItem('products', JSON.stringify(products));
            }),
        ).subscribe();
    }
    postFinal(data: any) {
        return this._http.post<any>(" http://localhost:3000/user", data).pipe(map((res: any) => {
            return res;
        }))
    }
    getFinal() {
        return this._http.get<any>(" http://localhost:3000/user").pipe(map((res: any) => {
            return res;
        }))
    }
    updateFinal(data: any, id: number) {
        return this._http.put<any>(" http://localhost:3000/user/" + id, data).pipe(map((res: any) => {
            return res;
        }))
    }
    deletFinal(id: number) {
        return this._http.delete<any>(" http://localhost:3000/user/" + id).pipe(map((res: any) => {
            return res;
        }))
    }
}
