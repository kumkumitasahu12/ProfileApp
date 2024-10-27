import { Component, OnInit } from '@angular/core';
import { WorkExperience } from '../models/work-experience';
import { WorkExperienceService } from '../_services/work-experience.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  newExperience: WorkExperience = { jobTitle: '', companyName: '', duration: '', description: '' };
  workExperiences: WorkExperience[] = [];

  constructor(private workExperienceService: WorkExperienceService) { }

  ngOnInit(): void {
    this.fetchWorkExperiences();
  }

  fetchWorkExperiences(): void {
    this.workExperienceService.getWorkExperiences().subscribe(
      (data) => {
        console.log('Fetched work experiences:', data);
        // Check if the response has the expected structure
        if (data && data.$values && Array.isArray(data.$values)) {
          this.workExperiences = data.$values;
        } else {
          console.warn('Expected an array in $values, but got:', data);
          this.workExperiences = [];
        }
      },
      (error) => {
        console.error('Error fetching work experiences', error);
        this.workExperiences = [];
      }
    );
  }


  addWorkExperience(): void {
    this.workExperienceService.addWorkExperience(this.newExperience).subscribe(
      response => {
        console.log('Work experience added successfully', response);
        this.workExperiences.push({ ...this.newExperience });
        this.newExperience = { jobTitle: '', companyName: '', duration: '', description: '' }; // Reset form
      },
      error => {
        console.error('Error adding work experience', error);
      }
    );
  }
}
