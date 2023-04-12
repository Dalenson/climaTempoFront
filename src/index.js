angular.module('myApp', [])
    .controller('myCtrl', function($scope, $http) {
    
        $http({
            method: 'GET',
            url: 'http://localhost:8081/tempo',
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }).then(function successCallback(response) {
            var resultados = response.data.results;
            $scope.cidade = resultados.city;
            $scope.hoje = formatarData(new Date());
            $scope.forecast = resultados.forecast;
            $scope.descricao = resultados.description;
            $scope.temperatura = resultados.temp;
            if($scope.descricao.includes('Chuvas')){
                $('#imgTempo').attr("src",'/img/chuva.png');
            }
            if($scope.descricao.includes('Tempo nublado') ||
            $scope.descricao.includes('Parcialmente nublado')){
              $('#imgTempo').attr("src",'/img/nublado.png');
            }
            if($scope.descricao.includes('Tempo limpo')){
              $('#imgTempo').attr("src",'/img/sol.png');
            }
          }, function errorCallback(response) {
            console.log('Problemas na requisição')
            }
        );
             
});

function formatarData(data) {
  // Obter o dia, mês e ano da data
  let dia = data.getDate();
  let mes = data.getMonth();
  let ano = data.getFullYear();

  // Criar um array com os nomes dos meses
  let nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  // Obter o nome do mês a partir do array
  let nomeMes = nomesMeses[mes];

  // Formatar a data com o nome do mês
  let dataFormatada = dia + " de " + nomeMes + " de " + ano;

  // Retornar a data formatada
  return dataFormatada;
}

