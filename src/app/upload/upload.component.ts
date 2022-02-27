import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from "../shared/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users:any = [];
  constructor(    
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService
    ) { 
      this.form = this.fb.group({
        comment: [''],
        photo: [null]
      })
    }

  ngOnInit(): void {
    
  }
    uploadFile(event:Event) {
   
      const element = event.target as HTMLInputElement;
      if (!element){
        return
      }else{
      const file = element.files[0];
      this.form.patchValue({
        photo: file
      });
      this.form.get('photo').updateValueAndValidity()
  
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      reader.readAsDataURL(file)
    
  }
    }

  submitForm() {
    this.fileUploadService.addUser(
      this.form.value.comment,
      this.form.value.photo
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.router.navigate(['diaporama'])
      }
    })
  }
}
