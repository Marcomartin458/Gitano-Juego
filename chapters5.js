/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULO 5: EL DESENLACE v4.0
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
      <div class="image-overlay-text">La tormenta se acerca. Todo converge en este momento.</div>
    </div>
    <p class="narrative-text">
      Han pasado semanas desde la crisis del desalojo. El polvo se ha asentado, pero el aire todavía huele a pólvora y a decisiones que no se han tomado.
    </p>
    <p class="narrative-text">
      El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> sigue moviendo hilos desde las sombras. Pero ahora ya no estáis solos. O puede que sí. Depende de lo que hayas construido hasta aquí.
    </p>
    <p class="narrative-text">
      Es hora de la confrontación final. La que definirá el destino del ${GameState.clanData.nombre} durante generaciones.
    </p>
  `);

  // Verificar condiciones para distintos desenlaces
  const desenlaces = [];

  // Desenlace 1: Negociación final (si tienes diplomacia alta y recursos)
  if (GameState.stats.diplomacia >= 60 && GameState.stats.recursos >= 40) {
    desenlaces.push({
      text: '🤝 Convocar una reunión definitiva con todas las partes. Negociar la paz.',
      hint: 'Opción diplomática. Requiere mucha diplomacia y recursos.',
      good: true,
      handler: () => chapter5_negociacion_final()
    });
  }

  // Desenlace 2: Confrontación con aliados (si tienes alianzas)
  if (GameState.stats.alianzas > 0 && GameState.stats.miembros >= 12) {
    desenlaces.push({
      text: '⚔️ Movilizar a todos los clanes aliados para una demostración de fuerza.',
      hint: 'Requiere alianzas activas. Puede ser la solución definitiva.',
      handler: () => chapter5_movilizacion_final()
    });
  }

  // Desenlace 3: Confrontación directa (siempre disponible)
  desenlaces.push({
    text: '🔥 Plantarle cara tú mismo al rival. Terminar esto como se hacía antes.',
    hint: 'Duelo final. Tu Honra decidirá el resultado.',
    danger: true,
    handler: () => chapter5_duelo_final()
  });

  // Desenlace 4: Sacrificio personal
  if (GameState.stats.honra >= 70) {
    desenlaces.push({
      text: '🕊️ Ofrecer un sacrificio personal: ceder algo muy valioso para proteger al clan.',
      hint: 'Opción de líder sabio. Pierdes recursos pero ganas Honra eterna.',
      handler: () => chapter5_sacrificio()
    });
  }

  // Desenlace 5: Exponer la verdad (si tienes información del rival)
  if (GameState.inventory.some(i => i.includes('Información'))) {
    desenlaces.push({
      text: '📋 Filtrar toda la información sucia del rival a la prensa. Hundirlo legalmente.',
      hint: 'Usas la información que recopilaste en el capítulo 1.',
      good: true,
      handler: () => chapter5_filtracion()
    });
  }

  currentChoiceHandlers = desenlaces.map(d => d.handler);
  renderChoices(desenlaces);
}

// ════════════════════════════════════════
// DESENLACE 1: NEGOCIACIÓN FINAL
// ════════════════════════════════════════
function chapter5_negociacion_final() {
  addHistory('Convocaste una reunión definitiva con todas las partes para negociar la paz.');
  modStat('recursos', -30);
  modStat('diplomacia', 10);
  modFaction('ayuntamiento', 20);
  modFaction('payos', 15);

  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo V — La Negociación</div>
    <h2 class="event-title">La Mesa de la Paz</h2>
    <p class="narrative-text">
      La sala del Ayuntamiento está llena como nunca. Está el concejal, los funcionarios, el ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span>, y tres representantes de clanes amigos. También hay un periodista, invitado por ti sin que nadie lo sepa.
    </p>
    <p class="narrative-text">
      Te levantas. Hablas durante veinte minutos sin que nadie te interrumpa. Expresas el caso con datos, con fechas, con testigos. La ${personajeImg('laEncarna')} <span class="narrative-char">Encarna</span> te pasa documentos que avalan cada palabra.
    </p>
    <p class="narrative-text">
      El rival intenta protestar pero el concejal le pide que se calle. Por primera vez en años, la balanza se inclina del lado del clan.
    </p>
    <p class="narrative-text">
      Al final de la reunión, se firma un acuerdo: los puestos del mercadillo se mantienen a perpetuidad. El ${GameState.clanData.enemigoPrincipal} debe pagar una multa de 50.000 euros por prácticas ilegales. Y el clan recibe una disculpa oficial del Ayuntamiento.
    </p>
    <p class="narrative-text">
      ${name}, lo has conseguido. Has ganado sin disparar una sola bala.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">💶 -30 Parné (invertidos en la negociación)</span>
      <span class="stat-change stat-up">⭐ +20 Honra</span>
      <span class="stat-change stat-up">🏛️ +20 Ayuntamiento</span>
      <span class="stat-change stat-up">😤 +15 Payos</span>
    </p>
  `);

  GameState.flags.clanRivalActivo = false;
  renderContinue('▶ Ver el epílogo', 'showEnding()');
}

// ════════════════════════════════════════
// DESENLACE 2: MOVILIZACIÓN FINAL
// ════════════════════════════════════════
function chapter5_movilizacion_final() {
  addHistory('Movilizaste a todos los clanes aliados para una demostración de fuerza definitiva.');
  modStat('honra', 25);
  modStat('alianzas', 2);
  modFaction('clanes', 25);
  modFaction('policia', -10);

  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo V — La Unión Final</div>
    <h2 class="event-title">Cuando los Clanes se Levantan</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🤝</span>
      <div class="image-overlay-text">Cien personas de cinco clanes distintos, juntos por primera vez en décadas</div>
    </div>
    <p class="narrative-text">
      Esa mañana, cien personas de cinco clanes distintos amanecen en la plaza del Ayuntamiento. No hay gritos. No hay violencia. Solo hay presencia.
    </p>
    <p class="narrative-text">
      Los clanes Romero, Montoya, Flores, Amaya y el vuestro. Todos juntos. Con sus mujeres, sus niños, sus ancianos. Una imagen que no se veía desde los tiempos de la Transición.
    </p>
    <p class="narrative-text">
      El concejal sale a la puerta, ve a la multitud, y palidece. ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span>, que estaba dentro, intenta escapar por la puerta de atrás. Dos agentes de paisano le bloquean el paso.
    </p>
    <p class="narrative-text">
      No hace falta decir nada más. El mensaje es claro: el ${GameState.clanData.nombre} no está solo. Y nunca lo ha estado.
    </p>
    <p class="narrative-text">
      Tres días después, el Ayuntamiento cancela todas las órdenes de desalojo pendientes. El rival es investigado formalmente por corrupción.
    </p>
    <p class="narrative-text">
      ${name}, has hecho historia. Los viejos cantarán esta gesta durante generaciones.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +25 Honra</span>
      <span class="stat-change stat-up">🤝 +2 Alianzas</span>
      <span class="stat-change stat-up">🔥 +25 con Otros Clanes</span>
      <span class="stat-change stat-down">👮 -10 Policía (se sintieron intimidados)</span>
    </p>
  `);

  GameState.flags.clanRivalActivo = false;
  renderContinue('▶ Ver el epílogo', 'showEnding()');
}

// ════════════════════════════════════════
// DESENLACE 3: DUELO FINAL
// ════════════════════════════════════════
function chapter5_duelo_final() {
  addHistory('Elegiste enfrentarte al rival en un duelo final. La Ley del Camino en su máxima expresión.');

  renderNarrative(`
    <div class="event-date">Capítulo V — El Duelo Final</div>
    <h2 class="event-title">La Ley Más Antigua</h2>
    <p class="narrative-text">
      Al amanecer, en la misma explanada del polígono donde todo empezó, te plantas frente a ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span>.
    </p>
    <p class="narrative-text">
      Esta vez no hay mediadores. No hay testigos. Solo la tierra húmeda, el cielo gris, y la Ley del Camino.
    </p>
    <p class="narrative-text">
      El ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te dio un abrazo antes de salir. La abuela te miró desde la puerta con esos ojos que todo lo saben. El ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> te dijo: <em>"Vuelve, ${calóWord('chabó')}."</em>
    </p>
    <p class="narrative-text">
      Ahora todo depende de ti. Que la suerte te acompañe.
    </p>
  `);

  // Configurar combate final
  const clan = GameState.clanData;
  GameState.combat = {
    playerHP: 100,
    enemyHP: 100,
    playerMaxHP: 100,
    enemyMaxHP: 100,
    round: 1,
    enemyName: clan.enemigoPrincipal,
    enemyStr: 50,
    playerStr: GameState.stats.combate,
    playerAgi: 50 + (GameState.playerRole === 'guerrero' ? 15 : 0),
    playerRep: GameState.stats.honra,
    enemyRep: 40,
    log: [],
    stamina: 100,
    resolved: false,
    isFinalBattle: true
  };

  const c = GameState.combat;
  document.getElementById('playerFighterName').textContent = GameState.playerName;
  document.getElementById('enemyFighterName').textContent = c.enemyName;
  document.getElementById('playerHP').textContent = c.playerHP;
  document.getElementById('enemyHP').textContent = c.enemyHP;
  document.getElementById('roundNum').textContent = c.round;
  document.getElementById('playerHealth').style.width = '100%';
  document.getElementById('enemyHealth').style.width = '100%';
  document.getElementById('combatTitle').textContent = '⚔️ EL DUELO FINAL';
  document.getElementById('combatSubtitle').textContent = 'Todo converge en este momento';

  const logEl = document.getElementById('combatLog');
  logEl.innerHTML = '';
  addCombatLog(`${GameState.playerName} se planta frente a ${c.enemyName}. Es el final.`);
  addCombatLog(`${pick(EXPRESIONES_GITANAS)}. El corazón late fuerte, pero los pies están firmes.`);

  showScreen('combat');
}

// Sobrescribir resolveCombat para el duelo final
const originalResolveCombat = resolveCombat;
resolveCombat = function(playerWon, type) {
  GameState.combat.resolved = true;
  const c = GameState.combat;
  const name = GameState.playerName;

  document.getElementById('combatActions').innerHTML = '';

  if (playerWon === true) {
    GameState.flags.primeraVictoriaCombate = true;
    GameState.flags.clanRivalActivo = false;
    modStat('honra', 35);
    modStat('recursos', 40);
    modFaction('clanes', 20);
    modFaction('payos', -20);
    addHistory(`Ganaste el duelo final contra ${c.enemyName}. Victoria absoluta.`);
    GameState.inventory.push('🏆 Victoria Final sobre ' + c.enemyName);

    addCombatLog(`═══════════════════════`);
    addCombatLog(`🏆 VICTORIA FINAL — ${name} ha ganado el duelo definitivo.`);

    setTimeout(() => {
      showScreen('game');
      updateStats();
      renderNarrative(`
        <div class="event-date">Duelo Final — Resultado</div>
        <h2 class="event-title">🏆 La Victoria Definitiva</h2>
        <p class="narrative-text">
          El ${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> está en el suelo. No se levanta. No dirá nada. Ya no importa.
        </p>
        <p class="narrative-text">
          Te quedas de pie, respirando fuerte. El sol asoma por el horizonte del polígono. La tierra huele a victoria.
        </p>
        <p class="narrative-text">
          Cuando vuelves al barrio, la gente te mira de otra manera. Los niños señalan. Los viejos asienten. La abuela llora en silencio, pero esta vez son lágrimas de orgullo.
        </p>
        <p class="narrative-text">
          <span class="stat-change stat-up">⭐ +35 Honra</span>
          <span class="stat-change stat-up">💶 +40 Parné</span>
          <span class="stat-change stat-up">🔥 +20 con Otros Clanes</span>
        </p>
        <p class="narrative-text">
          El ${GameState.clanData.nombre} ha demostrado quién manda en este barrio. Y el que manda eres tú.
        </p>
      `);
      renderContinue('▶ Ver el epílogo', 'showEnding()');
    }, 1500);

  } else if (playerWon === false) {
    GameState.flags.combatePerdido = true;
    GameState.flags.clanRivalActivo = false;
    modStat('honra', -30);
    modStat('miembros', -2);
    modFaction('clanes', -15);
    addHistory(`Perdiste el duelo final contra ${c.enemyName}. El clan queda marcado.`);

    addCombatLog(`═══════════════════════`);
    addCombatLog(`💀 DERROTA — ${name} ha caído en el duelo final.`);

    setTimeout(() => {
      showScreen('game');
      updateStats();
      renderNarrative(`
        <div class="event-date">Duelo Final — Derrota</div>
        <h2 class="event-title">La Caída del Clan</h2>
        <p class="narrative-text">
          El suelo está frío. La sangre te late en los oídos. El ${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> se aleja cojeando, pero ha ganado.
        </p>
        <p class="narrative-text">
          El ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te recoge. No dice nada. No hace falta. La derrota es total.
        </p>
        <p class="narrative-text">
          El clan sobrevive, pero la sombra de esta derrota os perseguirá durante años. Dos miembros se van. Los clanes aliados miran para otro lado.
        </p>
        <p class="narrative-text">
          <span class="stat-change stat-down">⭐ -30 Honra</span>
          <span class="stat-change stat-down">👥 -2 Miembros</span>
          <span class="stat-change stat-down">🔥 -15 con Otros Clanes</span>
        </p>
        <p class="narrative-text">
          Pero recuerda: un clan nunca muere del todo mientras quede alguien que recuerde su nombre.
        </p>
      `);
      renderContinue('▶ Ver el epílogo', 'showEnding()');
    }, 1500);

  } else {
    modStat('honra', 5);
    addHistory(`El duelo final terminó en empate. Las cosas quedan como estaban.`);

    addCombatLog(`═══════════════════════`);
    addCombatLog(`🤝 EMPATE — Los dos contendientes agotados.`);

    setTimeout(() => {
      showScreen('game');
      updateStats();
      renderNarrative(`
        <div class="event-date">Duelo Final — Empate</div>
        <h2 class="event-title">El Equilibrio</h2>
        <p class="narrative-text">
          Después de ocho rondas, los dos estáis exhaustos. Ninguno puede más. La tierra está removida y el sol ya está alto.
        </p>
        <p class="narrative-text">
          El empate no es victoria ni derrota. Es un equilibrio precario. Las cosas quedan como estaban, pero el rival ya sabe que no puede pisotear al clan impunemente.
        </p>
        <p class="narrative-text">
          <span class="stat-change stat-up">⭐ +5 Honra</span>
        </p>
        <p class="narrative-text">
          A veces, sobrevivir ya es ganar.
        </p>
      `);
      renderContinue('▶ Ver el epílogo', 'showEnding()');
    }, 1500);
  }
};

// ════════════════════════════════════════
// DESENLACE 4: SACRIFICIO PERSONAL
// ════════════════════════════════════════
function chapter5_sacrificio() {
  addHistory('Ofreciste un sacrificio personal para proteger al clan. Acto de liderazgo supremo.');
  modStat('recursos', -50);
  modStat('honra', 30);
  modFaction('clanes', 25);
  modFaction('payos', 10);
  GameState.flags.clanRivalActivo = false;

  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo V — El Sacrificio</div>
    <h2 class="event-title">Lo que Vale una Sangre</h2>
    <p class="narrative-text">
      Reúnes al clan en la cocina. Les explicas el plan: cederéis voluntariamente dos de los puestos del mercadillo y pagaréis una compensación de 50.000 euros. A cambio, el ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> firmará un acuerdo de no agresión y se marchará del barrio.
    </p>
    <p class="narrative-text">
      El ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> se levanta furioso. <em>"¡Eso es rendirse! ¡Es una vergüenza!"</em>
    </p>
    <p class="narrative-text">
      Le miras a los ojos. <em>"No, tío. Rendirse es perderlo todo. Esto es proteger lo que tenemos. Los puestos se pueden recuperar. Las vidas, no."</em>
    </p>
    <p class="narrative-text">
      El silencio dura una eternidad. Luego, la abuela habla por primera vez en toda la reunión: <em>"El chico tiene razón."</em>
    </p>
    <p class="narrative-text">
      El acuerdo se firma esa misma tarde. El rival se va del barrio. El clan pierde recursos, pero gana algo más valioso: la certeza de que su líder antepone el bien común a su propio orgullo.
    </p>
    <p class="narrative-text">
      Esa noche, los viejos del barrio hablan de ti. Dicen que eres un ${calóWord('juncal')} de verdad. De los que ya no quedan.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">💶 -50 Parné</span>
      <span class="stat-change stat-up">⭐ +30 Honra</span>
      <span class="stat-change stat-up">🔥 +25 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Ver el epílogo', 'showEnding()');
}

// ════════════════════════════════════════
// DESENLACE 5: FILTRACIÓN A LA PRENSA
// ════════════════════════════════════════
function chapter5_filtracion() {
  addHistory('Filtraste toda la información sucia del rival a la prensa. Victoria legal y mediática.');
  modStat('honra', 20);
  modFaction('payos', 25);
  modFaction('ayuntamiento', -15);
  modFaction('clanes', 10);
  GameState.flags.clanRivalActivo = false;

  renderNarrative(`
    <div class="event-date">Capítulo V — La Filtración</div>
    <h2 class="event-title">El Escándalo</h2>
    <p class="narrative-text">
      La información que guardaste desde el capítulo 1 por fin ve la luz. Un periodista de investigación que contactó la ${personajeImg('laEncarna')} <span class="narrative-char">Encarna</span> publica un reportaje demoledor: el ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> ha estado evadiendo impuestos durante diez años, tiene conexiones con un concejal corrupto y ha sobornado a tres inspectores municipales.
    </p>
    <p class="narrative-text">
      El escándalo estalla en los medios. Tres días después, el rival es detenido. El concejal dimite. Los puestos del mercadillo se blindan.
    </p>
    <p class="narrative-text">
      El ${GameState.clanData.nombre} no solo ha ganado. Ha limpiado el barrio de corrupción. Los vecinos payos, que siempre os miraron con desconfianza, ahora os agradecen en la calle.
    </p>
    <p class="narrative-text">
      Has usado la ley como un arma. Y ha sido devastadora.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +20 Honra</span>
      <span class="stat-change stat-up">😤 +25 Payos</span>
      <span class="stat-change stat-down">🏛️ -15 Ayuntamiento (algunos funcionarios están nerviosos)</span>
      <span class="stat-change stat-up">🔥 +10 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Ver el epílogo', 'showEnding()');
}

// ════════════════════════════════════════
// EPÍLOGO FINAL
// ════════════════════════════════════════
function showEnding() {
  GameState.chapter = 5;
  updateStats();
  const name = GameState.playerName;
  const clan = GameState.clanData;

  // Determinar tipo de final
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
      <div class="image-placeholder">
        <span class="image-placeholder-emoji">🌟</span>
        <div class="image-overlay-text">La historia de un clan que se negó a desaparecer</div>
      </div>
      <p class="narrative-text">
        Han pasado diez años. El ${clan.nombre} sigue en el mercadillo. Los puestos han crecido y ahora sois los principales comerciantes del barrio. ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> se ha casado y tiene dos críos que corren descalzos como corría él.
      </p>
      <p class="narrative-text">
        ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> se murió hace tres años, pero en paz. La ${personajeImg('laEncarna')} <span class="narrative-char">Encarna</span> terminó la carrera de Derecho y ahora defiende a los clanes en los juzgados.
      </p>
      ${GameState.flags.pedimientoAceptado ? `
      <p class="narrative-text">
        ${personajeImg('laLola')} <span class="narrative-char">La Lola</span> y su payo Alejandro tienen un bar de tapas que es el mejor del barrio. Los fines de semana hay cante y baile y ya nadie recuerda por qué aquello fue un escándalo.
      </p>
      ` : ''}
      ${GameState.flags.tomasEstaPreso ? `
      <p class="narrative-text">
        ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> sigue en Barcelona. Su negocio quebró, pero encontró trabajo honrado. Vuelve en Navidad.
      </p>
      ` : `
      <p class="narrative-text">
        ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> prosperó en Barcelona. Su empresa tiene ahora veinte empleados y ha devuelto al clan el triple de lo que invirtió. El ${personajeImg('tioAntonio')} tuvo que tragarse sus palabras.
      </p>
      `}
      <p class="narrative-text">
        ${name}, el cabeza del ${clan.nombre}. El que cogió un clan al borde del abismo y lo convirtió en leyenda.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-up">⭐ Honra Final: ${GameState.stats.honra}</span>
        <span class="stat-change stat-up">💶 Parné Final: ${GameState.stats.recursos}</span>
        <span class="stat-change stat-up">👥 Miembros: ${GameState.stats.miembros}</span>
      </p>
      <div class="ending-lesson">
        <h4>📜 Lo que Aprendiste sobre el Pueblo Gitano</h4>
        <p>• La Ley del Camino es un código de honor que protege la cohesión de los clanes.</p>
        <p>• El caló es la lengua del pueblo gitano español, mezcla del romaní antiguo con el castellano.</p>
        <p>• Los clanes gitanos han sobrevivido siglos de persecución gracias a la solidaridad interna.</p>
        <p>• El pedimiento es una de las ceremonias más antiguas y preservadas de la cultura gitana.</p>
        <p>• La unidad entre familias ha sido históricamente la herramienta más poderosa.</p>
      </div>
    `;
  } else if (endingType === 'leyenda') {
    endingHTML = `
      <div class="event-date">Epílogo — Leyenda</div>
      <h2 class="event-title">🌟 La Leyenda del Camino</h2>
      <p class="narrative-text">
        Han pasado veinte años, y en el barrio todavía cantan la seguiriya que habla de ti. De cómo ${name} del ${clan.nombre} plantó cara a todo y a todos sin perder la dignidad.
      </p>
      <p class="narrative-text">
        Los viejos te señalan a los niños: <em>"¿Ves a ese? Ese es de los que ya no quedan."</em> Tu nombre ha entrado en la historia oral del clan, esa que no se escribe pero que se recuerda siempre.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-up">⭐ Honra Final: ${GameState.stats.honra}</span>
        <span class="stat-change stat-up">🤝 Alianzas: ${GameState.stats.alianzas}</span>
      </p>
      <div class="cultural-note">
        📚 <b>Dato real:</b> Los gitanos no tenían libros, pero sí memoria. Su historia se ha transmitido oralmente de generación en generación durante más de mil años.
      </div>
    `;
  } else if (endingType === 'tragico') {
    endingHTML = `
      <div class="event-date">Epílogo — Tragedia</div>
      <h2 class="event-title">💀 El Clan que Casi Muere</h2>
      <p class="narrative-text">
        El ${clan.nombre} ha sobrevivido, pero apenas. Perdiste miembros, recursos y honra. Algunos se fueron a otros clanes. Otros simplemente desaparecieron.
      </p>
      <p class="narrative-text">
        Pero los que quedan te miran y todavía ven al líder que intentó lo imposible. Y mientras haya alguien que recuerde tu nombre, el clan no habrá muerto del todo.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-down">⭐ Honra Final: ${GameState.stats.honra}</span>
        <span class="stat-change stat-down">👥 Miembros: ${GameState.stats.miembros}</span>
      </p>
    `;
  } else if (endingType === 'sacrificio') {
    endingHTML = `
      <div class="event-date">Epílogo — Sacrificio</div>
      <h2 class="event-title">🕊️ El Precio de la Paz</h2>
      <p class="narrative-text">
        El clan es pobre pero está en paz. Cediste recursos y orgullo a cambio de tranquilidad. Algunos dicen que fue cobardía. Los que de verdad entienden la Ley del Camino saben que fue sabiduría.
      </p>
      <p class="narrative-text">
        Los niños del clan crecen sin miedo. Y eso, ${GameState.playerName}, no tiene precio.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-up">⭐ Honra Final: ${GameState.stats.honra}</span>
        <span class="stat-change stat-down">💶 Parné Final: ${GameState.stats.recursos}</span>
      </p>
    `;
  } else {
    endingHTML = `
      <div class="event-date">Epílogo</div>
      <h2 class="event-title">🌅 El Camino Sigue</h2>
      <p class="narrative-text">
        La vida continúa. El ${clan.nombre} sigue en el barrio, en el mercadillo, en la cocina donde se cuecen las decisiones. Has ganado unas batallas y perdido otras. Pero el camino no se acaba aquí.
      </p>
      <p class="narrative-text">
        Porque ser gitano no es llegar a ningún sitio. Es el camino en sí mismo.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-up">⭐ Honra Final: ${GameState.stats.honra}</span>
        <span class="stat-change stat-up">💶 Parné Final: ${GameState.stats.recursos}</span>
      </p>
    `;
  }

  endingHTML += `
    <p class="narrative-text mt-4">
      <em>"Los gitanos no tenían libros, pero sí memoria."</em>
    </p>
    <div class="d-grid gap-2 mt-4">
      <button class="btn btn-danger btn-lg" onclick="location.reload()">🔄 Volver a Jugar</button>
    </div>
    <p class="narrative-text text-center mt-3" style="font-size:0.8rem;opacity:0.5;">
      El GitanoJuego v4.0 — si eres payo no te metas, se muere mi papá
    </p>
  `;

  showScreen('game');
  renderNarrative(endingHTML);
  document.getElementById('choicesInner').innerHTML = '';
}