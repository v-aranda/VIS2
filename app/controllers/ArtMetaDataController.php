<?php
include 'models/ArtMetaDataModel.php';
// ... (Classes ConnectionTo e ArtModel) ...

class ArtMetaDataController {

    private $artMetaDataModel;

    public function __construct() {
        $this->artMetaDataModel = new ArtMetaDataModel('vipspo66_VIP_MODELINGS'); 
    }

    // GET uri/art - Obter todos os elementos
    public function GETIndex(){
        try {
            $artMetaDatas = $this->artMetaDataModel->readAll();
            // Retornar os dados em formato JSON
            header('Content-Type: application/json');
            echo json_encode($artMetaDatas); 
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // GET uri/art/{id} - Buscar um elemento específico
    public function GETArtMetaData($id=null) {
        if(!$id){
            $this->GETIndex();
            return;
        }
        try {
            $artMetaDatas = $this->artMetaDataModel->readById($id);
            if ($artMetaDatas) {
                header('Content-Type: application/json');
                echo json_encode($artMetaDatas);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // DELETE uri/art/{id} - Deletar um elemento
    public function DELETEArtMetaData($id) {
        try {
            $rowsAffected = $this->artMetaDataModel->delete($id);
            if ($rowsAffected > 0) {
                http_response_code(204); // No Content
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Posição não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // POST uri/art - Criar um elemento
    public function POSTArtMetaData() {
        try {
            // Obter os dados do corpo da requisição
            $data = json_decode(file_get_contents('php://input')
            , true);

            // Validar os dados (implementar validações conforme necessário)
            if (!isset($data['mtd_art'],$data['mtd_data'])) {
                http_response_code(400); // Bad Request
                echo json_encode(['message' => 'Dados inválidos.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            $artMetaDatasId = $this->artMetaDataModel->create($data['mtd_art'],$data['mtd_data']);
            http_response_code(201); // Created
            echo json_encode(['pos_id' => $artMetaDatasId]); 
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // PUT uri/art/{id} - Editar um elemento
    public function PUTArtMetaData($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validar os dados (implementar validações conforme necessário)
            if (!isset($data['mtd_data'])){
                http_response_code(400); // Bad Request
                echo json_encode(['message' => 'Dados inválidos.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            $rowsAffected = $this->artMetaDataModel->update($id,$data['mtd_data']);
            if ($rowsAffected > 0) {
                http_response_code(200); // OK
                echo json_encode(['message' => 'Posição atualizada com sucesso.'], JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Posição não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // Função auxiliar para tratar erros
    private function handleError(Exception $e) {
        error_log("Erro na API: " . $e->getMessage());
        http_response_code(500); // Internal Server Error
        echo json_encode(['message' => 'Erro interno no servidor:'.$e], JSON_UNESCAPED_UNICODE);
    }
}

?>