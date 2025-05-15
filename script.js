// Coordenadas dos pontos de coleta
const pontosColeta = [
  {
    nome: "Escola SESI Caçapava (Somente alunos)",
    endereco: "Av. Monsenhor Theodomiro Lobo, 100 - Parque Res. Maria Elmira, Caçapava - SP, 12285-050",
    coords: [-23.113788263798693, -45.70702094652956]
  },
  {
    nome: "Câmara Municipal dos Vereadores",
    endereco: "Praça da Bandeira, 151 - Centro, Caçapava - SP, 12281-630",
    coords: [-23.09992831268969, -45.704636632011336]
  },
  {
    nome: "Parque Ecológico da Moçota",
    endereco: "R. Antônio Guedes Tavares, s/n - Vila Menino Jesus, Caçapava - SP, 12289-010",
    coords: [-23.0769285517666, -45.71137553044086]
  },
  {
    nome: "ESF Caçapava Velha",
    endereco: "Estrada Mun. Amadeu Tenedini, 249 - Caçapava Velha",
    coords: [-23.11733919773164, -45.6435716390106]
  },
  {
    nome: "ESF Nova Caçapava",
    endereco: "Av. Honório Ferreira Pedrosa, s/n, Parque Residencial Nova Caçapava",
    coords: [-23.103731330274876, -45.68242887677588]
  },
  {
    nome: "ESF Piedade",
    endereco: "Rua João Antonio Nogueira, 110",
    coords: [-23.184731830565752, -45.727852689678514]
  },
  {
    nome: "Museu Roberto Lee",
    endereco: "Rua Dr. José de Moura Resende, nº 475, Vera Cruz",
    coords: [-23.104284349841063, -45.713834289681735]
  },
  {
    nome: "Postão",
    endereco: "Rua Prof. João Batista Ortiz Monteiro, Vila Antônio Augusto",
    coords: [-23.0942, -45.7125]
  }
];

// Criar o mapa
const map = L.map('map').setView([-23.0996, -45.7076], 13);

// Adicionar camada de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ícone personalizado
const ecoIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Adicionar pontos ao mapa
pontosColeta.forEach(ponto => {
  L.marker(ponto.coords, {icon: ecoIcon}).addTo(map)
    .bindPopup(`
      <div style="max-width: 250px;">
        <h4 style="margin: 0 0 10px; color: #763ae0;">${ponto.nome}</h4>
        <p><i class="fas fa-map-marker-alt" style="color: #763ae0;"></i> ${ponto.endereco}</p>
        <p><i class="fas fa-clock" style="color: #763ae0;"></i> Seg-Sex: 8h-17h</p>
        <a href="https://maps.google.com?q=${encodeURIComponent(ponto.nome + ' ' + ponto.endereco)}" target="_blank" style="background-color: #763ae0; color: white; border: none; padding: 8px 12px; border-radius: 4px; margin-top: 10px; display: inline-block; text-decoration: none; transition: all 0.3s;">
          <i class="fas fa-directions"></i> Como chegar
        </a>
      </div>
    `);
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', () => {
  const chatbotButton = document.getElementById('chatbotButton');
  const chatbotModal = document.getElementById('chatbotModal');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');

  function toggleChat() {
    chatbotModal.classList.toggle('active');
    if (chatbotModal.classList.contains('active')) {
      chatbotInput.focus();
    }
  }

  chatbotButton.addEventListener('click', toggleChat);
  chatbotClose.addEventListener('click', toggleChat);

  chatbotModal.addEventListener('click', (e) => {
    if (e.target === chatbotModal) {
      toggleChat();
    }
  });

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
      addMessage(message, 'user');
      chatbotInput.value = '';
      setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
      }, 500);
    }
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = text.replace(/\n/g, '<br>');
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  chatbotSend.addEventListener('click', sendMessage);

  function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    if (/1|pontos?|coleta|local|onde|mapa/.test(lowerMsg)) {
      return "Os pontos de coleta estão marcados no mapa do site. Você pode ver todos os locais disponíveis na seção 'Mapa dos Pontos de Coleta'.";
    } 
    else if (/2|materiais?|aceitam|levar|o que/.test(lowerMsg)) {
      return "Aceitamos: celulares, computadores, tablets, eletrodomésticos pequenos, pilhas e baterias. Não aceitamos: lâmpadas fluorescentes, eletrodomésticos grandes ou materiais perigosos.";
    }
    else if (/3|horário|funcionamento|hora|aberto/.test(lowerMsg)) {
      return "A maioria dos pontos funciona de Segunda a Sexta, das 8h às 17h. Alguns locais podem ter horários diferentes.";
    }
    else if (/4|dúvida|ajuda|contato|falar|segurança|privacidade|reciclagem|dados|perigoso/.test(lowerMsg)) {
      if (/segurança|perigoso/.test(lowerMsg)) {
        return "O descarte seguro é essencial. Evite quebrar dispositivos, pois podem conter substâncias tóxicas. Entregue-os intactos nos pontos de coleta. Para dúvidas adicionais, contate a Secretaria do Meio Ambiente: (12) 3456-7890 ou meioambiente@cacapava.sp.gov.br.";
      }
      else if (/privacidade|dados/.test(lowerMsg)) {
        return "Para proteger sua privacidade, recomendamos formatar dispositivos e remover dados pessoais antes do descarte. Os pontos de coleta não acessam dados, mas a responsabilidade é do usuário. Contate a Secretaria do Meio Ambiente para mais orientações: (12) 3456-7890.";
      }
      else if (/reciclagem|processo/.test(lowerMsg)) {
        return "Os eletrônicos coletados são enviados para empresas especializadas que separam materiais recicláveis (como metais e plásticos) e descartam substâncias perigosas adequadamente. Até 90% dos componentes podem ser reaproveitados. Para mais detalhes, contate: meioambiente@cacapava.sp.gov.br.";
      }
      else {
        return "Para outras dúvidas, posso ajudar com informações sobre segurança no descarte, proteção de dados, processo de reciclagem ou outros temas. Entre em contato com a Secretaria do Meio Ambiente:<br><br>Telefone: (12) 3456-7890<br>Email: meioambiente@cacapava.sp.gov.br";
      }
    }
    else {
      return "Não entendi sua pergunta. Tente perguntar sobre:<br>1. Pontos de coleta<br>2. Materiais aceitos<br>3. Horários<br>4. Outras dúvidas (segurança, privacidade, reciclagem, etc.)<br><br>Ou contate a Secretaria do Meio Ambiente: (12) 3456-7890";
    }
  }

  // Botão Voltar ao Topo
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });

  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
// Detecta quando o teclado virtual é aberto
function handleKeyboard() {
  const chatbotWindow = document.querySelector('.chatbot-window');
  const messagesArea = document.querySelector('.chatbot-messages');
  const inputArea = document.querySelector('.chatbot-input-area');

  if (window.innerHeight < window.outerHeight * 0.8) {
    chatbotWindow.classList.add('keyboard-open');
    messagesArea.scrollTop = messagesArea.scrollHeight;
  } else {
    chatbotWindow.classList.remove('keyboard-open');
  }
}

window.addEventListener('resize', handleKeyboard);