import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoChatComponentComponent } from './no-chat-component.component';

describe('NoChatComponentComponent', () => {
  let component: NoChatComponentComponent;
  let fixture: ComponentFixture<NoChatComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoChatComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoChatComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
