import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalElementService {
  externalElement!: ElementRef;
  constructor() { }
}
