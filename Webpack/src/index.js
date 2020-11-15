import $ from 'jquery';
import 'bootstrap';
import './styles/styles.scss';

$('#demo').html('Bonjour :)');


import { of } from 'rxjs';
import { every, tap } from 'rxjs/operators';
const numbers = of(1, 2, 3, 4, 5, 45);  
numbers.pipe(
    tap(x=> console.log('emit => ',x)),
    every(x  => x< 10 )
    ).subscribe(v => console.log(v));
