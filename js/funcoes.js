/*  Local Storage é um recurso do HTML 5 para se armazenar dados que não são perdidos
ao fim da seção, logo, podemos fechar e abrir o browser várias vezes e as informações
gravadas permanecerão lá  */
// Inicio da Função JSON

$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;
	var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados

	tbClientes = JSON.parse(tbClientes); // Converte string para objeto

	if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbClientes = [];

	// Função para adicionar registros
	function Adicionar(){
		//variável para verificar se número de código já existe
		var cli = GetCliente("Codigo", $("#txtCodigo").val());

	// Caso existe é informado ao cliente
		if(cli != null){
			alert("Código já cadastrado.");
			return;
		}
	// caso contrário insere
		var cliente = JSON.stringify({
			Nome     : $("#txtNome").val(),
			Telefone : $("#txtTelefone").val(),
			Email    : $("#txtEmail").val(),
			Genero    : $("#txtGenero").val()
		});
		
		
		
		tbClientes.push(cliente);
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Registro adicionado.");
		return true;
		
	}
	

	// Função para listar clientes
	function Listar(){
	
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Nome</th>"+
			"	<th>Telefone</th>"+
			"	<th>Email</th>"+
			"	<th>Genero</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		// Malha de repetição para inserir todos os registros
		 for(var i in tbClientes){
			var cli = JSON.parse(tbClientes[i]);
			// Formatar data para o format brasileiro dia, mes, ano
			// var dtfinal = cli.DtCad.substring(8,10) + "/" +cli.DtCad.substring(5,7)  +"/"  +cli.DtCad.substring(0,4);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='images/edit.png' alt='"+i+"' class='btnEditar'/><img src='images/delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Telefone+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
										 "	<td>"+cli.Genero+"</td>" + 
		  								 "</tr>");
		 }
	}

		// Função para excluir registros
	function Excluir(){
		tbClientes.splice(indice_selecionado, 1);
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Registro excluído.");
	}

	// função par pesquisar cliente
	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}
	// chamda da função listar clientes
	Listar();

	// Ação com base nos eventos de formulário
	$("#frmCadastro").on("submit",function(){
		if(operacao == "A"){
			return Adicionar();
			}else
			return Editar();		
	});
	// Ação com base nos eventos do botão Editar
	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbClientes[indice_selecionado]);
		
		$("#txtNome").val(cli.Nome);
		$("#txtTelefone").val(cli.Telefone);
		$("#txtEmail").val(cli.Email);
		$("#txtGenero").val()(cli.Genero);
		$("#txtCodigo").attr("readonly","readonly");
		$("#txtNome").focus();
	});
	// Ação com base nos eventos do botão Excluir
	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});

	// ultimo codigo
	var ultimo = JSON.parse(tbClientes.slice(-1));
	var ultconv = parseInt(ultimo.Codigo);
	
			$("#txtCodigo").val(ultconv+1);
// status
$("#txtNome").change(function () {
	//alert( $( this ).val() );
	var pessoa = $(this).val();

	if (pessoa == "Wilson") {
		$("#txtStatus").val('Em aberto');
	} else
		$("#txtStatus").val('Em andamento');
});





});
