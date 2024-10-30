<?php
include 'models/ElementModel.php';
// ... (Classes ConnectionTo e ArtModel) ...

class ElementController
{
    private $elementModel;

    public function __construct()
    {
        $this->elementModel = new ElementModel('vipspo66_VIP_MODELINGS');
    }

    // GET uri/art - Obter todos os elementos
    public function GETIndex()
    {
        try {
            $elements = $this->elementModel->readAll();
            // Retornar os dados em formato JSON
            header('Content-Type: application/json');
            echo json_encode($elements);
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // GET uri/art/{id} - Buscar um elemento específico
    public function GETElement($id = null)
    {
        if (!$id) {
            $this->GETIndex();
            return;
        }
        try {
            $elements = $this->elementModel->readById($id);
            if ($elements) {
                header('Content-Type: application/json');
                echo json_encode($elements);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Posição não encontrada.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // DELETE uri/art/{id} - Deletar um elemento
    public function DELETEElement($id)
    {
        try {
            $rowsAffected = $this->elementModel->delete($id);
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
    public function POSTElement()
    {
        try {
            // Obter os dados do corpo da requisição
            $data = json_decode(
                file_get_contents('php://input'),
                true
            );

            // Validar os dados (implementar validações conforme necessário)
            if (!isset(
                $data['elm_art'],
                $data['elm_position'],
                $data['elm_type'],
                $data['elm_description']
            )) {
                http_response_code(400); // Bad Request
                echo json_encode(['message' => 'Dados inválidos.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            $elementsId = $this->elementModel->create(
                $data['elm_art'],
                $data['elm_position'],
                $data['elm_type'],
                $data['elm_description']
            );
            http_response_code(201); // Created
            echo json_encode(['elm_id' => $elementsId]);
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // PUT uri/art/{id} - Editar um elemento
    public function PUTElement($id)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validar os dados (implementar validações conforme necessário)
            if (!isset(
                $data['elm_art'],
                $data['elm_position'],
                $data['elm_type'],
                $data['elm_description']
            )) {
                http_response_code(400); // Bad Request
                echo json_encode(['message' => 'Dados inválidos.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            $rowsAffected = $this->elementModel->update(
                $id,
                $data['elm_art'],
                $data['elm_position'],
                $data['elm_type'],
                $data['elm_description']
            );
            if ($rowsAffected > 0) {
                http_response_code(200); // OK
                echo json_encode(['message' => 'Elemento atualizado com sucesso.'], JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['message' => 'Elemento não encontrado.'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // Função auxiliar para tratar erros
    private function handleError(Exception $e)
    {
        error_log("Erro na API: " . $e->getMessage());
        http_response_code(500); // Internal Server Error
        echo json_encode(['message' => 'Erro interno no servidor:'.$e], JSON_UNESCAPED_UNICODE);
    }
}
