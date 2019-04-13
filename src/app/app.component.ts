import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HereService } from "./here.service";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

declare var H: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   public query: string;
   public query2: string;
   public platform: any;
   public geocoder: any;
   public locations: Array<any>;

	public ngOnInit() { }

    @ViewChild("map")
    public mapElement: ElementRef;

    public constructor(private here: HereService) {
        this.platform = new H.service.Platform({
            "app_id": "sug0MiMpvxIW4BhoGjcf",
            "app_code": "GSl6bG5_ksXDw4sBTnhr_w"
        });
        this.geocoder = this.platform.getGeocodingService();
        this.query = " ";
        this.query2 = " ";

    }

   

    public getAddress() {
    if(this.query2 != "") {
        this.here.getAddress(this.query2).then(result => {
            this.locations = <Array<any>>result;
        }, error => {
            console.error(error);
        });
    }
}
}
