<?php

class OsModel {

    private $pdo;

    public function __construct($db_name) {
        $conn = new ConnectionTo($db_name);
        $this->pdo = $conn->getConnection();
    }
    // READ - Ler todos os registros da tabela "t_servicos"
    public function readAll() {
        try {
            $stmt = $this->pdo->query("SELECT * FROM t_servicos");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Erro ao ler registros: " . $e->getMessage());
            throw new Exception("Erro ao ler registros da tabela t_servicos.");
        }finally{
            $this->pdo = null;
        }
    }

    // READ - Ler um registro específico da tabela "t_servicos" pelo ID
    public function readById($os) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM t_servicos WHERE cod_servico = :os");
            $stmt->bindParam(':os', $os);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); 
        } catch (PDOException $e) {
            error_log("Erro ao ler registro por ID: " . $e->getMessage());
            throw new Exception("Erro ao ler registro da tabela t_servicos.");
        }finally{
            $this->pdo = null;
        }
    }

}