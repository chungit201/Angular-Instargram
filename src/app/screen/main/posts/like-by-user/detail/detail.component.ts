import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnChanges {
  @Input() userLike: any;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.userLike.currentValue) return;
    document.querySelector('#data-like-user')!.innerHTML =
      changes.userLike.currentValue
        .map((value: any) => {
          let avt;
          if (value.avatar) {
            avt = `
            <img
          class="w-12 h-12 rounded-full"
          *ngIf="${value.avatar}"
          src="${value.avatar}"
          alt="User Picture"
        />
            `;
          } else {
            avt = `<img
            class="w-12 h-12 rounded-full"
            src="assets/default-user.png"
            alt="User Picture"
          />`;
          }
          return `
        <a routerLink="/profile/${value._id}" class="flex items-center">
        ${avt}
        
        <span style="color: rgb(48, 48, 48); font-weight: 600" class="ml-4">${value.name}</span>
      </a>
        `;
        })
        .join('');
  }
}
