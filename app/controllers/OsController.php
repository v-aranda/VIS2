<?php
include 'models/OsModel.php';
// ... (Classes ConnectionTo e ArtModel) ...

class OsController {

    private $osModel;

    public function __construct() {
        $this->osModel = new OsModel('vipspo66_producao'); 
    }

    // GET uri/art - Obter todos os elementos
    public function GETIndex(){
        try {
            $oss = $this->osModel->readAll();
            // Retornar os dados em formato JSON
            header('Content-Type: application/json');
            echo json_encode($oss); 
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // GET uri/art/{id} - Buscar um elemento específico
    public function GETOs($id=null) {
        if(!$id){
            http_response_code(404); // Not Found
            echo json_encode(['message' => 'Informe o código da Os!'], JSON_UNESCAPED_UNICODE);
            return;
        }
        try {
            $oss = $this->osModel->readById($id);
          
            if ($oss) {
                $response = ["art_os" => $oss["cod_servico"],
                "art_description" => $oss["desc_servico"],
                "art_product" => $oss["cod_produto"]];
                
                header('Content-Type: application/json');
                echo json_encode($response);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Os não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // Função auxiliar para tratar erros
    private function handleError(Exception $e) {
        error_log("Erro na API: " . $e->getMessage());
        http_response_code(500); // Internal Server Error
        echo json_encode(['message' => 'Erro interno no servidor.'], JSON_UNESCAPED_UNICODE);
    }
}

?>