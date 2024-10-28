import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkExperience } from '../models/work-experience';
import { WorkExperienceResponse } from '../models/workExperienceResponse';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private workExperiencesSubject = new BehaviorSubject<WorkExperience[]>([]);
  workExperiences$ = this.workExperiencesSubject.asObservable();
  private apiUrl = 'https://localhost:5001/api/WorkExperience';

  constructor(private http: HttpClient) { }

  // Fetch work experiences and update the BehaviorSubject
  fetchWorkExperiences(): void {
    this.http.get<WorkExperienceResponse>(this.apiUrl).subscribe(
      (response) => {
        if (response && response.$values && Array.isArray(response.$values)) {
          this.workExperiencesSubject.next(response.$values);
        } else {
          console.warn('Unexpected response structure:', response);
          this.workExperiencesSubject.next([]); // Reset to empty array if unexpected
        }
      },
      (error) => {
        console.error('Error fetching work experiences', error);
        this.workExperiencesSubject.next([]); // Reset on error
      }
    );
  }

  // Add a new work experience and update the BehaviorSubject
  addWorkExperience(workExperience: WorkExperience): Observable<WorkExperience> {
    return this.http.post<WorkExperience>(this.apiUrl, workExperience).pipe(
      tap((newExperience) => {
        const currentExperiences = this.workExperiencesSubject.value;
        this.workExperiencesSubject.next([...currentExperiences, newExperience]);
      })
    );
  }
}
