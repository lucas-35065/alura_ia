document.addEventListener('DOMContentLoaded', () => {

    const chatArea = document.getElementById('chat-area');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const loadingDiv = document.getElementById('loading');
    const resultArea = document.getElementById('result-area');
    const inputArea = document.querySelector('.input-area');

    const questions = [
        { id: 'endereco', label: '📍 Primeiro, qual o bairro e cidade de referência para o encontro?', placeholder: 'Ex: Centro, São Paulo' },
        { id: 'horario', label: '⏰ Que horas será o encontro? (Ou digite "não sei" se quiser uma sugestão):', placeholder: 'Ex: 19:00 ou não sei' },
        { id: 'gostosDateFazer', label: '🤸 O que a pessoa com quem você vai sair Gosta de Fazer? (Hobbies, atividades):', placeholder: 'Cinema, esportes, ler...' },
        { id: 'gostosUsuarioFazer', label: '🚶 E o que VOCÊ Gosta de Fazer? (Seus hobbies, atividades preferidas):', placeholder: 'Viajar, cozinhar, música...' },
        { id: 'gostosUsuarioComer', label: '🍔 O que VOCÊ Gosta de Comer? (Tipos de culinária, pratos preferidos):', placeholder: 'Italiana, japonesa, pizza...' },
        { id: 'gostosDateComer', label: '🍕 E o que a pessoa com quem você vai sair Gosta de Comer? (Tipos de culinária, pratos preferidas):', placeholder: 'Mexicana, vegana, hambúrguer...' },
        { id: 'restricoes', label: '🚫 Existe algo que AMBOS NÃO Gostam de Fazer/Comer? Alguma Restrição Alimentar ou Alergia? Descreva tudo aqui:', placeholder: 'Não gostamos de pimenta, alergia a frutos do mar...' },
        { id: 'orcamento', label: '💰 Qual o ORÇAMENTO aproximado para o passeio? (Ex: R$ 100, R$ 50-150, Flexível):', placeholder: 'R$ 100, Flexível' }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = {};

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQ = questions[currentQuestionIndex];
            const questionMessageDiv = document.createElement('div');
            questionMessageDiv.classList.add('message', 'bot-message');
            questionMessageDiv.innerHTML = `<p>${currentQ.label}</p>`;
            chatArea.appendChild(questionMessageDiv);

            userInput.placeholder = currentQ.placeholder;
            userInput.value = '';
            sendBtn.textContent = (currentQuestionIndex === questions.length - 1) ? 'Planejar!' : 'Próximo';
            userInput.focus();
            scrollToBottom();
        } else {
            inputArea.classList.add('hidden');
            showLoading();
            processAnswers();
        }
    }

    function addUserMessage(text) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message', 'user-message');
        userMessageDiv.innerHTML = `<p>${text}</p>`;
        chatArea.appendChild(userMessageDiv);
        scrollToBottom();
    }

    function showLoading() {
        loadingDiv.classList.remove('hidden');
        scrollToBottom();
    }

    function hideLoading() {
        loadingDiv.classList.add('hidden');
    }

    function showResult(htmlContent) {
        resultArea.innerHTML = htmlContent;
        resultArea.classList.remove('hidden');
        scrollToBottom();
    }

    function scrollToBottom() {
        setTimeout(() => {
             chatArea.scrollTop = chatArea.scrollHeight;
        }, 50);
    }

    function processAnswers() {
        console.log("Respostas coletadas:", userAnswers);

        const respostaSimuladaDoBackend = `
## 🎉 Plano de Encontro Perfeito para Você! 🎉

Baseado nas suas preferências e nas da pessoa especial, preparamos um roteiro que combina perfeitamente com o que vocês curtem e dentro do orçamento que você indicou! ✨

Este plano foi selecionado porque ele equilibra muito bem as atividades culturais (se ambos curtem isso) com uma experiência gastronômica bacana, sem extrapolar o orçamento e considerando a região do ${userAnswers.endereco || 'local escolhido'} que você mencionou. É um roteiro dinâmico e com opções para conversar e aproveitar a companhia! ❤️

**Roteiro:** 🗺️🥂

1.  **Início da Tarde (por volta das ${userAnswers.horario !== 'não sei' ? userAnswers.horario : '15h'}) - Passeio no Parque [Nome do Parque]:**
    Comecem a tarde com um passeio relaxante em um parque. É um ótimo jeito de quebrar o gelo e ter um momento tranquilo na natureza. (Pesquisar no Google por: Parques em ${userAnswers.endereco || 'sua cidade'})
    *(Curiosidade: O Parque [Nome] é conhecido por [Alguma característica legal do parque, tipo jardim botânico, vista, etc.]).*

2.  **Final de Tarde (por volta das 17h) - Visita ao Museu [Nome do Museu]:**
    Em seguida, um toque cultural! Visitem um museu na região. Escolham um que tenha um tema que possa interessar a ambos, talvez algo relacionado a ${userAnswers.gostosDateFazer || 'interesses comuns'} ou ${userAnswers.gostosUsuarioFazer || 'interesses comuns'}. (Pesquisar no Google por: Museus em ${userAnswers.endereco || 'sua cidade'} com boas avaliações)
    *(Dica: O Museu [Nome] costuma ter exposições temporárias bem interessantes! Vale a pena conferir o que está rolando.)*

3.  **Noite (a partir das 19h) - Jantar no Restaurante [Nome do Restaurante]:**
    Pra fechar a noite, um jantar delicioso em um restaurante que combine com o gosto de vocês por ${userAnswers.gostosUsuarioComer || 'culinária preferida'} e ${userAnswers.gostosDateComer || 'culinária preferida'}, respeitando as restrições de ${userAnswers.restricoes || 'sem restrições'}. (Pesquisar no Google por: Restaurantes com culinária ${userAnswers.gostosUsuarioComer || ''} ou ${userAnswers.gostosDateComer || ''} em ${userAnswers.endereco || 'sua cidade'} até ${userAnswers.orcamento || 'valor acessível'})
    *(Experimente: Peça o [Sugestão de prato famoso ou bem avaliado do restaurante, se encontrado]! 😉)*

**Ideias de Presentes:** 🎁

Considerando o roteiro, aqui estão algumas ideias de mimos que poderiam agradar e cabem no orçamento:

* Um livro de um autor que a pessoa goste (${userAnswers.gostosDateFazer && userAnswers.gostosDateFazer.includes('ler') ? ' - Perfeito pra quem curte ler!' : ''}).
* Um pequeno objeto de arte da loja do museu (Combinando com a visita ao museu!).
* Doces artesanais da região (${(userAnswers.gostosDateComer && userAnswers.gostosDateComer.includes('doce')) || (userAnswers.gostosUsuarioComer && userAnswers.gostosUsuarioComer.includes('doce')) ? ' - Se ambos curtem doces!' : ''}).

Espero que este plano seja o pontapé inicial para um encontro inesquecível! Tenho certeza que será incrível! Aproveitem cada momento! ❤️

#GoDate! 😄👍
        `;

        setTimeout(() => {
            hideLoading();
            showResult(marked.parse(respostaSimuladaDoBackend));
        }, 2000);
    }

    sendBtn.addEventListener('click', () => {
        const answer = userInput.value.trim();

        if (answer) {
            const currentQId = questions[currentQuestionIndex].id;
            userAnswers[currentQId] = answer;

            addUserMessage(answer);

            currentQuestionIndex++;
            displayQuestion();
        }
    });

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendBtn.click();
        }
    });

    displayQuestion();

});
