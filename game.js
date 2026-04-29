/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — MOTOR PRINCIPAL v5.0 (San Blas Edition)
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// ESTADO GLOBAL DEL JUEGO
// ════════════════════════════════════════
const GameState = {
  screen: 'loading',
  selectedClan: null,
  playerName: '',
  playerRole: 'cabeza',
  chapter: 1,
  scene: 0,

  stats: {
    honra: 60,
    recursos: 80,
    miembros: 15,
    alianzas: 0,
    combate: 50,
    diplomacia: 50,
    intimidacion: 30
  },

  factions: {
    policia: 50,
    payos: 40,
    clanes: 60,
    ayuntamiento: 50
  },

  flags: {
    pegastePolicia: false,
    traicionasteAlian: false,
    robasteMercado: false,
    reputacionCallejera: false,
    alianzaRomero: false,
    alianzaMontoya: false,
    papaEnfermo: false,
    clanRivalActivo: false,
    ayudaAssociation: false,
    clanRicoReputacion: false,
    medallaDeLaSaga: false,
    huiteDeLaBoda: false,
    tomasEstaPreso: false,
    negociacionFallida: false,
    primeraVictoriaCombate: false,
    combatePerdido: false,
    sobornoPagado: false,
    amorProhibido: false,
    pedimientoAceptado: false,
    fugaDeAmantes: false,
    venganzaAmorosa: false,
    pruebaDelPanuelo: false,
    embarazoLola: false
  },

  inventory: [],
  history: [],
  combat: null,
  clanData: null,

  personajes: {
    viejoCurro: {
      nombre: 'Viejo Curro',
      rol: 'Patriarca',
      img: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Camaron_de_la_Isla.jpg'
    },
    miguelito: {
      nombre: 'Miguelito',
      rol: 'Guerrero',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Joaqu%C3%ADn_Cort%C3%A9s.jpg/220px-Joaqu%C3%ADn_Cort%C3%A9s.jpg'
    },
    tioAntonio: {
      nombre: 'Tío Antonio',
      rol: 'Consejero',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Antonio_Orozco.jpg/220px-Antonio_Orozco.jpg'
    },
    laLola: {
      nombre: 'La Lola',
      rol: 'Prima',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lola_Flores_%281958%29.jpg/220px-Lola_Flores_%281958%29.jpg'
    },
    laEncarna: {
      nombre: 'La Encarna',
      rol: 'Abogada',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Rosario_Flores.jpg/220px-Rosario_Flores.jpg'
    },
    tomas: {
      nombre: 'Tomás',
      rol: 'Hermano',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Farruquito_%28cropped%29.jpg/220px-Farruquito_%28cropped%29.jpg'
    },
    agenteTorres: {
      nombre: 'Agente Torres',
      rol: 'Policía',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Pablo_Motos.jpg/220px-Pablo_Motos.jpg'
    },
    chatoRuiz: {
      nombre: 'El Chato Ruiz',
      rol: 'Rival',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/El_Cordob%C3%A9s_%28cropped%29.jpg/220px-El_Cordob%C3%A9s_%28cropped%29.jpg'
    },
    viejoSebastian: {
      nombre: 'Viejo Sebastián',
      rol: 'Mediador',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Manuel_Molina_%28poeta%29.jpg/220px-Manuel_Molina_%28poeta%29.jpg'
    }
  }
};

// ════════════════════════════════════════
// DATOS DE CLANES (adaptados a Madrid)
// ════════════════════════════════════════
const CLANES = {
  heredia: {
    nombre: 'Clan Heredia',
    icono: '🔥',
    tagline: 'Los Reyes del Rastro',
    desc: 'Tratantes y comerciantes del Rastro de Madrid. Tienen pasta y contactos.',
    bonos: { recursos: 30, diplomacia: 10 },
    legado: 'Controlar 3 rutas comerciales',
    color: '#D4AF37',
    barrio: 'San Blas-Canillejas, Madrid',
    enemigoPrincipal: 'El Chato Ruiz',
    enemigoDesc: 'Un payo que controla el mercadillo de Canillejas y quiere expulsaros.'
  },
  amaya: {
    nombre: 'Clan Amaya',
    icono: '🎶',
    tagline: 'Los Artistas del Tablao',
    desc: 'Cantaores y bailaores de la escena madrileña. Arte y flow.',
    bonos: { honra: 40, diplomacia: 15 },
    legado: 'Llenar el WiZink Center con tu música',
    color: '#FF6B35',
    barrio: 'Lavapiés, Madrid',
    enemigoPrincipal: 'El Inspector Morales',
    enemigoDesc: 'Un inspector que quiere cerrar vuestro tablao por "denuncias de ruido".'
  },
  vargas: {
    nombre: 'Clan Vargas',
    icono: '🐴',
    tagline: 'Los Guerreros del Ensanche',
    desc: 'Chatarreros y feriantes de Vallecas. Nadie se mete con ellos.',
    bonos: { combate: 25, intimidacion: 15 },
    legado: 'Cruzar la M-40 de punta a punta sin que te paren',
    color: '#FF4500',
    barrio: 'Vallecas, Madrid',
    enemigoPrincipal: 'Los Hermanos Cárdenas',
    enemigoDesc: 'Una familia paya que reclama el solar donde tenéis la chatarrería.'
  }
};

// ════════════════════════════════════════
// VOCABULARIO CALÓ JUVENIL (generación Z)
// ════════════════════════════════════════
const CALO = {
  'gitanico': 'gitano (en plan cariñoso)',
  'lache': 'vergüenza / corte',
  'payo': 'no gitano',
  'pasma': 'policía',
  'parné': 'dinero',
  'chabó': 'chaval',
  'chabala': 'chavala',
  'camelar': 'gustar / molar',
  'jiñar': 'acojonarse',
  'gili': 'tonto / pringao',
  'currelar': 'currar',
  'chungo': 'malo / peligroso',
  'duquelas': 'penas',
  'sinela': 'jefa',
  'bibaró': 'rico',
  'diñar': 'pegar',
  'mangar': 'robar'
};

const INSULTOS_PAYOS = [
  '¡Maldito payo de mierda!',
  '¡Payo cabrón, que no tienes lache!',
  '¡Gili del quince!',
  '¡Vete a la mierda, sinvergüenza!',
  '¡Que te den, gachó!'
];

const INSULTOS_GITANOS = [
  '¡Anda ya, gitanico sin honra!',
  '¡Traidor a tus primos!',
  '¡Ni gitano ni payo, eres peor que los dos!',
  '¡Tu abuelo se revuelve en la tierra!'
];

const EXPRESIONES_GITANAS = [
  '¡Acho, qué fuerte!',
  '¡Por los clavos de cristo!',
  '¡Que me muera si miento!',
  '¡Malaya sea!',
  '¡Te lo juro por mi sangre!',
  '¡Con los ojos de mi abuela te lo digo!'
];

// ════════════════════════════════════════
// UTILIDADES
// ════════════════════════════════════════
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }
function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  if (el) { el.classList.add('active'); GameState.screen = id; }
}

function showNotification(text, type = 'neutral') {
  const toastEl = document.getElementById('notificationToast');
  const body = document.getElementById('toastBody');
  body.innerHTML = text;
  body.className = 'toast-body';
  if (type === 'good') body.classList.add('text-success');
  else if (type === 'bad') body.classList.add('text-danger');
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function addHistory(entry) {
  GameState.history.push({ chapter: GameState.chapter, text: entry });
}

function updateStats() {
  document.getElementById('honraVal').textContent = GameState.stats.honra;
  document.getElementById('recursosVal').textContent = GameState.stats.recursos;
  document.getElementById('miembrosVal').textContent = GameState.stats.miembros;
  document.getElementById('alianzasVal').textContent = GameState.stats.alianzas;
  document.getElementById('headerChapter').textContent = `Cap. ${GameState.chapter}`;
}

function modStat(stat, amount) {
  if (GameState.stats[stat] !== undefined) {
    GameState.stats[stat] = clamp(GameState.stats[stat] + amount, 0, 100);
  }
  updateStats();
}

function modFaction(faction, amount) {
  if (GameState.factions[faction] !== undefined) {
    GameState.factions[faction] = clamp(GameState.factions[faction] + amount, 0, 100);
  }
}

function calóWord(word) {
  const translation = CALO[word.toLowerCase()];
  if (translation) {
    return `<span class="text-accent fst-italic" style="cursor:help;border-bottom:1px dotted var(--text-accent);" onclick="showCulturalModal('El Caló callejero', '<b>${word}</b>: ${translation}. Palabreo gitano de la calle, mezcla de romaní y español.')">${word} <i class="fas fa-info-circle"></i></span>`;
  }
  return word;
}

function personajeImg(key) {
  const p = GameState.personajes[key];
  if (p) {
    return `<img src="${p.img}" alt="${p.nombre}" class="fighter-img rounded-circle me-2" style="width:60px;height:60px;object-fit:cover;border:3px solid var(--gold);box-shadow: 0 0 10px rgba(212,175,55,0.3);" title="${p.nombre} (${p.rol})">`;
  }
  return '';
}

// ════════════════════════════════════════
// MODALES
// ════════════════════════════════════════
function showCulturalModal(title, text) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = text;
  new bootstrap.Modal(document.getElementById('genericModal')).show();
}
function showInventory() {
  const inv = GameState.inventory.length === 0
    ? '<p class="text-muted fst-italic">El inventario está vacío, makina.</p>'
    : '<ul class="list-unstyled">' + GameState.inventory.map(i => `<li class="text-light"><i class="fas fa-circle-notch text-gold me-2"></i> ${i}</li>`).join('') + '</ul>';
  document.getElementById('modalTitle').textContent = '<i class="fas fa-backpack"></i> Inventario';
  document.getElementById('modalBody').innerHTML = inv;
  new bootstrap.Modal(document.getElementById('genericModal')).show();
}
function showRelations() {
  const fp = GameState.factions;
  const desc = (val) => {
    if (val < 20) return '<span class="text-danger"><i class="fas fa-skull"></i> Enemigos</span>';
    if (val < 40) return '<span class="text-warning"><i class="fas fa-exclamation-triangle"></i> Tensión</span>';
    if (val < 60) return '<span class="text-secondary"><i class="fas fa-meh"></i> Neutral</span>';
    if (val < 80) return '<span class="text-success"><i class="fas fa-thumbs-up"></i> Respeto</span>';
    return '<span class="text-gold"><i class="fas fa-crown"></i> Aliados</span>';
  };
  const relHTML = `
    <div class="d-flex flex-column gap-2">
      ${[
        ['<i class="fas fa-shield-haltered"></i> Pasma', 'policia'],
        ['<i class="fas fa-user"></i> Payos', 'payos'],
        ['<i class="fas fa-fire"></i> Otros Clanes', 'clanes'],
        ['<i class="fas fa-building"></i> Ayuntamiento', 'ayuntamiento']
      ].map(([label, key]) => `
        <div class="p-2 rounded" style="background:rgba(255,255,255,0.05);">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="fw-bold text-gold">${label}</span>
            ${desc(fp[key])}
          </div>
          <div class="progress" style="height:8px;">
            <div class="progress-bar bg-warning" style="width:${fp[key]}%"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('modalTitle').textContent = '<i class="fas fa-handshake"></i> Relaciones';
  document.getElementById('modalBody').innerHTML = relHTML;
  new bootstrap.Modal(document.getElementById('genericModal')).show();
}
function showHistory() {
  const hist = GameState.history.length === 0
    ? '<p class="text-muted fst-italic">Aún no has hecho nada, gitanico...</p>'
    : GameState.history.map(h => `<div class="mb-2"><span class="text-gold fw-bold">Cap.${h.chapter}</span> ${h.text}</div>`).join('');
  document.getElementById('modalTitle').textContent = '<i class="fas fa-scroll"></i> Historial';
  document.getElementById('modalBody').innerHTML = hist;
  new bootstrap.Modal(document.getElementById('genericModal')).show();
}
function showHelp() {
  showCulturalModal('<i class="fas fa-info-circle"></i> El GitanoJuego', `
    <b>Juego narrativo de clanes gitanos en el Madrid del siglo XXI.</b><br><br>
    <i class="fas fa-star text-gold"></i> <b>Honra:</b> Tu reputación callejera.<br>
    <i class="fas fa-euro-sign text-gold"></i> <b>Parné:</b> Pasta del clan.<br>
    <i class="fas fa-users text-gold"></i> <b>Familia:</b> Miembros del clan.<br>
    <i class="fas fa-handshake text-gold"></i> <b>Alianzas:</b> Clanes que te apoyan.<br><br>
    <b>Combate:</b> Atacar, Esquivar o Farolear. ¡Y estate atento a los imprevistos!
  `);
}

// ════════════════════════════════════════
// INICIALIZACIÓN
// ════════════════════════════════════════
function initParticles() {
  tsParticles.load("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 1000 } },
      color: { value: ["#D4AF37", "#FF4500", "#F0D060", "#FF6B35"] },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
      size: { value: 3, random: true },
      move: { enable: true, speed: 0.8, direction: "none", random: true, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "bubble" }, resize: true },
      modes: { bubble: { distance: 200, size: 8, duration: 2, opacity: 0.8 } }
    },
    retina_detect: true
  });
}

function initLoading() {
  const messages = [
    'Cargando el camino...',
    'Bajando al Rastro...',
    'Escuchando el cante...',
    'Afilando la navaja...',
    'Consultando a los viejos del barrio...',
    '¡Apañao y listo, makina!'
  ];
  let progress = 0;
  let msgIdx = 0;
  const bar = document.getElementById('loadingBar');
  const text = document.getElementById('loadingText');

  const interval = setInterval(() => {
    progress += rand(8, 22);
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';
    text.textContent = messages[Math.min(msgIdx, messages.length - 1)];
    msgIdx++;
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => showScreen('menu'), 500);
    }
  }, 300);
}

// ════════════════════════════════════════
// SELECCIÓN DE CLAN Y PERSONAJE
// ════════════════════════════════════════
function startNewGame() {
  const clanCards = document.getElementById('clanCards');
  clanCards.innerHTML = Object.entries(CLANES).map(([id, clan]) => `
    <div class="col-md-4 mb-3">
      <div class="card clan-card bg-dark text-light border-warning h-100" onclick="selectClan('${id}')">
        <div class="card-body text-center">
          <span class="fs-1">${clan.icono}</span>
          <h3 class="card-title text-gold">${clan.nombre}</h3>
          <p class="card-text text-accent fst-italic">${clan.tagline}</p>
          <p class="card-text small">${clan.desc}</p>
          <div class="mt-2">
            <span class="badge bg-warning text-dark">${Object.entries(clan.bonos).map(([k,v]) => `+${v} ${k}`).join(', ')}</span>
          </div>
          <p class="card-text mt-2"><small class="text-muted"><i class="fas fa-map-marker-alt"></i> ${clan.barrio}</small></p>
        </div>
      </div>
    </div>
  `).join('');
  showScreen('clan');
}

function selectClan(clanId) {
  GameState.selectedClan = clanId;
  GameState.clanData = CLANES[clanId];
  const bonos = CLANES[clanId].bonos;
  for (const [stat, val] of Object.entries(bonos)) {
    if (GameState.stats[stat] !== undefined) {
      GameState.stats[stat] = clamp(GameState.stats[stat] + val, 0, 100);
    }
  }
  document.querySelectorAll('#clanCards .card').forEach(c => c.style.opacity = '0.5');
  setTimeout(() => {
    document.getElementById('roleChoices').innerHTML = `
      <div class="role-card p-3 rounded mb-2 selected" data-role="cabeza" onclick="selectRole(this)" style="cursor:pointer;border:2px solid var(--gold);background:rgba(212,175,55,0.1);">
        <i class="fas fa-crown fs-3 text-gold"></i>
        <span class="fw-bold text-gold ms-2">El Cabeza</span>
        <span class="text-muted ms-2">Patriarca del barrio. Mandas más que el alcalde.</span>
        <span class="badge bg-warning text-dark ms-2">+10 Honra, +5 Diplomacia</span>
      </div>
      <div class="role-card p-3 rounded mb-2" data-role="guerrero" onclick="selectRole(this)" style="cursor:pointer;border:2px solid rgba(255,255,255,0.2);">
        <i class="fas fa-fist-raised fs-3 text-danger"></i>
        <span class="fw-bold text-gold ms-2">El Guerrero</span>
        <span class="text-muted ms-2">El más temido del barrio. Tus puños son la ley.</span>
        <span class="badge bg-warning text-dark ms-2">+15 Combate, +5 Intimidación</span>
      </div>
      <div class="role-card p-3 rounded mb-2" data-role="listo" onclick="selectRole(this)" style="cursor:pointer;border:2px solid rgba(255,255,255,0.2);">
        <i class="fas fa-brain fs-3 text-primary"></i>
        <span class="fw-bold text-gold ms-2">El Listo</span>
        <span class="text-muted ms-2">El cerebro. Negocias y piensas antes de dar el palo.</span>
        <span class="badge bg-warning text-dark ms-2">+10 Diplomacia, opciones únicas</span>
      </div>
    `;
    showScreen('character');
  }, 300);
}

function selectRole(el) {
  document.querySelectorAll('.role-card').forEach(r => {
    r.classList.remove('selected');
    r.style.border = '2px solid rgba(255,255,255,0.2)';
    r.style.background = 'rgba(255,255,255,0.03)';
  });
  el.classList.add('selected');
  el.style.border = '2px solid var(--gold)';
  el.style.background = 'rgba(212,175,55,0.1)';
  GameState.playerRole = el.dataset.role;
}

function createCharacter() {
  const name = document.getElementById('playerName').value.trim();
  if (!name) {
    showNotification('<i class="fas fa-exclamation-circle"></i> ¡Pon tu nombre, gitanico! Sin nombre no eres nadie.', 'bad');
    return;
  }
  GameState.playerName = name;

  const roleBonos = {
    cabeza: { honra: 10, diplomacia: 5 },
    guerrero: { combate: 15, intimidacion: 5 },
    listo: { diplomacia: 10 }
  };
  const b = roleBonos[GameState.playerRole] || {};
  for (const [stat, val] of Object.entries(b)) {
    if (GameState.stats[stat] !== undefined) {
      GameState.stats[stat] = clamp(GameState.stats[stat] + val, 0, 100);
    }
  }

  document.getElementById('headerClanIcon').textContent = GameState.clanData.icono;
  document.getElementById('headerClanName').textContent = GameState.clanData.nombre;
  updateStats();
  showScreen('game');
  startChapter1();
}

// ════════════════════════════════════════
// MOTOR NARRATIVO
// ════════════════════════════════════════
function renderNarrative(html) {
  const area = document.getElementById('narrativeInner');
  area.innerHTML = html;
  document.getElementById('narrativeArea').scrollTop = 0;
}

let currentChoiceHandlers = [];

function renderChoices(choices) {
  const area = document.getElementById('choicesInner');
  const letters = ['A', 'B', 'C', 'D', 'E'];
  let html = '<div class="text-uppercase text-muted small mb-2 fw-bold">¿Qué haces, makina?</div>';
  choices.forEach((c, i) => {
    const cls = c.danger ? 'btn-outline-danger' : c.good ? 'btn-outline-success' : 'btn-outline-warning';
    html += `<button class="btn ${cls} w-100 mb-2 text-start animate__animated animate__fadeInUp" style="animation-delay:${i*0.1}s" onclick="handleChoice(${i})">
      <span class="badge bg-warning text-dark me-2">${letters[i]}</span>
      ${c.text}
      ${c.hint ? `<br><small class="text-muted fst-italic ms-4">${c.hint}</small>` : ''}
    </button>`;
  });
  area.innerHTML = html;
}

function renderContinue(text, callback) {
  const area = document.getElementById('choicesInner');
  area.innerHTML = `<button class="btn btn-danger w-100 mt-2 animate__animated animate__pulse animate__infinite" onclick="${callback}">${text || '▶ Dale caña...'}</button>`;
}

function handleChoice(index) {
  if (currentChoiceHandlers[index]) {
    currentChoiceHandlers[index]();
  }
}

// ════════════════════════════════════════
// ARRANQUE
// ════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initLoading();
});
