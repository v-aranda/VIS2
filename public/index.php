<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de Atendimento - VIP Sports</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="src/css/style.css">
    <style>
        body,
        label {
            margin: 0px;

        }

        textarea {
            resize: none;
        }

        .form-check {
            display: flex;
            flex-direction: column;
        }


        ul {
            list-style: none;
            padding-left: 0px;
        }

        .elementsList {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    </style>
</head>

<body>
    <!-- CONTAINER -->
    <div id="exampleModal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Selecione a posição do elemento</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="positionOptions" class="modal-body">

                </div>

            </div>
        </div>
    </div>


    <main class="container mt-5">
        <h1 class="text-center mb-4">Formulário de Atendimento - VIP Sports</h1>
        <hr>
        <section id="ElementsContainer" class="p-3">
            <h2 class="d-flex align-items-center">
                Elementos Graficos
                <div class="d-flex ml-3">
                    <button class="btn btn-primary" id="addElementsButton">
                        <i class="bi bi-plus"></i>
                        ADICIONAR ELEMENTO
                    </button>
                </div>

            </h2>

            <ul class="elementsList" id="elementsListContainer">

            </ul>
        </section>
        <hr>
        <section id="AditionalInfos" class="p-3">
            <h2 class="d-flex align-items-center">
                Informações adicionais

            </h2>

        </section>




        <!-- Botão de Envio -->
        <button type="submit" id="submitButton" class="btn btn-primary btn-block">Enviar Formulário</button>
    </main>

    <!-- Bootstrap JS e dependências -->
    <script src="./src/scripts/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="./src/scripts/Main.js" type="Module"></script>
</body>

</html>