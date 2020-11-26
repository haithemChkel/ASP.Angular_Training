import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, OnInit } from '@angular/core';

declare var Cesium;

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  constructor(private el: ElementRef, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const scriptContent = await this.http.get('../assets/cesium/Cesium.js', { responseType: 'text' as 'json' }).toPromise();
    this.insertScript(scriptContent as string);
    if (Cesium !== undefined) {
      const viewer = new Cesium.Viewer(this.el.nativeElement);
    }
  }

  insertScript(scriptContent: string): void {
    const body = document.body;
    const script = document.createElement('script');
    script.innerHTML = scriptContent;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}

