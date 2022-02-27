import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FileUploadService } from "../shared/file-upload.service";
import { BehaviorSubject,Observable } from 'rxjs';
import { User } from '../shared/user';

@Component({
  selector: 'app-diaporama',
  templateUrl: './diaporama.component.html',
  styleUrls: ['./diaporama.component.css']
})
export class DiaporamaComponent implements OnInit {
 
  user: Observable<User> | undefined;
  users : Observable<User[]> | undefined;
  Users : User[] | undefined;

  constructor(public fileUploadService: FileUploadService) {
    
      this.getUsers();
    
  }

  ngOnInit() { 
    
  }

  getUsers() {
    this.users=this.fileUploadService.getUsers();
    this.users.subscribe(data => { this.Users=data['users']; console.log(this.Users)})
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
    },
    nav: true
  }

}
