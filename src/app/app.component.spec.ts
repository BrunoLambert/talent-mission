import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // simula um snapshot, params ou queryParams se necessário
            params: of({}), // ou snapshot: { params: { id: '123' } }
            queryParams: of({}),
          },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Talent-Mission' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Talent-Mission');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Talent Mission');
  });

  it('should render all sidebar links', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const expectedLinks = ['Home', 'New Consent', 'Consent List'];
    const linkElements = compiled.querySelectorAll('.side-bar ul li');

    expect(linkElements.length).toBe(expectedLinks.length);

    expectedLinks.forEach((text, index) => {
      expect(linkElements[index].textContent?.trim()).toContain(text);
    });
  });

});
