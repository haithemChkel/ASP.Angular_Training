import { AfterContentChecked, AfterViewInit } from '@angular/core';
import { AfterContentInit, AfterViewChecked, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-cycle',
  templateUrl: './live-cycle.component.html',
  styleUrls: ['./live-cycle.component.scss']
})
// tslint:disable-next-line: max-line-length
export class LiveCycleComponent implements OnInit, AfterViewChecked, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewInit {

  show: boolean;

  constructor() { }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked ...');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy ...');
  }
  ngDoCheck(): void {
    console.log('ngDoCheck ...');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit ...');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked ...');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit ...');
  }
  ngOnInit(): void {
    console.log('ngOnInit ...');
  }

}
