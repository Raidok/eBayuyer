angular.module( 'eBayuyer', [
  'templates-app',
  'templates-common',
  'list',
  'finding',
  'shopping',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/list' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | eBayuyer' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;
