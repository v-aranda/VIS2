<?php

class ArtModel {

    private $pdo;

    public function __construct($db_name) {
        $conn = new ConnectionTo($db_name);
        $this->pdo = $conn->getConnection();
    }

    // CREATE - Criar um novo registro na tabela "art"
    public function create($description, $os, $product) {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO art (art_description, art_os, art_product) VALUES (:description, :os, :product)");
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':os', $os);
            $stmt->bindParam(':product', $product);
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
            $stmt = $this->pdo->query("SELECT * FROM art");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Erro ao ler registros: " . $e->getMessage());
            throw new Exception("Erro ao ler registros da tabela art.");
        }finally{
            $this->pdo = null;
        }
    }

    // READ - Ler um registro específico da tabela "art" pelo ID
    public function readById($os) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM art WHERE art_os = :os");
            $stmt->bindParam(':os', $os);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); 
        } catch (PDOException $e) {
            error_log("Erro ao ler registro por ID: " . $e->getMessage());
            throw new Exception("Erro ao ler registro da tabela art.");
        }finally{
            $this->pdo = null;
        }
    }

    // UPDATE - Atualizar um registro na tabela "art"
    public function update($description, $os, $product) {
        try {
            $stmt = $this->pdo->prepare("UPDATE art SET art_description = :description, art_product = :product WHERE art_os = :os");

            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':os', $os);
            $stmt->bindParam(':product', $product);
            $stmt->execute();
            return $stmt->rowCount(); // Retorna o número de linhas afetadas
        } catch (PDOException $e) {
            error_log("Erro ao atualizar registro: " . $e->getMessage());
            throw new Exception("Erro ao atualizar registro na tabela art.");
        }finally{
            $this->pdo = null;
        }
    }

    // DELETE - Deletar um registro da tabela "art"
    public function delete($os) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM art WHERE art_os = :os");
            $stmt->bindParam(':os', $os);
            $stmt->execute();
            return $stmt->rowCount(); // Retorna o número de linhas afetadas
        } catch (PDOException $e) {
            error_log("Erro ao deletar registro: " . $e->getMessage());
            throw new Exception("Erro ao deletar registro da tabela art.");
        }finally{
            $this->pdo = null;
        }
    }
}