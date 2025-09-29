// const showMenu = (toggleId, navId) => {
//     const toggle = document.getElementById(toggleId),
//     nav = document.getElementById(navId);

//   toggle.addEventListener('click', () => {
//     //adicionando a amostra de menu paara a navbar
//     nav.classList.toggle('show-menu')
//     //adicionar a amostra do icone para tbm esconder o de menu (icone sanduiche)
//     toggle.classList.toggle('show-icon')
//   })
// }

// showMenu('nav-toggle', 'nav-menu')

//DEU CERTO
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show-menu');
      toggle.classList.toggle('show-icon');
    });
  }
}

showMenu('nav-toggle', 'nav-menu');


// FUNCIONALIDADE DO SELECT CUSTOMIZADO: definição dos alvos manipuláveis como constantes
const selectBtn = document.getElementById('selectBtn');
const selectOptions = document.getElementById('selectOptions');
const selectedOption = document.getElementById('selectedOption'); //selecionam elemento do HTML e manipulam ele de forma constante.
const options = document.querySelectorAll('.select-option'); //abre lista com todas as opções contendo essa classe.

// Abrir/fechar dropdown (começo do fluxo)
selectBtn.addEventListener('click', () => { //ouvir qual o evento-referência.
    selectBtn.classList.toggle('active'); //praticidade ao substituir if. toggle alterna conforme clique (ev. ouvido)
    selectOptions.classList.toggle('show'); //uso de classes e listas para separar JS de CSS (DECIDE como vai exibir, o ato em si de exibir é parte do JS)

    /* 
    selectBtn = id para o botão que abre e fecha o dropdown
    selectOptions = a caixa que terá todas as opções ocultas. 
    selectedOption = o texto DENTRO DO BOTÃO.
    options (lista de alternativas quando baixa o dropdown)
    */
});

// Selecionar opção
options.forEach(option => { /*define comportamento para todos os itens da lista.*/
    option.addEventListener('click', () => {
        selectedOption.textContent = option.textContent; /*fecha dropdown de escolhas sempre que escolhido e exibe o escolhido no botão principal.*/
        selectBtn.classList.remove('active');
        selectOptions.classList.remove('show');
        

        // Adicionar valor hidden para envio do formulário
        let hiddenInput = document.querySelector('input[name="projectType"]');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'projectType';
            // MUDANÇA: usar o form correto (sem ID específico no seu HTML)
            document.querySelector('form').appendChild(hiddenInput);
        }
        hiddenInput.value = option.dataset.value;
    });
});

// Fechar dropdown ao clicar fora das opcoes
document.addEventListener('click', (e) => {
    if (!selectBtn.contains(e.target)) {
        selectBtn.classList.remove('active');
        selectOptions.classList.remove('show'); //mesmas duas funções de fechamento das que referem-se a escolha de opção.
    }
});

// ENVIO DO FORMULÁRIO
// MUDANÇA: usar querySelector('form') em vez de getElementById('contactForm')
document.querySelector('form').addEventListener('submit', (e) => { //evento submit (referente ao botão final do formulário) é a captura do envio.
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar os dados
    const formData = new FormData(e.target);
    console.log('Dados do formulário:', Object.fromEntries(formData)); //impressão ideal para testes
    
    // Exemplo: redirecionar para WhatsApp (organização de dados para a mensagem)
    const name = formData.get('fullName');
    const email = formData.get('email');
    const whatsapp = formData.get('whatsapp');
    const projectType = formData.get('projectType') || 'Não especificado'; //se não tiver getter atendido, imprime a segunda opção (ou lógico).
    
    const message = `Olá! Meu nome é ${name}.\n\nEmail: ${email}\nWhatsApp: ${whatsapp}\nTipo de projeto: ${projectType}\n\nGostaria de solicitar um orçamento.`;
    
    // ALTERE AQUI para o número correto do WhatsApp
    const whatsappUrl = `https://wa.me/5571986477904?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});