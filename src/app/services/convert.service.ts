import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ConvertService {

  private apiUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient) {}

  // Exemple : Récupérer des données depuis l'API Python
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data`);
  }

  // Exemple : Envoyer des données à l'API Python
  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/process`, data, { headers });
  }
}
