angular.module('shopping', ['ngResource']).factory('Shopping', ['$resource', function($resource)
{
    var Shopping = $resource('http://open.api.ebay.com/shopping',
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
    },
    {
        find: {method:'JSONP'}
    });

    return Shopping;
}]);


function ShoppingCtrl($scope, $rootScope, $location, Shopping)
{
    $scope.search = function()
    {
        var res = Shopping.find({QueryKeywords:'raspberry'}, function() {
            alert(res);
        });   
    };
}