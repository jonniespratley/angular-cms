window.Config = {
  baseurl: document.location.origin,
  sitetitle: 'angular-cms',
  sitedesc: 'This is the description',
  sitebrand: 'images/angular-cms-brand.png',
  sitecopy: '2014 ',
  version: '0.1',
  email: 'jonniespratley@me.com',
  debug: true,
  feature: {
    title: 'angular-cms',
    body: 'A content management system of some sort.'
  },
  features: [
    {
      id: 1,
      title: 'HTML5',
      body: 'Using HTML5 in every way to make a better user experience.',
      image: 'images/feature-html5.png'
    }, {
      id: 2,
      title: 'AngularJS',
      body: 'The client-side framework of choice is Angular, its a full-stack.',
      image: 'images/feature-angular.png'
    }, {
      id: 3,
      title: 'Twitter Bootstrap',
      body: 'The client-side UI of choice is Twitter Bootstrap 3.0.',
      image: 'images/feature-bootstrap.png'
    }, {
      id: 4,
      title: 'PhantomJS',
      body: 'Fully testable with Jasmine Karma Runner Unit e2e with PhantomJS.',
      image: 'images/feature-phantomjs.png'
    }, {
      id: 5,
      title: 'NodeJS',
      body: 'The server of choice is NodeJS, its fast and scalable.',
      image: 'images/feature-nodejs.png'
    }, {
      id: 6,
      title: 'MongoDB',
      body: 'The database of choice is Mongo, its fast and scalable.',
      image: 'images/feature-mongodb.png'
    }
  ],
  session: {
    authorized: false,
    user: null
  },
  layout: {
    header: 'views/_header.html',
    sidebar: 'views/_sidebar.html',
    content: 'views/_content.html',
    footer: 'views/_footer.html'
  },
  theme: 'default',
  templates: {
    compiled: '/dist/templates.html',
    uncompiled: '/views'
  },
  menu: {
    admin: [
      {
        id: 1,
        title: 'Pages',
        href: '/pages',
        icon: 'edit'
      }, {
        id: 1,
        title: 'Plugins',
        href: '/plugins',
        icon: 'folder-open'
      }, {
        id: 1,
        title: 'Widgets',
        href: '/widgets',
        icon: 'puzzle-piece'
      }, {
        id: 1,
        title: 'Media',
        href: '/media',
        icon: 'cloud-download'
      }, {
        id: 1,
        title: 'Users',
        href: '/users',
        icon: 'group'
      }, {
        id: 1,
        title: 'Themes',
        href: '/themes',
        icon: 'camera'
      }, {
        id: 1,
        title: 'Settings',
        href: '/settings',
        icon: 'cog'
      }
    ],
    pub: [],
    user: [
      {
        id: 1,
        title: 'Dashboard',
        icon: 'dashboard',
        href: '/dashboard'
      }, {
        id: 2,
        title: 'My Profile',
        icon: 'user',
        href: '/profile'
      }, {
        id: 3,
        title: 'Help',
        icon: 'book',
        href: '/help'
      }
    ]
  },
  settings: {
    currentdate: new Date(),
    dateformats: ['medium', 'short', 'fullDate', 'longDate', 'mediumDate', 'shortDate'],
    timeformats: ['mediumTime', 'shortTime'],
    dateformat: 'medium',
    timeformat: 'shortTime',
    timezone: null,
    servers: [
      {
        name: 'apiv1',
        host: '127.1.0.1',
        port: 3000,
        body: 'This is the v1 api server'
      }, {
        name: 'apiv2',
        host: '127.1.0.1',
        port: 3000,
        body: 'This is the v2 api server'
      }
    ],
    socketio: {
      host: '127.1.0.1',
      port: 8081
    },
    network: {
      online: true,
      cache: true
    },
    database: {
      host: '127.1.0.1',
      port: 27017,
      name: 'angular-cms'
    },
    api: {
      url: '',
      endpoint: '/api/',
      version: 'v2',
      versions: ['v1', 'v2']
    },
    live: false,
    debug: true,
    version: '0.0.1',
    formFactor: 'desktop',
    currentOrientation: null,
    cdn: 'http://a481ab4f6ea4dd65cff0-b2b68ced242ecf1cb9bc1021688e3775.r49.cf1.rackcdn.com/angular-cms',
    cdns: {
      http: 'http://a481ab4f6ea4dd65cff0-b2b68ced242ecf1cb9bc1021688e3775.r49.cf1.rackcdn.com/angular-cms',
      https: 'https://4ac535c4a3d1d3359bbc-b2b68ced242ecf1cb9bc1021688e3775.ssl.cf1.rackcdn.com/angular-cms',
      streaming: 'http://df86ce1cf0cf1f552fe2-b2b68ced242ecf1cb9bc1021688e3775.r49.stream.cf1.rackcdn.com/angular-cms'
    }
  },
  options: {
    layouts: [
      {
        id: 0,
        name: 'Fixed',
        value: 'container'
      }, {
        id: 1,
        name: 'Fluid',
        value: 'container-fluid'
      }
    ],
    sidebars: [
      {
        id: 1,
        name: 'Default',
        value: 'sidebar',
        url: '/views/partials/sidebar.html'
      }
    ],
    navbars: [
      {
        id: 1,
        name: 'Default',
        value: 'navbar',
        url: '/views/partials/navbar.html'
      }
    ],
    backgrounds: [
      {
        id: 0,
        title: 'Default'
      }
    ],
    themes: ['Default', 'Amelia', 'Cerulean', 'Cosmo', 'Cyborg', 'Flatly', 'Journal', 'Readable', 'Simplex', 'Slate', 'Spacelab', 'United', 'Yeti']
  },
  logout: {
    redirect: '#/login',
    message: 'Good bye...'
  },
  login: {
    logo: 'https://7fd8f70e662929940bdd-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.ssl.cf1.rackcdn.com/img/logo-login-med.png',
    redirect: '/#/home',
    user: {
      username: '',
      password: ''
    },
    message: 'Welcome {{user.username}}'
  },
  server: {
    host: 'http://localhost',
    port: 8181,
    apiBase: '/api/v2',
    version: 'v2',
    security: {
      salt: 'angular-cms'
    },
    mongodb: 'angularcms:angularcms@paulo.mongohq.com:10089/app19632340',
    db: {
      name: 'angular-cms',
      username: 'amadmin',
      password: 'fred',
      host: 'localhost',
      port: 27017
    },
    email: {
      username: 'angular.cms@gmail.com',
      password: 'isyourdaughter18?'
    },
    proxy: {
      hostname: 'localhost',
      port: 5001
    },
    staticDir: 'www',
    publicDir: 'www',
    uploadsTmpDir: '.tmp',
    uploadsDestDir: 'www/cms-content/uploads',
    uploadsUrl: ':8181/cms-content/',
    logFormat: '[:date] - [:method] - :url - :status - :response-time ms'
  }
};
