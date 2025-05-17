# ✨ Agente Criador de Encontros Perfeitos ✨

Um projeto Python que utiliza a SDK do Google Gemini e o framework ADK (Agent Development Kit) para orquestrar múltiplos agentes de IA na criação de roteiros de encontros personalizados, baseados nas preferências do usuário.

## 🚀 Como Rodar no Google Colab

Você pode executar toda a lógica dos agentes diretamente no Google Colab. Siga os passos abaixo:

1.  **Abra o Google Colab:** Vá para [colab.research.google.com](https://colab.research.google.com/).
2.  **Crie um Novo Notebook:** Clique em "Arquivo" > "Novo notebook".
3.  **Carregue o Código:**
    * Se você tiver o arquivo `.py` (`agente_de_criador_de_encontros_perfeitos.py`), clique no ícone de pasta na lateral esquerda, depois no ícone de "Upload" e selecione seu arquivo.
    * Alternativamente, copie o código Python diretamente para uma célula de código no notebook.
4.  **Obtenha sua API Key do Google Gemini:** Se você ainda não tem uma, siga as instruções em [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
5.  **Configure a API Key no Colab:**
    * Clique no ícone de "Chave" (Secrets) na lateral esquerda do Colab.
    * Clique em "Adicionar novo Segredo".
    * No campo "Nome", digite `GOOGLE_API_KEY` (é importante que seja exatamente esse nome).
    * No campo "Valor", cole a sua chave de API do Google Gemini.
    * Marque a caixa "Notebook access" (Acesso ao Notebook) para permitir que seu código acesse essa chave.
6.  **Instale as Bibliotecas Necessárias:** Execute a primeira célula do código que contém:
    ```python
    # Commented out IPython magic to ensure Python compatibility.
    # %pip -q install google-genai google-adk
    ```
    Isso instalará as SDKs do Gemini e do ADK.
7.  **Execute as Células:** Siga executando as células do notebook sequencialmente. O script irá:
    * Configurar o acesso à API Key.
    * Demonstrar o uso básico da API (perguntando sobre a imersão, usando Google Search).
    * Definir a arquitetura e as funções dos agentes.
    * Iniciar a interação com você, pedindo as informações para planejar o encontro.
8.  **Interaja com o Agente:** Quando as células que contêm as chamadas `input()` forem executadas, o Colab irá te pedir para digitar as informações solicitadas (bairro, cidade, gostos, orçamento, etc.). Preencha e pressione Enter após cada pergunta.
9.  **Veja os Resultados:** O notebook exibirá a saída de cada agente (o resultado da busca inicial, as 3 opções de plano e o roteiro final escolhido) no formato Markdown.

## 🧠 A Lógica por Trás dos Agentes

Este projeto é um exemplo legal de como orquestrar diferentes modelos de linguagem (agentes) para resolver uma tarefa complexa. A lógica é dividida em três etapas principais, cada uma executada por um agente especializado:

O fluxo funciona assim:

1.  **Coleta de Informações:** O script primeiro coleta as preferências detalhadas do usuário através de perguntas diretas (simuladas via `input()` no Colab).
2.  **Agente 1: 🕵️ Buscador de Locais**
    * **Função:** Este é o agente inicial, responsável por fazer uma busca ampla e robusta por opções de locais.
    * **Entrada:** Recebe as preferências iniciais do usuário (cidade, orçamento, horários, gostos gerais).
    * **Ferramentas:** Utiliza a ferramenta `Google Search` para encontrar uma lista diversa de restaurantes e locais de interesse (parques, museus, bares, atividades) na área especificada, considerando o orçamento.
    * **Saída:** Gera uma lista inicial de aproximadamente 30 locais (15 restaurantes e 15 locais de interesse) que *potencialmente* se encaixam nos critérios.
    * **Analogia:** Pense nele como o "explorador" que vai na frente e traz um monte de panfletos e informações sobre a cidade.
3.  **Agente 2: ✨ Refinador de Encontro**
    * **Função:** Este agente pega a lista bruta de locais e as preferências *detalhadas* do usuário para criar opções de roteiros coerentes e personalizados.
    * **Entrada:** Recebe a lista de locais do **Agente Buscador** E todas as preferências e restrições do usuário (o que NÃO gostam, restrições alimentares, orçamento exato, horários).
    * **Processo:** Analisa os locais encontrados e combina um restaurante com um ou dois locais de interesse que façam sentido juntos (sejam próximos ou complementares), respeitando TODAS as restrições. Ele também pensa em ideias de presentes.
    * **Saída:** Gera **três opções distintas** de planos de encontro completos, cada uma contendo um restaurante, locais de interesse, uma sugestão de rota lógica e ideias de presentes, destacando como cada opção se alinha com os requisitos.
    * **Analogia:** É como um "curador" que pega os panfletos do explorador e monta 3 sugestões de passeios, adaptando tudo ao seu gosto e evitando o que você não curte.
4.  **Agente 3: ❤️ Planejador Final**
    * **Função:** O agente final e mais "carinhoso". Ele escolhe o *melhor* plano das 3 opções geradas pelo Refinador e detalha ele de forma amigável e útil.
    * **Entrada:** Recebe as 3 opções de planos do **Agente Refinador** e as preferências originais do usuário.
    * **Processo:** Avalia as 3 opções com base nos critérios do usuário para identificar a mais adequada. Em seguida, ele expande o plano escolhido: sugere horários, adiciona detalhes interessantes sobre os locais (usando `Google Search` novamente para curiosidades ou informações extras que são incluídas entre parênteses) e apresenta as ideias de presentes de forma integrada. Tudo isso com uma linguagem calorosa e encorajadora, cheia de emojis!
    * **Saída:** O roteiro final detalhado e escolhido como "o perfeito", pronto para ser seguido.
    * **Analogia:** É o seu "amigo experiente" que ouviu as opções de passeios, escolheu o que mais combina com você e te entrega um roteiro pronto com dicas extras e uma mensagem de "vai dar tudo certo!".

Essa arquitetura em cascata, onde a saída de um agente vira a entrada do próximo, é uma forma poderosa de quebrar problemas complexos em etapas menores e usar agentes especializados para cada fase.

## 📁 Pasta `web` (Visualização)

A pasta `web` neste repositório contém os arquivos `index.html`, `style.css` e `script.js`. Eles demonstram **como seria a interface** de um aplicativo web para este Criador de Encontros Perfeitos, com uma experiência de chat interativa.

**Importante:** O código nesta pasta `web` é APENAS a interface (frontend). Ele **não** contém a lógica Python dos agentes e **não** roda a inteligência artificial diretamente. Para que essa interface funcionasse de verdade, seria necessário um backend (como uma Função Serverless, por exemplo) para receber os dados do frontend, rodar o código Python com os agentes e devolver o resultado para a página web.

Este frontend foi incluído apenas para visualização de como o projeto poderia evoluir para uma aplicação web completa no futuro. Para rodar a lógica principal do projeto AGORA, utilize o Google Colab conforme as instruções acima.

## 📦 Dependências

* `google-genai`
* `google-adk`
* `IPython.display` (para rodar no Colab e exibir Markdown)
* `requests` (já deve vir no Colab, usado pelo ADK/ferramentas)
* `datetime`
* `textwrap`

Instale-as usando `pip` (no Colab, use `%pip install ...`).
