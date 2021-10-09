import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { UserModel } from 'src/app/model/user-model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService) {}
  public search?: string;
  public dataSearch?: any = [];
  ngOnInit(): void {}

  public getSearch(): void {
    setTimeout(() => {
      this.searchService
        .searchToName(this.search!)
        .subscribe((data: UserModel[]) => {
          let { user }: any = data;
          this.dataSearch = [];
          this.dataSearch = user;
        });
    }, 300);
  }
}
