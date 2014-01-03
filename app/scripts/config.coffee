window.Config =
	baseurl: document.location.origin
	sitetitle: "AngularCMS"
	sitedesc: "This is the description"
	email: "jonniespratley@me.com"
	debug: false
	features: [
		id: 1
		title: "HTML5"
		body: "Using HTML5 in every way to make a better user experience."
		image: "https://dl.dropboxusercontent.com/u/26906414/angular-cms/img/feature-html5.png"
	,
		id: 2
		title: "AngularJS"
		body: "The client-side framework of choice is Angular, its a full-stack."
		image: "https://dl.dropboxusercontent.com/u/26906414/angular-cms/img/feature-angular.png"
	,
		id: 3
		title: "Twitter Bootstrap"
		body: "The client-side UI of choice is Twitter Bootstrap 3.0."
		image: "https://dl.dropboxusercontent.com/u/26906414/angular-cms/img/feature-bootstrap.png"
	,
		id: 4
		title: "PhantomJS"
		body: "Fully testable with Jasmine Karma Runner Unit e2e with PhantomJS."
		image: "https://dl.dropboxusercontent.com/u/26906414/angular-cms/img/feature-phantomjs.png"
	,
		id: 5
		title: "NodeJS"
		body: "The server of choice is NodeJS, its fast and scalable."
		image: "https://dl.dropboxusercontent.com/u/26906414/angular-cms/img/feature-nodejs.png"
	,
		id: 6
		title: "MongoDB"
		body: "The database of choice is Mongo, its fast and scalable."
		image: "https://dl.dropboxusercontent.com/u/26906414/angular-cms/img/feature-mongodb.png"
	]

	session: 
		#FOr Demo
		user:
			email: 'jonniespratley@gmail.com'
			username: 'admin'
			password: 'fred'
			role: 3
	sidebar:
		value: "sidebar"
		url: "/views/partials/sidebar.html"

	navbar:
		value: "navbar"
		url: "/views/partials/navbar.html"

	layout:
		id: 0
		name: "Fixed"
		value: "container"

	theme:
		id: 0
		title: "Default"
		slug: "theme0"
		type: "theme"
		image: "/css/themes/theme0/splash.png"
		body: ""

	
	#I hold values for the compiled templates location, uncompiled location
	templates:
		compiled: "/dist/templates.html"
		uncompiled: "/views"

	menu:
		admin: [
			id: 1
			title: "Plugins"
			href: "/plugins"
			icon: "folder-open"
		,
		 id: 1
		 title: "Widgets"
		 href: "/widgets"
		 icon: "puzzle-piece"
		,
		 id: 1
		 title: "Media"
		 href: "/media"
		 icon: "file-upload"
		,
			id: 1
			title: "Users"
			href: "/users"
			icon: "group"
		,
			id: 1
			title: "Themes"
			href: "/themes"
			icon: "picture"
		,
			id: 1
			title: "Settings"
			href: "/settings"
			icon: "cog"
		]
		pub: [
			id: 1
			title: "What's New"
			icon: "star"
			href: "/index"
		]
		user: []

	
	#Install configuration
	config:
		currentdate: new Date()
		dateformats: ["medium", "short", "fullDate", "longDate", "mediumDate", "shortDate"]
		timeformats: ["mediumTime", "shortTime"]
		
		#Default date format
		dateformat: "medium"
		
		#Default time format
		timeformat: "shortTime"
		
		#Default timezone
		timezone: null
		servers: [
			name: "apiv1"
			host: "127.1.0.1"
			port: 3000
			body: "This is the v1 api server"
		,
			name: "apiv2"
			host: "127.1.0.1"
			port: 3000
			body: "This is the v2 api server"
		]
		
		#SocketIO configuration
		socketio:
			host: "127.1.0.1"
			port: 8081

		
		#Network configuration
		network:
			online: true
			cache: true

		
		#Database configuration
		database:
			host: "127.1.0.1"
			port: 27017
			name: "angular-cms"

		
		#API configuration.
		api:
			url: ""
			endpoint: "/api/"
			version: "v2"
			versions: ["v1", "v2"]

		live: false
		debug: true
		version: "0.0.1"
		formFactor: "desktop"
		currentOrientation: null
		cdns:
			http: "http://1ff1217913c5a6afc4c8-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.r26.cf1.rackcdn.com"
			https: "https://7fd8f70e662929940bdd-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.ssl.cf1.rackcdn.com"
			streaming: "http://4949e03d0fabf78f8c71-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.r26.stream.cf1.rackcdn.com"
			iosstreaming: "http://f0397ead16e1580b2c7f-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.iosr.cf1.rackcdn.com"

	options:
		layouts: [
			id: 0
			name: "Fixed"
			value: "container"
		,
			id: 1
			name: "Fluid"
			value: "container-fluid"
		]
		sidebars: [
			id: 1
			name: "Default"
			value: "sidebar"
			url: "/views/partials/sidebar.html"
		]
		navbars: [
			id: 1
			name: "Default"
			value: "navbar"
			url: "/views/partials/navbar.html"
		]
		backgrounds: [
			id: 0
			title: "Default"
		]
		themes: [
			id: 0
			title: "Default"
			slug: "theme0"
			type: "theme"
			image: "/css/themes/theme0/splash.png"
			body: ""
		]

	logout:
		redirect: "#/login"
		message: "Good bye..."

	login:
		logo: "https://7fd8f70e662929940bdd-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.ssl.cf1.rackcdn.com/img/logo-login-med.png"
		redirect: "/#/home"
		message: "Welcome {{user.username}}"