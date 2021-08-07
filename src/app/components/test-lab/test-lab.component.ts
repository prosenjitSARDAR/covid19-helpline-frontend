import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ResourceDetails } from 'src/app/data_models/resource.model';
import { DataService } from 'src/app/modules/service/all services/data.service';

@Component({
  selector: 'app-test-lab',
  templateUrl: './test-lab.component.html',
  styleUrls: ['./test-lab.component.css']
})
export class TestLabComponent implements OnInit {

  private category: string = "test-lab";
  resources: ResourceDetails[];
  noResource: boolean = false;

  constructor(private _dataService: DataService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();
    this._dataService.getResources(this.category).subscribe((res) => {
      if (res['success'] == true) {
        this.resources = res['resources'];
        if (!this.resources || this.resources.length == 0) {
          this.noResource = true;
        }
      }
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error, 'Error!');
    })
  }

}
