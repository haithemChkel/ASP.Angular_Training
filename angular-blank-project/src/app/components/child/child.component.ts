import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line: max-line-length
export class ChildComponent implements OnInit, DoCheck, AfterViewChecked, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewInit {

  @Input() data;

  constructor() {
    console.log('--------- ChildComponent constructor ...');
  }

  check(): void {
    // console.log('--------- ChildComponent view checked ');
  }

  ngOnInit(): void {
    console.log('---------ChildComponent ngOnInit ...');

  }

  ngDoCheck(): void {
    console.log('---------ChildComponent ngDoCheck ...');
  }

  ngAfterViewChecked(): void {
    console.log('---------ChildComponent ngAfterViewChecked ...');
  }
  ngOnDestroy(): void {
    console.log('---------ChildComponent ngOnDestroy ...');
  }
  ngAfterContentInit(): void {
    console.log('---------ChildComponent ngAfterContentInit ...');
  }
  ngAfterContentChecked(): void {
    console.log('---------ChildComponent ngAfterContentChecked...');
  }
  ngAfterViewInit(): void {
    console.log('---------ChildComponent ngAfterViewInit ...');
  }
}
