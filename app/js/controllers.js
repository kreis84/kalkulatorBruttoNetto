angular.module('git')
.controller('bruttoNetto', function($scope, bruttoNettoFactory)
{
	$scope.brutto = 0;
	$scope.result = {};

	$scope.getNetto = function()
	{
		$scope.result = bruttoNettoFactory.calculate($scope.brutto, 'miejscowy');
	}
});
