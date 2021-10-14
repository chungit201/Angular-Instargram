import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { UserService } from 'src/app/services/user.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private storage: AngularFireStorage,
    private userService: UserService
  ) {}
  private avatar?: any;
  private task?: AngularFireUploadTask;
  private downloadURL?: any;
  public dataUser?: any;
  public loading: boolean = false;
  ngOnInit(): void {
    this.getDataUser();
  }

  userForm = new FormGroup({
    name: new FormControl('', [Validators.maxLength(50)]),
    gender: new FormControl('', [Validators.required]),
    birthday: new FormControl(''),
    avatar: new FormControl(''),
  });

  public updateProfile(): void {
    let image = this.avatar;
    if (!image) {
      this.updateProfileDontHasAvatar();
    } else {
      this.updateProfileHasAvatar(image);
    }
  }

  private setValueForm(): void {
    this.userForm.patchValue({
      name: this.dataUser.name,
      gender: this.dataUser.gender,
      birthday: this.dataUser.birthday,
    });
  }

  public getDataUser(): void {
    this.userService
      .profileDetail(this.userService.getID())
      .subscribe((data) => {
        this.dataUser = data;
        this.setValueForm();
      });
  }

  private updateProfileDontHasAvatar(): void {
    this.loading = true;
    const dataUpdate = [
      {
        name: this.userForm.value.name,
        birthday: this.userForm.value.birthday,
        gender: this.userForm.value.gender,
      },
    ];
    this.userService
      .updateProfileDetail(this.userService.getID(), dataUpdate)
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          location.reload();
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  private updateProfileHasAvatar(image: any): void {
    this.loading = true;
    const fileRef: any = this.storage.ref(`images/${image.name}`);
    this.task = fileRef.put(image);
    this.task
      ?.snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            const dataUpdate = [
              {
                name: this.userForm.value.name,
                avatar: url,
                birthday: this.userForm.value.birthday,
                gender: this.userForm.value.gender,
              },
            ];

            this.userService
              .updateProfileDetail(this.userService.getID(), dataUpdate)
              .subscribe(
                (data) => {
                  console.log(data);
                  this.loading = false;
                  location.reload();
                },
                (error) => {
                  console.log(error);
                  this.loading = false;
                }
              );
          });
        })
      )
      .subscribe();
  }

  public onFileChange(event: any) {
    this.avatar = event.target.files[0];
    console.log(this.avatar);
  }

  get name() {
    return this.userForm.controls;
  }

  get gender() {
    return this.userForm.controls;
  }
}
