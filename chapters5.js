/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULO 5: EL DESENLACE v5.0
   (Original + Batalla de San Blas)
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

// ════════════════════════════════════════
// DESENLACE 1: NEGOCIACIÓN FINAL
// ════════════════════════════════════════
function chapter5_negociacion_final() {
  addHistory('Convocaste una reunión definitiva y negociaste la paz.');
  modStat('recursos', -30);
  modStat('diplomacia', 10);
  modFaction('ayuntamiento', 20);
  modFaction('payos', 15);

  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo V — La Negociación</div>
    <h2 class="event-title">La Mesa de la Paz</h2>
    <p class="narrative-text">
      La sala de la Junta está a reventar. Está el concejal, los funcionarios, ${personajeImg('chatoRuiz')} <span class="narrative-char">el Chato</span> y tres representantes de clanes amigos. También has colado a un periodista sin que nadie lo sepa.
    </p>
    <p class="narrative-text">
      Te levantas y hablas durante veinte minutos sin que nadie te interrumpa. Expresas el caso con datos, fechas, testigos. ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span> te pasa documentos que avalan cada palabra.
    </p>
    <p class="narrative-text">
      El Chato intenta protestar pero el concejal le manda callar. Por primera vez en años, la balanza se inclina de vuestro lado.
    </p>
    <p class="narrative-text">
      Al final se firma un acuerdo: los puestos del mercadillo se mantienen para siempre. El Chato debe pagar una multa de 50.000 pavos. Y el clan recibe una disculpa oficial de la Junta.
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
  addHistory('Movilizaste a todos los clanes aliados. Demostración de fuerza histórica.');
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
      Esa mañana, cien personas de cinco clanes distintos amanecen en la plaza de la Junta. Sin gritos, sin violencia. Solo presencia.
    </p>
    <p class="narrative-text">
      Los clanes Romero, Montoya, Flores, Amaya y el vuestro. Todos juntos. Con sus mujeres, sus niños, sus ancianos. Una imagen que no se veía desde los tiempos de la Transición.
    </p>
    <p class="narrative-text">
      El concejal sale a la puerta, ve a la multitud y se le baja el color. ${personajeImg('chatoRuiz')} <span class="narrative-char">El Chato</span>, que estaba dentro, intenta escapar por la puerta de atrás. Dos agentes de paisano le bloquean.
    </p>
    <p class="narrative-text">
      No hace falta decir nada. El mensaje está claro: el ${GameState.clanData.nombre} no está solo. Y nunca lo ha estado.
    </p>
    <p class="narrative-text">
      Tres días después, la Junta cancela todas las órdenes de desalojo. El Chato es investigado formalmente por corrupción.
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
  addHistory('Elegiste enfrentarte al Chato en un duelo final. La Ley del Camino en su máximo exponente.');

  renderNarrative(`
    <div class="event-date">Capítulo V — El Duelo Final</div>
    <h2 class="event-title">La Ley Más Antigua</h2>
    <p class="narrative-text">
      Al amanecer, en la misma explanada del polígono donde empezó todo, te plantas frente a ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span>.
    </p>
    <p class="narrative-text">
      Esta vez no hay mediadores. No hay testigos. Solo la tierra húmeda, el cielo gris y la Ley del Camino.
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te dio un abrazo antes de salir. La abuela te miró desde la puerta con esos ojos que todo lo saben. ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> te dijo: <em>"Vuelve, ${calóWord('chabó')}."</em>
    </p>
    <p class="narrative-text">
      Ahora todo depende de ti. Que la suerte te acompañe.
    </p>
  `);

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
    isFinalBattle: true,
    policeInterrupt: false
  };

  const c = GameState.combat;
  document.getElementById('playerFighterName').textContent = GameState.playerName;
   document.getElementById('playerFighterImg').src = GameState.personajes.jugador.img;
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
          ${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> está en el suelo. No se levanta. Ya no importa.
        </p>
        <p class="narrative-text">
          Te quedas de pie, respirando fuerte. El sol sale por el horizonte del polígono. La tierra huele a victoria.
        </p>
        <p class="narrative-text">
          Cuando vuelves a San Blas, la gente te mira de otra manera. Los chavales señalan. Los viejos asienten. La abuela llora en silencio, pero son lágrimas de orgullo.
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
    addHistory(`Perdiste el duelo final contra ${c.enemyName}. El clan queda tocado.`);

    addCombatLog(`═══════════════════════`);
    addCombatLog(`💀 DERROTA — ${name} ha caído en el duelo final.`);

    setTimeout(() => {
      showScreen('game');
      updateStats();
      renderNarrative(`
        <div class="event-date">Duelo Final — Derrota</div>
        <h2 class="event-title">La Caída del Clan</h2>
        <p class="narrative-text">
          El suelo está frío. La sangre te late en los oídos. ${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> se aleja cojeando, pero ha ganado.
        </p>
        <p class="narrative-text">
          ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te recoge. No dice nada. La derrota es total.
        </p>
        <p class="narrative-text">
          El clan sobrevive, pero la sombra de esta derrota os perseguirá años. Dos miembros se van. Los aliados miran para otro lado.
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
          Después de ocho rondas, los dos estáis reventados. Ninguno puede más. La tierra está removida y el sol ya está alto.
        </p>
        <p class="narrative-text">
          El empate no es victoria ni derrota. Es un equilibrio precario. Pero el Chato ya sabe que no puede pisotear al clan impunemente.
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
  addHistory('Ofreciste un sacrificio personal para proteger al clan.');
  modStat('recursos', -50);
  modStat('honra', 30);
  modFaction('clanes', 25);
  modFaction('payos', 10);
  GameState.flags.clanRivalActivo = false;
  GameState.flags.sacrificioRealizado = true;

  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo V — El Sacrificio</div>
    <h2 class="event-title">Lo que Vale una Sangre</h2>
    <p class="narrative-text">
      Reúnes al clan en la cocina. Les explicas el plan: cederéis voluntariamente dos de los puestos del mercadillo y pagaréis una compensación de 50.000 pavos. A cambio, ${personajeImg('chatoRuiz')} <span class="narrative-char">el Chato</span> firmará un acuerdo de no agresión y se marchará de San Blas.
    </p>
    <p class="narrative-text">
      ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> se levanta furioso: <em>"¡Eso es rendirse! ¡Menuda lache!"</em>
    </p>
    <p class="narrative-text">
      Le miras a los ojos: <em>"No, tío. Rendirse es perderlo todo. Esto es proteger lo nuestro. Los puestos se recuperan, las vidas no."</em>
    </p>
    <p class="narrative-text">
      La abuela habla por primera vez en toda la reunión: <em>"El chico tiene razón."</em>
    </p>
    <p class="narrative-text">
      El acuerdo se firma esa tarde. El Chato se va del barrio. Perdéis pasta, pero ganáis algo más valioso: la certeza de que tu líder antepone el bien común a su orgullo.
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
  addHistory('Filtraste toda la mierda del Chato a la prensa. Victoria legal y mediática.');
  modStat('honra', 20);
  modFaction('payos', 25);
  modFaction('ayuntamiento', -15);
  modFaction('clanes', 10);
  GameState.flags.clanRivalActivo = false;

  renderNarrative(`
    <div class="event-date">Capítulo V — La Filtración</div>
    <h2 class="event-title">El Escándalo</h2>
    <p class="narrative-text">
      La información que guardaste desde el principio ve la luz. Un periodista de investigación contactado por ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span> publica un reportaje demoledor: ${personajeImg('chatoRuiz')} <span class="narrative-char">el Chato</span> ha estado evadiendo impuestos diez años, tiene conexiones con un concejal corrupto y ha sobornado a inspectores municipales.
    </p>
    <p class="narrative-text">
      El escándalo estalla. Tres días después, el Chato es detenido. El concejal dimite. Los puestos se blindan.
    </p>
    <p class="narrative-text">
      El ${GameState.clanData.nombre} no solo ha ganado: ha limpiado el barrio de corrupción. Los vecinos payos, que siempre os miraron con desconfianza, ahora os dan las gracias por la calle.
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
        <div class="image-overlay-text">La historia de un clan que se negó a desaparecer en San Blas</div>
      </div>
      <p class="narrative-text">
        Han pasado diez años. El ${clan.nombre} sigue en el mercadillo. Los puestos han crecido y ahora sois los principales comerciantes del barrio. ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> se ha casado y tiene dos críos que corren descalzos como corría él.
      </p>
      <p class="narrative-text">
        ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> se murió hace tres años, pero en paz. ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span> terminó Derecho y ahora defiende a los clanes en los juzgados.
      </p>
      ${GameState.flags.pedimientoAceptado ? `
      <p class="narrative-text">
        ${personajeImg('laLola')} <span class="narrative-char">La Lola</span> y su payo Alejandro tienen un bar de tapas que es el mejor de San Blas. Los fines de semana hay cante y ya nadie recuerda por qué aquello fue un escándalo.
      </p>
      ` : ''}
      ${GameState.flags.embarazoLola ? `
      <p class="narrative-text">
        👶 El pequeño Antonio, el primer gitano-payo del clan, ya tiene nueve años y promete ser cantaor como su bisabuelo Camarón. La abuela dice que ha heredado el duende.
      </p>
      ` : ''}
      ${GameState.flags.tomasEstaPreso ? `
      <p class="narrative-text">
        ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> sigue en Barcelona. Su negocio quebró, pero encontró curro honrado. Vuelve por Navidad.
      </p>
      ` : `
      <p class="narrative-text">
        ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> prosperó en Barcelona. Su empresa tiene ahora veinte empleados y ha devuelto al clan el triple de lo invertido. El tío Antonio tuvo que tragarse sus palabras.
      </p>
      `}
      <p class="narrative-text">
        ${name}, el cabeza del ${clan.nombre}. El que cogió un clan al borde del abismo y lo convirtió en leyenda de San Blas.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-up">⭐ Honra Final: ${GameState.stats.honra}</span>
        <span class="stat-change stat-up">💶 Parné Final: ${GameState.stats.recursos}</span>
        <span class="stat-change stat-up">👥 Miembros: ${GameState.stats.miembros}</span>
      </p>
    `;
  } else if (endingType === 'leyenda') {
    endingHTML = `
      <div class="event-date">Epílogo — Leyenda</div>
      <h2 class="event-title">🌟 La Leyenda del Camino</h2>
      <p class="narrative-text">
        Han pasado veinte años, y en San Blas todavía cantan la seguiriya que habla de ti. De cómo ${name} del ${clan.nombre} plantó cara a todo y a todos sin perder la dignidad.
      </p>
      <p class="narrative-text">
        Los viejos te señalan a los chavales: <em>"¿Ves a ese? Ese es de los que ya no quedan."</em> Tu nombre ha entrado en la historia oral del clan, esa que no se escribe pero que se recuerda siempre.
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
        El ${clan.nombre} ha sobrevivido, pero apenas. Perdiste miembros, parné y honra. Algunos se fueron a otros clanes. Otros simplemente desaparecieron.
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
        El clan es pobre pero está en paz. Cediste pasta y orgullo a cambio de tranquilidad. Algunos dicen que fue cobardía. Los que entienden la Ley del Camino saben que fue sabiduría.
      </p>
      <p class="narrative-text">
        Los niños del clan crecen sin miedo. Y eso, ${name}, no tiene precio.
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
  `;

  showScreen('game');
  renderNarrative(endingHTML);
    // Mostrar botón para continuar hacia la batalla final en lugar de un setTimeout silencioso
  document.getElementById('choicesInner').innerHTML = `
    <div class="text-center mt-3">
      <p class="narrative-text text-gold fw-bold animate__animated animate__pulse animate__infinite">
        ⚡ La historia no ha terminado...
      </p>
      <button class="btn btn-danger btn-lg animate__animated animate__fadeInUp" onclick="startFinalBattleEvent()">
        🔥 Continuar hacia la batalla final
      </button>
    </div>
  `;
}

// ════════════════════════════════════════
// BATALLA DE SAN BLAS (evento final)
// ════════════════════════════════════════
function startFinalBattleEvent() {
  const name = GameState.playerName;
  const clan = GameState.clanData;
  const chatoVivo = !GameState.flags.combatePerdido || GameState.flags.primeraVictoriaCombate;
  const villano = chatoVivo ? 'El Chato Ruiz' : 'El Ingeniero';

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
      Los clanes aliados empiezan a llegar. La abuela se sienta en su silla justo delante de la primera excavadora. Se hace el silencio. La tensión es tan densa que se puede mascar.
    </p>
    <p class="narrative-text">
      El jefe de la inmobiliaria, un payo con traje y casco que se hace llamar <span class="narrative-char">"El Ingeniero"</span>, se ríe: <em>"Esto es progreso, amigo. No se puede frenar el futuro con faldas y palmas."</em>
    </p>
    <p class="narrative-text">
      Tú te plantas delante de él. Le sostienes la mirada. La gente contiene la respiración.
    </p>
  `);

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
      ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span> sale de entre la multitud. Lleva días recopilando documentos en secreto. <em>"No vamos a dejar que nos pisen, ${name}."</em>
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

  GameState.flags.batallaSanBlasGanada = true;
  GameState.inventory.push('🏆 Batalla de San Blas ganada');

  renderContinue('▶ Ir al Capítulo VI', 'startChapter6()');
}
