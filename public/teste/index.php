<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <iframe id="iframeVis2" style="width: 100%; height: 95vh" src="../index.php?codItem=1&artName=TESTE VINI&artEspec=CAMISA | ALGODÃO | CINZA&artProduct=1&obj=" frameborder="0"></iframe>
        <button onclick="mostraValor()">
            objeto
        </button>
        <script>
            var objFormEspecificacoes = {}
            const objsect = `{
    "elementos": [
        {
            "typeOfElement": "6",
            "elementPosition": "8",
            "elementDescription": "",
            "container": "#elementContainer0"
        },
        {
            "typeOfElement": "2",
            "elementPosition": "12",
            "elementDescription": "",
            "container": "#elementContainer1"
        },
        {
            "typeOfElement": "1",
            "elementPosition": "4",
            "elementDescription": "",
            "container": "#elementContainer2"
        }
    ],
    "complementos": {
        "1": [
            {
                "question": "Logotype_1",
                "resume": "Alteração de Logotipos",
                "alternative": 0,
                "response": "Não"
            },
            {
                "question": "Logotype_2",
                "resume": "Já temos os Logotipos",
                "alternative": 0,
                "response": "Não"
            }
        ],
        "2": [
            {
                "question": "Custom_1",
                "resume": "Numeros Pulados",
                "alternative": 0,
                "response": "Não"
            },
            {
                "question": "Custom_2",
                "resume": "Tipo de Numeração",
                "alternative": 0,
                "response": "Numeração Sequencial Unica(Ex: Do 1 em Diante.)"
            }
        ]
    },
    
}`

            document.getElementById('iframeVis2').setAttribute('src', `../index.php?codItem=1&artName=TESTE VINI&artEspec=CAMISA | ALGODÃO | CINZA&artProduct=1&obj=${objsect}`)
            function mostraValor() {
               
                console.log(objFormEspecificacoes);
            }
        </script>
    </body>
</html>