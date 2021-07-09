import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage!: boolean;
  serverErrorMessage!: string;

  constructor(public userServices: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.userServices.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout( () => {
          this.showSuccessMessage = false
        }, 3000)
      },
      err => {
        if (err.status == 422) {
          this.serverErrorMessage = err.error.join('<br/>');
        } else {
          this.serverErrorMessage = "Something Went wrong. Please contact admin."
        }
      }
    )
  }

  resetForm( form: NgForm) {
    this.userServices.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessage ="";
  }

}
