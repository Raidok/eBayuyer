angular.module( 'myDealer.shopping', [
  'ui.state',
  'placeholders',
  'ui.bootstrap',
  'titleService'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'shopping', {
    url: '/shopping',
    views: {
      "main": {
        controller: 'ShoppingCtrl',
        templateUrl: 'shopping/shopping.tpl.html'
      }
    }
  });
})

.controller( 'ShoppingCtrl', function ShoppingCtrl( $scope, $http, titleService ) {
  titleService.setTitle( 'Shopping' );

  $scope.search = function()
  {
    /*var res = Shopping.find({QueryKeywords:'raspberry'}, function() {
      alert(res);
    });*/
    $http.jsonp('http://open.api.ebay.com/shopping',
          {
              appid:'RaidoKal-bfa4-4414-9fc6-6016023b0c3c',
              responseencoding:'JSON',
              callname:'FindProducts',
              version:811,
              siteid:0,
              AvailableItemsOnly:true,
              QueryKeywords:'arduino',
              MaxEntries:50,
              callback:'JSONP_CALLBACK'
          })
          .success(function(data){
            console.log(data.found);
        });
  };
})

;

