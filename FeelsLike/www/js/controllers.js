angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $state, $rootScope, $ionicHistory, $stateParams, $ionicPopup) {
    // Form data for the login modal
    /*$scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };*/
    /*
    if ($stateParams.clear) {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    }

    $scope.logout = function () {
        Parse.User.logOut();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;
        $state.go('welcome', {
            clear: true
        });
    };*/
    $scope.fbLogin = function () {
        openFB.login(
            function (response) {
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded');
                    $scope.closeLogin();
                } else {
                    alert('Facebook login failed');
                }
            }, {
                scope: 'email,publish_actions'
            });
    }
    $scope.reloadPage = function () {
        window.location.reload();
    }
})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
        {
            title: 'Reggae',
            id: 1
        },
        {
            title: 'Chill',
            id: 2
        },
        {
            title: 'Dubstep',
            id: 3
        },
        {
            title: 'Indie',
            id: 4
        },
        {
            title: 'Rap',
            id: 5
        },
        {
            title: 'Cowbell',
            id: 6
        }
  ];
})

.controller('HomeCtrl', function ($scope, $state, $http, $ionicPopup, $ionicHistory, $timeout) {
        //Get ip/location
        //Get weather information
        //Save it to scope variables
        $scope.userLocation = "";
        $scope.likes = 2;
        $scope.dislikes = 1;

        $scope.like = function () {
            $scope.likes = $scope.likes + 1;
            //$scope.$apply();
        }

        $scope.dislike = function () {
            $scope.dislikes = $scope.dislikes + 1;
            
            $scope.data = {};
            var alertPopup = $ionicPopup.alert({
                template: '<input type="text" ng-model="data.ownPhrase">',
                title: ':(',
                subTitle: 'Im sorry you didn\'t like the phrase. Enter your own :)',
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Submit Phrase</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            //$state.go('app.submitPhrase');
                            $scope.phrase = $scope.data.ownPhrase;
                        }
                    }
                ]
            });
            alertPopup.then(function (res) {

            });
        }

        var httpRequest = $http({
            method: 'GET',
            url: 'http://api.wunderground.com/api/36a91acd8ae6d705/geolookup/q/autoip.json ',
            //data: {id: 96}

        }).success(function (data, status) {
            $scope.userLocation = data;
            $scope.userLocation = $scope.userLocation.location.zip;
            window.localStorage['userLocation'] = JSON.stringify(data);
        }).error(function (data, status) {
            var localData = JSON.parse(window.localStorage['userLocation'] || '{}');

            if (!localData.length) {
                var alertPopup = $ionicPopup.alert({
                    title: ':(',
                    template: 'You need to have internet connection'
                });
                alertPopup.then(function (res) {

                });
                $scope.showAlert();
            } else {
                $scope.userLocation = localData;
            }
        });

        var zip = "19104";


        var httpRequest = $http({
            method: 'GET',
            url: 'http://api.wunderground.com/api/36a91acd8ae6d705/conditions/q/' + zip + '.json',
            //data: {id: 96}

        }).success(function (data, status) {
            $scope.conditions = data;
            $scope.conditions = $scope.conditions.current_observation

            $scope.iconUrl = $scope.conditions.icon_url;
            $scope.iconUrl = $scope.iconUrl.split('/k/');
            $scope.iconUrl = $scope.iconUrl[0] + '/i/' + $scope.iconUrl[1];

            window.localStorage['conditions'] = JSON.stringify(data);


            //calculate the numbers
            var temp = $scope.conditions.feelslike_f;

            if (temp < 20) {
                temp = 0;
            }
            if (temp > 21 && temp < 45) {
                temp = 1;
            }
            if (temp > 46 && temp < 65) {
                temp = 2;
            }
            if (temp > 66 && temp < 75) {
                temp = 3;
            }
            if (temp > 76 && temp < 85) {
                temp = 4;
            }
            if (temp > 86 && temp < 95) {
                temp = 5;
            }
            if (temp > 95) {
                temp = 6;
            }
            $scope.temp = temp;

            //wind
            var wind = $scope.conditions.wind_mph;
            if (wind > 0 && wind < 10) {
                wind = 0;
            }
            if (wind > 11 && wind < 20) {
                wind = 1;
            }
            if (wind > 20) {
                wind = 2;
            }
            $scope.wind = wind;


            //humid
            var humidity = $scope.conditions.relative_humidity;
            if (humidity > 0 && humidity < 33) {
                humidity = 0;
            }
            if (humidity > 34 && humidity < 66) {
                humidity = 1;
            }
            if (humidity > 66) {
                humidity = 2;
            }
            $scope.humidity = humidity;

            //serverity
            var serverity = $scope.conditions.weather;
            if (serverity.indexOf("light") > 0) {
                serverity = 1;
            } else if (serverity.indexOf("heavy") > 0) {
                serverity = 2;
            } else {
                serverity = 0;
            }
            $scope.serverity = serverity;

            //type
            var type = $scope.conditions.icon_url;
            if (type.indexOf("snow") > 0) {
                type = 1;
            } else if (type.indexOf("tstorms") > 0) {
                type = 2;
            } else if (type.indexOf("rain") > 0) {
                type = 3;
            } else if (type.indexOf("snow") > 0) {
                type = 4;
            } else if (type.indexOf("flurries") > 0) {
                type = 5;
            } else {
                type = 0;
            }
            $scope.type = type;

            //Get phrases
            /*Parse.Cloud.run('phrase', {
                temp: $scope.temp,
                wind: 2,
                humidity: 2,
                serverity: 2,
                type: 1,
                nsfw: false
            }, {
                success: function (result) {
                    var phrase = result;
                    $scope.phrase = phrase;
                },
                error: function (error) {}
            })*/
            Parse.Cloud.run('phrase', {
                temp: $scope.temp,
                wind: $scope.wind,
                humidity: $scope.humidity,
                serverity: $scope.serverity,
                type: $scope.type,
                nsfw: false
            }).then(function (result) {
                $scope.phrase = result;
                //console.log(result);
            });

        }).error(function (data, status) {
            var localData = JSON.parse(window.localStorage['conditions'] || '{}');

            if (!localData.length) {
                var alertPopup = $ionicPopup.alert({
                    title: ':(',
                    template: 'You need to have internet connection'
                });
                alertPopup.then(function (res) {

                });
                $scope.showAlert();
            } else {
                $scope.conditions = localData;
            }
        })

        //forcast info
        var httpRequest = $http({
            method: 'GET',
            url: 'http://api.wunderground.com/api/36a91acd8ae6d705/forecast/q/' + zip + '.json',
            //data: {id: 96}

        }).success(function (data, status) {
            $scope.forecast = data;
            $scope.forecastFull = $scope.forecast.forecast.simpleforecast.forecastday;
            $scope.forecast = $scope.forecast.forecast.txt_forecast.forecastday;
            $scope.forecastNow = $scope.forecast[0];

            $scope.forecastTmrw = $scope.forecastFull[1];
            $scope.forecastDayAfter = $scope.forecastFull[2];
            $scope.forecastDayAfterNext = $scope.forecastFull[3];

            window.localStorage['forecast'] = JSON.stringify($scope.forecast);
            window.localStorage['forecastNow'] = JSON.stringify($scope.forecastNow);
        }).error(function (data, status) {
            var localData = JSON.parse(window.localStorage['forecase'] || '{}');

            if (!localData.length) {
                var alertPopup = $ionicPopup.alert({
                    title: ':(',
                    template: 'You need to have internet connection'
                });
                alertPopup.then(function (res) {

                });
                $scope.showAlert();
            } else {
                $scope.forecastNow = localData;
            }
        });

    })
    /*
        .factory('conditionsFactory', function ($http, $timeout, $q) {
            var getData = function () {
                 var httpRequest = $http({
                    method: 'GET',
                    url: 'http://api.wunderground.com/api/36a91acd8ae6d705/conditions/q/' + zip + '.json',
                    //data: {id: 96}

                }).success(function (data, status) {
                    $scope.conditions = data;
                    $scope.conditions = $scope.conditions.current_observation


                }).error(function (data, status) {
                    var localData = JSON.parse(window.localStorage['conditions'] || '{}');

                    if (!localData.length) {
                        var alertPopup = $ionicPopup.alert({
                            title: ':(',
                            template: 'You need to have internet connection'
                        });
                        alertPopup.then(function (res) {

                        });
                        $scope.showAlert();
                    } else {
                        $scope.conditions = localData;
                    }
                })
                return $http({
                    method: "GET",
                    url: "/my/url"
                }).then(function (result) {
                    return result.data;
                });
               
            };
            return {
                conditons: getData
            };
        });*/
    /*
    .controller('LoginCtrl', function($scope, $state, $rootScope, $ionicLoading) {
        $scope.user = {
            username: null,
            password: null
        };

        $scope.error = {};

        $scope.login = function() {
            $scope.loading = $ionicLoading.show({
                content: 'Logging in',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var user = $scope.user;
            Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
                success: function(user) {
                    $ionicLoading.hide();
                    $rootScope.user = user;
                    $rootScope.isLoggedIn = true;
                    $state.go('app.home', {
                        clear: true
                    });
                },
                error: function(user, err) {
                    $ionicLoading.hide();
                    // The login failed. Check error to see why.
                    if (err.code === 101) {
                        $scope.error.message = 'Invalid login credentials';
                    } else {
                        $scope.error.message = 'An unexpected error has ' +
                            'occurred, please try again.';
                    }
                    $scope.$apply();
                }
            });
        };

        $scope.forgot = function() {
            $state.go('app.forgot');
        };
    })
    */
    /*
    .controller('LoginCtrl', ['$scope', '$state', function($scope, $state) {
      var fbLogged = new Parse.Promise();
        
      var fbLoginSuccess = function(response) {
        if (!response.authResponse){
          fbLoginError("Cannot find the authResponse");
          return;
        }
        var expDate = new Date(
          new Date().getTime() + response.authResponse.expiresIn * 1000
        ).toISOString();

        var authData = {
          id: String(response.authResponse.userID),
          access_token: response.authResponse.accessToken,
          expiration_date: expDate
        }
        fbLogged.resolve(authData);
        console.log(response);
      };

      var fbLoginError = function(error){
        fbLogged.reject(error);
      };

      $scope.login = function() {
        console.log('Login');
        if (!window.cordova) {
          facebookConnectPlugin.browserInit('935756046444180');
        }
        facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);
      
        fbLogged.then( function(authData) {
          console.log('Promised');
          return Parse.FacebookUtils.logIn(authData);
        })
        .then( function(userObject) {
          facebookConnectPlugin.api('/me', null, 
            function(response) {
              console.log(response);
              userObject.set('name', response.name);
              userObject.set('email', response.email);
              userObject.save();
            },
            function(error) {
              console.log(error);
            }
          );
          $state.go('home');
        }, function(error) {
          console.log(error);
        });
      };
    }])
    */

.controller('RegisterCtrl', function ($scope, $state, $ionicLoading, $rootScope) {
        $scope.user = {};
        $scope.error = {};

        $scope.register = function () {

            // TODO: add age verification step

            $scope.loading = $ionicLoading.show({
                content: 'Sending',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var user = new Parse.User();
            user.set("username", $scope.user.email);
            user.set("password", $scope.user.password);
            user.set("email", $scope.user.email);

            user.signUp(null, {
                success: function (user) {
                    $ionicLoading.hide();
                    $rootScope.user = user;
                    $rootScope.isLoggedIn = true;
                    $state.go('app.home', {
                        clear: true
                    });
                },
                error: function (user, error) {
                    $ionicLoading.hide();
                    if (error.code === 125) {
                        $scope.error.message = 'Please specify a valid email ' +
                            'address';
                    } else if (error.code === 202) {
                        $scope.error.message = 'The email address is already ' +
                            'registered';
                    } else {
                        $scope.error.message = error.message;
                    }
                    $scope.$apply();
                }
            });
        };
    })
    .controller('LoginCtrl', function ($scope, $stateParams) {})
    .controller('SubmitCtrl', function ($scope, $stateParams) {})
    .controller('PlaylistCtrl', function ($scope, $stateParams) {});