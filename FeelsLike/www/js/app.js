// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
        openFB.init({appId: '935756046444180'});
        $stateProvider

            .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
        })

        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.login', {
            url: "/login",
            views: {
                'menuContent': {
                    templateUrl: "templates/login.html",
                    controller: 'LoginCtrl'
                }
            }
        })
         .state('app.register', {
            url: "/register",
            views: {
                'menuContent': {
                    templateUrl: "templates/register.html",
                    controller: 'RegisterCtrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
    })
    .run(function ($state, $rootScope) {
        Parse.initialize('WAZOc6VldvRSqy8KjNPC71O2MoQRf7Q7K5a3xp37', 'WRZy60GqOSfbsfgZWgTJuELwg0HFqYhHyulIOMOW');
        var currentUser = Parse.User.current();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;

        if (currentUser) {
            $rootScope.user = currentUser;
            $rootScope.isLoggedIn = true;
            $state.go('app.home');
        }
    });