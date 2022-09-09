//criando uma variavel para fazer a requisição dos módulos
let mysql = require('mysql')

// Criando uma conexão
let con = mysql.createConnection({
    //criando as variáveis de conexão no BD
    host:"localhost",
    user:"root",
    password:"mysql",
    database:"nodejs"
});


    // Utilizando a passagem de parâmetros através da variável con 
con.connect(function(err){
    if(err)throw err;
    console.log("Conectado");
    con.query("select * from consumidores",function(err,result,fields){
            if(err)throw err;
            console.log(result);
            console.log("Resultado do Select");

    });
});