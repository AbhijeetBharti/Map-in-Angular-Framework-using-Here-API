import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
declare var H: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    private ui: any;
    
    @Input()
    private search: any;
    
    @Input()
    public appId: any;

    @Input()
    public appCode: any;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    private platform: any;
    private map: any;

    public constructor() { }

    public ngOnInit() {
    this.platform = new H.service.Platform({
        "app_id": "sug0MiMpvxIW4BhoGjcf",
        "app_code": "GSl6bG5_ksXDw4sBTnhr_w"
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
}

    public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
            zoom: 2,
            center: { lat:0, lng: 0  }
        }
    );
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
}
    public places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
        for(let i = 0; i < data.results.items.length; i++) {
            this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);
        }
    }, error => {
        console.error(error);
    });
}

private dropMarker(coordinates: any, data: any) {
    let marker = new H.map.Marker(coordinates);
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
    marker.addEventListener('tap', event => {
        let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
            content: event.target.getData()
        });
        this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
}

}
