import { AfterContentChecked, AfterViewInit } from '@angular/core';
import { AfterContentInit, AfterViewChecked, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-cycle',
  templateUrl: './live-cycle.component.html',
  styleUrls: ['./live-cycle.component.scss']
})
// tslint:disable-next-line: max-line-length
export class LiveCycleComponent implements OnInit, DoCheck, AfterViewChecked, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewInit {

  show: boolean;
  foods = ['Bacon', 'Lettuce', 'Tomatoes'];

  constructor() {
    console.log('********** LiveCycleComponent constructor ...');
  }


  check(): boolean {
    console.log('-----check --------********** LiveCycleComponent view checked ********');

    return true;
  }

  ngOnInit(): void {
    this.show = this.check();
    console.log('LiveCycleComponent ngOnInit ...');

    setTimeout(() => {
      this.foods = [...this.foods, '55555'];
      }, 6000);
  }

  ngDoCheck(): void {
    console.log('********** LiveCycleComponent ngDoCheck ...');
  }

  addFood(food) {
    this.foods = [...this.foods, food];
    //this.foods.push(food);
  }

  ngAfterViewChecked(): void {
    console.log('**********LiveCycleComponent ngAfterViewChecked ...');
  }
  ngOnDestroy(): void {
    console.log('**********LiveCycleComponent ngOnDestroy ...');
  }

  ngAfterContentInit(): void {
    console.log('**********LiveCycleComponent ngAfterContentInit ...');
  }
  ngAfterContentChecked(): void {
    console.log('**********LiveCycleComponent ngAfterContentChecked ...');
  }
  ngAfterViewInit(): void {
    console.log('**********LiveCycleComponent ngAfterViewInit ...');
  }
}
