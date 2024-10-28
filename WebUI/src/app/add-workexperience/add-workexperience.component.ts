import { Component } from '@angular/core';
import { WorkExperienceService } from '../_services/work-experience.service';
import { WorkExperience } from '../models/work-experience';

@Component({
  selector: 'app-add-workexperience',
  templateUrl: './add-workexperience.component.html',
  styleUrls: ['./add-workexperience.component.css']
})
export class AddWorkexperienceComponent {
  newExperience: WorkExperience = { jobTitle: '', companyName: '', duration: '', description: '' };

  constructor(private workExperienceService: WorkExperienceService) { }

  addWorkExperience(): void {
    this.workExperienceService.addWorkExperience(this.newExperience).subscribe(
      response => {
        console.log('Work experience added successfully', response);
        this.newExperience = { jobTitle: '', companyName: '', duration: '', description: '' };
      },
      error => {
        console.error('Error adding work experience', error);
      }
    );
  }
}
