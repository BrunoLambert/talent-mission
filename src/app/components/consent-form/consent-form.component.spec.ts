import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { ConsentFormComponent } from './consent-form.component';
import { By } from '@angular/platform-browser';
import { LOCAL_STORAGE_KEY } from '../../mock/mock-fetch';

describe('ConcentFormComponent', () => {
  let component: ConsentFormComponent;
  let fixture: ComponentFixture<ConsentFormComponent>;

  const generateFakerData = () => {
    return {
      fakerName: faker.person.firstName(),
      fakerEmail: faker.internet.email(),
      fakerNewsletter: faker.helpers.arrayElement([true, false]),
      fakertargetedAds: faker.helpers.arrayElement([true, false]),
      fakerStatistics: faker.helpers.arrayElement([true, false])
    }
  }

  const fillTheInputs = () => {
    const nomeInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;

    const newsletterCheckbox = fixture.debugElement.query(By.css('input[name="newsletter"]')).nativeElement;
    const targetedAdsCheckbox = fixture.debugElement.query(By.css('input[name="targetedAds"]')).nativeElement;
    const statisticsCheckbox = fixture.debugElement.query(By.css('input[name="statistics"]')).nativeElement;

    const { fakerEmail, fakerName, fakerNewsletter, fakerStatistics, fakertargetedAds } = generateFakerData()

    nomeInput.value = fakerName;
    emailInput.value = fakerEmail;

    newsletterCheckbox.checked = fakerNewsletter;
    targetedAdsCheckbox.checked = fakertargetedAds;
    statisticsCheckbox.checked = fakerStatistics;

    nomeInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    newsletterCheckbox.dispatchEvent(new Event('change'));
    targetedAdsCheckbox.dispatchEvent(new Event('change'));
    statisticsCheckbox.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    return { fakerName, fakerEmail, fakerNewsletter, fakertargetedAds, fakerStatistics };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsentFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update model values', () => {
    const { fakerEmail, fakerName, fakerNewsletter, fakerStatistics, fakertargetedAds } = fillTheInputs()

    expect(component.name).toBe(fakerName)
    expect(component.email).toBe(fakerEmail)
    expect(component.consent.newsletter).toBe(fakerNewsletter)
    expect(component.consent.statistics).toBe(fakerStatistics)
    expect(component.consent.targetedAds).toBe(fakertargetedAds)
  })

  it("should save on LocalStorage", () => {
    const { fakerEmail, fakerName, fakerNewsletter, fakerStatistics, fakertargetedAds } = fillTheInputs()
    const submitButton = fixture.debugElement.query(By.css('button#submit-btn')).nativeElement;

    spyOn(localStorage, 'getItem').and.returnValue('[]');
    const setItemSpy = spyOn(localStorage, 'setItem');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges()

    expect(setItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, JSON.stringify([
      {
        name: fakerName,
        email: fakerEmail,
        consent: {
          newsletter: fakerNewsletter,
          targetedAds: fakertargetedAds,
          statistics: fakerStatistics
        }
      }
    ]))
  })

  it("should show error message on empty email", () => {
    expect(fixture.debugElement.query(By.css('.errorMessage'))).toBeNull()

    const submitButton = fixture.debugElement.query(By.css('button#submit-btn')).nativeElement;
    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges()

    const errorMessage = fixture.debugElement.query(By.css('.errorMessage')).nativeElement;

    expect(errorMessage).toBeTruthy()
    expect(errorMessage.textContent.trim()).toBe("E-mail inválido")
  })

  it("should show error message on invalid email", () => {
    expect(fixture.debugElement.query(By.css('.errorMessage'))).toBeNull()

    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    emailInput.value = "email@prov"
    emailInput.dispatchEvent(new Event('input'));

    const submitButton = fixture.debugElement.query(By.css('button#submit-btn')).nativeElement;
    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges()

    const errorMessage = fixture.debugElement.query(By.css('.errorMessage')).nativeElement;

    expect(errorMessage).toBeTruthy()
    expect(errorMessage.textContent.trim()).toBe("E-mail inválido")
  })
});
