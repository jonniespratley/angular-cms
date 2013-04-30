/* This is the standard configuration file, this file holds settings and configuration 
 * globaly for the entire backend.
 */
'use strict';

var AppConfig = {
    baseurl: document.location.origin,
    sitetitle: 'angular-cms',
    sitedesc: 'This is a customizable CMS built with Angular.js',
    email: 'jonniespratley@me.com',
    debug: false,
    session: null,
    sidebar: {
        value: 'sidebar',
        url: '/views/partials/sidebar.html'
    },
    navbar: {
        value: 'navbar',
        url: '/views/partials/navbar.html'
    },
    layout: {
        id: 0,
        name: 'Fixed',
        value: 'container'
    },
    theme: {
        id: 0,
        title: 'Default',
        slug: 'theme0',
        type: 'theme',
        image: '/css/themes/theme0/splash.png',
        body: ''
    },
    //I hold values for the compiled templates location, uncompiled location
    templates: {
        compiled: '/dist/templates.html',
        uncompiled: '/views'
    },
    menu: {
        admin: [{
            id: 1,
            title: 'Settings',
            href: '/settings',
            icon: 'cog'
        }, {
            id: 1,
            title: 'Updates',
            href: '/updates',
            icon: 'refresh'
        }, {
            id: 1,
            title: 'Modules',
            href: '/modules',
            icon: 'cogs'
        }, {
            id: 1,
            title: 'Sync',
            href: '/sync',
            icon: 'refresh'
        }, {
            id: 1,
            title: 'Server',
            href: '/server',
            icon: 'cloud'
        }, {
            id: 1,
            title: 'Style Guide',
            href: '/styleguide',
            icon: 'pencil'
        }, {
            id: 1,
            title: 'Users',
            href: '/users',
            icon: 'group'
        }, {
            id: 1,
            title: 'Themes',
            href: '/themes',
            icon: 'picture'
        }
		],
        pub: [{
            id: 1,
            title: "What's New",
            icon: 'star',
            href: '/index'
        }],
        user: []
    },
    //Install configuration
    config: {
        currentdate: new Date(),
        dateformats: ['medium', 'short', 'fullDate', 'longDate', 'mediumDate', 'shortDate'],
        timeformats: ['mediumTime', 'shortTime'],
        //Default date format
        dateformat: 'medium',
        //Default time format
        timeformat: 'shortTime',
        //Default timezone
        timezone: null,
        servers: [{
            name: 'apiv1',
            host: '127.1.0.1',
            port: 3000,
            body: 'This is the v1 api server'
        }, {
            name: 'apiv2',
            host: '127.1.0.1',
            port: 3000,
            body: 'This is the v2 api server'
        }, {
            name: 'aps',
            host: '127.1.0.1',
            port: 3001,
            body: 'This is the Apple Push api server'
        }, {
            name: 'smartpass',
            host: '127.1.0.1',
            port: 3535,
            body: 'This is the Apple iOS Passbook api server'
        }, {
            name: 'webapp',
            host: '127.1.0.1',
            port: 3000,
            body: 'This is the webapp server'
        }],
        //SocketIO configuration
        socketio: {
            host: '127.1.0.1',
            port: 8081
        },
        //Network configuration
        network: {
            online: true,
            cache: true
        },
        //Database configuration
        database: {
            host: '127.1.0.1',
            port: 27017,
            name: 'myappmatrix'
        },
        //API configuration.
        api: {
			url: 'https://www.myappmatrix.com',
            endpoint: '127.1.0.1:8080/api/',
            version: 'v1',
            versions: ['v1', 'v2', 'v3']
        },
        live: false,
        debug: true,
        version: '0.0.1',
        formFactor: 'desktop',
        currentOrientation: null,
        cdns: {
            http: 'http://1ff1217913c5a6afc4c8-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.r26.cf1.rackcdn.com',
            https: 'https://7fd8f70e662929940bdd-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.ssl.cf1.rackcdn.com',
            streaming: 'http://4949e03d0fabf78f8c71-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.r26.stream.cf1.rackcdn.com',
            iosstreaming: 'http://f0397ead16e1580b2c7f-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.iosr.cf1.rackcdn.com'
        },
        globalTopNavigationObserver: null,
        sidebarMenuObserver: null,
        onAfterAuthentication: null,
        orientationObserverUpdate: null
    },
    options: {
        layouts: [{
            id: 0,
            name: 'Fixed',
            value: 'container'
        }, {
            id: 1,
            name: 'Fluid',
            value: 'container-fluid'
        }, {
            id: 2,
            name: 'Mobile',
            value: 'mobile-container'
        }],
        sidebars: [{
            id: 1,
            name: 'Default',
            value: 'sidebar',
            url: '/views/partials/sidebar.html'
        }, {
            id: 1,
            name: 'Sidebar 1',
            value: 'sidebar_1',
            url: '/views/partials/sidebar_1.html'
        }, {
            id: 2,
            name: 'Sidebar 2',
            value: 'sidebar_2',
            url: '/views/partials/sidebar_2.html'
        }, {
            id: 3,
            name: 'Sidebar 3',
            value: 'sidebar_3',
            url: '/views/partials/sidebar_3.html'
        }],
        navbars: [{
            id: 1,
            name: 'Default',
            value: 'navbar',
            url: '/views/partials/navbar.html'
        }, {
            id: 2,
            name: 'Navbar 2',
            value: 'navbar_2',
            url: '/views/partials/navbar_2.html'
        }, {
            id: 3,
            name: 'Navbar 3',
            value: 'navbar_3',
            url: '/views/partials/navbar_3.html'
        }, {
            id: 4,
            name: 'Navbar Mobile',
            value: 'navbar_mobile',
            url: '/views/partials/navbar_mobile.html'
        }],
        backgrounds: [{
            id: 0,
            title: 'Default'
        }, {
            id: 1,
            title: 'background-1'
        }, {
            id: 2,
            title: 'background-2'
        }, {
            id: 3,
            title: 'background-3'
        }, {
            id: 4,
            title: 'background-4'
        }, {
            id: 5,
            title: 'background-5'
        }, {
            id: 6,
            title: 'background-6'
        }, {
            id: 7,
            title: 'background-7'
        }, {
            id: 8,
            title: 'background-8'
        }, {
            id: 9,
            title: 'background-9'
        }, {
            id: 10,
            title: 'background-10'
        }, {
            id: 11,
            title: 'background-11'
        }, {
            id: 12,
            title: 'background-12'
        }, {
            id: 13,
            title: 'background-13'
        }, {
            id: 14,
            title: 'background-14'
        }, {
            id: 15,
            title: 'background-15'
        }, {
            id: 16,
            title: 'background-16'
        }, {
            id: 17,
            title: 'background-17'
        }, {
            id: 18,
            title: 'background-18'
        }, {
            id: 19,
            title: 'background-19'
        }],
        themes: [{
            id: 0,
            title: 'Default',
            slug: 'theme0',
            type: 'theme',
            image: '/css/themes/theme0/splash.png',
            body: ''
        }, {
            id: 1,
            title: 'Theme 1',
            slug: 'theme1',
            type: 'theme',
            image: '/css/themes/theme1/splash.png',
            body: ''
        }, {
            id: 2,
            title: 'Theme 2',
            slug: 'theme2',
            type: 'theme',
            image: '/css/themes/theme2/splash.png',
            body: ''
        }, {
            id: 3,
            title: 'Theme 3',
            slug: 'theme3',
            type: 'theme',
            image: '/css/themes/theme3/splash.png',
            body: ''
        }, {
            id: 4,
            title: 'Theme 4',
            slug: 'theme4',
            type: 'theme',
            image: '/css/themes/theme4/splash.png',
            body: ''
        }, {
            id: 5,
            title: 'Theme 5',
            slug: 'theme5',
            type: 'theme',
            image: '/css/themes/theme5/splash.png',
            body: ''
        }, {
            id: 6,
            title: 'Theme 6',
            slug: 'theme6',
            type: 'theme',
            image: '/css/themes/theme6/splash.png',
            body: ''
        }, {
            id: 7,
            title: 'Theme 7',
            slug: 'theme7',
            type: 'theme',
            image: '/css/themes/theme7/splash.png',
            body: ''
        }, {
            id: 8,
            title: 'Theme 8',
            slug: 'theme8',
            type: 'theme',
            image: '/css/themes/theme8/splash.png',
            body: ''
        }, {
            id: 9,
            title: 'Theme 9',
            slug: 'theme9',
            type: 'theme',
            image: '/css/themes/theme9/splash.png',
            body: ''
        }, {
            id: 10,
            title: 'Theme 10',
            slug: 'theme10',
            type: 'theme',
            image: '/css/themes/theme10/splash.png',
            body: ''
        }, {
            id: 0,
            title: 'Custom',
            slug: 'custom',
            type: 'theme',
            image: '/css/themes/custom/splash.png',
            body: ''
        }]
    },
    logout: {
        redirect: '#/login',
        message: 'Good bye...'
    },
    login: {
        logo: 'https://7fd8f70e662929940bdd-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.ssl.cf1.rackcdn.com/img/logo-login-med.png',
        redirect: '/#/home',
        message: 'Welcome {{user.username}}'
    }
};

var addToHomeConfig = {
    animationIn: 'bubble',
    animationOut: 'drop',
    lifespan: 10000,
    expire: 2,
    touchIcon: true,
    message: 'This is a custom message. Your device is an <strong>%device</strong>. The action icon is `%icon`.'
};