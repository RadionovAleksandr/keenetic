import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

export interface Route {
  uuid: string,
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  list: Route[] = [
    {uuid: '1', address: '170.155.5.235', interface: 'Argentina Castelar', gateway: '193.0.174.1', mask: '255.0.0.0'},
    {uuid: '2', address: '172.67.182.31', interface: 'United States', gateway: '0.0.0.0', mask: '255.0.0.0'},
    {uuid: '3', address: '203.32.120.22', interface: 'Virgin Islands, British', gateway: '0.0.0.0', mask: '255.0.0.0'},
    {uuid: '4', address: '45.14.174.36', interface: 'Germany', gateway: '0.0.0.0', mask: '255.0.0.0'},
    {uuid: '5', address: '23.227.38.48', interface: 'Canada', gateway: '0.0.0.0', mask: '255.0.0.0'},
    {uuid: '6', address: '203.23.104.105', interface: 'Cyprus', gateway: '193.0.174.10', mask: '255.0.0.0'},
    {uuid: '7', address: '91.243.35.157', interface: 'United Kingdom', gateway: '193.0.174.1', mask: '255.0.0.0'},
    {uuid: '8', address: '185.171.231.161', interface: 'United Kingdom London', gateway: '1.1.0.0', mask: '255.0.0.0'}
  ];

  getList(): Observable<Route[]> {
    return of(this.list);
  }
}
