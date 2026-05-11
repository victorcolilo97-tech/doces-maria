-- inicialização do projeto

O projeto usa fetch pra carregar um arquivo JSON, entao nao da pra abrir direto clicando no index.html. Precisa rodar num servidor pois usei a extensão live server para fazer o projeto rodar

-- Organizacao das pastas

Organizei o projeto assim:

index.html - pagina principal onde mostra os doces
adm/admin.html - area do editor pra gerenciar os doces  
css/style.css - todos os estilos do site
data/doces.json - arquivo com os doces iniciais
js/models/DoceModel.js - define como e um doce e valida os dados
js/services/StorageService.js - cuida de salvar e carregar do localStorage
js/controllers/ - tem 3 arquivos que controlam as paginas

Separei em pastas diferentes pra ficar mais organizado e facil de achar as coisas quando precisar mexer.

-- Como funciona

Quando o usuario abre o site pela primeira vez o sistema carrega os doces do arquivo doces.json e salva no localStorage do navegador. Depois disso sempre que fizer alguma alteracao (adicionar, editar ou remover) os dados ficam salvos la.

Na pagina principal tem:

 Lista de todos os doces com foto, nome, preco e descricao
 Filtros por categoria (brigadeiros, bolos, tortas etc)
 Campo de busca pra procurar por nome
*otao de WhatsApp(abre o chat direto com meu número) em cada doce pra fazer pedido

Na area de administracao tem:

 Formulario pra cadastrar doce novo
 Lista de todos os doces cadastrados
Botao de editar que preenche o formulario
 Botao de remover que pede confirmacao antes
 Estatisticas mostrando total de doces, destaques e categorias
*Botao pra exportar os dados em JSON

-- Decisoes que tomei

Resolvi usar o padrao MVC que o professor ensinou nas aulas. MVC significa Model-View-Controller e basicamente e uma forma de organizar o codigo separando as responsabilidades.

Fiquei um tempo pensando em como aplicar isso no projeto e acabei fazendo assim:

MODEL - DoceModel.js
Esse arquivo so cuida da estrutura dos dados. Ele define como e um doce (id, nome, descricao, preco etc), valida se os campos estao preenchidos certo e formata o preco pro formato brasileiro. O importante e que o Model nao mexe em nada de tela nem de localStorage, so cuida dos dados mesmo.

VIEW - index.html e admin.html  
Sao as paginas HTML que o usuario ve. Uma e a pagina publica com os doces pra vender, outra e a area de administracao. Elas so mostram as coisas na tela, nao tem logica de negocio.

CONTROLLER - 3 arquivos
Aqui foi onde separei em 3 porque achei que ficaria mais organizado:

DoceController.js tem as funcoes principais tipo adicionar, editar, deletar e buscar doces. E tipo o cerebro do sistema.

CatalogoController.js controla a pagina publica. Ele pega os dados do DoceController e monta os cards na tela, cuida dos filtros e da busca.

AdminController.js controla a pagina de administracao. Cuida do formulario, da lista de doces, do modal de confirmacao e das mensagens de erro/sucesso.

Os Controllers fazem a ponte entre o Model e a View. Eles pegam os dados do Model, processam e mandam pra View mostrar na tela.

SERVICE - StorageService.js
Ele so cuida de salvar e carregar dados do localStorage e do arquivo JSON. Nao tem logica de negocio, so salva e carrega.

Usei var em vez de let/const porque foi o que aprendi primeiro e me sinto mais confortavel. Pra fazer o ID unico de cada doce usei Date.now() que pega o timestamp atual. Funciona bem porque e improvavel ter dois doces cadastrados no mesmo milissegundo.

Coloquei um timeout de 300ms na busca pra nao ficar chamando a funcao toda vez que digita uma letra. Aprendi isso vendo uns tutoriais no YouTube e achei legal porque melhora a performance.

O site e responsivo, usei media queries pra ajustar o layout em telas menores. No celular os cards ficam menores e o menu muda um pouco. Testei no meu celular  pra ver se tava funcionando direito.

\-----------------

Design, no design utilizei estas cores marrom, branco mais "pastel", para dar aquele tom de suavidade, algo doce, no próprio titulo ao final da frase "coração sorrir", dei a escurecida com cor de chocolate, e no canto uma bolha para dar aquele tom doce pro site, como se fosse feito de chocolate.

-- Uso do JSON

O JSON aparece em varios lugares:

1. O arquivo doces.json tem a lista inicial de produtos
2. Quando salva no localStorage uso JSON.stringify pra transformar o array em string
3. Quando carrega do localStorage uso JSON.parse pra voltar pro formato de array
4. Tem um botao que exporta os dados atuais como arquivo JSON

Foi importante entender bem como funciona o JSON porque e usado em tudo no projeto.

-- Tecnologias usadas

HTML5 pra estrutura
CSS3 com variaveis, grid, flexbox e animacoes
JavaScript puro sem frameworks
LocalStorage pra salvar os dados
Fetch API pra carregar o JSON inicial

usei links do unsplash, um site de ilustrações gratuitas para as imagens dos cards, para não ter que ficar caçando imagens pelo google.

