angular.module("jarl", [])
  .controller("jarlCtrl", ["$scope", function ($scope) {
    $scope.fullUrl = "";

    $scope.$watch("fullUrl", function (newVal, oldVal) {
      if (typeof(newVal) === "undefined") {
        $scope.baseUrl = "";
        $scope.params = [];
        return;
      }
      var parts = newVal.split("?");

      $scope.baseUrl = parts[0];
      var paramStrings = parts[1];

      if (paramStrings) {
        var keyvals = paramStrings.split("&");

        var params = [];
        for (var i = 0; i < keyvals.length; i++) {
          var kv = keyvals[i].split("=");
          params.push({
            key: kv[0],
            val: decodeURIComponent(kv[1])
          });
        }

        $scope.params = params;
      } else {
        $scope.params = [];
      }
    });
  }]);
