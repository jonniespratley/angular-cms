###
    App.coffee

    This is the protractor spec that will test the different areas of the application.
###



#UsersPage
UsersPage = () ->
	get: () ->
		browser.get('http://localhost:9000/#/pages')

	#Logic to add values to the form.
	setForm: () ->
		#
