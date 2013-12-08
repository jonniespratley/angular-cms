describe "Angular-CMS App", ->
  it "should show home page", ->
    browser().navigateTo "/index.html"
    expect(element('.navbar-brand').text()).toEqual('angular-cms')
