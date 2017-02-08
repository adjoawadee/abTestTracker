import { AbTestTrackPage } from './app.po';

describe('ab-test-track App', function() {
  let page: AbTestTrackPage;

  beforeEach(() => {
    page = new AbTestTrackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
