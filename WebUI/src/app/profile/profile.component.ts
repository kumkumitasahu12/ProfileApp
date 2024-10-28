import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { Router } from '@angular/router';
import { Skill } from '../models/skill';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  selectedFile: File | null = null;
  isEditing: boolean = false;
  isAddingSkill: boolean = false;
  newSkill: string = '';
  isAddingCertificate: boolean = false;
  newCertificateName: string = '';
  newCertificateIssuer: string = '';

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = data;

        // Check if skills have values and extract them
        if (this.profile.skills && this.profile.skills.$values) {
          this.profile.skills = this.profile.skills.$values.map((skill: Skill) => skill.name); 
        } else {
          this.profile.skills = []; // Ensure skills is an array
        }

        console.log('Fetched profile:', this.profile);
      },
      (error) => {
        console.error('Error fetching profile data', error);
      }
    );
  }

  // Toggle edit mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  // Update the profile details
  updateProfile() {
    const updatedData = {
      name: this.profile.name,
      phone: this.profile.phone,
      email: this.profile.email,
      age: this.profile.age,
      address: this.profile.address
    };

    this.profileService.updateProfile(updatedData).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        this.isEditing = false; // Exit edit mode after successful update
        this.fetchProfile(); // Refresh the profile data
      },
      error => {
        console.error('Error updating profile', error);
      }
    );
  }

  // Open file input for editing the profile picture
  editProfilePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.selectedFile = target.files[0];
        this.uploadProfilePicture();
      }
    };
    fileInput.click();
  }

  // Upload the selected profile picture
  uploadProfilePicture() {
    if (this.selectedFile) {
      this.profileService.uploadProfilePicture(this.selectedFile).subscribe(
        response => {
          console.log('Profile picture uploaded successfully', response);
          this.fetchProfile(); // Fetch updated profile to reflect new picture URL
        },
        error => {
          console.error('Error uploading profile picture', error);
        }
      );
    }
  }

  // Navigate to the work experience section
  navigateToWorkExperience() {
    this.router.navigate(['/workexperience']);
  }

  // Toggle adding skill form
  toggleAddSkill() {
    this.isAddingSkill = !this.isAddingSkill;
    this.newSkill = ''; // Clear input when toggling
  }

  // Add a new skill
  onAddSkill() {
    if (this.newSkill) {
      this.profileService.addSkill(this.newSkill).subscribe(
        response => {
          console.log('Skill added successfully:', response);
          this.fetchProfile(); // Refresh profile to show updated skills
          this.newSkill = ''; // Clear skill input
          this.isAddingSkill = false; // Close add skill form
        },
        error => {
          console.error('Error adding skill:', error);
        }
      );
    }
  }
  // Toggle adding certificate form
  toggleAddCertificate() {
    this.isAddingCertificate = !this.isAddingCertificate;
    this.newCertificateName = ''; // Clear input when toggling
    this.newCertificateIssuer = ''; // Clear input when toggling
  }

  // Add a new certificate
  onAddCertificate() {
    if (this.newCertificateName && this.newCertificateIssuer) {
      const certificateDto = {
        name: this.newCertificateName,
        issuer: this.newCertificateIssuer
      };

      this.profileService.addCertificate(certificateDto).subscribe(
        response => {
          console.log('Certificate added successfully:', response);
          this.fetchProfile(); // Refresh profile to show updated certificates
          this.newCertificateName = ''; // Clear input
          this.newCertificateIssuer = ''; // Clear input
          this.isAddingCertificate = false; // Close add certificate form
        },
        error => {
          console.error('Error adding certificate:', error);
        }
      );
    }
  }
}
