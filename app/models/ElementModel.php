<?php

class ElementModel {

    private $pdo;

    public function __construct($db_name) {
        $conn = new ConnectionTo($db_name);
        $this->pdo = $conn->getConnection();
    }

    // CREATE - Criar um novo registro na tabela "element"
    public function create($art, $position, $type, $description) {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO element(elm_art, elm_position, elm_type, elm_description) VALUES(:elm_art, :elm_position, :elm_type, :elm_description)");
            $stmt->bindParam(':elm_art',$art);
            $stmt->bindParam(':elm_position',$position);
            $stmt->bindParam(':elm_type',$type);
            $stmt->bindParam(':elm_description',$description);
            
            $stmt->execute();
            
            return $this->pdo->lastInsertId(); 
        } catch (PDOException $e) {
            // Log do erro
            error_log("Erro ao criar registro: " . $e->getMessage());
            throw new Exception("Erro ao criar registro na tabela element.");
        }finally{
            $this->pdo = null;
        }
    }

    // READ - Ler todos os registros da tabela "art"
    public function readAll() {
        try {
            $stmt = $this->pdo->query("SELECT * FROM element");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Erro ao ler registros: " . $e->getMessage());
            throw new Exception("Erro ao ler registros da tabela element.");
        }finally{
            $this->pdo = null;
        }
    }

    // READ - Ler um registro específico da tabela "element" pelo ID
    public function readById($id) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM element WHERE elm_id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); 
        } catch (PDOException $e) {
            error_log("Erro ao ler registro por ID: " . $e->getMessage());
            throw new Exception("Erro ao ler registro da tabela element.");
        }finally{
            $this->pdo = null;
        }
    }

    // UPDATE - Atualizar um registro na tabela "element"
    public function update($id, $art, $position, $type, $description) {
        try {
            $stmt = $this->pdo->prepare("UPDATE element SET elm_art = :elm_art, elm_position = :elm_position, elm_type = :elm_type, elm_description = :elm_description WHERE elm_id = :elm_id");
            $stmt->bindParam(':elm_id',$id);
            $stmt->bindParam(':elm_art',$art);
            $stmt->bindParam(':elm_position',$position);
            $stmt->bindParam(':elm_type',$type);
            $stmt->bindParam(':elm_description',$description);
            $stmt->execute();
            return $stmt->rowCount(); // Retorna o número de linhas afetadas
        } catch (PDOException $e) {
            error_log("Erro ao atualizar registro: " . $e->getMessage());
            throw new Exception("Erro ao atualizar registro na tabela element.");
        }finally{
            $this->pdo = null;
        }
    }

    // DELETE - Deletar um registro da tabela "art"
    public function delete($id) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM element WHERE elm_id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->rowCount(); // Retorna o número de linhas afetadas
        } catch (PDOException $e) {
            error_log("Erro ao deletar registro: " . $e->getMessage());
            throw new Exception("Erro ao deletar registro da tabela element.");
        }finally{
            $this->pdo = null;
        }
    }
}