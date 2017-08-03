import { AngularStreamPage } from './app.po';

describe('angular-stream App', () => {
  let page: AngularStreamPage;

  beforeEach(() => {
    page = new AngularStreamPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
