angular.module('starter.controllers', [])

.controller('ChartCtrl', function ($scope, $ionicLoading) {

    $scope.attendanceData = [];
    $ionicLoading.show();

    // get attendance info
    var queryString = 'http://attendacetracker.azurewebsites.net/xml/Attendance/10';

    $.ajax({
        type: "GET",
        url: queryString,
        dataType: "xml",
        success: xmlParser
    });

    function xmlParser(data) {
        xml = data;
        var boysHolder = [];
        var girlsHolder = [];
        var dateHolder = [];

        $(xml).find("Attendance_Data").each(function () {

            var boys = $(this).find("Boys").text()
            var girls = $(this).find("Girls").text()
            //var total = $(this).find("Boys").text()
            var date = new Date($(this).find("Date").text());
            date.setDate(date.getDate() + 1);

            $scope.attendanceData.push({ Boys: boys, Girls: girls, Date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() });

            boysHolder.push(boys);
            girlsHolder.push(girls);
            dateHolder.push((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());


        });

        $ionicLoading.hide();
        updateChart(boysHolder, girlsHolder, dateHolder);
        $scope.$apply();
    }

    function updateChart(boysHolder, girlsHolder, dateHolder) {

        $scope.labels = dateHolder;
        $scope.series = ['Boys', 'Girls'];
        $scope.data = [
          boysHolder,
          girlsHolder
        ];

    }

    //$scope.donate = function () {
    //    window.open('https://www.givemn.org/project/training-dandabus-teachers-and-supporting-their-growing-secondary-school565d08515b1cf','_blank', 'location=yes');
    //}



})

.controller('DataCtrl', function ($scope, $ionicLoading) {

    $ionicLoading.show();
    $scope.header = "The Raw Data"
    $scope.attendanceData = [];

    // get attendance info
    var queryString = 'http://attendacetracker.azurewebsites.net/xml/Attendance/50';

    $.ajax({
        type: "GET",
        url: queryString,
        dataType: "xml",
        success: xmlParser
    });

    function xmlParser(data) {
        xml = data;

        $(xml).find("Attendance_Data").each(function () {

            var boys = $(this).find("Boys").text();
            var girls = $(this).find("Girls").text();
            var total = boys + girls;
            var date = new Date($(this).find("Date").text());
            date.setDate(date.getDate() + 1);

            $scope.attendanceData.push({ boys: boys, girls: girls, total: total, date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() });
        });

        $ionicLoading.hide();
        $scope.$apply();
    }

})


.controller('AboutCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
