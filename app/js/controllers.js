angular.module('git')
.controller('bruttoNetto', ['$scope','bruttoNettoFactory',function($scope, bruttoNettoFactory)
{
	$scope.brutto;//2000;
	$scope.result = {};
	$scope.employerResult = {};
	$scope.showError = false;
	$scope.showWypadkoweError = false;
	$scope.showResult = false;
	$scope.miejscowy = 'miejscowy';
	$scope.showEmployerResult = false;
	$scope.wypadkowe = 1.8;

	$scope.$watch('brutto', ()=>{
		$scope.showError = false;
		if($scope.brutto !== undefined)
		{ 
			$scope.brutto = $scope.brutto.replace(',','.');
			if(isNaN($scope.brutto) || (parseFloat($scope.brutto) < 0)) $scope.showError = true;
		}
	});

	$scope.$watch('wypadkowe', function()
	{
		$scope.showWypadkoweError = false;
		$scope.wypadkowe = String($scope.wypadkowe).replace(',','.');
		$scope.getEmployerCosts();
	});

	$scope.$watch('miejscowy', function()
	{
		$scope.getNetto();
	});

	$scope.getNetto = function(event)
	{
		if(event!==undefined)
		{
			if(event.keyCode !== 13) return;
		}
		if($scope.brutto < 800) 
		{
			alert('Minimalna kwota do obliczeń to 800.');
			return;
		}

		if(!$scope.showError && $scope.brutto !== undefined && $scope.brutto != '')
		{
			$scope.result = bruttoNettoFactory.calculate($scope.brutto, $scope.miejscowy);
			$scope.showResult = true;
		}
	}

	$scope.getEmployerCosts = function()
	{
		if(!isNaN($scope.wypadkowe) && ($scope.wypadkowe !== undefined))
			$scope.employerResult = bruttoNettoFactory.calculateEmployer(parseFloat($scope.brutto), $scope.wypadkowe);
		else $scope.showWypadkoweError = true;
	}

}]);
