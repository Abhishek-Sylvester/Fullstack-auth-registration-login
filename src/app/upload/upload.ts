import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-upload',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  selectedFiles: File[] = []
  uploadedUrls: String[] = []
  uploading = false;
  progress = 0;
  uploadSuccess = false;

  constructor(private http: HttpClient, private AuthService:Auth) {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.uploadSuccess = false;
  }

  clearFile() {
    this.selectedFiles = [];
    this.uploadSuccess = false;
  }

  upload() {
    console.log("Upload function called")
    if (!this.selectedFiles) return;
    const formData = new FormData();
    this.selectedFiles.forEach(file=> formData.append('file', file));
    

    this.uploading = true;
    this.progress = 0;

    this.AuthService.upload(formData)

    this.http.post('http://localhost:8080/api/auth/s3/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Inside if")
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log("Inside else if")
          this.uploading = false;
          this.uploadSuccess = true;
          this.selectedFiles = [];
          this.uploadedUrls = event.body;
        }
      },
      error: () => { this.uploading = false; }
    });
  }
}
