<?php
class QuestionController
{

    // GET uri/art/{id} - Buscar um elemento específico
    public function GETQuestion()
    {
        http_response_code(200); // Not Found
        header('Content-Type: application/json');
        echo ('{
        "1": [
            {
                "id": "Logotype_1",
                "infos": {
                    "title": "Logotipos vão sofrer alguma alteração?",
                    "desc": "",
                    "resume": "Alteração de Logotipos",
                    "alternativas": [
                        "Não",
                        "Sim"
                    ],
                    "justificativas": [
                        1
                    ]
                }
            },
            {
                "id": "Logotype_2",
                "infos": {
                    "title": "Já temos esses logotipos?",
                    "desc": "Informe um ou mais serviços que contenham os logotipos necessários.",
                    "resume": "Logotipo Novo",
                    "alternativas": [
                        "Não",
                        "Sim"
                    ],
                    "justificativas": [
                        1
                    ]
                }
            }
        ],
    "2": [
        {
            "id": "Custom_1",
            "infos": {
                "title": "O cliente quer que pule algum número?",
                "desc": "",
                "resume": "Numeros Pulados",
                "alternativas": [
                    "Não",
                    "Sim"
                ],
                "justificativas": [
                    1
                ]
            }
        },
        {
            "id": "Custom_2",
            "infos": {
                "title": "Qual o tipo de numeração que o cliente deseja?",
                "desc": "Como será feita a sequência de numeração?",
                "resume": "Tipo de Numeração",
                "alternativas": [
                    "Numeração Sequencial Unica(Ex: Do 1 em Diante.)",
                    "Numeração Sequencial em Intervalos(Ex: Modelo 1: 1-20; Modelo 2: 21-30; etc.)",
                    "Numeração Sequencial Multipla(Ex: Modelo 1: 1-20; modelo 2: 1-10; modelo 3: 1-15)"
                ],
                "justificativas": [
                    1,
                    2
                ]
            }
        }
    ],
    "3": [
        {
            "id": "Name_3",
            "infos": {
                "title": "Os nomes vão usar acento?",
                "desc": "",
                "resume": "Acentuação",
                "alternativas": [
                    "Sim",
                    "Não"
                ],
                "justificativas": []
            }
        }
    ]
}');

        return;
    }
}
