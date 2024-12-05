<?php
class QuestionController
{

    //teste
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
                    "resume": "Já temos os Logotipos",
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
                    "Numeração Personalizada(De acordo com a tabela)",
                    "Numeração Sequencial em Intervalos(Ex: Modelo 1: 1-20; Modelo 2: 21-30; etc.)",
                    "Numeração Sequencial Multipla(Ex: Modelo 1: 1-20; modelo 2: 1-10; modelo 3: 1-15)"
                ],
                "justificativas": [
                    2,
                    3
                ]
            }
        }
    ],
    "3": [
        {
            "id": "Name_3",
            "infos": {
                "title": "As letras do nome serão:",
                "desc": "",
                "resume": "Padrão das Letras",
                "alternativas": [
                    "MAIUSCULAS",
                    "minusculas",
                    "Capitalizadas"
                ],
                "justificativas": []
            }
        },
        {
            "id": "Name_4",
            "infos": {
                "title": "O cliente quer alguma fonte expecífica?",
                "desc": "Liste as fontes que o cliente deseja.",
                "resume": "Fontes",
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
    "4": [
            {
                "id": "ilustration_1",
                "infos": {
                    "title": "Ilustrações vão sofrer alguma alteração?",
                    "desc": "",
                    "resume": "Alteração de Ilustrações",
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
                "id": "ilustration_2",
                "infos": {
                    "title": "Já temos estas as Ilustrações?",
                    "desc": "Informe um ou mais serviços que contenham as ilustrações necessárias.",
                    "resume": "Já temos as Ilustrações",
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
        "5": [
            {
                "id": "patroc_2",
                "infos": {
                    "title": "Já temos estes patrocinadores?",
                    "desc": "Informe os serviços que contêm estes patrocinadores.",
                    "resume": "Já temos os patrocinadores",
                    "alternativas": [
                        "Não",
                        "Sim"
                    ],
                    "justificativas": [
                        1
                    ]
                }
            }
                
        ]
     
}');

        return;
    }
}
