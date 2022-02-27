import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileUploadService } from "../shared/file-upload.service";
import { User } from '../shared/user';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  selectedOrder?:User;
  users : Observable<User[]> | undefined;
  Users : User[] | undefined;
  searchText:string| undefined;
  constructor(public fileUploadService: FileUploadService) { 
    
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.users=this.fileUploadService.getUsers();
    this.users.subscribe(data => { this.Users=data['users']; console.log(this.Users)})
  }
  delete(id: number) {
    this.fileUploadService.delete(id).subscribe(data => {
      console.log("deleted Image id:" +id)
      this.getUsers()
  },
    err => {
      console.log(err)
      this.getUsers()
  })
  }
  
}
