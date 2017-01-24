angular.module("jarl", [])
  .controller("jarlCtrl", ["$scope", "$location", function ($scope, $location) {
    // decode the URL if it is provided
    if (typeof($location.search().url) === "undefined") {
      $scope.fullUrl = "";
    } else {
      $scope.fullUrl = decodeURIComponent($location.search().url);
    }

    $scope.$watch("fullUrl", function (newVal, oldVal) {
      if (typeof(newVal) === "undefined") {
        $scope.baseUrl = "";
        $scope.shareableUrl = "";
        $scope.params = [];
        return;
      }

      var parts = newVal.split("?");

      $scope.shareableUrl = $location.absUrl().split('?')[0] + "?url=" + encodeURIComponent(newVal);
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
