<?php
include 'models/ProductModel.php';

class ProductController {

    private $productModel;

    public function __construct() {
        $this->productModel = new ProductModel('vipspo66_VIP_MODELINGS'); 
    }

    // GET uri/art - Obter todos os elementos
    public function GETIndex(){
        try {
            $products = $this->productModel->readAll();
            // Retornar os dados em formato JSON
            header('Content-Type: application/json');
            echo json_encode($products); 
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // GET uri/art/{id} - Buscar um elemento específico
    public function GETProduct($id=null) {
        if(!$id){
            $this->GETIndex();
            return;
        }
        try {
            $products = $this->productModel->readById($id);
            if ($products) {
                header('Content-Type: application/json');
                echo json_encode($products);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Posição não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // DELETE uri/art/{id} - Deletar um elemento
    public function DELETEProduct($id) {
        try {
            $rowsAffected = $this->productModel->delete($id);
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
    public function POSTProduct() {
        try {
            // Obter os dados do corpo da requisição
            $data = json_decode(file_get_contents('php://input')
            , true);

            // Validar os dados (implementar validações conforme necessário)
            if (!isset($data['pos_name'])) {
                http_response_code(400); // Bad Request
                echo json_encode(['message' => 'Dados inválidos.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            $productsId = $this->productModel->create($data['pos_name']);
            http_response_code(201); // Created
            echo json_encode(['pos_id' => $productsId]); 
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // PUT uri/art/{id} - Editar um elemento
    public function PUTProduct($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validar os dados (implementar validações conforme necessário)
            if (!isset($data['pos_name'])) {
                http_response_code(400); // Bad Request
                echo json_encode(['message' => 'Dados inválidos.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            $rowsAffected = $this->productModel->update($id, $data['pos_name']);
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
        echo json_encode(['message' => 'Erro interno no servidor.'], JSON_UNESCAPED_UNICODE);
    }
}

?>