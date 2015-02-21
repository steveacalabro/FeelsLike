angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('HomeCtrl', function($scope, $http, $ionicPopup, $ionicHistory) {
    //Get ip/location
    //Get weather information
    //Save it to scope variables
    $scope.userLocation = "";
    
    var httpRequest = $http({
        method: 'GET',
        url: 'http://api.wunderground.com/api/36a91acd8ae6d705/geolookup/q/autoip.json ',
        //data: {id: 96}

    }).success(function(data, status) {
        $scope.userLocation = data;
        $scope.userLocation = $scope.userLocation.location.zip;
        window.localStorage['userLocation'] = JSON.stringify(data);
    }).error(function(data, status) {
        var localData = JSON.parse(window.localStorage['userLocation'] || '{}');

        if(!localData.length) {
            var alertPopup = $ionicPopup.alert({
                title: ':(',
                template: 'You need to have internet connection'
            });
            alertPopup.then(function(res) {

            });
            $scope.showAlert();
        }
        else {
            $scope.userLocation = localData;
        }
    });
    
    var zip = "19104";
    
    
    var httpRequest = $http({
        method: 'GET',
        url: 'http://api.wunderground.com/api/36a91acd8ae6d705/conditions/q/'+zip+'.json',
        //data: {id: 96}

    }).success(function(data, status) {
        $scope.conditions = data;
        $scope.conditions = $scope.conditions.current_observation
        console.log($scope.conditions);
        window.localStorage['conditions'] = JSON.stringify(data);
    }).error(function(data, status) {
        var localData = JSON.parse(window.localStorage['conditions'] || '{}');

        if(!localData.length) {
            var alertPopup = $ionicPopup.alert({
                title: ':(',
                template: 'You need to have internet connection'
            });
            alertPopup.then(function(res) {

            });
            $scope.showAlert();
        }
        else {
            $scope.conditions = localData;
        }
    });
    //forcast infor
    var httpRequest = $http({
        method: 'GET',
        url: 'http://api.wunderground.com/api/36a91acd8ae6d705/forecast/q/'+zip+'.json',
        //data: {id: 96}

    }).success(function(data, status) {
        $scope.forecast = data;
        $scope.forecast = $scope.forecast.forecast.txt_forecast.forecastday;
        $scope.forecast = $scope.forecast[0];
        console.log($scope.forecast);
        window.localStorage['forecast'] = JSON.stringify(data);
    }).error(function(data, status) {
        var localData = JSON.parse(window.localStorage['forecast'] || '{}');

        if(!localData.length) {
            var alertPopup = $ionicPopup.alert({
                title: ':(',
                template: 'You need to have internet connection'
            });
            alertPopup.then(function(res) {

            });
            $scope.showAlert();
        }
        else {
            $scope.forecast = localData;
        }
    });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
