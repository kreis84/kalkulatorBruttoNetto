angular.module('git')
.controller('bruttoNetto', function($scope, bruttoNettoFactory)
{
	$scope.brutto;
	$scope.result = {};
	$scope.showError = false;
	$scope.showResult = false;
	$scope.miejscowy = 'miejscowy';

	$scope.$watch('brutto', ()=>{
		$scope.showError = false;
		if($scope.brutto !== undefined)
		{ 
			$scope.brutto = $scope.brutto.replace(',','.');
			if(isNaN($scope.brutto) || (parseFloat($scope.brutto) < 0)) $scope.showError = true;
		}
	});

	$scope.getNetto = function(event)
	{
		//event.preventDefault();
		if(event!==undefined)
		{
			event.preventDefault();
			if(event.keyCode !== 13) return;
		}

		if(!$scope.showError && $scope.brutto !== undefined && $scope.brutto != '')
		{
			$scope.result = bruttoNettoFactory.calculate($scope.brutto, $scope.miejscowy);
			$scope.showResult = true;
		}
	}
});
