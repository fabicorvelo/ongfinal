// Função para carregar produtos do localStorage
function carregarProdutos() {
    const produtosArmazenados = localStorage.getItem('produtos');
    return produtosArmazenados ? JSON.parse(produtosArmazenados) : [];
}

// Função para salvar produtos no localStorage
function salvarProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Carregar produtos do localStorage
const produtos = carregarProdutos();

// Função para mostrar a pré-visualização da imagem
document.getElementById('imagem').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('imagemPreview');
        preview.src = e.target.result;
        preview.style.display = 'block';  // Exibir a imagem
    };
    reader.readAsDataURL(file);  // Converter a imagem em Data URL
});

// Função para cadastrar produto
document.getElementById('cadastroForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const imagemInput = document.getElementById('imagem').files[0];
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const validade = document.getElementById('validade').value;
    const dataEntrada = document.getElementById('dataEntrada').value;

    // Verificar se o produto já existe
    const produtoExistente = produtos.find(prod => prod.nome === nome);
    if (produtoExistente) {
        document.getElementById('mensagem').innerText = 'Produto já cadastrado!';
        return;
    }

    // Converter a imagem para Data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        const imagemDataUrl = e.target.result;  // Data URL da imagem

        // Adicionar produto ao array
        produtos.push({ imagem: imagemDataUrl, nome, quantidade, validade, dataEntrada });
        salvarProdutos(produtos);  // Salvar no localStorage

        document.getElementById('mensagem').innerText = 'Produto cadastrado com sucesso!';
        document.getElementById('cadastroForm').reset();  // Limpar o formulário
        document.getElementById('imagemPreview').style.display = 'none';  // Esconder a pré-visualização da imagem
    };

    // Ler a imagem como Data URL
    if (imagemInput) {
        reader.readAsDataURL(imagemInput);
    } else {
        document.getElementById('mensagem').innerText = 'Por favor, selecione uma imagem.';
    }
});