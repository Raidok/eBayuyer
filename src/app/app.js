angular.module( 'myDealer', [
  'templates-app',
  'templates-common',
  'myDealer.overview',
  'myDealer.finding',
  'myDealer.shopping',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/list' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | myDealer' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

