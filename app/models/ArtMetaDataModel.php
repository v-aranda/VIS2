<?php

class ArtMetaDataModel {

    private $pdo;

    public function __construct($db_name) {
        $conn = new ConnectionTo($db_name);
        $this->pdo = $conn->getConnection();
    }
 
    // CREATE - Criar um novo registro na tabela "artMetaData"
    public function create($art, $data) {
        
        try {
            $stmt = $this->pdo->prepare("INSERT INTO artMetaData (mtd_art, mtd_data) VALUES (:mtd_art, :mtd_data)");
            $stmt->bindParam(':mtd_art', $art);
            $stmt->bindParam(':mtd_data', $data);
            $stmt->execute();
            echo "Registro criado com sucesso!";
            return $this->pdo->lastInsertId(); 
        } catch (PDOException $e) {
            // Log do erro
            error_log("Erro ao criar registro: " . $e->getMessage());
            throw new Exception("Erro ao criar registro na tabela artMetaData.");
        }finally{
            $this->pdo = null;
        }
    }

    // READ - Ler todos os registros da tabela "artMetaData"
    public function readAll() {
        try {
            $stmt = $this->pdo->query("SELECT * FROM artMetaData");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Erro ao ler registros: " . $e->getMessage());
            throw new Exception("Erro ao ler registros da tabela artMetaData.");
        }finally{
            $this->pdo = null;
        }
    }

    // READ - Ler um registro específico da tabela "artMetaData" pelo ID
    public function readById($art) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM artMetaData WHERE mtd_art = :mtd_art");
            $stmt->bindParam(':mtd_art', $art);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); 
        } catch (PDOException $e) {
            error_log("Erro ao ler registro por ID: " . $e->getMessage());
            throw new Exception("Erro ao ler registro da tabela artMetaData.");
        }finally{
            $this->pdo = null;
        }
    }

    // UPDATE - Atualizar um registro na tabela "artMetaData"
    public function update($art, $data) {
        try {
            $stmt = $this->pdo->prepare("UPDATE artMetaData SET  mtd_data = :mtd_data WHERE mtd_art = :mtd_art");
            $stmt->bindParam(':mtd_art', $art);
            $stmt->bindParam(':mtd_data', $data);
           
            $stmt->execute();
            return $stmt->rowCount(); // Retorna o número de linhas afetadas
        } catch (PDOException $e) {
            error_log("Erro ao atualizar registro: " . $e->getMessage());
            throw new Exception("Erro ao atualizar registro na tabela artMetaData.");
        }finally{
            $this->pdo = null;
        }
    }

    // DELETE - Deletar um registro da tabela "artMetaData"
    public function delete($art) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM artMetaData WHERE mtd_art = :mtd_art");
            $stmt->bindParam(':mtd_art', $art);
            $stmt->execute();
            return $stmt->rowCount(); // Retorna o número de linhas afetadas
        } catch (PDOException $e) {
            error_log("Erro ao deletar registro: " . $e->getMessage());
            throw new Exception("Erro ao deletar registro da tabela artMetaData.");
        }finally{
            $this->pdo = null;
        }
    }
}