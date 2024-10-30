<?php

class ProductModel {

    private $pdo;

    public function __construct($db_name) {
        $conn = new ConnectionTo($db_name);
        $this->pdo = $conn->getConnection();
    }

    // CREATE - Criar um novo registro na tabela "product"
    public function create($name) {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO `product`(`prd_id`, `prd_name`) VALUES (:name)");
            $stmt->bindParam(':name', $name);
            $stmt->execute();
            return $this->pdo->lastInsertId(); 
        } catch (PDOException $e) {
            error_log("Erro ao criar registro: " . $e->getMessage());
            throw new Exception("Erro ao criar registro na tabela product.");
        } finally {
            $this->pdo = null;
        }
    }

    // READ - Ler todos os registros da tabela "product"
    public function readAll() {
        try {
            $stmt = $this->pdo->query("SELECT * FROM `product`");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Erro ao ler registros: " . $e->getMessage());
            throw new Exception("Erro ao ler registros da tabela product.");
        } finally {
            $this->pdo = null;
        }
    }

    // READ - Ler um registro específico da tabela "product" pelo ID
    public function readById($id) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM product WHERE prd_id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); 
        } catch (PDOException $e) {
            error_log("Erro ao ler registro por ID: " . $e->getMessage());
            throw new Exception("Erro ao ler registro da tabela product.");
        } finally {
            $this->pdo = null;
        }
    }

    // UPDATE - Atualizar um registro na tabela "product"
    public function update($id, $name) {
        try {
            $stmt = $this->pdo->prepare("UPDATE `product` SET `prd_name` = :name WHERE `prd_id` = :id");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->rowCount();
        } catch (PDOException $e) {
            error_log("Erro ao atualizar registro: " . $e->getMessage());
            throw new Exception("Erro ao atualizar registro na tabela product.");
        } finally {
            $this->pdo = null;
        }
    }

    // DELETE - Deletar um registro na tabela "product"
    public function delete($id) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM `product` WHERE `prd_id` = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->rowCount();
        } catch (PDOException $e) {
            error_log("Erro ao deletar registro: " . $e->getMessage());
            throw new Exception("Erro ao deletar registro na tabela product.");
        } finally {
            $this->pdo = null;
        }
    }
}