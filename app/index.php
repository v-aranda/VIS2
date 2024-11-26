<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

require 'config.php';
include 'controllers/ArtController.php';
include 'database/ConnectionTo.php';


// // Incluir os arquivos necessários (autoload ou includ
// ... outros includes ...
$url = isset($_GET['url']) ? $_GET['url'] : '/';
$urlParts = explode('/', $url);

// // Obter o método HTTP da requisição
$method = $_SERVER['REQUEST_METHOD'];

// Obter o controlador e o método da rota
$controllerName = !empty($urlParts[0]) ? ucfirst($urlParts[0]) . 'Controller' : 'DefaultController'; 
$methodName =  $method . ucfirst($urlParts[0]); // 'index' para a rota raiz
$methodParam = $method !== "POST" && !empty($urlParts[1]) ? array_shift($urlParts): false;
if($methodParam){
    $methodParam =  !empty($urlParts[1]) ? $urlParts: $urlParts[0];
}



// Mensagens de erro
$errorMessages = [
    'method_not_found' => 'Método não encontrado.',
    'controller_not_found' => 'Controlador não encontrado.',
    'route_not_found' => 'Rota não encontrada!!!'
];

// Verificar se o controlador existe
$controllerPath = __DIR__ . '/controllers/' . $controllerName . '.php';

if (file_exists($controllerPath)) {
    require_once $controllerPath;

    // Verificar se a classe do controlador existe
    if (class_exists($controllerName)) {
        $controller = new $controllerName();
       
        // Verificar se o método existe no controlador
        if (method_exists($controller, $methodName)) {

            if($methodParam){
                
                call_user_func_array([$controller, $methodName], [$methodParam]);
                return;
            }

            call_user_func_array([$controller, $methodName],[]);
            

        } else {
            http_response_code(404);
            echo json_encode(['message' => $errorMessages['method_not_found']], JSON_UNESCAPED_UNICODE);
            return;
        }
    } else {
        http_response_code(404);
        echo json_encode(['message' => $errorMessages['controller_not_found']], JSON_UNESCAPED_UNICODE);
        return;
    }
} else {
    http_response_code(404);
    echo json_encode(['message' => $errorMessages['route_not_found']], JSON_UNESCAPED_UNICODE);
    return;
}

?>
