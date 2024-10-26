<?php

class ConnectionTo {

  private $db_host = LOCALHOST; 
  private $db_user = USER;
  private $db_pass = PASSWORD;
  private $pdo;

  public function __construct($db_name) {
      try {
          $this->pdo = new PDO("mysql:host={$this->db_host};dbname={$db_name}", $this->db_user, $this->db_pass);
          $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
          // Registrar o erro em um arquivo de log
          error_log("Erro na conexão com o banco de dados: " . $e->getMessage());
          throw new Exception("Erro ao acessar o banco de dados."); 
      }
  }

  public function getConnection() {
      return $this->pdo;
  }
}

?>