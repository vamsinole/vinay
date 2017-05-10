var app = angular.module('app', ['ui.bootstrap']);

app.controller('productsCtrl', function($http, $scope) {

  $scope.products = [];
  $scope.selected = "";
  $scope.getProducts = function() {
    $http.get("shop.json").then(function(response) {
      $scope.products = response.data;
      $scope.copyProducts = angular.copy($scope.products);
      $scope.otherCopyProducts = angular.copy($scope.products);
      $scope.usableProducts = $scope.copyProducts.slice(0, 9);
      $scope.copyProducts.splice(0, 9);
    });
    // console.log($scope.mydata);
  };

  $scope.all = true;
  $scope.getProducts();

  $scope.capsuleProducts = function() {
    $scope.powder = false;
    $scope.all = false;
    $scope.coffee = false;
    $scope.capsule = true;
    $scope.getProducts();
    $scope.capusleProducts = [];
    for (var i = 0; i < $scope.otherCopyProducts.length; i++) {
      if ($scope.otherCopyProducts[i].type == 'CAPSULE') {
        $scope.capusleProducts.push($scope.otherCopyProducts[i]);
      }
    }
    $scope.copyProducts = [];
    $scope.copyProducts = $scope.copyProducts.concat($scope.capusleProducts);
    $scope.usableCapsules = $scope.copyProducts.slice(0, $scope.copyProducts.length);
  }

  $scope.powderProducts = function() {
    $scope.powder = true;
    $scope.all = false;
    $scope.coffee = false;
    $scope.capsule = false;
    $scope.getProducts();
    $scope.powderProducts = [];
    for (var i = 0; i < $scope.otherCopyProducts.length; i++) {
      if ($scope.otherCopyProducts[i].type == 'POWDER') {
        $scope.powderProducts.push($scope.otherCopyProducts[i]);
      }
    }
    $scope.copyProducts = [];
    $scope.copyProducts = $scope.copyProducts.concat($scope.powderProducts);
    $scope.usablePowders = $scope.copyProducts.slice(0, $scope.copyProducts.length);
  }

  $scope.coffeeProducts = function() {
    $scope.powder = false;
    $scope.all = false;
    $scope.coffee = true;
    $scope.capsule = false;
    $scope.getProducts();
    $scope.coffeeProducts = [];
    for (var i = 0; i < $scope.otherCopyProducts.length; i++) {
      if ($scope.otherCopyProducts[i].type == 'COFFEE') {
        $scope.coffeeProducts.push($scope.otherCopyProducts[i]);
      }
    }
    $scope.copyProducts = [];
    $scope.copyProducts = $scope.copyProducts.concat($scope.coffeeProducts);
    $scope.usableCoffees = $scope.copyProducts.slice(0, $scope.copyProducts.length);
  }

  $scope.loadMore = function() {
    if ($scope.all) {
      $scope.usableProducts = $scope.usableProducts.concat($scope.copyProducts.slice(0, 9));
    }
    if ($scope.capsule) {
      $scope.capsuleProducts();
      $scope.usableCapsules = $scope.usableCapsules.concat($scope.copyProducts.slice(0, 9));
    }
    if ($scope.coffee) {
      $scope.coffeeProducts();
      $scope.usableCoffees = $scope.usableCoffees.concat($scope.copyProducts.slice(0, 9));
    }
    if ($scope.powder) {
      $scope.powderProducts();
      $scope.usablePowders = $scope.usablePowders.concat($scope.copyProducts.slice(0, 9));
    }
    $scope.copyProducts.splice(0, 9);
  };

  $scope.showingButton = function() {
    if ($scope.all || !$scope.capsule || !$scope.coffee || !$scope.powder) {
      if ($scope.copyProducts && $scope.copyProducts.length == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  // $(document).ready(function() {
  //   $('#typeahead').typeahead({
  //     source: $scope.products
  //   });
  // });


  $scope.allPdt = function() {
    $scope.powder = false;
    $scope.all = true;
    $scope.coffee = false;
    $scope.capsule = false;
  }

  // $scope.usableProducts = $scope.products.slice(0,9);
})

angular.module('app')
  .directive('typeaheadOpenOnFocus', function() {
    return {
      require: ['typeahead', 'ngModel'],
      link: function(scope, element, attr, ctrls) {
        element.bind('focus', function() {
          ctrls[0].getMatchesAsync(ctrls[1].$viewValue);
          scope.$apply();
        });
      }
    };
  })
