angular.module('git')

.factory('bruttoNettoFactory', function()
{
	let kwotaWolnaOdPodatku = 46.33,
		progPodatkowy = 85528,
		kosztyUzyskania, skEmerytalna, skChorobowa, skRentowa,
		podstUbZdrowotne, skUbZdrowotne,
		podstZalPodDochodowy, 
		procentPodatekDochodowy,
		podatekDochodowy,
		drugaSkZdrowotna,
		netto = 0;

	let _calculate = function(brutto)
	{
		skEmerytalna = (brutto * 0.0976);//.toFixed(2);
		skRentowa = (brutto * 0.015);//.toFixed(2);
		skChorobowa = (brutto * 0.0245);//.toFixed(2);
		podstUbZdrowotne = brutto - skEmerytalna - skRentowa - skChorobowa;
		skUbZdrowotne = podstUbZdrowotne * 0.09;
		podstZalPodDochodowy = podstUbZdrowotne - kosztyUzyskania;
		if((podstZalPodDochodowy*12) < progPodatkowy)
			procentPodatekDochodowy = 0.18;
		else procentPodatekDochodowy = 0.32;
		podatekDochodowy = (podstZalPodDochodowy * procentPodatekDochodowy) - kwotaWolnaOdPodatku;
//		drugaSkZdrowotna = podstUbZdrowotne * 0.0775;
		podatekDochodowy -= (podstUbZdrowotne * 0.0775);
		podatekDochodowy = Math.ceil(podatekDochodowy);
		netto = brutto - skEmerytalna - skRentowa - skChorobowa - skUbZdrowotne - podatekDochodowy;

		return{
			netto: netto.toFixed(2),
			podatekDochodowy: podatekDochodowy.toFixed(2),
			ubezpieczenieZdrowotne: skUbZdrowotne.toFixed(2),
			skladkaEmerytalna: skEmerytalna.toFixed(2),
			skladkaChorobowa: skChorobowa.toFixed(2),
			skladkaRentowa: skRentowa.toFixed(2),
			skladkaZdrowotna: skUbZdrowotne.toFixed(2)
		};
	}

	function _calculateEmployer(brutto, wypadkowe)
	{
		let ubEmerytalne,
			ubRentowe,
			ubWypadkowe,
			skFundPracy,
			skFGSP;
			
		ubEmerytalne = brutto*0.0976;
		ubRentowe = brutto * 0.065;
		ubWypadkowe = brutto * (wypadkowe / 100);
		skFundPracy = brutto * 0.0245;
		skFGSP = brutto * 0.001;

		return{
			ubezpieczenieEmerytalne: ubEmerytalne.toFixed(2),
			ubezpieczenieRentowe: ubRentowe.toFixed(2),
			ubezpieczenieWypadkowe: ubWypadkowe.toFixed(2),
			skladkaFunduszPracy: skFundPracy.toFixed(2),
			skladkaFGSP: skFGSP.toFixed(2),
			laczneKoszty: (brutto+ubEmerytalne + ubRentowe + ubWypadkowe 
							+ skFundPracy + skFGSP).toFixed(2)
		};
	}

	return{
		calculate: function(brutto, koszt)
		{
			if(koszt === 'miejscowy')
				kosztyUzyskania = 111.25;
			else kosztyUzyskania = 139.06;
			return _calculate(brutto);
		},

		calculateEmployer: function(brutto, wypadkowe)
		{
			return _calculateEmployer(brutto, wypadkowe);
		}
	}
});
