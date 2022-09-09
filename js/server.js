//criando uma variavel para receber o HTTP
let  http= require('http')

// criando uma nova variavel para atribuir o conteudo de uma pagina em html
let fs = require('fs')

// criando uma avriavel para reecber o conteudo da pagina
let conteudo = fs.readFileSync('../index.html')

//subindo o nosso serviço com nodejs
http.createServer( (req,res) =>{
    res.end(conteudo)
}).listen(3000)