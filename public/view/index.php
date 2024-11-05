
<!DOCTYPE html>
<html lang="en">
<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de Atendimento - VIP Sports</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="src/css/style.css">
    <script>
        var BASE_URL = "<?php echo $_GET['url'] ;?>";
    </script>
    <style>
        .side-border{
            border-left: 5px solid #6c757d;
            padding: 5px;
            display: flex;
            align-items: center;
        }
        #formTitle{
            text-align: center;
            margin-top: 20px;
        }
        ul{
            padding-left: 0px;
        }
    </style>
</head>
<body>
    <h1 id="formTitle">TESTE</h1>
    <main id="elementTypes">

    </main>
    <script src="../src/scripts/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="./src/script/Main.js"></script>
</body>
</html>