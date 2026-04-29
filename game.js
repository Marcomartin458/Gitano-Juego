/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — MOTOR PRINCIPAL v4.0
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
    venganzaAmorosa: false
  },

  inventory: [],
  history: [],
  combat: null,
  clanData: null,

  // Personajes con imágenes
  personajes: {
    viejoCurro: {
      nombre: 'Viejo Curro',
      rol: 'Patriarca',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    },
    miguelito: {
      nombre: 'Miguelito',
      rol: 'Guerrero',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face'
    },
    tioAntonio: {
      nombre: 'Tío Antonio',
      rol: 'Consejero',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
    },
    laLola: {
      nombre: 'La Lola',
      rol: 'Prima',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'
    },
    laEncarna: {
      nombre: 'La Encarna',
      rol: 'Abogada',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
    },
    tomas: {
      nombre: 'Tomás',
      rol: 'Hermano',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
    },
    agenteTorres: {
      nombre: 'Agente Torres',
      rol: 'Policía',
      img: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=200&h=200&fit=crop&crop=face'
    },
    chatoRuiz: {
      nombre: 'El Chato Ruiz',
      rol: 'Rival',
      img: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=200&h=200&fit=crop&crop=face'
    },
    viejoSebastian: {
      nombre: 'Viejo Sebastián',
      rol: 'Mediador',
      img: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=200&h=200&fit=crop&crop=face'
    }
  }
};

// ════════════════════════════════════════
// DATOS DE CLANES
// ════════════════════════════════════════
const CLANES = {
  heredia: {
    nombre: 'Clan Heredia',
    icono: '🔥',
    tagline: 'Los Reyes del Mercadillo',
    desc: 'Ferralleros, tratantes y comerciantes. Controlan los mercadillos de media Andalucía.',
    bonos: { recursos: 30, diplomacia: 10 },
    legado: 'Controlar 3 rutas comerciales',
    color: '#D4AF37',
    barrio: 'Las Tres Mil Viviendas, Sevilla',
    enemigoPrincipal: 'El Chato Ruiz',
    enemigoDesc: 'Un payo que controla el mercadillo de Los Bermejales y quiere expulsaros.'
  },
  amaya: {
    nombre: 'Clan Amaya',
    icono: '🎶',
    tagline: 'Los Artistas del Alma',
    desc: 'Cantaores y bailaores conocidos en toda España. El arte es su moneda.',
    bonos: { honra: 40, diplomacia: 15 },
    legado: 'Que tu arte sea conocido en toda Andalucía',
    color: '#FF6B35',
    barrio: 'Santiago, Jerez de la Frontera',
    enemigoPrincipal: 'El Inspector Morales',
    enemigoDesc: 'Un inspector que quiere demoler vuestro local de ensayo por "denuncias de ruido".'
  },
  vargas: {
    nombre: 'Clan Vargas',
    icono: '🐴',
    tagline: 'Los Guerreros del Asfalto',
    desc: 'Chatarreros y feriantes. Llevan siglos en la carretera. Nadie les toca las narices.',
    bonos: { combate: 25, intimidacion: 15 },
    legado: 'Cruzar España de norte a sur sin que te paren',
    color: '#FF4500',
    barrio: 'Polígono Sur, Sevilla',
    enemigoPrincipal: 'Los Hermanos Cárdenas',
    enemigoDesc: 'Una familia paya que reclama la chatarrería que lleváis años trabajando.'
  }
};

// ════════════════════════════════════════
// VOCABULARIO CALÓ
// ════════════════════════════════════════
const CALO = {
  'chabó': 'chico joven',
  'chabala': 'chica joven',
  'calé': 'gitano',
  'gachó': 'hombre payo',
  'gachí': 'mujer paya',
  'chorar': 'robar',
  'duquelas': 'penas del alma',
  'juncal': 'elegante / digno',
  'palanqueta': 'herramienta',
  'lacha': 'vergüenza / honor',
  'chungo': 'malo / peligroso',
  'parné': 'dinero',
  'payo': 'no gitano',
  'pasma': 'policía',
  'diñar': 'dar / pegar',
  'menda': 'yo / uno mismo',
  'sinela': 'patrona / jefa',
  'bibaró': 'rico / poderoso',
  'mangar': 'pedir / mendigar',
  'sos': 'qué / cómo',
  'camelar': 'querer / enamorar',
  'jiñar': 'tener miedo',
  'gili': 'tonto',
  'currelar': 'trabajar',
  'chai': 'hija',
  'choro': 'ladrón',
  'barí': 'grande / importante',
  'chitón': 'silencio / cállate',
  'acho': 'tío (exclamación)'
};

const INSULTOS_PAYOS = [
  '¡Maldito gachó de mierda!',
  '¡Payo cabrón, que no tienes lacha!',
  '¡Hijo de la gran puta, gili del quince!',
  '¡Vete a la mierda, sinvergüenza!',
  '¡Por tus muertos, payo inútil!',
  '¡Que te den, gacho raspa!'
];

const INSULTOS_GITANOS = [
  '¡Anda ya, calé sin honra!',
  '¡Traidor a tu sangre!',
  '¡Ni gitano ni payo, que eres peor que los dos!',
  '¡Tu padre se revuelve en la tierra por lo que has hecho!'
];

const EXPRESIONES_GITANAS = [
  '¡Acho!',
  '¡Por los clavos!',
  '¡Que me muera si miento!',
  '¡Malaya sea!',
  '¡Mi sangre te lo jura!',
  'Con los ojos de mi madre te lo digo'
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
  body.textContent = text;
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
    return `<span class="text-accent fst-italic" style="cursor:help;border-bottom:1px dotted var(--text-accent);" onclick="showCulturalModal('El Caló', '<b>${word}</b>: ${translation}. El caló es la lengua del pueblo gitano español, mezcla del romaní antiguo con el castellano.')">${word} 📚</span>`;
  }
  return word;
}

function personajeImg(key) {
  const p = GameState.personajes[key];
  if (p) {
    return `<img src="${p.img}" alt="${p.nombre}" class="fighter-img rounded-circle me-2" style="width:60px;height:60px;object-fit:cover;border:2px solid var(--gold);" title="${p.nombre} (${p.rol})">`;
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
    ? '<p class="text-muted fst-italic">El inventario está vacío.</p>'
    : '<ul class="list-unstyled">' + GameState.inventory.map(i => `<li class="text-light">• ${i}</li>`).join('') + '</ul>';
  document.getElementById('modalTitle').textContent = '🎒 Inventario del Clan';
  document.getElementById('modalBody').innerHTML = inv;
  new bootstrap.Modal(document.getElementById('genericModal')).show();
}
function showRelations() {
  const fp = GameState.factions;
  const desc = (val) => {
    if (val < 20) return '<span class="text-danger">🔴 Enemigos declarados</span>';
    if (val < 40) return '<span class="text-warning">🟠 Tensión alta</span>';
    if (val < 60) return '<span class="text-secondary">🟡 Neutral</span>';
    if (val < 80) return '<span class="text-success">🟢 Respeto</span>';
    return '<span class="text-gold">⭐ Aliados fuertes</span>';
  };
  const relHTML = `
    <div class="d-flex flex-column gap-2">
      ${[
        ['👮 Pasma', 'policia'],
        ['😤 Payos', 'payos'],
        ['🔥 Otros Clanes', 'clanes'],
        ['🏛️ Ayuntamiento', 'ayuntamiento']
      ].map(([label, key]) => `
        <div class="p-2 rounded" style="background:rgba(255,255,255,0.03);">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="fw-bold text-gold">${label}</span>
            ${desc(fp[key])}
          </div>
          <div class="progress" style="height:6px;">
            <div class="progress-bar bg-warning" style="width:${fp[key]}%"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('modalTitle').textContent = '🤝 Relaciones';
  document.getElementById('modalBody').innerHTML = relHTML;
  new bootstrap.Modal(document.getElementById('genericModal')).show();
}
function showHistory() {
  const hist = GameState.history.length === 0
    ? '<p class="text-muted fst-italic">Aún no has tomado decisiones importantes...</p>'
    : GameState.history.map(h => `<div class="mb-2"><span class="text-gold fw-bold">Cap.${h.chapter}</span> ${h.text}</div>`).join('');
  document.getElementById('modalTitle').textContent = '📜 Historial';
  document.getElementById('modalBody').innerHTML = hist;
  new bootstrap.Modal(document.getElementById('genericModal')).show();
}
function showHelp() {
  showCulturalModal('El GitanoJuego', `
    <b>Un juego de texto interactivo sobre la cultura gitana española en el siglo XXI.</b><br><br>
    ⭐ <b>Honra:</b> Tu reputación. Si cae a 0, el clan se disuelve.<br>
    💶 <b>Parné:</b> Recursos económicos del clan.<br>
    👥 <b>Familia:</b> Miembros del clan capaces de luchar.<br>
    🤝 <b>Alianzas:</b> Clanes que te apoyan.<br><br>
    <b>Combate:</b> Atacar, Esquivar o Farolear. Cada acción tiene consecuencias.<br><br>
    <i>"Los gitanos no tenían libros, pero sí memoria."</i>
  `);
}

// ════════════════════════════════════════
// INICIALIZACIÓN
// ════════════════════════════════════════
function initLoading() {
  const messages = ['Cargando el camino...', 'Preparando el clan...', 'Escuchando el cante...', 'Afilando la navaja...', 'Consultando a los viejos...', '¡Apañao y listo, acho!'];
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

// Partículas de fondo
function initParticles() {
  tsParticles.load("particles-js", {
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      color: { value: ["#D4AF37", "#FF4500", "#F0D060"] },
      shape: { type: "circle" },
      opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false } },
      size: { value: 3, random: true },
      move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "bubble" }, resize: true },
      modes: { bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 } }
    },
    retina_detect: true
  });
}

// ════════════════════════════════════════
// SELECCIÓN DE CLAN Y PERSONAJE
// ════════════════════════════════════════
function startNewGame() {
  const clanCards = document.getElementById('clanCards');
  clanCards.innerHTML = Object.entries(CLANES).map(([id, clan]) => `
    <div class="col-md-4 mb-3">
      <div class="card bg-dark text-light border-warning h-100" onclick="selectClan('${id}')" style="cursor:pointer;">
        <div class="card-body text-center">
          <span class="fs-1">${clan.icono}</span>
          <h3 class="card-title text-gold">${clan.nombre}</h3>
          <p class="card-text text-accent fst-italic">${clan.tagline}</p>
          <p class="card-text small">${clan.desc}</p>
          <div class="mt-2">
            <span class="badge bg-warning text-dark">${Object.entries(clan.bonos).map(([k,v]) => `+${v} ${k}`).join(', ')}</span>
          </div>
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
      <div class="role-card p-2 rounded mb-2 selected" data-role="cabeza" onclick="selectRole(this)" style="cursor:pointer;border:1px solid var(--border-gold);">
        <span class="fs-4">👑</span>
        <span class="fw-bold text-gold">El Cabeza</span>
        <span class="text-muted">Patriarca. Máxima autoridad y responsabilidad.</span>
        <span class="badge bg-warning text-dark">+10 Honra, +5 Diplomacia</span>
      </div>
      <div class="role-card p-2 rounded mb-2" data-role="guerrero" onclick="selectRole(this)" style="cursor:pointer;border:1px solid rgba(255,255,255,0.1);">
        <span class="fs-4">⚔️</span>
        <span class="fw-bold text-gold">El Guerrero</span>
        <span class="text-muted">El más temido del clan. Nadie se mete con vosotros.</span>
        <span class="badge bg-warning text-dark">+15 Combate, +5 Intimidación</span>
      </div>
      <div class="role-card p-2 rounded mb-2" data-role="listo" onclick="selectRole(this)" style="cursor:pointer;border:1px solid rgba(255,255,255,0.1);">
        <span class="fs-4">🧠</span>
        <span class="fw-bold text-gold">El Listo</span>
        <span class="text-muted">El que negocia y piensa antes de actuar.</span>
        <span class="badge bg-warning text-dark">+10 Diplomacia, opciones únicas</span>
      </div>
    `;
    showScreen('character');
  }, 300);
}

function selectRole(el) {
  document.querySelectorAll('.role-card').forEach(r => {
    r.classList.remove('selected');
    r.style.border = '1px solid rgba(255,255,255,0.1)';
  });
  el.classList.add('selected');
  el.style.border = '1px solid var(--gold)';
  GameState.playerRole = el.dataset.role;
}

function createCharacter() {
  const name = document.getElementById('playerName').value.trim();
  if (!name) {
    showNotification('¡Pon tu nombre, calé! Que sin nombre no eres nadie.', 'bad');
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
  let html = '<div class="text-uppercase text-muted small mb-2">¿Qué haces?</div>';
  choices.forEach((c, i) => {
    const cls = c.danger ? 'btn-outline-danger' : c.good ? 'btn-outline-success' : 'btn-outline-warning';
    html += `<button class="btn ${cls} w-100 mb-2 text-start" onclick="handleChoice(${i})">
      <span class="badge bg-warning text-dark me-2">${letters[i]}</span>
      ${c.text}
      ${c.hint ? `<br><small class="text-muted fst-italic ms-4">${c.hint}</small>` : ''}
    </button>`;
  });
  area.innerHTML = html;
}

function renderContinue(text, callback) {
  const area = document.getElementById('choicesInner');
  area.innerHTML = `<button class="btn btn-danger w-100 mt-2" onclick="${callback}">${text || '▶ Continuar...'}</button>`;
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