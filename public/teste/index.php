<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <iframe id="iframeVis2" style="width: 100%; height: 95vh" src="https://www.vipsportsproducao.com.br/VIS2/public/index.php?codItem=1&artName=TESTE VINI&artEspec=CAMISA | ALGODÃO | CINZA&artProduct=1&obj={\"mtd_art\\":null,\"mtd_data\":\"{\"elementos\":\"[{\\\"typeOfElement\\\":\\\"1\\\",\\\"elementPosition\\\":\\\"2\\\",\\\"elementDescription\\\":\\\"\\\",\\\"container\\\":\\\"#elementContainer0\\\"},{\\\"typeOfElement\\\":\\\"2\\\",\\\"elementPosition\\\":\\\"3\\\",\\\"elementDescription\\\":\\\"teste teste teste\\\",\\\"container\\\":\\\"#elementContainer1\\\"}]\",\"complementos\":\"{\\\"2\\\":[{\\\"question\\\":\\\"Custom_1\\\",\\\"resume\\\":\\\"Numeros Pulados\\\",\\\"alternative\\\":0,\\\"response\\\":\\\"Não\\\"},{\\\"question\\\":\\\"Custom_2\\\",\\\"resume\\\":\\\"Tipo de Numeração\\\",\\\"alternative\\\":0,\\\"response\\\":\\\"Numeração Sequencial Unica(Ex: Do 1 em Diante.)\\\"}]}\"}\"}" frameborder="0"></iframe>
        <button onclick="mostraValor()">
            objeto
        </button>
        <script>
            var objFormEspecificacoes = {}
            function mostraValor() {
               
                console.log(objFormEspecificacoes);
            }
        </script>
    </body>
</html>