import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display "Location picker Leaflet Smart Widget>"', () => {
    expect(page.getTitleText()).toContain('Location picker Leaflet Smart Widget');
  });
});
