wallmobileApp
    .controller("WeatherCtrl", function($scope, $http, $timeout, $interval, $ionicTabsDelegate) {
        $scope.previousTab = function() {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected !== -1 && selected !== 0) {
                $ionicTabsDelegate.select(selected - 1);
            }
        };

        $scope.nextTab = function() {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected !== -1) {
                $ionicTabsDelegate.select(selected + 1);
            }
        };

        var tick = function() {
            $scope.clock = Date.now();
        };
        tick();
        $interval(tick, 1000);

        $scope.houseDBUrl = "10.0.0.5";
        $scope.temperatureDevices = [];
        $scope.temperatureOutside = {};

        $scope.getTemperatureDevices = function() {
            //$scope.temperatureDevices = [];

            var url = "http://" + $scope.houseDBUrl + "/wallmobile/gettemperaturedevices";
            $http.get(url).then(function(response) {
                $scope.temperatureDevices = response.data;

                angular.forEach($scope.temperatureDevices, function(temperatureDevice) {
                    if (temperatureDevice.name === "Outside DS") {
                        $scope.temperatureOutside = temperatureDevice;
                    }
                });

                $scope.$broadcast("scroll.refreshComplete");
            });
        }

        $scope.getTemperatureDevices();

        $interval(function() {
            $scope.getTemperatureDevices();
        }, 60 * 1000);

    });