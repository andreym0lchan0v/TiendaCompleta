import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStatusService {

  sidebarStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  status$: Observable<boolean> = this.sidebarStatus.asObservable();

  constructor() { }

  changeStatus(status: boolean) {
    this.sidebarStatus.next(status);
  }
}
