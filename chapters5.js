/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULO 5: EL DESENLACE v5.0
   (Incluye Batalla de San Blas)
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// CAPÍTULO 5: EL DESENLACE
// ════════════════════════════════════════
function startChapter5() {
  GameState.chapter = 5;
  updateStats();
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo V — El Desenlace</div>
    <h2 class="event-title">La Última Batalla</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">⚡</span>
      <div class="image-overlay-text">La tormenta se acerca sobre San Blas. Todo converge.</div>
    </div>
    <p class="narrative-text">
      Han pasado semanas desde la crisis del desalojo. El polvo se ha asentado, pero el aire todavía huele a pólvora y a cuentas pendientes.
    </p>
    <p class="narrative-text">
      ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> sigue moviendo hilos desde las sombras. Pero ahora ya no estáis solos. O puede que sí. Depende de lo que hayas construido hasta aquí.
    </p>
    <p class="narrative-text">
      Es la hora de la confrontación final. La que definirá el destino del ${GameState.clanData.nombre} durante generaciones.
    </p>
  `);

  const desenlaces = [];

  if (GameState.stats.diplomacia >= 60 && GameState.stats.recursos >= 40) {
    desenlaces.push({
      text: '🤝 Convocar una reunión definitiva con todas las partes. Negociar la paz.',
      hint: 'Opción diplomática. Necesitas mucha labia y pasta.',
      good: true,
      handler: () => chapter5_negociacion_final()
    });
  }

  if (GameState.stats.alianzas > 0 && GameState.stats.miembros >= 12) {
    desenlaces.push({
      text: '⚔️ Movilizar a todos los clanes aliados para una demostración de fuerza.',
      hint: 'Requiere alianzas activas. Puede ser la solución definitiva.',
      handler: () => chapter5_movilizacion_final()
    });
  }

  desenlaces.push({
    text: '🔥 Plantarle cara tú mismo al Chato. Terminar esto como se hacía antes.',
    hint: 'Duelo final. Tu Honra decidirá el resultado.',
    danger: true,
    handler: () => chapter5_duelo_final()
  });

  if (GameState.stats.honra >= 70) {
    desenlaces.push({
      text: '🕊️ Ofrecer un sacrificio personal: ceder algo muy valioso para proteger al clan.',
      hint: 'Opción de líder sabio. Pierdes parné pero ganas Honra eterna.',
      handler: () => chapter5_sacrificio()
    });
  }

  if (GameState.inventory.some(i => i.includes('Marrones'))) {
    desenlaces.push({
      text: '📋 Filtrar toda la mierda del Chato a la prensa. Hundirlo legalmente.',
      hint: 'Usas la información que guardaste desde el principio.',
      good: true,
      handler: () => chapter5_filtracion()
    });
  }

  currentChoiceHandlers = desenlaces.map(d => d.handler);
  renderChoices(desenlaces);
}

// ... (todas las funciones de desenlace se mantienen exactamente igual) ...
// NOTA: Aquí irían las funciones chapter5_negociacion_final, chapter5_movilizacion_final,
// chapter5_duelo_final, chapter5_sacrificio, chapter5_filtracion, resolveCombat sobrescrito, etc.
// NO las incluyo en este mensaje porque ocupan muchísimo y YA las tienes en tu archivo actual.
// Tú CONSERVAS todas las que ya tenías hasta justo antes de showEnding().

// ════════════════════════════════════════
// EPÍLOGO FINAL
// ════════════════════════════════════════
function showEnding() {
  GameState.chapter = 5;
  updateStats();
  const name = GameState.playerName;
  const clan = GameState.clanData;

  let endingType = 'agridulce';
  if (GameState.stats.honra >= 80 && GameState.stats.recursos >= 50 && GameState.stats.miembros >= 12) {
    endingType = 'epico';
  } else if (GameState.stats.honra >= 90 && GameState.stats.alianzas >= 2 && GameState.flags.primeraVictoriaCombate) {
    endingType = 'leyenda';
  } else if (GameState.stats.honra < 30 || GameState.stats.miembros < 8) {
    endingType = 'tragico';
  } else if (GameState.flags.sacrificioRealizado || GameState.stats.recursos < 20) {
    endingType = 'sacrificio';
  }

  let endingHTML = '';

  if (endingType === 'epico') {
    endingHTML = `
      <div class="event-date">Epílogo</div>
      <h2 class="event-title">🏆 El Clan que Perduró</h2>
      <p class="narrative-text">
        Han pasado diez años. El ${clan.nombre} sigue en el mercadillo...
      </p>
      <!-- ... (todo el HTML del epílogo épico que ya tienes) ... -->
    `;
  } else if (endingType === 'leyenda') {
    // ... etc., conserva todo el HTML de los epílogos que ya tienes
  }
  // ... (el resto de else if con los mismos HTML de epílogo que ya tenías) ...

  endingHTML += `
    <p class="narrative-text mt-4">
      <em>"Los gitanos no tenían libros, pero sí memoria."</em>
    </p>
  `;

  showScreen('game');
  renderNarrative(endingHTML);
  document.getElementById('choicesInner').innerHTML = '';

  // ═══ NUEVO: Tras mostrar el epílogo, se desencadena el evento final ═══
  setTimeout(() => {
    startFinalBattleEvent();
  }, 4000);
}

// ════════════════════════════════════════
// NUEVO: EVENTO FINAL "LA BATALLA DE SAN BLAS"
// ════════════════════════════════════════
function startFinalBattleEvent() {
  const name = GameState.playerName;
  const clan = GameState.clanData;

  // Determinar si el Chato sigue vivo
  const chatoVivo = !GameState.flags.combatePerdido || GameState.flags.primeraVictoriaCombate;
  const villano = chatoVivo ? 'El Chato Ruiz' : 'El Ingeniero';
  const imgVillano = chatoVivo ? personajeImg('chatoRuiz') : '';

  renderNarrative(`
    <div class="event-date">48 horas después — San Blas</div>
    <h2 class="event-title">🚧 La Batalla de San Blas</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🏗️</span>
      <div class="image-overlay-text">Excavadoras en la entrada del mercadillo. La resistencia se organiza.</div>
    </div>
    <p class="narrative-text">
      No ha dado tiempo a celebrar la victoria. Un burofax urgente acaba de llegar: ${villano} se ha aliado con una inmobiliaria y ha conseguido una orden judicial definitiva. <span class="narrative-danger">En 48 horas, las excavadoras entran al mercadillo.</span>
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> reúne a todos en la plaza: <em>"¡Que vengan con sus máquinas, que yo les pincho las ruedas a navajazos!"</em>
    </p>
    <p class="narrative-text">
      Los clanes aliados empiezan a llegar. La ${personajeImg('laLola') ? personajeImg('laLola') : ''} <span class="narrative-char">abuela</span> se sienta en su silla justo delante de la primera excavadora. Se hace el silencio. La tensión es tan densa que se puede mascar.
    </p>
    <p class="narrative-text">
      El jefe de la inmobiliaria, un payo con traje y casco que se hace llamar <span class="narrative-char">"El Ingeniero"</span>, se ríe: <em>"Esto es progreso, amigo. No se puede frenar el futuro con faldas y palmas."</em>
    </p>
    <p class="narrative-text">
      Tú te plantas delante de él. Le sostienes la mirada. La gente contiene la respiración.
    </p>
  `);

  // Opciones para el jugador
  currentChoiceHandlers = [
    () => finalBattle_discurso(),
    () => finalBattle_enfrentamiento(),
    () => finalBattle_llamar_periodista()
  ];

  renderChoices([
    {
      text: '🎤 Soltar un discurso que deje en ridículo al Ingeniero delante de todos.',
      hint: 'Usas tu labia para ganar tiempo y apoyo popular.',
      good: true
    },
    {
      text: '💪 Plantarle cara físicamente. Que sepan que aquí no se rinde nadie.',
      hint: 'Puede provocar una pelea con la policía.',
      danger: true
    },
    {
      text: '📱 Llamar al periodista que cubrió el caso anterior. Que esto se haga viral.',
      hint: 'La opinión pública puede frenar el desalojo.',
    }
  ]);
}

function finalBattle_discurso() {
  modStat('diplomacia', 5);
  modStat('honra', 10);

  renderNarrative(`
    <p class="narrative-text">
      Te subes a una caja de madera y empiezas a hablar. No gritas, no insultas. Recuerdas a tu abuelo, a los que construyeron el barrio con sus manos, a los que aguantaron cuando nadie quería estar aquí.
    </p>
    <p class="narrative-text">
      <em>"Este mercadillo no es solo un trozo de suelo. Es nuestra historia, nuestra sangre. Si quieren tirarlo, tendrán que explicarles a sus hijos por qué prefirieron el hormigón a las personas."</em>
    </p>
    <p class="narrative-text">
      La gente aplaude. Incluso algunos operarios de las excavadoras bajan la cabeza. El Ingeniero está cada vez más incómodo. Su teléfono no para de sonar.
    </p>
  `);

  continueFinalBattle();
}

function finalBattle_enfrentamiento() {
  modStat('intimidacion', 10);
  modFaction('policia', -10);

  renderNarrative(`
    <p class="narrative-text">
      Avanzas hacia el Ingeniero sin decir nada. Tus ojos lo dicen todo. Miguelito y tres primos te flanquean. Los antidisturbios se ponen nerviosos.
    </p>
    <p class="narrative-text">
      El Ingeniero retrocede un paso. <em>"No... no hace falta llegar a esto."</em>
    </p>
    <p class="narrative-text">
      La tensión se rompe cuando un agente de policía se acerca corriendo y le susurra algo al oído al Ingeniero. Su cara lo dice todo: algo ha cambiado.
    </p>
  `);

  continueFinalBattle();
}

function finalBattle_llamar_periodista() {
  modFaction('payos', 15);

  renderNarrative(`
    <p class="narrative-text">
      Sacas el móvil y marcas el número del periodista que cubrió vuestro caso. <em>"Ven a San Blas ahora mismo. Esto es más gordo que lo del mercadillo."</em>
    </p>
    <p class="narrative-text">
      En diez minutos, el periodista está allí con su cámara. Empieza a grabar en directo. Las redes sociales arden con el hashtag #SanBlasResiste. Miles de personas comparten la imagen de la abuela sentada frente a las excavadoras.
    </p>
    <p class="narrative-text">
      La presión mediática crece. El Ayuntamiento empieza a recibir llamadas de todas partes. El Ingeniero está al teléfono con gesto preocupado.
    </p>
  `);

  continueFinalBattle();
}

function continueFinalBattle() {
  const name = GameState.playerName;

  renderNarrative(`
    <p class="narrative-text">
      De repente, todo se para. El Ingeniero recibe una llamada. Al otro lado está su suegro, el concejal corrupto. Le acaban de comunicar que un juez ha admitido a trámite una denuncia por corrupción urbanística. <span class="narrative-good">La orden de desalojo queda suspendida cautelarmente.</span>
    </p>
    ${GameState.flags.pegastePolicia ? '' : `
    <p class="narrative-text">
      ${personajeImg('laEncarna') ? personajeImg('laEncarna') : ''} <span class="narrative-char">La Encarna</span> sale de entre la multitud. Lleva días recopilando documentos en secreto. <em>"No vamos a dejar que nos pisen, ${name}."</em>
    </p>
    `}
    <p class="narrative-text">
      Las excavadoras se retiran. La abuela se levanta de su silla, la recoge y se va caminando hacia casa sin decir ni una palabra. La gente estalla en aplausos.
    </p>
    <p class="narrative-text">
      Esa noche, el barrio entero es una fiesta. Guitarras, palmas, paella gigante. El periodista te llama por teléfono: <em>"He subido la crónica. Se va a hacer viral."</em>
    </p>
    <p class="narrative-text">
      Mientras suena una bulería, un hombre de traje se te acerca. Es <span class="narrative-char">Don Federico</span>, concejal del Ayuntamiento. Te mira fijamente y te dice:
    </p>
    <p class="narrative-text">
      <em>"He visto lo que ha pasado hoy. Necesito a alguien como tú en el Ayuntamiento. ¿Te interesaría entrar en política?"</em>
    </p>
    <p class="narrative-text">
      Tú le devuelves la mirada. Luego miras a tu gente, a la abuela, a Miguelito. Y respondes: <em>"Háblame claro, payo. ¿Qué tengo que hacer?"</em>
    </p>
    <div class="event-title">CONTINUARÁ...</div>
  `);

  // Guardar flag de victoria final
  GameState.flags.batallaSanBlasGanada = true;
  GameState.inventory.push('🏆 Batalla de San Blas ganada');

  renderContinue('▶ Ir al Capítulo VI', 'startChapter6()');
}
