import { Component, OnInit } from '@angular/core';
import { WorkExperience } from '../models/work-experience';
import { WorkExperienceService } from '../_services/work-experience.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  workExperiences: WorkExperience[] = [];

  constructor(private workExperienceService: WorkExperienceService) { }

  ngOnInit(): void {
    this.workExperienceService.workExperiences$.subscribe(
      (experiences) => {
        this.workExperiences = experiences; 
      }
    );

    this.workExperienceService.fetchWorkExperiences();
  }
}
