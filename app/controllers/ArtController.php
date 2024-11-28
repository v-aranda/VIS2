<?php
include 'models/ArtModel.php';
include 'models/OsModel.php';
// ... (Classes ConnectionTo e ArtModel) ...

class ArtController {

    private $artModel, $OsModel;

    public function __construct() {
        $this->artModel = new ArtModel('vipspo66_VIP_MODELINGS'); 
        $this->OsModel = new OsModel('vipspo66_producao'); 
    }

    // GET uri/art - Obter todos os elementos
    public function GETIndex(){
        try {
            $arts = $this->artModel->readAll();
            // Retornar os dados em formato JSON
            header('Content-Type: application/json');
            echo json_encode($arts); 
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // GET uri/art/{id} - Buscar um elemento específico
    public function GETArt($id=null) {
        if(!$id){
            $this->GETIndex();
            return;
        }
        try {
            $art = $this->OsModel->readById($id);
            if ($art) {
                header('Content-Type: application/json');
                echo json_encode($art);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Arte não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // DELETE uri/art/{id} - Deletar um elemento
    public function DELETEArt($id) {
        try {
            $rowsAffected = $this->artModel->delete($id);
            if ($rowsAffected > 0) {
                http_response_code(204); // No Content
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Arte não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // POST uri/art - Criar um elemento
    public function POSTArt() {
        try {
            // Obter os dados do corpo da requisição
            $data = json_decode(file_get_contents('php://input')
            , true);

            // Validar os dados (implementar validações conforme necessário)
            if (!isset($data['art_description']) || !isset($data['art_os'])) {
                http_response_code(400); // Bad Request
                echo json_encode(['message' => 'Dados inválidos.'], JSON_UNESCAPED_UNICODE);
                return;
            }
            $artId = $this->artModel->create($data['art_description'], $data['art_os'],$data['art_product']);
            
            http_response_code(201); // Created
            echo json_encode(['art_id' => $artId]); 
        } catch (Exception $e) {
            echo $e;
            // $this->handleError($e);
        }
    }

    // PUT uri/art/{id} - Editar um elemento
    public function PUTArt($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validar os dados (implementar validações conforme necessário)
            if (!isset($data['art_description']) || !isset($data['art_os'])) {
                http_response_code(400); // Bad Request
                echo json_encode(['message' => 'Dados inválidos.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            $rowsAffected = $this->artModel->update($id, $data['art_description'], $data['art_os'],$data['art_product']);
            if ($rowsAffected > 0) {
                http_response_code(200); // OK
                echo json_encode(['message' => 'Arte atualizada com sucesso.'], JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Arte não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // Função auxiliar para tratar erros
    private function handleError(Exception $e) {
        error_log("Erro na API: " . $e->getMessage());
        http_response_code(500); // Internal Server Error
        echo json_encode(['message' => 'Erro interno no servidor.:'+$e], JSON_UNESCAPED_UNICODE);
    }
}

?>