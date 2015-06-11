
angular.module('App')

//dependency inject the Currencies service defined in app.js
.controller('RatesController', function ($scope, $http, Currencies) {

    // Set the Currencies service data on the $scope
    $scope.currencies = Currencies;

    //$scope load method that can be called on demand
    $scope.load = function () {
        $http.get('https://api.bitcoinaverage.com/ticker/all').success(function (tickers) {

            //add current currency ticker data to the Currencies service
            angular.forEach($scope.currencies, function (currency) {currency.ticker = tickers[currency.code];

                //convert ticker timestamp to valid JS date object
                currency.ticker.timestamp = new Date(currency.ticker.timestamp)
            });
        });
    };

    //trigger the load() on controller load event
    $scope.load();
});