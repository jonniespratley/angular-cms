window.Config = {
  baseurl: document.location.origin,
  sitetitle: 'angular-cms',
  sitedesc: 'This is the description',
  sitebrand: '/images/angular-cms-brand.png',
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
      image: '/images/feature-html5.png'
    },
    {
      id: 2,
      title: 'AngularJS',
      body: 'The client-side framework of choice is Angular, its a full-stack.',
      image: '/images/feature-angular.png'
    },
    {
      id: 3,
      title: 'Twitter Bootstrap',
      body: 'The client-side UI of choice is Twitter Bootstrap 3.0.',
      image: '/images/feature-bootstrap.png'
    },
    {
      id: 4,
      title: 'PhantomJS',
      body: 'Fully testable with Jasmine Karma Runner Unit e2e with PhantomJS.',
      image: '/images/feature-phantomjs.png'
    },
    {
      id: 5,
      title: 'NodeJS',
      body: 'The server of choice is NodeJS, its fast and scalable.',
      image: '/images/feature-nodejs.png'
    },
    {
      id: 6,
      title: 'MongoDB',
      body: 'The database of choice is Mongo, its fast and scalable.',
      image: '/images/feature-mongodb.png'
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
      },
      {
        id: 1,
        title: 'Plugins',
        href: '/plugins',
        icon: 'folder-open'
      },
      {
        id: 1,
        title: 'Widgets',
        href: '/widgets',
        icon: 'puzzle-piece'
      },
      {
        id: 1,
        title: 'Media',
        href: '/media',
        icon: 'cloud-download'
      },
      {
        id: 1,
        title: 'Users',
        href: '/users',
        icon: 'group'
      },
      {
        id: 1,
        title: 'Themes',
        href: '/themes',
        icon: 'camera'
      },
      {
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
      },
      {
        id: 2,
        title: 'My Profile',
        icon: 'user',
        href: '/profile'
      },
      {
        id: 3,
        title: 'Help',
        icon: 'book',
        href: '/help'
      }
    ]
  },
  config: {
    currentdate: new Date(),
    dateformats: [
      'medium',
      'short',
      'fullDate',
      'longDate',
      'mediumDate',
      'shortDate'
    ],
    timeformats: [
      'mediumTime',
      'shortTime'
    ],
    dateformat: 'medium',
    timeformat: 'shortTime',
    timezone: null,
    servers: [
      {
        name: 'apiv1',
        host: '127.1.0.1',
        port: 3000,
        body: 'This is the v1 api server'
      },
      {
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
      versions: [
        'v1',
        'v2'
      ]
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
      },
      {
        id: 1,
        name: 'Fluid',
        value: 'container-fluid'
      }
    ],
    sidebars: [{
        id: 1,
        name: 'Default',
        value: 'sidebar',
        url: '/views/partials/sidebar.html'
      }],
    navbars: [{
        id: 1,
        name: 'Default',
        value: 'navbar',
        url: '/views/partials/navbar.html'
      }],
    backgrounds: [{
        id: 0,
        title: 'Default'
      }],
    themes: [
      'Default',
      'Amelia',
      'Cerulean',
      'Cosmo',
      'Cyborg',
      'Flatly',
      'Journal',
      'Readable',
      'Simplex',
      'Slate',
      'Spacelab',
      'United',
      'Yeti'
    ]
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
  }
};
/*
//@ sourceMappingURL=config.js.map
*/
'use strict';
/**
 * @ngdoc directive
 * @name rfx.directive:rAutogrow
 * @element textarea
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * @example
	 <example module="rfx">
		 <file name="index.html">
				 <textarea ng-model="text" r-autogrow class="input-block-level"></textarea>
				 <pre>{{text}}</pre>
		 </file>
	 </example>
*/
var app;
Parse.initialize('fYHs4Flnj7vgVHm9vaFiFTSKt5Mj2Bxf9e93mTOB', 'QPFGBNHs0QQHFS54atV71oKppd3gTgaFfQIHP2VW');
app = angular.module('angularCmsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'mgcrea.ngStrap'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    var routeResolver;
    routeResolver = {
      delay: function ($q, $timeout) {
        var delay;
        delay = $q.defer();
        $timeout(delay.resolve, 1000);
        return delay.promise;
      }
    };
    return $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/docs', {
      templateUrl: 'views/docs.html',
      controller: 'DocsCtrl'
    }).when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminCtrl'
    }).when('/plugins', {
      templateUrl: 'views/plugins.html',
      controller: 'PluginsCtrl'
    }).when('/themes', {
      templateUrl: 'views/themes.html',
      controller: 'ThemesCtrl'
    }).when('/widgets', {
      templateUrl: 'views/widgets.html',
      controller: 'WidgetsCtrl'
    }).when('/media', {
      templateUrl: 'views/media.html',
      controller: 'MediaCtrl'
    }).when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsCtrl'
    }).when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UsersCtrl'
    }).when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }).when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    }).when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    }).when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    }).when('/pages', {
      templateUrl: 'views/pages.html',
      controller: 'PagesCtrl'
    }).when('/help', {
      templateUrl: 'views/help.html',
      controller: 'HelpCtrl'
    }).when('/forgot-password', {
      templateUrl: 'views/forgot-password.html',
      controller: 'ForgotPasswordCtrl'
    }).when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
/*
//@ sourceMappingURL=app.js.map
*/
angular.module('angularCmsApp').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('views/_aside.html', '<div class="aside"><div class="aside-dialog"><div class="aside-content"><div class="aside-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">\xd7</button><h4 class="aside-title">Title</h4></div><div class="aside-body"><h4>Popover in aside</h4><button type="button" class="btn btn-default popover-test ng-scope" data-title="A Title" data-content="And here\'s some amazing content. It\'s very engaging. right?" bs-popover="">button</button><h4>Tooltips in aside</h4><a href="#" class="tooltip-test ng-scope" data-title="Tooltip" bs-tooltip="">This link</a> and <a href="#" class="tooltip-test ng-scope" data-title="Tooltip" bs-tooltip="">that link</a> should have tooltips on hover.</div></div></div></div>');
    $templateCache.put('views/_content.html', '<div class="container"><div class="row"><aside id="cms-sidebar" ng-controller="SidebarCtrl" ng-include="App.layout.sidebar" ng-if="App.session.authorized" ng-class="{closed:sidebar.closed}" class="col-xs-3 col-sm-3 col-md-2 cms-sidebar"></aside><div class="view-animate-container"><div class="alert alert-{{alert.type}} animate-if" ng-if="alert"><strong>{{alert.code}}!</strong> {{alert.message}} <a class="close" data-dismiss="alert" href="" aria-hidden="true">&times;</a></div><div class="view-animate" data-ng-view=""></div></div></div></div>');
    $templateCache.put('views/_footer.html', '<div class="container"><hr><div class="footer tc clearfix"><p class="app-copywrite pull-left">&copy; {{App.sitecopy}}</p><p class="app-version pull-right">Version {{App.version}}</p></div></div>');
    $templateCache.put('views/_header.html', '<nav class="cms-navbar navbar navbar-default navbar-fixed-top" role="navigation"><div class="container"><!-- Brand and toggle get grouped for better mobile display --><div class="navbar-header"><button type="button" class="navbar-toggle" class="" data-template="views/_aside.html" data-placement="right" data-animation="am-slide-right" bs-aside="aside" data-container="body"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#"><img ng-src="{{App.config.cdns.https}}{{App.sitebrand}}" class="brand-img"> <span class="brand">{{App.sitetitle}}</span></a></div><!-- Collect the nav links, forms, and other content for toggling --><div class="collapse navbar-collapse" id="cms-navbar-collapse"><ul class="nav navbar-nav"><li ng-repeat="item in App.menu.pub" ng-include="" src="\'menu-item.html\'"></li></ul><ul class="nav navbar-nav navbar-right" ng-controller="LoginCtrl"><li class="dropdown" ng-if="App.session.authorized"><a href="" class="dropdown-toggle" data-toggle="dropdown"><img ng-src="{{ user.email | gravatar }}" class="img-circle navbar-avatar"> <span>{{ App.session.user.email }}</span> <b class="caret"></b></a><ul class="dropdown-menu"><li><a href="#/profile">My Profile</a></li><li><a href="#/settings">Settings</a></li><li><a href="#/help">Help</a></li><li class="divider"></li><li><a ng-click="logout()">Logout</a></li></ul></li><li></li><li ng-hide="App.session.authorized"><a class="login-btn" href="#/login"><i class="fa fa-1x fa-lock"></i> Login</a></li></ul></div><!-- /.navbar-collapse --></div><!-- /.container-fluid --></nav><!-- You can use a custom html template with the `data-template` attr --><script id="menu-item.html" type="text/ng-template"><a ng-href="#{{item.href}}">\n' + '\t<i class="fa fa-1x fa-{{item.icon}}"></i>\n' + '\t{{item.title}}\n' + '\t</a></script>');
    $templateCache.put('views/_navbar.html', '<nav class="cms-navbar navbar navbar-default navbar-fixed-top" role="navigation"><div class="container-fluid"><!-- Brand and toggle get grouped for better mobile display --><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#cms-navbar-collapse"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#"><img ng-src="{{App.config.cdns.https}}{{App.sitebrand}}" class="brand-img"> <span class="brand">{{App.sitetitle}}</span></a></div><!-- Collect the nav links, forms, and other content for toggling --><div class="collapse navbar-collapse" id="cms-navbar-collapse"><ul class="nav navbar-nav"><ul class="nav navbar-nav"><li ng-repeat="item in App.menu.pub" ng-include="" src="\'menu-item.html\'"></li></ul><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li><li class="divider"></li><li><a href="#">One more separated link</a></li></ul></li></ul><ul class="nav navbar-nav navbar-right" ng-controller="LoginCtrl"><li class="dropdown" ng-if="App.session.authorized"><a href="" class="dropdown-toggle" data-toggle="dropdown"><img src="https://www.gravatar.com/avatar/b4c0fecb38a48d57acf43350ee318107?s=20" class="img-circle"> <span>{{ App.session.user.username }}</span> <b class="caret"></b></a><ul class="dropdown-menu"><li><a href="#/profile">My Profile</a></li><li><a href="#/settings">Settings</a></li><li><a href="#/help">Help</a></li><li class="divider"></li><li><a ng-click="logout()">Logout</a></li></ul></li><li ng-hide="App.session.authorized"><a class="login-btn" href="#/login"><i class="fa fa-1x fa-lock"></i> Login</a></li></ul></div><!-- /.navbar-collapse --></div><!-- /.container-fluid --></nav><script id="menu-item.html" type="text/ng-template"><a ng-href="#{{item.href}}">\n' + '\t<i class="fa fa-1x fa-{{item.icon}}"></i>\n' + '\t{{item.title}}\n' + '\t</a></script>');
    $templateCache.put('views/_sidebar.html', '<div id="cms-sidebar-nav" class="well well-sm cms-sidebar-nav bs-sidebar hidden-print" role="complementary" data-offset-top="-70" bs-navbar=""><nav id="cms-sidebar-nav-list" class="nav nav-list"><li class="nav-header"><span class="title">Menu</span></li><li ng-class="{active:item.selected}" ng-repeat="item in App.menu.user" data-match-route="{{item.href}}" ng-include="" src="\'sidebar-item.html\'"></li><!-- <li ng-class="{active:item.selected}" ng-repeat="item in App.menu.user" ng-include src="\'sidebar-item.html\'"></li> --><li class="nav-header"><span class="title">Admin</span></li><li ng-class="{active:item.selected}" data-match-route="#{{item.href}}" ng-repeat="item in App.menu.admin" ng-include="" src="\'sidebar-item.html\'"></li><li class="nav-divider"></li><!-- Collapse --><li><a id="cms-sidebar-nav-toggle" href="" ng-click="toggleSidebar()" class="cms-sidebar-nav-toggle"><i class="fa fa-toggle-left" ng-hide="sidebar.closed"></i> <i class="fa fa-toggle-right" ng-show="sidebar.closed"></i> <span class="title">Collapse menu</span></a></li></nav></div><script id="sidebar-item.html" type="text/ng-template"><a\n' + '\trel="tooltip"\n' + '\tdata-delay="3"\n' + '\tdata-toggle="tooltip"\n' + '\tdata-placement="right"\n' + '\ttitle="{{item.title}}"\n' + '\tdata-id="{{item.id}}"\n' + '\tdata-page="{{item.slug}}"\n' + '\tng-click="select(item)"\n' + '\tng-href="#{{item.href}}">\n' + '\t<i\n' + '\tclass="fa fa-1x fa-{{item.icon}}"\n' + '\ttitle="{{item.title}}"></i>\n' + '\t<span class="title">\n' + '\t{{item.title}}\n' + '\t</span>\n' + '\t</a></script>');
    $templateCache.put('views/admin.html', '<div class="container"><div class="row row-offcanvas row-offcanvas-left"><div class="col-xs-3 col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar" role="navigation" ng-include="" src="\'views/_sidebar.html\'"></div><div class="col-xs-8 col-sm-9 col-md-10"><p class="pull-left visible-xs"><button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button></p><div class="well well-sm"><button type="button" class="close" aria-hidden="true"><small>&times;</small></button><h2>Welcome to Angular-CMS!</h2><p>Here are some links to help get you started:</p><br><div class="row"><div class="col-xs-4 col-sm-4 col-md-4 hidden-xs"><p><strong>Get Started</strong></p><p><a href="#/themes" class="btn btn-primary btn-lg hidden-sm">Customize Your Site</a></p></div><div class="col-xs-6 col-sm-4 col-md-4"><p><strong>Next Steps</strong></p><p><i class="glyphicon glyphicon-edit"></i> <a href="#/plugins">Add some plugins</a></p><p><i class="glyphicon glyphicon-upload"></i> <a href="#/media">Upload media</a></p></div><div class="col-xs-6 col-sm-4 col-md-4"><p><strong>More Actions</strong></p><p><i class="glyphicon glyphicon-user"></i> <a href="#/users">Manage Users</a></p><p><i class="glyphicon glyphicon-cog"></i> <a href="#/settings">Site Settings</a></p></div></div></div><div class="row"><div class="col-6 col-sm-6 col-lg-6"><div class="panel panel-default"><header class="panel-heading">Overview</header><section class="panel-body"><div class="row"><div class="col-6 col-sm-6"><legend>Content</legend><ul class="list-unstyled"><li><span class="badge">42</span> Pages</li><li><span class="badge">2</span> Categories</li><li><span class="badge">5</span> Tags</li><li><span class="badge">23</span> Files</li><li><span class="badge">5</span> Plugins</li></ul></div><div class="col-6 col-sm-6"><legend>System</legend></div></div><p>You are using <strong>Angular-CMS 0.1.0</strong></p></section><div class="panel-footer clearfix"><button class="btn pull-left hidden-sm btn-default" type="reset">Check for Update</button> <button class="btn btn-primary pull-right">Install Plugin</button></div></div><p></p></div><!--/span--><div class="col-6 col-sm-6 col-mg-6 col-lg-6"><div class="panel panel-default"><div class="panel-heading">Quick Post</div><div class="panel-body"><form><div class="form-group"><div class="controls"><input type="text" class="form-control" placeholder="Enter title here..."></div></div><div class="form-group"><div class="controls"><textarea class="form-control" rows="3"></textarea></div></div><div class="form-group"><div class="controls"><input type="text" class="form-control" placeholder="Tags (separate with commas)"></div></div></form></div><div class="panel-footer clearfix"><button class="btn pull-left btn-default" type="button">Save Draft</button> <button class="btn btn-primary pull-right">Publish</button></div></div></div><!--/span--><!--/row--></div></div><!--/span--></div><!--/row--></div>');
    $templateCache.put('views/dashboard.html', '<div id="dashboard"><button class="btn btn-default btn-xs pull-right" ng-click="fullscreen()"><i class="fa fa-arrows-alt"></i></button><cms-header title="Dashboard" icon="dashboard"></cms-header><cms-widgets><cms-widget title="Overview" size="6"><div class="row"><div class="col-6 col-sm-6"><legend>Content</legend><ul class="list-unstyled"><li><span class="badge">42</span> Pages</li><li><span class="badge">2</span> Categories</li><li><span class="badge">5</span> Tags</li><li><span class="badge">23</span> Files</li><li><span class="badge">5</span> Plugins</li></ul></div><div class="col-6 col-sm-6"><legend>System</legend></div></div><p>You are using <strong>Angular-CMS 0.1.0</strong></p><div class="panel-footer clearfix"><button class="btn pull-left hidden-sm btn-default" type="reset">Check for Update</button> <button class="btn btn-primary pull-right">Install Plugin</button></div></cms-widget><cms-widget title="Quick Post" size="6"><form><div class="form-group"><div class="controls"><input type="text" class="form-control" placeholder="Enter title here..."></div></div><div class="form-group"><div class="controls"><textarea class="form-control" rows="3"></textarea></div></div><div class="form-group"><div class="controls"><input type="text" class="form-control" placeholder="Tags (separate with commas)"></div></div></form><div class="panel-footer clearfix"><button class="btn pull-left btn-default" type="button">Save Draft</button> <button class="btn btn-primary pull-right">Publish</button></div></cms-widget></cms-widgets></div>');
    $templateCache.put('views/docs.html', '<iframe src="/docs/index.html" border="0" width="100%" height="600"></iframe>');
    $templateCache.put('views/forgot-password.html', '<div class="slim-view"><form id="forgot-form" class="form-forgot well well-sm" ng-submit="forgot(user)" name="ForgotForm"><header class="img-logo center avatar"><img class="img-circle" src="data:image/png;base64,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"></header><div class="alert alert-danger" ng-show="error"><strong>Error {{error.code}}!</strong> {{error.message}} <a class="close" data-dismiss="alert" href="" aria-hidden="true">&times;</a></div><div class="form-group"><input class="form-control" type="email" placeholder="Email" ng-model="user.email" name="email" required autofocus></div><button class="btn btn-primary btn-block" type="submit" ng-disabled="!user.email">Reset Password</button></form><hr><div class="clearfix"><span class="pull-left">Back to <a href="#/login">Login</a></span> <span class="pull-right"><a href="#/register">Create an account</a></span></div></div>');
    $templateCache.put('views/forgotpassword.html', '<!doctype html><html><head><title>Themes</title><link rel="stylesheet" href="styles.css"><meta name="viewport" content="width=device-width"><link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script><script type="text/javascript" src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script><style type="text/css">/*       * Style tweaks       * --------------------------------------------------       */\n' + '      body {\n' + '        padding-top: 70px;\n' + '      }\n' + '      footer {\n' + '        padding-left: 15px;\n' + '        padding-right: 15px;\n' + '      }\n' + '      /*       * Off Canvas       * --------------------------------------------------       */\n' + '      @media screen and(max-width: 768px) {\n' + '        .row-offcanvas {\n' + '          position: relative;\n' + '          -webkit-transition: all 0.25s ease-out;\n' + '          -moz-transition: all 0.25s ease-out;\n' + '          transition: all 0.25s ease-out;\n' + '        }\n' + '        .row-offcanvas-right .sidebar-offcanvas {\n' + '          right: -50%;\n' + '          /* 6 columns */\n' + '        }\n' + '        .row-offcanvas-left .sidebar-offcanvas {\n' + '          left: -50%;\n' + '          /* 6 columns */\n' + '        }\n' + '        .row-offcanvas-right.active {\n' + '          right: 50%;\n' + '          /* 6 columns */\n' + '        }\n' + '        .row-offcanvas-left.active {\n' + '          left: 50%;\n' + '          /* 6 columns */\n' + '        }\n' + '        .sidebar-offcanvas {\n' + '          position: absolute;\n' + '          top: 0;\n' + '          width: 50%;\n' + '          /* 6 columns */\n' + '        }\n' + '      }</style></head><body><div class="navbar navbar-fixed-top navbar-inverse" role="navigation"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button> <a class="navbar-brand" href="#">angular-cms</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav"><li class="active"><a href="#">Dashboard</a></li><li><a href="#contact">Contact</a></li></ul><ul class="nav navbar-nav pull-right"><li><a href="#about">jonniedollas</a></li></ul></div><!-- /.nav-collapse --></div><!-- /.container --></div><!-- /.navbar --><div class="container"><div class="row row-offcanvas row-offcanvas-left"><div class="col-xs-6 col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar" role="navigation"><div class="well sidebar-nav"><ul class="nav nav-list"><li class="nav-header"><i class="glyphicon glyphicon-picture"></i> Appearance</li><li class="active"><a href="#">Themes</a></li><li><a href="#">Customize</a></li><li><a href="#">Widgets</a></li><li><a href="#">Menus</a></li><li class="nav-header"><i class="glyphicon glyphicon-cog"></i> Settings</li><li><a href="#">General</a></li><li><a href="#">Permissions</a></li><li><a href="#">Media</a></li><li class="nav-header"><i class="glyphicon glyphicon-user"></i> Users</li><li><a href="#">All Users</a></li><li><a href="#">Add User</a></li></ul></div><!--/.well --></div><!--/span--><div class="col-xs-12 col-sm-9 col-md-10"><div class="row"><ol class="breadcrumb"><li><a href="#">Home</a></li><li><a href="#">Content</a></li><li class="active">Products</li></ol><!-- Nav tabs --><ul class="nav nav-tabs"><li class="active"><a href="#"><i class="fa fa-2x fa-dashboard"></i></a></li><li><a href="#" data-toggle="tab">Manage Products</a></li><li><a href="#" data-toggle="tab">Add New Product</a></li><li><a href="#" data-toggle="tab">Settings</a></li></ul><br><div class="well well-sm"><div class="col-sm-12 col-md-12"><img src="https://chart.googleapis.com/chart?cht=lc&chs=960x250&chxt=x%2Cy&chxl=0%3A%7CBurger%7CFries%7CSalad&chdlp=r&chdl=Sales&chco=3399CC%2C00000000&chxr=1%2C7%2C15&chm=b%2C3399CC%2C0%2C1%2C0&chd=e%3AP...AA%2CAAAA" class="img-thumbnail"></div></div></div><div class="row"><div class="col-sm-12 col-md-12"></div></div></div><!--/span--></div><!--/row--><hr><footer><p class="text-muted">&copy; Company 2013</p></footer></div><!--/.container--><script>$(document).ready(function() {\n' + '        $(\'[data-toggle=offcanvas]\').click(function() {\n' + '          $(\'.row-offcanvas\').toggleClass(\'active\');\n' + '        });\n' + '      });</script></body></html>');
    $templateCache.put('views/help.html', '<h1><i class="fa fa-1x fa-book"></i> Help</h1><hr><div class="row"><div class="col-md-12 col-lg-12"><div class="well well-sm"><button type="button" class="close" aria-hidden="true"><small>&times;</small></button><h1>Welcome to Angular-CMS!</h1><p>Here are some links to help get you started:</p><br><div class="row"><div class="col-xs-4 col-sm-4 col-md-4 hidden-xs"><p><strong>Get Started</strong></p><p><a href="#/themes" class="btn btn-primary btn-lg hidden-sm">Customize Your Site</a></p></div><div class="col-xs-6 col-sm-4 col-md-4"><p><strong>Next Steps</strong></p><p><i class="glyphicon glyphicon-edit"></i> <a href="#/plugins">Add some plugins</a></p><p><i class="glyphicon glyphicon-upload"></i> <a href="#/media">Upload media</a></p></div><div class="col-xs-6 col-sm-4 col-md-4"><p><strong>More Actions</strong></p><p><i class="glyphicon glyphicon-user"></i> <a href="#/users">Manage Users</a></p><p><i class="glyphicon glyphicon-cog"></i> <a href="#/settings">Site Settings</a></p></div></div></div><div id="readme" ng-init="loadReadme()"></div></div></div>');
    $templateCache.put('views/index.html', '<!doctype html><html><head><title>Themes</title><link rel="stylesheet" href="main.css"><meta name="viewport" content="width=device-width"><link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script><script type="text/javascript" src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script><style type="text/css">/*       * Style tweaks       * --------------------------------------------------       */\n' + '      body {\n' + '        padding-top: 70px;\n' + '      }\n' + '      footer {\n' + '        padding-left: 15px;\n' + '        padding-right: 15px;\n' + '      }\n' + '      /*       * Off Canvas       * --------------------------------------------------       */\n' + '      @media screen and(max-width: 768px) {\n' + '        .row-offcanvas {\n' + '          position: relative;\n' + '          -webkit-transition: all 0.25s ease-out;\n' + '          -moz-transition: all 0.25s ease-out;\n' + '          transition: all 0.25s ease-out;\n' + '        }\n' + '        .row-offcanvas-right .sidebar-offcanvas {\n' + '          right: -50%;\n' + '          /* 6 columns */\n' + '        }\n' + '        .row-offcanvas-left .sidebar-offcanvas {\n' + '          left: -50%;\n' + '          /* 6 columns */\n' + '        }\n' + '        .row-offcanvas-right.active {\n' + '          right: 50%;\n' + '          /* 6 columns */\n' + '        }\n' + '        .row-offcanvas-left.active {\n' + '          left: 50%;\n' + '          /* 6 columns */\n' + '        }\n' + '        .sidebar-offcanvas {\n' + '          position: absolute;\n' + '          top: 0;\n' + '          width: 50%;\n' + '          /* 6 columns */\n' + '        }\n' + '      }</style></head><body><div class="navbar navbar-fixed-top navbar-inverse" role="navigation"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button> <a class="navbar-brand" href="#">angular-cms</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav"><li class="active"><a href="#">Dashboard</a></li><li><a href="#contact">Contact</a></li></ul><ul class="nav navbar-nav pull-right"><li><a href="#about">jonniedollas</a></li></ul></div><!-- /.nav-collapse --></div><!-- /.container --></div><!-- /.navbar --><div class="container"><div class="row row-offcanvas row-offcanvas-left"><div class="col-xs-6 col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar" role="navigation"><div class="well sidebar-nav"><ul class="nav nav-list"><li class="nav-header"><i class="glyphicon glyphicon-picture"></i> Appearance</li><li class="active"><a href="#">Themes</a></li><li><a href="#">Customize</a></li><li><a href="#">Widgets</a></li><li><a href="#">Menus</a></li><li class="nav-header"><i class="glyphicon glyphicon-cog"></i> Settings</li><li><a href="#">General</a></li><li><a href="#">Permissions</a></li><li><a href="#">Media</a></li><li class="nav-header"><i class="glyphicon glyphicon-user"></i> Users</li><li><a href="#">All Users</a></li><li><a href="#">Add User</a></li></ul></div><!--/.well --></div><!--/span--><div class="col-xs-12 col-sm-9 col-md-10"><ol class="breadcrumb"><li><a href="#">Home</a></li><li><a href="#">Appearance</a></li><li class="active">Themes</li></ol><!-- Nav tabs --><ul class="nav nav-tabs"><li class="active"><a href="#"><i class="fa fa-2x fa-list-alt"></i></a></li><li><a href="#" data-toggle="tab">Manage Themes</a></li><li><a href="#" data-toggle="tab">Install Theme</a></li><li><a href="#" data-toggle="tab">Settings</a></li></ul><br><div class="well well-sm"><div class="row"><div class="col-sm-4 col-md-4"><img src="http://placehold.it/400x300" class="img-thumbnail"></div><div class="col-md-8"><small class="text-muted">Current Theme</small><h4>Twenty Twelve <small>1.0</small></h4><p>The 2012 theme for Angular-CMS takes us back to the Bootstrap 2.3, featuring a full range of post formats, each displayed beautifully in their own unique way. Design details abound, starting with a vibrant color scheme and matching header images, beautiful typography and icons, and a flexible layout that looks great on any device, big or small.</p><p class="text-muted"><span>OPTIONS:</span> <a href="#">Widgets</a> | <a href="#">Menus</a> | <a href="#">Header</a></p></div></div></div><div class="row"><div class="col-sm-4 col-md-4 theme-item"><img src="http://placehold.it/300x150" class="img-thumbnail"><h4>Twenty Thirteen</h4><p class="text-muted">By jonniespratley</p><p class="actions hidden-sm"><a href="#">Activate</a> | <a href="#">Live Preview</a> <span class="pull-right"><a href="#" class="danger">Delete</a></span></p></div><div class="col-sm-4 col-md-4"><img src="http://placehold.it/300x150" class="img-thumbnail"><h4>Twenty Fourteen</h4><p class="text-muted">By jonniespratley</p><p class="actions hidden-sm"><a href="#">Activate</a> | <a href="#">Live Preview</a> <span class="pull-right"><a href="#" class="danger">Delete</a></span></p></div><div class="col-sm-4 col-md-4"></div></div></div><!--/span--></div><!--/row--><hr><footer><p class="text-muted">&copy; Company 2013</p></footer></div><!--/.container--><script>$(document).ready(function() {\n' + '        $(\'[data-toggle=offcanvas]\').click(function() {\n' + '          $(\'.row-offcanvas\').toggleClass(\'active\');\n' + '        });\n' + '      });</script></body></html>');
    $templateCache.put('views/login.html', '<div class="slim-view"><form id="login-form" class="form-login clearfix well well-sm" ng-submit="login(user)"><header class="img-logo center avatar"><img class="img-circle" src="data:image/png;base64,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"></header><div class="login-message"></div><div class="form-group"><input name="email" class="form-control" type="email" placeholder="Email" ng-model="user.email" required autofocus></div><div class="form-group"><input name="password" class="form-control" type="password" placeholder="Password" ng-model="user.password" required></div><p><label><input type="checkbox" ng-model="user.remember">Stay signed in</label><span class="pull-right"><a href="#/forgot-password">Forgot password?</a></span></p><button class="btn btn- btn-primary btn-block" type="submit">Sign in</button><hr><p class="center"><a href="#/register">Create an account</a></p></form></div>');
    $templateCache.put('views/main.html', '<div class=""><div class="jumbotron"><h1>{{App.feature.title}}</h1><p class="lead">{{App.feature.body}}</p><ul class="list-inline"><li class="github-btn"><iframe src="http://ghbtns.com/github-btn.html?user=jonniespratley&amp;repo=angular-cms&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="100" height="20"></iframe></li><li class="github-btn"><iframe src="http://ghbtns.com/github-btn.html?user=jonniespratley&amp;repo=angular-cms&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="100" height="20"></iframe></li><li class="github-btn"><iframe src="http://ghbtns.com/github-btn.html?user=jonniespratley&amp;type=follow&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="160" height="20"></iframe></li></ul></div><div class="row marketing"><div class="col-lg-12"><div ng-repeat="item in App.features" class="media"><img ng-src="{{App.config.cdn}}{{item.image}}" height="50" class="pull-left img-circle media-object"><h4>{{item.title}}</h4><p>{{item.body}}</p><hr></div></div></div></div>');
    $templateCache.put('views/media.html', '<style>.bar {\n' + '        height: 18px;\n' + '        background: green;\n' + '    }</style><h1><i class="fa fa-1x fa-upload"></i> Media</h1><hr><div class="clearfix"><cms-uploader image="http://placehold.it/100x100" name="image" maxheight="400" maxwidth="400" multiple dragdrop="true" btnupload="Upload" btncrop="Crop" cropper="true" collection="imageCollection" showthumbs="true" litmpl="#liTmpl" showtable="true" showlist="true" filelimit="10" sizelimit="5000" action="/api/v2/upload"></cms-uploader><legend>Media</legend><ul class="list-unstyled"><li ng-repeat="upload in uploads"><cms-upload ng-model="upload"></cms-upload></li></ul><pre>$scope.uploads: {{uploads | json }}</pre><form action="/api/upload" method="post"><div class="uploader-dropzone"><h4>Drop files here</h4><p><span>or</span></p><button id="uploader-btn" class="btn btn-default">Select files</button><div id="progress"><div class="bar" style="width: 0%"></div></div><input id="fileupload" type="file" name="files[]" data-url="/api/upload" multiple><input id="uploader-file-input" type="file" name="image" multiple></div></form><div id="uploads-list"><legend>Media List</legend><pre>{{uploads | json}}</pre><button ng-click="getUploads()">Get Uploads</button></div></div>');
    $templateCache.put('views/pages.html', '<div class="container"><div class="row"><ol class="breadcrumb"><li><a href="#">Home</a></li><li><a href="#">Content</a></li><li class="active">Products</li></ol><!-- Nav tabs --><ul class="nav nav-tabs"><li class="active"><a href="#"><i class="fa fa-2x fa-file"></i></a></li><li><a href="#" data-toggle="tab">Manage Products</a></li><li><a href="#" data-toggle="tab">Add New Product</a></li><li><a href="#" data-toggle="tab">Settings</a></li></ul><br><div class="well well-sm"><div class="col-sm-12 col-md-12"><img src="https://chart.googleapis.com/chart?cht=lc&chs=960x250&chxt=x%2Cy&chxl=0%3A%7CBurger%7CFries%7CSalad&chdlp=r&chdl=Sales&chco=3399CC%2C00000000&chxr=1%2C7%2C15&chm=b%2C3399CC%2C0%2C1%2C0&chd=e%3AP...AA%2CAAAA" class="img-thumbnail"></div></div></div><div class="row"><div class="col-sm-12 col-md-12"></div></div></div><!--/span--><!--/row-->');
    $templateCache.put('views/plugins.html', '<div id="plugins" class=""><div class="col-12"><cms-header title="Plugins" icon="folder-open"></cms-header><div class="row"><div class="col-sm-9"><!-- Single button --><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div><button class="btn btn-default">Apply</button></div><div class="col-sm-3"><input type="text" class="form-control" ng-model="query"></div></div><br><table class="table table-bordered table-condensed table-hover"><thead><tr><th><input type="checkbox"></th><th>Plugin</th><th>Description</th></tr></thead><tbody><tr ng-repeat="plugin in plugins | filter: query"><td><input type="checkbox" ng-model="plugin.id"></td><td>{{plugin.title}}</td><td>{{plugin.description}}</td></tr></tbody></table><div class="row"><div class="col-sm-6"><p>1 - 10 of 146 items 10 Per Page</p></div><div class="col-sm-6 tr"><ul class="pagination margin-none"><li><a href="#">Prev</a></li><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">4</a></li><li><a href="#">Next</a></li></ul></div></div></div></div><!--/span-->');
    $templateCache.put('views/products.html', '<div class="row"><ol class="breadcrumb"><li><a href="#">Home</a></li><li><a href="#">Content</a></li><li class="active">Products</li></ol><!-- Nav tabs --><ul class="nav nav-tabs"><li class="active"><a href="#"><i class="fa fa-2x fa-dashboard"></i></a></li><li><a href="#" data-toggle="tab">Manage Products</a></li><li><a href="#" data-toggle="tab">Add New Product</a></li><li><a href="#" data-toggle="tab">Settings</a></li></ul><br><div class="well well-sm"><div class="col-sm-12 col-md-12"><img src="https://chart.googleapis.com/chart?cht=lc&chs=960x250&chxt=x%2Cy&chxl=0%3A%7CBurger%7CFries%7CSalad&chdlp=r&chdl=Sales&chco=3399CC%2C00000000&chxr=1%2C7%2C15&chm=b%2C3399CC%2C0%2C1%2C0&chd=e%3AP...AA%2CAAAA" class="img-thumbnail"></div></div></div><div class="row"><div class="col-sm-12 col-md-12"></div></div><!--/span--><!--/row--><hr><footer><p class="text-muted">&copy; Company 2013</p></footer>');
    $templateCache.put('views/profile.html', '<cms-header icon="user" title="My Profile"></cms-header><div class="profile-message"></div><div class="row"><div class="col-sm-8"><form class="form-horizontal"><cms-form-group label="Email"><input type="email" class="form-control" placeholder="Email" ng-model="user.email" disabled></cms-form-group><cms-form-group label="Name"><input type="text" class="form-control" placeholder="Name" ng-model="user.meta.name" required></cms-form-group><cms-form-group label="Summary"><textarea class="form-control" placeholder="Enter 200 words or less..." ng-model="user.meta.summary"></textarea></cms-form-group><cms-form-group label="Cookies"><input type="checkbox" value="true" ng-model="user.remember" class="checkbox"></cms-form-group><div class="form-group tr"><button class="btn btn-default">Cancel</button> <button class="btn btn-primary" type="submit" ng-click="update(user)">Save</button></div></form></div><div class="col-sm-4"><aside class="profile-pic center"><div class="well well-sm"><img ng-src="{{ user.email | gravatar }}" alt="{{App.session.user.username}}" class="img-thumbnail"><br><small>To change visit <a href="gravatar.com" target="_blank">gravatar.com</a></small></div></aside></div></div>');
    $templateCache.put('views/register.html', '<div class="slim-view register"><form id="register-form" class="form-register well well-sm" name="RegisterForm"><header class="img-logo center avatar"><img class="img-circle" src="data:image/png;base64,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"></header><div class="message"></div><div class="form-group"><input type="email" class="form-control" placeholder="Email" ng-model="user.email" required></div><div class="form-group"><input type="text" class="form-control" placeholder="Username" ng-model="user.username" required></div><div class="form-group"><input type="password" class="form-control" placeholder="Password" ng-model="user.password" required></div><div class="form-group"><input type="password" class="form-control" placeholder="Confirm Password" ng-model="user.password2" required></div><div class="form-group"><label><input class="inline-checkbox" type="checkbox" ng-model="user.agree" required>Agree to Terms of Use</label></div><div class="form-group"><button class="btn btn-primary btn-block" type="submit" ng-disabled="!RegisterForm.$valid" ng-click="register(user)">Sign up</button></div></form><div class="clearfix"><span class="pull-left">Back to <a href="#/login">Login</a></span></div></div>');
    $templateCache.put('views/resetpassword.html', '<!doctype html><html><head><title>Forgot Password Page</title><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css"><link rel="stylesheet" href="main.css"><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script><script type="text/javascript" src="https://netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min.js"></script></head><body><div class="container login"><form class="form-forgot well well-sm"><div class="form-group"><img src="http://placehold.it/300x125&text=Logo" alt="Logo" class="logo"></div><div class="form-group"><input type="email" class="form-control" placeholder="Email" disabled></div><div class="form-group"><input type="password" class="form-control" placeholder="New Password"></div><div class="form-group"><input type="password" class="form-control" placeholder="Confirm Password"></div><button class="btn btn-lg btn-primary btn-block" type="submit">Update Password</button><hr></form></div></body></html>');
    $templateCache.put('views/settings.html', '<cms-header icon="gears" title="Settings"></cms-header><div class="row"><div class="col-sm-8 col-xs-7"><form class="form-horizontal" ng-submit="update(App)"><legend>General</legend><cms-form-group label="Site Title:"><input type="text" ng-model="App.sitetitle"></cms-form-group><cms-form-group label="Domain:"><input type="text" ng-model="App.baseurl"></cms-form-group><legend>Network</legend><cms-form-group label="{{key}}" ng-repeat="(key, value) in config"><input type="text" ng-model="App[key]" value="{{ angular.isObject(App[key]) }}"></cms-form-group><div class="form-group tr"><button class="btn btn-default">Cancel</button> <button class="btn btn-primary" type="submit">Save</button></div></form></div><div class="col-sm-4 col-xs-5"><aside class="well well-sm tc">Some help here</aside></div></div>');
    $templateCache.put('views/styles.html', '<!doctype html><!-- Built with Divshot - http://www.divshot.com --><html><head><title>New Page</title><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js" type="text/javascript"></script><script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min.js" type="text/javascript"></script></head><body><div class="container"></div></body></html>');
    $templateCache.put('views/themes.html', '<div class=""><div class="col-12"><h1><i class="fa fa-1x fa-picture-o"></i> Themes</h1><hr></div><div class="well well-sm"><div class="row"><div class="col-sm-4 col-md-4 col-xs-4"><img src="http://placehold.it/400x300" ng-src="{{App.config.cdn}}/bootswatch.com/{{App.theme | lowercase}}/thumbnail.png" class="img-thumbnail"></div><div class="col-md-8 col-sm-8 col-xs-8"><small class="text-muted">Current Theme</small><h2>{{App.theme}} <small>1.0</small></h2><p>This is going to be meta data for the theme.</p><p class="text-muted"><span>OPTIONS:</span> <a href="#">Widgets</a> | <a href="#">Menus</a> | <a href="#">Header</a></p></div></div><!--/row--></div><!--/well--><!-- @TODO: [Themes List] --><div class="row cms-themes"><div class="col-sm-6 col-md-4 col-xs-6 theme-item" ng-repeat="theme in App.options.themes"><a class="thumbnail theme" href="" ng-click="selectTheme(theme);" title="Change to {{theme}} theme" ng-cloak=""><img alt="{{theme}}" ng-src="{{App.config.cdn}}/bootswatch.com/{{theme | lowercase}}/thumbnail.png" src="http://placehold.it/300x150"><div class="caption hidden"><h3>{{theme}}</h3></div></a></div></div></div>');
    $templateCache.put('views/users.html', '<div id="users" ng-init="getUsers()"><h1><i class="fa fa-1x fa-group"></i> Users <button class="btn btn-default btn-sm" data-toggle="modal" data-target="#user-modal" ng-click="user = {}">New User</button></h1><hr><div class="row"><div class="col-md-12"><div class="table-responsive"><table class="table table-bordered table-hover table-condensed"><thead><tr><th><input type="checkbox"></th><th>E-mail</th><th>Groups</th><th>Active</th><th>Last Login</th><th class="actions">Actions</th></tr></thead><tbody><tr ng-repeat="user in users"><td><input type="checkbox" value="{{user._id}}"></td><td>{{user.email}}</td><td><span class="label label-primary" ng-repeat="group in user.groups">{{group}}</span></td><td>{{user.active}}</td><td>{{user.modified | date:\'medium\'}}</td><td class="actions"><div class="btn-group"><button type="button" class="btn btn-default btn-sm" ng-click="selectUser(user);" data-toggle="modal" data-target="#user-modal"><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-default btn-sm" ng-click="deleteUser($index, user);"><i class="fa fa-trash-o"></i></button></div></td></tr></tbody></table></div><div id="user-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" ng-hide="user._id">New User</h4><h4 class="modal-title" ng-show="user._id">Edit User</h4></div><div class="modal-body"><div class="profile-view"><div class="row"><div class="col-sm-8 col-xs-7"><form name="UserForm" class="form-horizontal" ng-submit="addUser(user)"><div class="form-group"><label class="control-label col-sm-3 col-xs-3">Username:</label><div class="controls col-sm-9 col-xs-9"><input type="text" class="form-control" placeholder="Username" ng-model="user.username" autofocus></div></div><div class="form-group"><label class="control-label col-sm-3 col-xs-3">Email:</label><div class="controls col-sm-9 col-xs-9"><input type="email" class="form-control" placeholder="Email" ng-model="user.email" ng-disabled="user._id"></div></div><div class="form-group"><label class="control-label col-sm-3 col-xs-3">Password:</label><div class="controls col-sm-9 col-xs-9"><input type="password" class="form-control" placeholder="Password" ng-model="user.password"></div></div><div class="form-group"><label class="control-label col-sm-3 col-xs-3">Group:</label><div class="controls col-sm-9 col-xs-9"><select ng-model="user.groups" class="form-control" multiple ng-options="group for group in groups"></select></div></div><div class="form-group"><label class="control-label col-sm-3 col-xs-3">Name:</label><div class="controls col-sm-9 col-xs-9"><input type="text" class="form-control" placeholder="Name" ng-model="user.meta.name"></div></div><div class="form-group"><label class="control-label col-sm-3 col-xs-3">Summary:</label><div class="controls col-sm-9 col-xs-9"><textarea class="form-control" placeholder="Enter 50 words or less..." ng-model="user.meta.summary"></textarea></div></div><div class="form-group"><label class="control-label col-sm-3 col-xs-3">Active:</label><div class="controls col-sm-9 col-xs-9"><input type="checkbox" class="form-control" placeholder="Name" ng-model="user.active"></div></div></form></div><div class="col-sm-4 col-xs-5"><aside class="profile-pic center"><div class="well well-sm"><img ng-src="{{ user.email | gravatar }}" alt="{{App.session.user.username}}"><br><small>To change visit <a href="gravatar.com" target="_blank">gravatar.com</a></small></div></aside></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary" ng-click="addUser(user)" ng-disabled="!UserForm.$valid">Submit</button></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div><!-- /.modal --></div></div></div>');
    $templateCache.put('views/widgets.html', '<h1><i class="fa fa-1x fa-puzzle-piece"></i> Widgets</h1><hr><section><div class="row"><div class="col-sm-9"><section><div class="row"><div class="col-sm-12 tc"><div class="placeholder">NAVBAR</div></div></div><div class="row"><div class="col-sm-8 tc"><div class="placeholder">CONTENT</div></div><div class="col-sm-4 tc"><div class="placeholder">SIDEBAR</div></div></div><div class="row"><div class="col-sm-12 tc"><div class="placeholder">FOOTER</div></div></div></section></div><div class="col-sm-3"><ul class="nav nav-stacked nav-list"><li class="nav-header">Available Widgets</li><li class="active"><a href="#">RSS Feed</a></li><li><a href="#">HTML</a></li><li><a href="#">Photo Gallery</a></li></ul></div></div></section><pre>App.widgets: {{App.widgets | json}}</pre>');
  }
]);
'use strict';
angular.module('angularCmsApp').controller('MainCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
    return $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
/*
//@ sourceMappingURL=main.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('DocsCtrl', [
  '$scope',
  function ($scope) {
    return $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
/*
//@ sourceMappingURL=docs.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('AdminCtrl', [
  '$scope',
  function ($scope) {
    return $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
/*
//@ sourceMappingURL=admin.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('LoginCtrl', [
  '$scope',
  '$rootScope',
  '$cookieStore',
  'cmsAuthService',
  'cmsNotify',
  function ($scope, $rootScope, $cookieStore, cmsAuthService, cmsNotify) {
    $scope.user = {
      email: null,
      password: null,
      remember: false
    };
    $scope.login = function (u) {
      return cmsAuthService.authorize(u).then(function (results) {
        var session;
        cmsNotify('.login-message', 'success', 'Success!', 'Welcome back.');
        session = {
          user: u,
          authorized: true
        };
        if (u.remember) {
          $cookieStore.put('App.session', session);
        }
        $rootScope.App.session = session;
        return $rootScope.App.location.path('/dashboard');
      }, function (error) {
        return cmsNotify('.login-message', 'danger', 'Error!', error.message, 2500);
      });
    };
    /*
  	Login Method to set the session.
  	@param {Object} user - A user model containing username and password
  */
    $scope._login = function (u) {
      console.log(u);
      return Parse.User.logIn(u.username, u.password, {
        success: function (user) {
          console.log(user);
          return $scope.$apply(function () {
            var session;
            session = {
              user: user.attributes,
              authorized: true
            };
            console.log('save sessin', session);
            if (u.remember) {
              $cookieStore.put('App.session', session);
            }
            $rootScope.App.session = session;
            return $rootScope.App.location.path('/dashboard');
          });
        },
        error: function (user, error) {
          return $scope.$apply(function () {
            return $scope.error = error;
          });
        }
      });
    };
    /*
  	Logout method to clear the session.
  	@param {Object} user - A user model containing remember
  */
    $scope.logout = function (user) {
      if (!App.session.user.remember) {
        $cookieStore.put('App.session', null);
      }
      $rootScope.App.session = null;
      return $rootScope.App.location.path($rootScope.App.logout.redirect);
    };
    return $scope.name = 'login';
  }
]);
/*
//@ sourceMappingURL=login.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('ProfileCtrl', [
  '$scope',
  '$rootScope',
  'DataService',
  'cmsNotify',
  function ($scope, $rootScope, DataService, cmsNotify) {
    $scope.user = $rootScope.App.session.user;
    return $scope.update = function (u) {
      return DataService.update('users', u).then(function (data) {
        return cmsNotify('.profile-message', 'success', 'Success!', 'Your account was successfully updated.');
      });
    };
  }
]);
/*
//@ sourceMappingURL=profile.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('PluginsCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    return $scope.plugins = [
      {
        id: 1,
        title: 'Google Chart Widgets',
        description: 'This plugin brings Google Charts to the dashboard, configurable settings to visualize any content type.',
        enabled: true
      },
      {
        id: 2,
        title: 'Twitter Widget',
        description: 'This plugin enables your Twitter feed on your dashboard and public stream widgets for your pages.',
        enabled: true
      }
    ];
  }
]);
/*
//@ sourceMappingURL=plugins.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('ThemesCtrl', [
  '$scope',
  '$rootScope',
  '$cookieStore',
  function ($scope, $rootScope, $cookieStore) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    return $scope.selectTheme = function (theme) {
      $cookieStore.put('App.theme', theme);
      return $rootScope.App.theme = theme;
    };
  }
]);
/*
//@ sourceMappingURL=themes.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('WidgetsCtrl', [
  '$scope',
  function ($scope) {
    return $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
/*
//@ sourceMappingURL=widgets.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('MediaCtrl', [
  '$scope',
  '$http',
  'DataService',
  function ($scope, $http, DataService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.uploads = [];
    $scope.getUploads = function () {
      return $http.get('/api/upload').success(function (data) {
        return $scope.uploads = data;
      });
    };
    return $(function () {
      $('#fileupload').fileupload({
        dataType: 'json',
        dropZone: $('.uploader-dropzone'),
        add: function (e, data) {
          console.log(e, data);
          data.url = '/api/upload';
          data.context = $('<p/>').text('Uploading...').appendTo(document.body);
          return data.submit();
        },
        progressall: function (e, data) {
          var progress;
          progress = parseInt(data.loaded / data.total * 100, 10);
          return $('#progress .bar').css('width', progress + '%');
        },
        done: function (e, data) {
          return $.each(data.result.files, function (index, file) {
            return $('<p/>').text(file.name).appendTo(document.body);
          });
        }
      });
      return $scope.uploader = { files: [] };
    });
  }
]);
/*
//@ sourceMappingURL=media.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('SettingsCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.config = Config;
    return $scope.tabs = [
      {
        title: 'General',
        content: ''
      },
      {
        title: 'Client',
        content: ''
      }
    ];
  }
]);
/*
//@ sourceMappingURL=settings.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('DashboardCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    return $scope.fullscreen = function () {
      var i;
      i = document.getElementById('dashboard');
      if (i.requestFullscreen) {
        return i.requestFullscreen();
      } else if (i.webkitRequestFullscreen) {
        return i.webkitRequestFullscreen();
      } else if (i.mozRequestFullScreen) {
        return i.mozRequestFullScreen();
      } else {
        if (i.msRequestFullscreen) {
          return i.msRequestFullscreen();
        }
      }
    };
  }
]);
/*
//@ sourceMappingURL=dashboard.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('UsersCtrl', [
  '$scope',
  'DataService',
  function ($scope, DataService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {
      username: null,
      email: null,
      password: null,
      role: null,
      created: new Date(),
      modified: new Date(),
      metadata: {
        avatar: '',
        name: null,
        aboue: null
      }
    };
    $scope.users = [];
    $scope.groups = [
      'Admin',
      'Member',
      'Public'
    ];
    $scope.getGroups = function () {
      return DataService.fetch('groups').then(function (data) {
        $scope.groups = data;
        return console.log(data);
      });
    };
    $scope.selectUser = function (user) {
      return $scope.user = user;
    };
    $scope.getUsers = function () {
      return DataService.fetch('users').then(function (data) {
        $scope.users = data;
        if (!$scope.groups) {
          return $scope.getGroups();
        }
      });
    };
    $scope.deleteUser = function (index, user) {
      var ask;
      ask = confirm('Delete ' + user.email + '?');
      if (ask) {
        return DataService.destroy('users', user).then(function (data) {
          $scope.users.pop(index);
          return $scope.getUsers();
        });
      }
    };
    return $scope.addUser = function (user) {
      return DataService.save('users', user).then(function (data) {
        $scope.getUsers();
        $scope.user = {};
        return $('#user-modal').modal('hide');
      });
    };
  }
]);
/*
//@ sourceMappingURL=users.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('RegisterCtrl', [
  '$scope',
  '$location',
  'cmsAuthService',
  'cmsSessionService',
  'cmsNotify',
  function ($scope, $location, cmsAuthService, cmsSessionService, cmsNotify) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {
      username: null,
      email: null,
      password: null,
      role: 'member',
      created: new Date(),
      modified: new Date(),
      metadata: {
        avatar: '',
        name: null,
        about: null
      }
    };
    return $scope.register = function (user) {
      console.log('register');
      return cmsAuthService.register(user).then(function (data) {
        console.log(data);
        cmsNotify('.message', 'info', 'Registered!', 'You have registered as ' + data.user.email);
        cmsSessionService.setSession({ user: data });
        return $location.path('/dashboard');
      }, function (error) {
        console.log(error);
        return cmsNotify('.message', 'danger', 'Error!', error.message);
      });
    };
  }
]);
/*
//@ sourceMappingURL=register.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('PagesCtrl', [
  '$scope',
  function ($scope) {
    return $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
/*
//@ sourceMappingURL=pages.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('ForgotPasswordCtrl', [
  '$scope',
  function ($scope) {
    return $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
/*
//@ sourceMappingURL=forgot-password.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('SidebarCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.items = $rootScope.App.menu.user;
    $scope.selected = null;
    $scope.select = function (item) {
      angular.forEach($rootScope.App.menu.admin, function (item) {
        return item.selected = false;
      });
      angular.forEach($rootScope.App.menu.user, function (item) {
        return item.selected = false;
      });
      return item.selected = true;
    };
    $scope.sidebar = { closed: false };
    return $scope.toggleSidebar = function () {
      return $scope.sidebar.closed = !$scope.sidebar.closed;
    };
  }
]);
/*
//@ sourceMappingURL=sidebar.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('HelpCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.readmeEl = angular.element('#readme');
    return $scope.loadReadme = function () {
    };
  }
]);
/*
//@ sourceMappingURL=help.js.map
*/
'use strict';
angular.module('angularCmsApp').controller('AppCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$log',
  '$route',
  '$location',
  '$routeParams',
  '$cookieStore',
  function ($scope, $rootScope, $http, $log, $route, $location, $routeParams, $cookieStore) {
    var App;
    App = Config;
    App.route = $routeParams;
    App.session = $cookieStore.get('App.session');
    App.theme = $cookieStore.get('App.theme');
    App.route = $route;
    App.location = $location;
    App.routeParams = $routeParams;
    App.roles = [
      'guest',
      'user',
      'admin'
    ];
    window.App = $rootScope.App = App;
    angular.element(document).ready(function () {
      $log.info('Document ready', this);
      return angular.element('.nav').bind('click', 'a', function (e) {
        return $log.info(e);
      });
    });
    $log.info($rootScope);
    return $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
/*
//@ sourceMappingURL=app.js.map
*/
/**
 @ngdoc directive
 @name angularCmsApp.directive:cmsFormGroup
 @element div
 @function
 
 @description
 	Resize textarea automatically to the size of its text content.
 	**Note:** ie<9 needs pollyfill for window.getComputedStyle
 
 @example
   <example module="angularCmsApp">
     <file name="index.html">
         <textarea ng-model="text"rx-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
*/
'use strict';
angular.module('angularCmsApp').directive('cmsFormGroup', function () {
  return {
    template: '<div class="form-group">\n  <label class="control-label col-sm-3 col-xs-3">{{label}}</label>\n  <div class="controls col-sm-9 col-xs-9" ng-transclude>\n  </div>\n</div>',
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      label: '@',
      hint: '@'
    },
    link: function (scope, element, attrs) {
      console.log(scope, element);
      return element.find('input').addClass('form-control');
    }
  };
});
/*
//@ sourceMappingURL=cmsFormGroup.js.map
*/
'use strict';
angular.module('angularCmsApp').directive('cmsWidgets', function () {
  var postLink;
  return {
    restrict: 'EMA',
    replace: true,
    transclude: true,
    scope: {},
    template: '<div class="widgets">\n\t<ul class="nav nav-pills">\n\t\t\t<li ng-repeat="widget in widgets" ng-class="{active:widget.selected}">\n\t\t\t\t<a href="" ng-click="select(widget)">{{widget.title}}</a>\n\t\t\t</li>\n\t</ul>\n\t<div class="row" ng-transclude>\n\t\n\t</div>\n</div>',
    controller: [
      '$scope',
      function ($scope) {
        var widgets;
        widgets = $scope.widgets = [];
        $scope.add = function (widget) {
          if (widgets.length === 0) {
            $scope.select(widget);
          }
          return widgets.push(widget);
        };
        return $scope.select = function (widget) {
          angular.forEach(widgets, function (widget) {
            return widget.selected = false;
          });
          return widget.selected = true;
        };
      }
    ],
    link: postLink = function (scope, element, attrs) {
    }
  };
});
/*
//@ sourceMappingURL=cmswidgets.js.map
*/
/**
 @ngdoc directive
 @name angularCmsApp.directive:cmsWidget
 @element div
 @function
 @description
 	Provides a widget component that acts as a container for other content.
 
 @example
   <example module="angularCmsApp">
     <file name="index.html">
         <cms-widget title="My Widget" icon="file">
         	This is my content.
         </cms-widget>
     </file>
   </example>
*/
angular.module('angularCmsApp').directive('cmsWidget', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      id: '@',
      title: '@',
      size: '@',
      icon: '@'
    },
    require: '?^cmsWidgets',
    template: '\t<div class="col-md-{{size}}">\n\t<div id="widget-{{$id}}" class="panel panel-default {{selected ? \'selected\' : \'\'}}">\n\t\t<header class="panel-heading clearfix">\n\t\t\t<!--i class="fa fa-chevron-right toggle" ng-show="icon"></i-->\n\t\t\t<i class="fa fa--{{icon}}" ng-show="icon"></i>\n\t\t\t{{title}}\n\t\t</header>\n\t\t<section class="panel-body" ng-transclude></section>\n\t</div>\n</div>',
    link: function (scope, element, attrs, ctrl) {
      var opened, toggle, widgetTitle;
      toggle = function () {
        var opened;
        opened = !opened;
        return element.find('section').slideToggle(function () {
          return element.toggleClass(opened ? 'closed' : 'opened');
        });
      };
      widgetTitle = element.find('header');
      widgetTitle.css({ cursor: 'move' });
      opened = true;
      return widgetTitle.bind('click', toggle);
    }
  };
});
/*
//@ sourceMappingURL=cmswidget.js.map
*/
'use strict';
angular.module('angularCmsApp').directive('cmsUploader', function () {
  var postLink;
  return {
    scope: {
      id: '@',
      title: '@',
      image: '@',
      collection: '@',
      maxwidth: '@',
      maxheight: '@',
      sizelimit: '@',
      filelimit: '@',
      aspectratio: '@',
      name: '@',
      btncrop: '@',
      btnupload: '@',
      action: '@',
      multiple: '@',
      cropper: '@',
      dragdrop: '@',
      litmpl: '@',
      showtable: '@',
      showlist: '@',
      handles: '@',
      uploader: '=',
      ngModel: '='
    },
    template: '\t      <div id="uploader">\n\t        <div id="uploader-dropzone" class="uploader-dropzone">\n\t          <h4>Drop files here</h4>\n\t          <p>\n\t            <span>or</span>\n\t          </p>\n\t          <button id="uploader-btn" class="btn btn-default">Select files</button>\n\t          <input id="uploader-file-input" type="file" name="files[]" multiple />\n\t        </div>\n\t        \n\t        \n\t        <div id="cms-uploader-list" ng-show="showlist">\n\t\t         <legend>List</legend>\n\t\t        <div id="imgPanel"></div>\n\t\t        <div id="fileAttributes"></div>\n\t        </div>\n\n\n\t        <div id="uploader-wrap"></div>\n\t        <div id="cms-uploader-table-wrap" ng-show="showtable">\n\t        \t<legend>Table</legend>\n\t        \t<table id="uploader-table" class="table table-bordered"></table>\n</div>\n\t        <ul class="list-unstyled uploader-files-list">\n\t          \n\t          <li class="media" ng-repeat="item in uploader.files">\n\t            <a class="pull-left" href="#">\n\t              <img class="media-object img-thumbnail" src="http://placehold.it/75" />\n\t            </a>\n\t            <div class="media-body">\n\t              <h5 class="media-heading">File being uploaded...</h5>\n\t              <p>\n\t                <small>\n\t                Type: image/png \n\t                Size: 45kb \n\t                Modified: date</small>\n\t              </p>\n\t              <div class="progress">\n\t                <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">\n\t                  <span class="sr-only">60% Complete</span>\n\t                </div>\n\t              </div>\n\t            </div>\n\t          </li>\n\t        </ul>\n\t      </div>',
    restrict: 'E',
    replace: true,
    transclude: false,
    require: '^?ngModel',
    link: postLink = function (scope, element, attrs, ngModel) {
      var addThumbnail, buttonId, clearFile, clearTable, displayFiles, handleDragOut, handleDragOver, handleFileDrop, handleFiles, handleRead, init, inputId, showFile, targetId;
      targetId = 'uploader-dropzone';
      inputId = 'uploader-file-input';
      buttonId = 'uploader-btn';
      scope.uploader = {
        files: [],
        button: angular.element('#' + buttonId),
        input: angular.element('#' + inputId),
        dropzone: angular.element('#' + targetId)
      };
      angular.element('#' + buttonId).bind('click', function () {
        return angular.element('#' + inputId).trigger('click');
      });
      console.log(scope);
      init = function (id) {
        var dropZone, uploader;
        scope.uploader.input.hide();
        dropZone = document.getElementById(targetId);
        dropZone.addEventListener('dragout', handleDragOut, false);
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileDrop, false);
        uploader = document.getElementById(inputId);
        return uploader.addEventListener('change', function (e) {
          var files;
          files = e.currentTarget.files;
          return handleFiles(files);
        }, false);
      };
      handleFileDrop = function (evt) {
        var files;
        evt.stopPropagation();
        evt.preventDefault();
        files = evt.dataTransfer.files;
        displayFiles(files);
        return handleFiles(files);
      };
      handleDragOver = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        return console.log('dragover');
      };
      handleDragOut = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        return console.log('dragout');
      };
      displayFiles = function (files) {
        var cell, fileCount, fileTable, i, row, textNode;
        clearTable();
        fileCount = document.getElementById('uploader-count');
        fileCount.innerHTML = files.length + ' File(s) Selected';
        fileTable = document.getElementById('uploader-table');
        if (files.length > 0) {
          row = void 0;
          cell = void 0;
          textNode = void 0;
          i = 0;
          while (i < files.length) {
            addThumbnail(files[i]);
            row = fileTable.insertRow(i);
            cell = row.insertCell(0);
            textNode = document.createTextNode(files[i].name);
            cell.appendChild(textNode);
            cell = row.insertCell(1);
            textNode = document.createTextNode(files[i].type);
            cell.appendChild(textNode);
            cell = row.insertCell(2);
            textNode = document.createTextNode((files[i].size / 1024).toFixed(2) + 'KB');
            cell.appendChild(textNode);
            if (files[i].lastModifiedDate !== void 0) {
              cell = row.insertCell(3);
              textNode = document.createTextNode(files[i].lastModifiedDate);
              cell.appendChild(textNode);
            }
            i++;
          }
          return fileTable.style.visibility = 'visible';
        } else {
          return fileTable.style.visibility = 'hidden';
        }
      };
      clearTable = function () {
        var fileTable, _results;
        fileTable = document.getElementById('uploader-table');
        _results = [];
        while (fileTable.rows.length > 0) {
          _results.push(fileTable.deleteRow(fileTable.rows.length - 1));
        }
        return _results;
      };
      handleFiles = function (files) {
        var file, fileLimit, i, imageType, img, imgPanel, reader, sizeLimit, sizeLimitBytes, _results;
        fileLimit = scope.filelimit;
        sizeLimit = scope.sizelimit;
        imageType = /image.*/;
        imgPanel = document.getElementById('imgPanel');
        imgPanel.innerHTML = '';
        sizeLimitBytes = sizeLimit * 1024;
        if (files.length < fileLimit) {
          i = 0;
          _results = [];
          while (i < files.length) {
            file = files[i];
            if (file.type.match(imageType)) {
              if (file.size < sizeLimitBytes) {
                scope.uploader.files.push(file);
                img = document.createElement('img');
                img.file = file;
                img.id = file.name;
                img.name = file.name;
                img.alt = file.name;
                img.className = 'unhighlight';
                img.addEventListener('mouseover', showFile, false);
                img.addEventListener('mouseout', clearFile, false);
                imgPanel.appendChild(img);
                reader = new FileReader();
                reader.onload = function (aImg) {
                  return function (e) {
                    return aImg.src = e.target.result;
                  };
                }(img);
                reader.readAsDataURL(file);
              } else {
                alert(file.name + ' is larger than ' + sizeLimit + 'KB.');
              }
            } else {
              alert(file.name + ' is not an image.');
            }
            _results.push(i++);
          }
          return _results;
        } else {
          return imgPanel.innerHTML = 'Only ' + fileLimit + ' files can be selected at a time.';
        }
      };
      showFile = function (el) {
        var file, fileAttributes, fileinfo, options;
        console.log(this);
        file = this.file;
        fileinfo = '';
        fileinfo += file.type + '<br>';
        fileinfo += (file.size / 1024).toFixed(2) + 'KB<br>';
        fileinfo += file.lastModifiedDate + '<br>';
        fileAttributes = document.getElementById('fileAttributes');
        fileAttributes.innerHTML = fileinfo;
        options = {
          html: true,
          selector: '.' + file.name,
          title: 'File info',
          content: fileinfo,
          placement: 'top'
        };
        return this.className = 'highlight ' + file.name;
      };
      clearFile = function () {
        var fileAttributes;
        fileAttributes = document.getElementById('fileAttributes');
        fileAttributes.innerHTML = '';
        return this.className = 'unhighlight';
      };
      handleRead = function (theFile) {
        return function (e) {
          var span;
          span = document.createElement('span');
          span.innerHTML = [
            '<img class="uploader-thumb" src="',
            e.target.result,
            '" title="',
            escape(theFile.name),
            '"/>'
          ].join('');
          return $('#uploader-wrap').html(span);
        };
      };
      addThumbnail = function (file) {
        var elm, tmpl;
        elm = '#uploader-thumbnails';
        tmpl = angular.element(scope.litmpl).html();
        return angular.element(elm).append(tmpl);
      };
      init(targetId);
      return console.log('Linking function', element, attrs);
    }
  };
});
/*
//@ sourceMappingURL=cmsuploader.js.map
*/
/**
 @ngdoc directive
 @name angularCmsApp.directive:cmsHeader
 @element div
 @function
 @description
 	Provides a directive for adding a standardized header across pages.
 
 @example
   <example module="angularCmsApp">
     <file name="index.html">
         <cms-header title="My Header" icon="file"></cms-header>
     </file>
   </example>
*/
'use strict';
angular.module('angularCmsApp').directive('cmsHeader', function () {
  return {
    template: '<div class="page-header"><h1><i class="fa fa-1x fa-{{icon}}"></i> {{title}}</h1></div>',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      icon: '@',
      title: '@'
    },
    link: function (scope, element, attrs) {
    }
  };
});
/*
//@ sourceMappingURL=cmsheader.js.map
*/
'use strict';
angular.module('angularCmsApp').directive('cmsGravatar', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    scope: { email: '@' },
    link: function (scope, element, attrs) {
      return element.text('this is the cmsGravatar directive');
    }
  };
});
/*
//@ sourceMappingURL=cmsgravatar.js.map
*/
'use strict';
angular.module('angularCmsApp').filter('gravatar', function () {
  return function (input) {
    if (!input) {
      input = 'test@gmail.com';
    }
    return 'http://www.gravatar.com/avatar/' + MD5(input);
  };
});
/*
//@ sourceMappingURL=gravatar.js.map
*/
'use strict';
angular.module('angularCmsApp').service('DataService', [
  '$http',
  '$q',
  '$resource',
  function ($http, $q, $resource) {
    var DataService;
    return DataService = {
      endpoint: '/api/v2/angular-cms/',
      fetch: function (collection, params) {
        var defer, options;
        defer = $q.defer();
        options = {
          cache: false,
          params: params
        };
        $http.get(this.endpoint + collection, options).success(function (data) {
          return defer.resolve(data);
        }).error(function (err) {
          return defer.reject(err);
        });
        return defer.promise;
      },
      save: function (collection, data) {
        if (data._id) {
          return this.update(collection, data);
        } else {
          return this.create(collection, data);
        }
      },
      create: function (collection, data) {
        var defer;
        defer = $q.defer();
        $http.post(this.endpoint + collection, data).success(function (data) {
          return defer.resolve(data);
        }).error(function (err) {
          return defer.reject(err);
        });
        return defer.promise;
      },
      destroy: function (collection, data) {
        var defer;
        defer = $q.defer();
        $http['delete'](this.endpoint + collection + '/' + data._id).success(function (data) {
          return defer.resolve(data);
        }).error(function (err) {
          return defer.reject(err);
        });
        return defer.promise;
      },
      update: function (collection, data) {
        var defer;
        defer = $q.defer();
        $http.put(this.endpoint + collection + '/' + data._id, data).success(function (data) {
          return defer.resolve(data);
        }).error(function (err) {
          return defer.reject(err);
        });
        return defer.promise;
      }
    };
  }
]);
/*
//@ sourceMappingURL=dataservice.js.map
*/
'use strict';
angular.module('angularCmsApp').provider('cmsDataServiceProvider', [function () {
    var cmsDataService, useAdapter;
    useAdapter = null;
    this.useAdapter = function (value) {
      return useAdapter = !!value;
    };
    return cmsDataService = function () {
      function cmsDataService() {
      }
      cmsDataService.get = function () {
        return useAdapter;
      };
      cmsDataService.$get = function () {
        return new cmsDataService();
      };
      cmsDataService.setAdapter = function (s) {
        useAdapter = s;
        return console.log('setting adapter');
      };
      return cmsDataService;
    }();
  }]);
/*
//@ sourceMappingURL=cmsdataserviceprovider.js.map
*/
'use strict';
angular.module('angularCmsApp').factory('cmsDataServiceFactory', function () {
  var meaningOfLife;
  meaningOfLife = 42;
  return {
    someMethod: function () {
      return meaningOfLife;
    }
  };
});
/*
//@ sourceMappingURL=cmsdataservicefactory.js.map
*/
'use strict';
angular.module('angularCmsApp').factory('cmsUsersFactory', function () {
  var meaningOfLife;
  meaningOfLife = 42;
  return {
    someMethod: function () {
      return meaningOfLife;
    }
  };
});
/*
//@ sourceMappingURL=cmsusersfactory.js.map
*/
'use strict';
/**
@module AuthService

@description
This service will take care of authentication of a user, common methods include:
* login
* logout
* register
* forgot
* currentUser
*/
angular.module('angularCmsApp').service('cmsAuthService', [
  '$q',
  '$http',
  '$log',
  function ($q, $http, $log) {
    var cmsAuthService;
    return cmsAuthService = {
      endpoint: '/api/v2',
      authorize: function (user) {
        var defer;
        defer = $q.defer();
        $http.post(this.endpoint + '/users/login', user).success(function (data) {
          return defer.resolve(data);
        }).error(function (err) {
          return defer.reject(err);
        });
        return defer.promise;
      },
      register: function (user) {
        var defer;
        defer = $q.defer();
        $http.post(this.endpoint + '/users/register', user).success(function (data) {
          return defer.resolve(data);
        }).error(function (err) {
          return defer.reject(err);
        });
        return defer.promise;
      }
    };
  }
]);
/*
//@ sourceMappingURL=cmsauthservice.js.map
*/
angular.module('angularCmsApp').service('cmsSessionService', [
  '$q',
  '$rootScope',
  '$cookieStore',
  '$location',
  '$log',
  function ($q, $rootScope, $cookieStore, $location, $log) {
    var SessionService, getUserAuthenticated, setUserAuthenticated, userIsAuthenticated;
    userIsAuthenticated = $cookieStore.get('App.session');
    setUserAuthenticated = function (value) {
      $cookieStore.put('App.session', value);
      userIsAuthenticated = value;
      return $log.info('user is authorized: ' + userIsAuthenticated.authorized);
    };
    getUserAuthenticated = function () {
      $log.info('user is authorized: ' + userIsAuthenticated.authorized);
      return userIsAuthenticated.authorized;
    };
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      var i, msg, _results;
      $rootScope.$emit('session:route:start', {
        event: event,
        next: next,
        current: current
      });
      angular.element('.active').removeClass('active');
      _results = [];
      for (i in window.routes) {
        if (next.indexOf(i) !== -1) {
          if (window.routes[i].requireLogin && !getUserAuthenticated()) {
            msg = 'You need to be authenticated to see this page!';
            $log.warn(msg);
            event.preventDefault();
            $rootScope.$emit('session:unauthorized', event);
            _results.push($location.path('/'));
          } else {
            angular.element('a[href="#' + $location.path() + '"]').addClass('active');
            _results.push($rootScope.$emit('session:authorized', event));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
    SessionService = {
      adapter: null,
      session: $cookieStore.get('App.session'),
      isAuthenticated: false,
      getUserAuthenticated: getUserAuthenticated,
      setUserAuthenticated: setUserAuthenticated,
      getSession: function () {
        return $cookieStore.get('App.session');
      },
      setSession: function (value) {
        return $cookieStore.put('App.session', value);
      },
      login: function (user) {
        var _ref;
        $rootScope.$emit('session:login', user);
        return (_ref = SessionService.adapter) != null ? typeof _ref.login === 'function' ? _ref.login(user) : void 0 : void 0;
      },
      logout: function (user) {
        var _ref;
        $rootScope.$emit('session:logout', user);
        SessionService.setUserAuthenticated(user);
        return (_ref = SessionService.adapter) != null ? typeof _ref.logout === 'function' ? _ref.logout(user) : void 0 : void 0;
      },
      register: function (user) {
        var _ref;
        $rootScope.$emit('session:register', user);
        return (_ref = SessionService.adapter) != null ? typeof _ref.register === 'function' ? _ref.register(user) : void 0 : void 0;
      },
      routeResolver: function () {
      }
    };
    return SessionService;
  }
]);
/*
//@ sourceMappingURL=cmssessionservice.js.map
*/
'use strict';
angular.module('angularCmsApp').factory('cmsNotify', [
  '$timeout',
  '$q',
  function ($timeout, $q) {
    var notices, notify;
    notices = [];
    notify = function (el, type, title, msg, timeout) {
      var alert;
      notices.push({
        type: type,
        title: title,
        msg: msg
      });
      alert = '<div class="alert alert-' + type + ' alert-dismissable"> \n\t<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> \n\t<strong>' + title + '</strong> ' + msg + '\n</div>';
      if (el) {
        angular.element(el).prepend(alert);
      } else {
        angular.element('.container').prepend(alert);
      }
      if (timeout) {
        return $timeout(function () {
          return angular.element('.alert').fadeOut().remove();
        }, timeout);
      }
    };
    return notify;
  }
]);  /*
//@ sourceMappingURL=cmsnotify.js.map
*/