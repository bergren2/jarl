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

      if (newVal === "") {
        $scope.shareableUrl = "";
      } else {
        $scope.shareableUrl = $location.absUrl().split('#?')[0] + "#?url=" + encodeURIComponent(newVal);
      }

      $scope.baseUrl = parts[0];
      var paramStrings = parts[1];

      if (paramStrings) {
        var keyvals = paramStrings.split("&");

        var params = [];
        for (var i = 0; i < keyvals.length; i++) {
          var kv = keyvals[i].split("=");
          var key = kv[0];
          var val = decodeURIComponent(kv[1]);

          // lazily and (somewhat) flexibly check if it's base64
          // note, this will give false positives because we're not domain experts
          // right now we're looking for basic decodes + email addresses
          var isBase64, decodedVal;
          try {
            decodedVal = atob(val);

            isBase64 = /^[a-zA-Z0-9@.?!,'"]+$/.exec(decodedVal) && new RegExp(val + "=*").exec(btoa(decodedVal));
          } catch (e) {
            isBase64 = false;
          }

          if (isBase64) {
            params.push({
              key: key,
              val: val,
              isBase64: isBase64,
              decoded64: decodedVal
            });
          } else {
            params.push({
              key: key,
              val: val,
              isBase64: isBase64
            });
          }

        }

        $scope.params = params;
      } else {
        $scope.params = [];
      }
    });
  }]);
