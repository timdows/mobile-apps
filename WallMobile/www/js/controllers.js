angular.module('wallmobile.controllers', [])

.controller('WeatherCtrl', function ($scope, $http, $timeout, $ionicTabsDelegate) {
    $scope.previousTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    };

    $scope.nextTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    };

    $scope.doRefresh = function () {
        $scope.refreshesDone = 0;

        var url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=207';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            $scope.temperatureOutside = {};
            $scope.temperatureOutside.value = response.data.Device_Num_207.states[0].value;
            $scope.temperatureOutside.lastUpdate = response.data.Device_Num_207.states[1].value * 1000;
        });

        $scope.eyes = [];
        $scope.others = [];

        url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=65';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            var eye = {};
            eye.name = "Living room";
            eye.temperature = response.data.Device_Num_65.states[36].value;
            eye.light = response.data.Device_Num_65.states[37].value;
            eye.lastUpdate = response.data.Device_Num_65.states[22].value * 1000;
            $scope.eyes.push(eye);
        });

        url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=66';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            var eye = {};
            eye.name = "Study";
            eye.temperature = response.data.Device_Num_66.states[36].value;
            eye.light = response.data.Device_Num_66.states[37].value;
            eye.lastUpdate = response.data.Device_Num_66.states[29].value * 1000;
            $scope.eyes.push(eye);
        });

        url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=59';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            var eye = {};
            eye.name = "Enterance";
            eye.temperature = response.data.Device_Num_59.states[36].value;
            eye.light = response.data.Device_Num_59.states[37].value;
            eye.lastUpdate = response.data.Device_Num_59.states[35].value * 1000;
            $scope.eyes.push(eye);
        });

        url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=78';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            var other = {};
            other.name = "Balcony door";
            other.temperature = response.data.Device_Num_78.states[30].value;
            other.light = response.data.Device_Num_78.states[29].value;
            other.lastUpdate = response.data.Device_Num_78.states[14].value * 1000;
            $scope.others.push(other);
        });

        url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=187';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            var other = {};
            other.name = "Kitchen";
            other.temperature = response.data.Device_Num_187.states[0].value;
            other.lastUpdate = response.data.Device_Num_187.states[1].value * 1000;
            $scope.others.push(other);
        });

        url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=189';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            var other = {};
            other.name = "Fridge";
            other.temperature = response.data.Device_Num_189.states[0].value;
            other.lastUpdate = response.data.Device_Num_189.states[1].value * 1000;
            $scope.others.push(other);
        });

        url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=198';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            var other = {};
            other.name = "Lepel plant";
            other.temperature = response.data.Device_Num_198.states[0].value;
            other.lastUpdate = response.data.Device_Num_198.states[1].value * 1000;
            $scope.others.push(other);
        });

        url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=247';
        $http.get(url).then(function (response) {
            $scope.refreshesDone++;
            var other = {};
            other.name = "Voordeur";
            other.temperature = response.data.Device_Num_247.states[0].value;
            other.lastUpdate = response.data.Device_Num_247.states[6].value * 1000;
            $scope.others.push(other);
        });        

    };

    $scope.doRefresh();

    $scope.$watch('refreshesDone', function () {
        if ($scope.refreshesDone == 9) {
            $scope.$broadcast('scroll.refreshComplete');
        }
    });
})

.controller('GraphsCtrl', function ($scope, $http, $ionicTabsDelegate) {
    $scope.title = "Loading...";
    $scope.buttons = [];
    $scope.selectedButton = {};

    $scope.previousTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    };

    $scope.nextTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    };

    function getButtons() {
        var url = "http://10.0.0.14/housedb/web/app_dev.php/vera/temperaturegraph/getbuttons";
        $http.get(url).then(function (response) {
            $scope.buttons = response.data;
            $scope.selectedButton = $scope.buttons[0];
        });
    }

    getButtons();

    $scope.doRefresh = function () {
        $scope.graph = {};
        var highest = [];
        var lowest = [];
        var dates = [];
        //var url = "http://10.0.0.14/housedb/web/app_dev.php/vera/temperaturegraph/" + $scope.selectedButton.id + "/7days";
        var url = "http://10.0.0.14/housedb/web/app_dev.php/vera/temperaturegraph/" + $scope.selectedButton.id + "/1month";

        $http.get(url).then(function (response) {
            $scope.title = response.data.device.name;
            angular.forEach(response.data.readings, function (reading) {
                highest.push(reading.highest);
                lowest.push(reading.lowest);
                dates.push(reading.date);
            });

            $scope.graph.data = [highest, lowest];
            $scope.graph.labels = dates;
            $scope.graph.series = ['Highest', 'Lowest'];

            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    //$scope.doRefresh();

    $scope.changeGraph = function (button) {
        $scope.selectedButton = button;
    };

    $scope.$watch('selectedButton', function () {
        $scope.doRefresh();
    });
})

.controller('HeatingCtrl', function ($scope, $http, $filter, $ionicTabsDelegate) {
    $scope.title = "Loading...";
    $scope.buttons = [];
    $scope.selectedButton = null;

    $scope.previousTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    };

    $scope.nextTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    };

    function getButtons() {
        var url = "http://10.0.0.14/housedb/web/app_dev.php/heating/meters";
        $http.get(url).then(function (response) {
            $scope.buttons = response.data;
            $scope.selectedButton = $scope.buttons[0];
        });
    }

    getButtons();

    $scope.doRefresh = function () {
        if ($scope.selectedButton == null)
            return;

        $scope.graph = {};
        $scope.graph.data = [];
        $scope.graph.series = [];

        var dates = [];
        var url = "http://10.0.0.14/housedb/web/app_dev.php/heating/overview/" + $scope.selectedButton.id;

        $http.get(url).then(function (response) {
            angular.forEach(response.data, function (reading) {
                var graphData = [];
                angular.forEach(reading.values, function (value) {
                    graphData.push(value.lastUsage);

                    var formattedDate = formateDate(value.date);
                    if (dates.indexOf(formattedDate) == -1) {
                        dates.push(formattedDate);
                    }
                });

                $scope.graph.data.push(graphData);
                $scope.graph.series.push(reading.year);
            });

            $scope.graph.labels = dates;
            
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.changeGraph = function (button) {
        $scope.selectedButton = button;
    };

    $scope.$watch('selectedButton', function () {
        $scope.title = $scope.selectedButton.name;
        $scope.doRefresh();
    });

    function formateDate(value) {
        var tempdate = new Date(value.replace(/-/g, "/"));
        return $filter('date')(tempdate, "MM-dd");
    }
})

.controller('ScenesCtrl', function ($scope, $http, $timeout, $ionicTabsDelegate) {
    $scope.previousTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    };

    $scope.nextTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    };

    $scope.groups = [];

    var group = { name: "Enterance", items: [] };
    group.items.push(createScene("Mirror lights", 135));
    group.items.push(createScene("Enterance light", 62));
    $scope.groups.push(group);

    var group = { name: "Bedroom", items: [] };
    group.items.push(createScene("Bright", 139));
    group.items.push(createScene("Soft", 141));
    $scope.groups.push(group);

    var group = { name: "Study", items: [] };
    group.items.push(createScene("Study power2", 142));
    group.items.push(createScene("Printer", 50));
    group.items.push(createScene("Water switch", 52));
    $scope.groups.push(group);

    var group = { name: "Study window", items: [] };
    group.items.push(createScene("Binds Down", 223));
    group.items.push(createScene("Binds Up", 224));
    $scope.groups.push(group);

    var group = { name: "Kitchen aanrecht", items: [] };
    group.items.push(createRangeScene("Aanrecht links All", 239));
    group.items.push(createRangeScene("Aanrecht links Red", 244));
    group.items.push(createRangeScene("Aanrecht links Green", 238));
    group.items.push(createRangeScene("Aanrecht links Blue", 236));
    group.items.push(createScene("Aanrecht links scene 1", 240));
    group.items.push(createScene("Aanrecht links scene 2", 243));
    group.items.push(createScene("Aanrecht links scene 3", 242));
    group.items.push(createScene("Aanrecht links scene 4", 241));
    group.items.push(createRangeScene("Aanrecht rechts All", 229));
    group.items.push(createRangeScene("Aanrecht rechts Red", 232));
    group.items.push(createRangeScene("Aanrecht rechts Green", 233));
    group.items.push(createRangeScene("Aanrecht rechts Blue", 234));
    group.items.push(createScene("Aanrecht rechts scene 1", 227));
    group.items.push(createScene("Aanrecht rechts scene 2", 231));
    group.items.push(createScene("Aanrecht rechts scene 3", 228));
    group.items.push(createScene("Aanrecht rechts scene 4", 230));
    $scope.groups.push(group);

    var group = { name: "Kitchen kastjes", items: [] };
    group.items.push(createRangeScene("Kastje links All", 172));
    group.items.push(createRangeScene("Kastje links Red", 177));
    group.items.push(createRangeScene("Kastje links Green", 176));
    group.items.push(createRangeScene("Kastje links Blue", 175));
    group.items.push(createRangeScene("Kastje rechts All", 204));
    group.items.push(createRangeScene("Kastje rechts Red", 202));
    group.items.push(createRangeScene("Kastje rechts Green", 203));
    group.items.push(createRangeScene("Kastje rechts Blue", 201));
    group.items.push(createRangeScene("Living colors All", 221));
    group.items.push(createRangeScene("Living colors Red", 217));
    group.items.push(createRangeScene("Living colors Green", 220));
    group.items.push(createRangeScene("Living colors Blue", 219));
    $scope.groups.push(group);

    var group = { name: "Living room", items: [] };
    group.items.push(createScene("Eettafel", 24));
    group.items.push(createScene("Windowfarm", 8));
    group.items.push(createRangeScene("Zonnelamp", 10));
    $scope.groups.push(group);

    var group = { name: "Huiskamer plafond", items: [] };
    group.items.push(createScene("Scene 1", 213));
    group.items.push(createScene("Scene 2", 212));
    group.items.push(createScene("Scene 3", 211));
    group.items.push(createScene("Scene 4", 210));
    group.items.push(createRangeScene("Range 0", 209));
    group.items.push(createRangeScene("Range 1", 216));
    group.items.push(createRangeScene("Range 2", 214));
    group.items.push(createRangeScene("Range 3", 215));
    $scope.groups.push(group);

    var group = { name: "Piano area", items: [] };
    group.items.push(createRangeScene("Wall All", 32));
    group.items.push(createRangeScene("Wall Red", 34));
    group.items.push(createRangeScene("Wall Green", 35));
    group.items.push(createRangeScene("Wall Blue", 36));
    $scope.groups.push(group);

    var group = { name: "TV area", items: [] };
    group.items.push(createScene("Bosnialamp", 168));
    group.items.push(createScene("TV / Stereo", 17));
    $scope.groups.push(group);

    $scope.allLedsGroup = { name: "Leds all", items: [] };
    $scope.allLedsGroup.items.push(createRangeScene("All", 0));
    $scope.allLedsGroup.items.push(createRangeScene("Red", 1));
    $scope.allLedsGroup.items.push(createRangeScene("Green", 2));
    $scope.allLedsGroup.items.push(createRangeScene("Blue", 3));

    function createScene(name, deviceNum) {
        var scene = {};
        scene.name = name;
        scene.deviceNum = deviceNum;
        scene.status = 0;
        scene.checked = false;
        scene.isSwitch = true;
        return scene;
    }

    function createRangeScene(name, deviceNum) {
        var scene = {};
        scene.name = name;
        scene.deviceNum = deviceNum;
        scene.status = 0;
        scene.checked = false;
        scene.isRange = true;
        return scene;
    }

    $scope.updateStatusses = function(){
        angular.forEach($scope.groups, function (group) {
            angular.forEach(group.items, function (item) {
                var url = 'http://10.0.0.15/port_3480/data_request?id=status&output_format=json&DeviceNum=' + item.deviceNum;
                $http.get(url).success(function (data) {
                    //Object.keys(obj)[0]; // "a"
                    item.status = data["Device_Num_" + item.deviceNum].states[0].value
                    item.checked = item.status == 1;
                });
            });
            
        });
    };

    $scope.doRefresh = function () {
        $scope.updateStatusses();
        $timeout(function () { $scope.$broadcast('scroll.refreshComplete'); }, 2000);
    };

    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };

    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };

    $scope.sceneClick = function (scene) {
        var targetValue = scene.targetValue;
        if (!angular.isUndefined(scene.status)) {
            if (scene.status == 0) {
                scene.status = 1;
            }
            else if (scene.status == 1) {
                scene.status = 0;
            }
            targetValue = scene.status;
        }

        var url = 'http://10.0.0.15/port_3480/data_request?id=lu_action&output_format=json&DeviceNum=' + scene.deviceNum +
            '&serviceId=urn:upnp-org:serviceId:SwitchPower1&action=SetTarget&newTargetValue=' + targetValue;
        $http.get(url).success(function (data) {
            $timeout(function () { $scope.updateStatusses(); }, 2000);
        });
    };

    $scope.rangeChange = function (item) {
        var url = 'http://10.0.0.15/port_3480/data_request?id=lu_action&output_format=json&DeviceNum=' + item.deviceNum +
            '&serviceId=urn:upnp-org:serviceId:Dimming1&action=SetLoadLevelTarget&newLoadlevelTarget=' + item.range;
        $http.get(url).success(function (data) {
            //$timeout(function () { $scope.updateStatusses(); }, 2000);
        });
    };

    $scope.allLedsChange = function (item) {
        var all = [239, 229, 172, 204, 221, 215, 32];
        var red = [224, 232, 177, 202, 217, 209, 34];
        var green = [238, 233, 176, 203, 220, 216, 35];
        var blue = [236, 234, 175, 201, 219, 214, 36];

        if (item.deviceNum == 0) {
            var list = all;
        }
        else if (item.deviceNum == 1) {
            var list = red;
        }
        else if (item.deviceNum == 2) {
            var list = green;
        }
        else if (item.deviceNum == 3) {
            var list = blue;
        }

        list.forEach(function (value) {
            var url = 'http://10.0.0.15/port_3480/data_request?id=lu_action&output_format=json&DeviceNum=' + value +
                '&serviceId=urn:upnp-org:serviceId:Dimming1&action=SetLoadLevelTarget&newLoadlevelTarget=' + item.range;
            $http.get(url).success(function (data) { });
        });
        
    };
})

.controller('SettingsCtrl', function ($scope, $ionicTabsDelegate) {
    $scope.previousTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    };

    $scope.nextTab = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    };

  $scope.settings = {
    enableFriends: true
  };
});
