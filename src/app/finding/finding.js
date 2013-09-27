angular.module( 'myDealer.finding', [
  'ui.state',
  'placeholders',
  'ui.bootstrap',
  'titleService'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'finding', {
    url: '/finding',
    views: {
      "main": {
        controller: 'FindingCtrl',
        templateUrl: 'finding/finding.tpl.html'
      }
    }
  });
})

.factory('FindingService', function ($http) {
  return {
    find : function(params){
      console.log('find');
      $http.jsonp('http://svcs.ebay.com/services/search/FindingService/v1',
        {
          'OPERATION-NAME':'findItemsByKeywords',
          'SECURITY-APPNAME':'RaidoKal-bfa4-4414-9fc6-6016023b0c3c',
          'SERVICE-VERSION':'1.12.0',
          'RESPONSE-DATA-FORMAT':'JSON',
          'REST-PAYLOAD':'',
          'paginationInput.entriesPerPage':5,
          'callback':'JSON_CALLBACK'
        }).success(function(data) { console.log(data); });
    }
  };
})

.controller( 'FindingCtrl', function FindingCtrl( $scope, titleService, FindingService ) {
  titleService.setTitle( 'Finding' );

  $scope.user = Storage;
  $scope.change = true;
  $scope.sortOrders = 
  {
    'BestMatch':'Parim vaste',
    'BidCountFewest':'Kõige vähem pakkumisi',
    'BidCountMost':'Kõige rohkem pakkumisi',
    'CurrentPriceHighest':'Hinna järgi kahanevalt',
    'DistanceNearest':'Distantsi järgi',
    'EndTimeSoonest':'Kestvuse järgi',
    'PricePlusShippingHighest':'Hind saatmisega kõrgeim',
    'PricePlusShippingLowest':'Hind saatmisega madalaim',
    'StartTimeNewest':'Hiljuti lisatud'
  };
  $scope.user.sortOrder = Storage.sortOrder || 'BestMatch';


  $scope.save = function() {
    var string = "";
    for (var key in Storage)
    {
      string += key + "," + Storage[key] + ",";
    }
    var base64 = btoa(string);
    window.open("data:application/octet-stream;base64," + base64);
  };

  $scope.search = function()
  {
    console.log('search');
    if (!$scope.blocked)
    {
      if ($scope.change)
      {
        $scope.page = 1;
      }
      else
      {
        $scope.page++;
      }

      $scope.blocked = true;

      FindingService.find(
      {
        'keywords':$scope.user.keywords,
        'sortOrder': $scope.user.sortOrder,
        'paginationInput.pageNumber': $scope.page
      },
      function(response)
      {
        var result = response.findItemsByKeywordsResponse[0];
        var i;

        if (result.errorMessage)
        {
          for (i = 0, length = result.errorMessage.error.length; i < length; i++)
          {
            console.error(result.errorMessage.error[i]);
          }
          alert("error");
        }
        else
        {
          $scope.entries = result.paginationOutput[0].totalEntries;
          $scope.pages = result.paginationOutput[0].totalPages;
          var items = $scope.filterResults(result.searchResult[0].item);
          if ($scope.change) {
            console.log("replace");
            $scope.items = items;
          } else {
            console.log("append "+items.length+" to "+$scope.items.length);
            for (i = 0, size = items.length; i < size; i++)
            {
              $scope.items.push(items[i]);
            }
          }

          console.log('Entries:'+$scope.entries+' TotalPages:'+$scope.pages+" Page:"+$scope.page+" Items:"+$scope.items.length);
        }
        $scope.blocked = false;
        $scope.change = false;
      },
      function(error)
      {
        alert(error);
        $scope.blocked = false;
      }
      );
}

};

$scope.filterResults = function(rawItems)
{
  var items = [];
  for (var i = 0, count = rawItems.length; i < count; i++)
  {
    var item = {};
    var rawItem = rawItems[i];
    item.title = rawItem.title[0];
    item.link = rawItem.viewItemURL[0];
    item.thumb = rawItem.galleryURL[0];
    item.condition = rawItem.condition[0].conditionDisplayName;
    item.type = rawItem.listingInfo[0].listingType[0];
            item.startTime = rawItem.listingInfo[0].startTime[0]; // parse
            item.endTime = rawItem.listingInfo[0].endTime[0]; // parse
            item.price = {};
            item.price.value = rawItem.sellingStatus[0].currentPrice[0].__value__;
            item.price.currency = rawItem.sellingStatus[0].currentPrice[0]['@currencyId'];
            item.shipping = {};
            item.shipping.type = rawItem.shippingInfo[0].shippingType[0];
            if (rawItem.shippingInfo[0].shippingServiceCost)
            {
              item.shipping.value = rawItem.shippingInfo[0].shippingServiceCost[0].__value__;
              item.shipping.currency = rawItem.shippingInfo[0].shippingServiceCost[0]['@currencyId'];
            }
            item.shipping.toLocations = rawItem.shippingInfo[0].shipToLocations[0];
            item.shipping.handlingTime = rawItem.shippingInfo[0].handlingTime[0];
            item.timeLeft = $scope.parseTimeLeft(rawItem.sellingStatus[0].timeLeft[0]);
            item.bidCount = $scope.parseBidCount(rawItem.sellingStatus[0].bidCount && rawItem.sellingStatus[0].bidCount[0]);
            item.location = rawItem.location[0];
            item.labels = [];
            item.labels.push(rawItem.paymentMethod[0]);
            if (rawItem.listingInfo[0].bestOfferEnabled == "true") { item.labels.push("PP"); }
            if (rawItem.listingInfo[0].buyItNowAvailable == "true") { item.labels.push("OK"); }
            if (rawItem.listingInfo[0].listingType == "Auction") { item.labels.push("oksjon"); }
            if (rawItem.listingInfo[0].gift == "true") { item.labels.push("kingitus"); }
            if (rawItems.isMultiVariationListing && rawItems.isMultiVariationListing[0] == "true") { item.labels.push("variatsioonid"); }
            item.labels.push("test");

            items.push(item);
          }
          return items;
        };


        $scope.parseTimeLeft = function(string)
        {
          var re = new RegExp("P([0-9]+)DT([0-9]+)H([0-9]+)M([0-9]+)S");
          var m = re.exec(string);
          timeleft = "";
          if (m != null) {
            if (m[1] > 0) { timeleft += m[1] + "p "; }
            if (m[2] > 0) { timeleft += m[2] + "h "; }
            if (m[3] > 0) { timeleft += m[3] + "m "; }
            if (m[4] > 0) { timeleft += m[4] + "s"; }
          }
          return timeleft;
        };

        $scope.parseBidCount = function(bidCount)
        {
          if (bidCount == null)
          {
            return 'OK';
          }
          return bidCount;
        };

        var scope = $scope;

        scope.$watch('user', function(newValue, oldValue)
        {
          Storage = $scope.user;
          $scope.change = true;
        }, true);

        $scope.search();
      })

;

