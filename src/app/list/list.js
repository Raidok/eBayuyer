angular.module('list', []).run(function($rootScope)
{
    $rootScope.cat = ["Raspberry", "Arduino", "e-reader"];
    $rootScope.list =
    [
        {
            thumb:'http://thumbs1.ebaystatic.com/m/mVNInzH2Lu48YlhPrbBD-3w/140.jpg',
            title:'Raspberry Pi 2.0 Model B 512MB Version Linux System Board w/ Transparent Case',
            link:'http://www.ebay.com/itm/Raspberry-Pi-2-0-Model-B-512MB-Version-Linux-System-Board-w-Transparent-Case-/290876988660?pt=LH_DefaultDomain_0',
            price:'56.95', priceCurrency:'USD',
            shipping:'9.90', shippingCurrency:'USD',
            timeLeft:'29p 13h 18m 2s',
            labels:['PayPal','OK'],
            group:$rootScope.cat[0]
        },
        {
            thumb:'http://thumbs1.ebaystatic.com/m/mjY4l5THFuFpIpCsf93fqqA/140.jpg',
            title:'Arduino Leonardo Board',
            link:'http://www.ebay.com/itm/Original-Genuine-Arduino-Leonardo-Board-sold-Italy-distributor-/181077135072?pt=LH_DefaultDomain_0',
            price:'27.80', priceCurrency:'USD',
            shipping:'11.90', shippingCurrency:'USD',
            timeLeft:'1h 21m 53s',
            labels:['PayPal','OK'],
            group:$rootScope.cat[1]
        },
        {
            thumb:'http://thumbs3.ebaystatic.com/m/mDLac9TltxTLXbidz3v0Wyw/140.jpg',
            title:'Barnes & Noble NOOK Simple Touch™ 2GB+Wi-Fi 6in',
            link:'http://www.ebay.com/itm/Barnes-Noble-NOOK-Simple-Touch-2GB-Wi-Fi-6in-Brand-New-Box-Factory-Sealed-/290875468486?pt=US_Tablets',
            price:'67.00', priceCurrency:'USD',
            shipping:'19.90', shippingCurrency:'USD',
            bidCount:55,
            timeLeft:'49m 22s',
            labels:['PayPal','auction'],
            group:$rootScope.cat[2]
        },
        {
            thumb:'http://thumbs4.ebaystatic.com/m/mGE37gqk3DlQElwK2IxKg7A/140.jpg',
            title:' 5PCS IC ATMEL DIP-28 ATMEGA328P-PU',
            link:'http://www.ebay.com/itm/5PCS-IC-ATMEL-DIP-28-ATMEGA328P-PU-/400401440211?pt=LH_DefaultDomain_0',
            price:'12.00', priceCurrency:'USD',
            shipping:'0.0', shippingCurrency:'USD',
            timeLeft:'12p 21h 39m 45s',
            labels:['PayPal'],
            group:$rootScope.cat[1]
        }
    ];
});


function ListCtrl($scope, $rootScope, $location)
{
    var scope = $scope;
    scope.sink;
    $scope.buttonsEnabled ="btn";
    
    $scope.check = [true, false, false];
    
    $scope.new = function()
    {
        $location.path("/new");
    }

    $scope.delete = function(ids)
    {
        for (var i = 0; i < ids.length; i++)
        {
            $rootScope.list.splice(ids[i--], 1);    
        }
    }

    scope.$watch('checkAll', function(newValue, oldValue)
    {
        console.log("sink:" + scope.sink);

        for (var i = 0; i < $scope.check.length && !scope.sink; i++)
        {
            $scope.check[i] = $scope.checkAll;
        }
        scope.sink = false;
    });

    scope.$watch('check', function(newValue, oldValue)
    {
        var allTrue = true;
        $scope.selected = 0;
        
        for (var i = 0; i < $scope.check.length; i++)
        {
            allTrue &= $scope.check[i];
            if ($scope.check[i]) {
                $scope.selected++;
            }
        }

        scope.sink = true;
        $scope.checkAll = allTrue?true:false;

    }, true);

    scope.$watch('selected', function(newValue, oldValue)
    {
        console.log("sel " + $scope.selected);
        if ($scope.selected) {
            $scope.buttonsEnabled = "btn disabled";
            console.log("sel");
        } else {
            $scope.buttonsEnabled = "btn";
            console.log("unsel");
        }
    });
}
