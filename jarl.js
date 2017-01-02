angular.module("jarl", [])
  .controller("jarlCtrl", ["$scope", function ($scope) {
    $scope.fullUrl = "";
    $scope.baseUrl = $scope.fullUrl;
    $scope.params = [];

    $scope.$watch("fullUrl", function (newVal, oldVal) {
      if (urlForm.fullUrl.$error && urlForm.fullUrl.$error.url) {
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
      }
    });
  }]);
