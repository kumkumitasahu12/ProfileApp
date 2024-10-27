import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://localhost:5001/api/Profile';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, userData);
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/picture`, formData);
  }

  addSkill(skillName: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Send the skillName directly as a string
    return this.http.post(`${this.apiUrl}/skills`, JSON.stringify(skillName), { headers });
  }
}
