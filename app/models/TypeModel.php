<?php

class TypeModel {

    private $pdo;

    public function __construct($db_name) {
        $conn = new ConnectionTo($db_name);
        $this->pdo = $conn->getConnection();
    }

    // CREATE - Criar um novo registro na tabela "art"
    public function create($name) {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO `elementType`(`ety_id`, `ety_name`) VALUES (:name)");
            $stmt->bindParam(':name', $name);
            $stmt->execute();
            return $this->pdo->lastInsertId(); 
        } catch (PDOException $e) {
            // Log do erro
            error_log("Erro ao criar registro: " . $e->getMessage());
            throw new Exception("Erro ao criar registro na tabela art.");
        }finally{
            $this->pdo = null;
        }
    }

    // READ - Ler todos os registros da tabela "art"
    public function readAll() {
        try {
            $stmt = $this->pdo->query("SELECT * FROM `elementType`");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Erro ao ler registros: " . $e->getMessage());
            throw new Exception("Erro ao ler registros da tabela elementType.");
        }finally{
            $this->pdo = null;
        }
    }

    // READ - Ler um registro específico da tabela "art" pelo ID
    public function readById($id) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM elementType WHERE ety_id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); 
        } catch (PDOException $e) {
            error_log("Erro ao ler registro por ID: " . $e->getMessage());
            throw new Exception("Erro ao ler registro da tabela elementType.");
        }finally{
            $this->pdo = null;
        }
    }

    // UPDATE - Atualizar um registro na tabela "art"
    public function update($id, $name) {
        try {
            $stmt = $this->pdo->prepare("UPDATE elementType SET ety_name = :name WHERE ety_id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->execute();
            return $stmt->rowCount(); // Retorna o número de linhas afetadas
        } catch (PDOException $e) {
            error_log("Erro ao atualizar registro: " . $e->getMessage());
            throw new Exception("Erro ao atualizar registro na tabela elementType.");
        }finally{
            $this->pdo = null;
        }
    }

    // DELETE - Deletar um registro da tabela "art"
    public function delete($id) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM elementType WHERE ety_id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->rowCount(); // Retorna o número de linhas afetadas
        } catch (PDOException $e) {
            error_log("Erro ao deletar registro: " . $e->getMessage());
            throw new Exception("Erro ao deletar registro da tabela elementType.");
        }finally{
            $this->pdo = null;
        }
    }
}