import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkExperience } from '../models/work-experience';
import { WorkExperienceResponse } from '../models/workExperienceResponse';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private apiUrl = 'https://localhost:5001/api/WorkExperience';

  constructor(private http: HttpClient) { }
  
  getWorkExperiences(): Observable<WorkExperienceResponse> {
    return this.http.get<WorkExperienceResponse>(`${this.apiUrl}`);
  }

  addWorkExperience(workExperience: WorkExperience): Observable<any> {
    return this.http.post(`${this.apiUrl}`, workExperience); // Update endpoint as necessary
  }
}
