import { StateWithRxjsPage } from './app.po';

describe('state-with-rxjs App', () => {
  let page: StateWithRxjsPage;

  beforeEach(() => {
    page = new StateWithRxjsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
