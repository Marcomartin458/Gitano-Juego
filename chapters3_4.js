/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULOS 3 y 4 v5.0 (San Blas Edition)
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// CAPÍTULO 3: LA FAMILIA
// ════════════════════════════════════════
function startChapter3() {
  saveCurrentState();
  GameState.chapter = 3;
  updateStats();
  const clan = GameState.clanData;
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo III — La Familia</div>
    <h2 class="event-title">Lo que Viene de Dentro</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">👨‍👩‍👧‍👦</span>
      <div class="image-overlay-text">La familia reunida en la cocina del bloque de San Blas</div>
    </div>
    <p class="narrative-text">
      Dos meses después de todo el follón del mercadillo, las cosas han vuelto a una calma tensa. Pero en el clan hay una conversación que no puede esperar más.
    </p>
    <p class="narrative-text">
      ${personajeImg('viejoCurro')} <span class="narrative-char">El Viejo Curro</span> está peor. Los médicos ya no hablan de "cosa del pecho" sino de palabras más serias. Hay que pensar en el futuro del clan cuando el patriarca ya no esté.
    </p>
    <p class="narrative-text">
      Y entonces llega ${personajeImg('tomas')} <span class="narrative-char">Tomás</span>, tu hermano mayor, que llevaba tres años currando en Barcelona. Trae noticias: le han ofrecido un negocio importante en el barrio de Gràcia. Necesita inversión del clan. <span class="narrative-danger">30.000 pavos.</span>
    </p>
    <p class="narrative-text">
      La familia está dividida. ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> dice que es un sueño de ${calóWord('gili')}. ${personajeImg('laLola')} <span class="narrative-char">La Lola</span> dice que hay que apoyar a la sangre. La abuela no habla pero te mira fijamente.
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter3_apoyar_tomas(),
    () => chapter3_negar_tomas(),
    () => chapter3_mitad_tomas(),
  ];

  renderChoices([
    {
      text: '💶 Invertir los 30.000€ del clan en el negocio de tu hermano Tomás.',
      hint: 'Alto riesgo. Puede multiplicar el parné o dejarte a dos velas.',
      danger: GameState.stats.recursos < 80
    },
    {
      text: '❌ Negarte. El dinero del clan se queda en el clan, y punto.',
      hint: 'Tomás puede largarse enfadado. +Estabilidad.',
    },
    {
      text: '🤝 Darle 10.000€ y apoyo moral. Ni todo ni nada.',
      hint: 'Equilibrio. Contentas a la familia, proteges los recursos.',
      good: true
    }
  ]);
}

function chapter3_apoyar_tomas() {
  if (GameState.stats.recursos < 30) {
    showNotification('No tienes suficiente parné, makina.', 'bad');
    currentChoiceHandlers[2](); return;
  }
  addHistory('Invertiste 30.000€ en el negocio de Tomás. Apuesta arriesgada.');
  modStat('recursos', -30);
  modStat('honra', 5);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Apuesta</div>
    <h2 class="event-title">La Sangre Tira</h2>
    <p class="narrative-text">
      <em>"Tomás, eres mi hermano. El clan invierte en los suyos. Toma la pasta, ponla a currar, y cuando vuelvas nos la devuelves con lo que Dios quiera."</em>
    </p>
    <p class="narrative-text">
      ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> te abraza. ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> sale refunfuñando al balcón. La abuela asiente muy despacio.
    </p>
    <p class="narrative-text">
      Dos meses después llegan noticias: el negocio ha arrancado bien. Tomás manda 5.000 de vuelta como primer pago. Dice que en seis meses liquida el resto con intereses.
    </p>
    <p class="narrative-text">
      Pero también te enteras de otra cosa: en el barrio han detenido a tres chavales del Clan Romero por una pelea que no provocaron ellos. La pasma está que arde.
      <span class="stat-change stat-down">💶 -30 Parné</span>
      <span class="stat-change stat-up">⭐ +5 Honra (lealtad familiar)</span>
      <span class="stat-change stat-up">💶 +5 Parné (primer retorno)</span>
    </p>
  `);
  // REINICIO CAPÍTULO 3: si la inversión te deja sin blanca, el clan colapsa
  if (GameState.stats.recursos < 10) {
    renderNarrative(`
      <div class="event-date">Capítulo III — Inversión fallida</div>
      <h2 class="event-title">Arruinados</h2>
      <p class="narrative-text">
        El negocio de Tomás ha sido un desastre. Te confirma por teléfono que lo ha perdido todo. El clan se queda sin recursos y sin capacidad de reacción.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">EL CLAN SE HA DISUELTO POR BANCARROTA. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo III', 'restartChapter3()');
    return;
  }
  renderContinue('▶ Continuar — La Lola y su amor prohibido', 'startRomanceLola()');
}

function chapter3_negar_tomas() {
  addHistory('Negaste la inversión a Tomás. Prioridad: estabilidad del clan.');
  modStat('honra', -5);
  modFaction('clanes', -5);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Negativa</div>
    <h2 class="event-title">El Deber Antes que Todo</h2>
    <p class="narrative-text">
      <em>"Tomás, eres mi hermano y te quiero. Pero la pasta del clan es de todos, no solo nuestra. Si la pierdo, ¿qué le digo a la abuela? ¿A los críos? No puedo."</em>
    </p>
    <p class="narrative-text">
      ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> no dice nada. Coge la bolsa y se pira. Tres semanas después, te enteras de que encontró inversión en otro lado, con alguien que no es de la familia. Eso duele más que un puñetazo.
    </p>
    <p class="narrative-text">
      Pero el clan está estable. Y la abuela te aprieta la mano esa noche con algo que parece aprobación.
      <span class="stat-change stat-down">⭐ -5 Honra (pareces frío)</span>
    </p>
    <p class="narrative-text">
      <em>Años después recordarás esta decisión. Y aún no sabrás si fue la correcta.</em>
    </p>
  `);

  GameState.flags.tomasEstaPreso = false;
  renderContinue('▶ Continuar — La Lola y su amor prohibido', 'startRomanceLola()');
}

function chapter3_mitad_tomas() {
  addHistory('Diste apoyo parcial a Tomás. Decisión salomónica.');
  modStat('recursos', -10);
  modStat('honra', 8);

  renderNarrative(`
    <div class="event-date">Capítulo III — El Equilibrio</div>
    <h2 class="event-title">Lo que Puede Dar el Clan</h2>
    <p class="narrative-text">
      <em>"Tomás, el clan no puede jugárselo todo a una carta. Pero tampoco te voy a dejar tirado. Toma diez mil. Con eso demuestras que el negocio funciona, y luego hablamos de más."</em>
    </p>
    <p class="narrative-text">
      ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> entiende. No es lo que quería, pero es respeto. Se va con la pasta y la bendición de la familia.
    </p>
    <p class="narrative-text">
      ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span>, por primera vez en semanas, te da una palmada en el hombro.
      <span class="stat-change stat-down">💶 -10 Parné</span>
      <span class="stat-change stat-up">⭐ +8 Honra</span>
    </p>
  `);

  renderContinue('▶ Continuar — La Lola y su amor prohibido', 'startRomanceLola()');
}

// ════════════════════════════════════════
// CAPÍTULO 3 (continuación): BARRIO TENSO
// ════════════════════════════════════════
function chapter3_barrio_tenso() {
  updateStats();
  renderNarrative(`
    <div class="event-date">Capítulo III — El Barrio</div>
    <h2 class="event-title">Los Nuevos Vecinos</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🏘️</span>
      <div class="image-overlay-text">San Blas está cambiando. Pisos nuevos, caras nuevas, tensión nueva.</div>
    </div>
    <p class="narrative-text">
      El barrio está cambiando rápido. La gentrificación llega también a San Blas. Nuevos bloques con portero automático. Un café donde cobran cuatro euros por un cortado. Vecinos nuevos que te miran mal si aparcas en la acera.
    </p>
    <p class="narrative-text">
      Una noche, ${personajeImg('agenteTorres')} <span class="narrative-char">el agente Torres</span> aparece con tres coches patrulla. No es por nada vuestro directamente. Un vecino nuevo ha denunciado <em>"ruidos molestos y actividad sospechosa"</em>. La denuncia os nombra.
    </p>
    <p class="narrative-text">
      Torres entra en la cocina del clan con esa cara de siempre. Esta vez trae un papel con sellos del juzgado.
    </p>
    <p class="narrative-text">
      <em>"Hay una orden de investigación. De momento es solo eso. Pero si encontramos algo..."</em>
    </p>
    ${GameState.flags.pegastePolicia ? `
    <p class="narrative-text">
      <span class="narrative-danger">⚠️ Torres te mira especialmente a ti. El incidente del mercadillo sigue en su memoria.</span>
    </p>
    ` : ''}
    <div class="cultural-note">
      📚 <b>Dato real:</b> Las denuncias por "actividad sospechosa" contra comunidades gitanas han sido documentadas por la Comisión Europea contra el Racismo e Intolerancia como forma de acoso institucional.
    </div>
  `);

  currentChoiceHandlers = [
    () => chapter3_cooperar_policia(),
    () => chapter3_resistir_policia(),
    () => chapter3_abogado(),
  ];

  renderChoices([
    {
      text: '🤝 Cooperar con Torres. Enseñarle que no tenéis nada que ocultar.',
      hint: GameState.flags.pegastePolicia
        ? '+Relación con la pasma (difícil por tu historial).'
        : '+15 Relación pasma. Torres puede ser un aliado.',
      good: !GameState.flags.pegastePolicia
    },
    {
      text: '😠 Negarte a cualquier registro sin orden judicial completa.',
      hint: 'Legal, pero Torres se lo tomará a mal.',
      danger: true
    },
    {
      text: '⚖️ Llamar a un abogado antes de decir ni mu.',
      hint: 'Cuesta pasta pero es la jugada inteligente.',
    }
  ]);
}

function chapter3_cooperar_policia() {
  const basePenalty = GameState.flags.pegastePolicia ? -5 : 15;
  addHistory('Cooperaste con la pasma durante la investigación.');
  modFaction('policia', basePenalty);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Cooperación</div>
    <h2 class="event-title">La Apertura de Puertas</h2>
    <p class="narrative-text">
      <em>"Torres, pasa. Aquí no hay nada raro. Somos una familia, no una banda."</em>
    </p>
    <p class="narrative-text">
      Los agentes recorren la casa. Encuentran lo de siempre: ropa, comida, facturas, fotos en la pared. ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span>, al final, parece casi incómodo.
    </p>
    ${GameState.flags.pegastePolicia ? `
    <p class="narrative-text">
      Torres te mira antes de salir: <em>"La próxima vez que haya follón en el mercadillo, no voy a ser tan comprensivo."</em> La cooperación suaviza el problema, pero no lo borra.
      <span class="stat-change stat-up">👮 +${basePenalty} Policía (pequeña mejora)</span>
    </p>
    ` : `
    <p class="narrative-text">
      Al salir, Torres te para: <em>"Oye, aquí no hay nada. Cerramos el expediente. La denuncia viene de ese vecino nuevo, el del perro salchicha. Sabemos cómo va esto."</em>
      <span class="stat-change stat-up">👮 +15 Policía</span>
    </p>
    `}
  `);

  renderContinue('▶ Continuar al Capítulo IV', 'startChapter4()');
}

function chapter3_resistir_policia() {
  addHistory('Te negaste al registro sin orden judicial completa.');
  modFaction('policia', -20);
  modStat('honra', 8);
     // REINICIO CAPÍTULO 3: si la pasma te declara enemigo, vienen a por ti
  if (GameState.factions.policia < 10) {
    renderNarrative(`
      <div class="event-date">Capítulo III — Redada</div>
      <h2 class="event-title">Todos detenidos</h2>
      <p class="narrative-text">
        Haber cerrado la puerta a Torres ha tenido consecuencias. Esa misma noche, un operativo especial entra en el bloque. Os detienen a todos por "asociación ilícita".
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">EL CLAN HA SIDO DESARTICULADO POR LA POLICÍA. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo III', 'restartChapter3()');
    return;
  }

  renderNarrative(`
    <div class="event-date">Capítulo III — La Resistencia Legal</div>
    <h2 class="event-title">La Ley que También Nos Ampara</h2>
    <p class="narrative-text">
      <em>"Torres, con todo el respeto: sin orden de registro firmada por un juez, aquí no entra nadie. Es la ley, la misma que tú aplicas."</em>
    </p>
    <p class="narrative-text">
      ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span> te mira largo rato. Cierra la libreta. Se va.
    </p>
    <p class="narrative-text">
      Tres días después llega la orden judicial. Os registran igual. Pero en esos tres días habéis llamado a un abogado y estáis preparados.
    </p>
    <p class="narrative-text">
      No encuentran nada. Porque no hay nada.
      <span class="stat-change stat-down">👮 -20 Policía (Torres no olvida)</span>
      <span class="stat-change stat-up">⭐ +8 Honra (conoces tus derechos)</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo IV', 'startChapter4()');
}

function chapter3_abogado() {
  if (GameState.stats.recursos < 20) {
    showNotification('No tienes suficiente parné para el abogado, makina.', 'bad');
    return;
  }
  addHistory('Contrataste un abogado para gestionar la investigación.');
  modStat('recursos', -20);
  modFaction('policia', 5);
  modFaction('ayuntamiento', 10);

  renderNarrative(`
    <div class="event-date">Capítulo III — El Abogado</div>
    <h2 class="event-title">La Ley en el Bolsillo</h2>
    <p class="narrative-text">
      <em>"Torres, mi abogado estará presente antes de cualquier conversación."</em>
    </p>
    <p class="narrative-text">
      El abogado llega en veinte minutos. Un tipo joven pero con cara de sabérselas todas. Habla con ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span> en el pasillo diez minutos. Cuando vuelve, la investigación queda "en revisión".
    </p>
    <p class="narrative-text">
      Semana y media después, el expediente se cierra. La denuncia del vecino no tenía base legal.
      <span class="stat-change stat-down">💶 -20 Parné</span>
      <span class="stat-change stat-up">👮 +5 Policía</span>
      <span class="stat-change stat-up">🏛️ +10 Ayuntamiento</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo IV', 'startChapter4()');
}

// ════════════════════════════════════════
// CAPÍTULO 4: LA CRISIS
// ════════════════════════════════════════
function startChapter4() {
  saveCurrentState();
  GameState.chapter = 4;
  updateStats();

  const enCrisis = GameState.stats.honra < 35;

  renderNarrative(`
    <div class="event-date">Capítulo IV — La Crisis</div>
    <h2 class="event-title">${enCrisis ? 'El Clan en la Cuerda Floja' : 'Cuando Todo se Pone a Prueba'}</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🌩️</span>
      <div class="image-overlay-text">Las noches que definen a los clanes en San Blas</div>
    </div>
    <p class="narrative-text">
      ${personajeImg('viejoCurro')} <span class="narrative-char">El Viejo Curro</span> ha muerto.
    </p>
    <p class="narrative-text">
      No fue de golpe. Fue poco a poco, como las cosas importantes. El velatorio duró dos días. Vinieron gentes de cinco clanes, de todo Madrid, a darle el último adiós. Cantaron ${calóWord('duquelas')} hasta que amaneció.
    </p>
    <p class="narrative-text">
      Ahora el clan está sin patriarca. Tú eres el referente. El peso que antes compartías es solo tuyo.
    </p>
    <p class="narrative-text">
      Y justo ahora llega el golpe más duro: ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span>, aprovechando el momento de luto, ha conseguido que la Junta emita una orden de <span class="narrative-danger">desalojo del mercadillo completo</span>. En treinta días.
    </p>
    ${enCrisis ? `
    <p class="narrative-text">
      <span class="narrative-danger">⚠️ El clan está en crisis de Honra. Hay miembros que se plantean largarse. Si no recuperas terreno este capítulo, el clan puede disolverse.</span>
    </p>
    ` : `
    <p class="narrative-text">
      El clan confía en ti. Pero nunca os habíais enfrentado a algo tan gordo. Hay que actuar en tres frentes a la vez.
    </p>
    `}
  `);

  renderContinue('▶ Continuar — La Gran Decisión', 'chapter4_gran_decision()');
}

function chapter4_gran_decision() {
  const tieneAliados = GameState.stats.alianzas > 0;
  const tieneParné = GameState.stats.recursos >= 50;
  const tieneHonra = GameState.stats.honra >= 60;

  renderNarrative(`
    <div class="event-date">Capítulo IV — La Respuesta</div>
    <h2 class="event-title">El Plan del Clan</h2>
    <p class="narrative-text">
      Treinta días. En la cocina, con todos reunidos, tenéis que decidir el plan. No hay opción perfecta. Hay que elegir dónde poner los huevos.
    </p>
    ${tieneAliados ? `<p class="narrative-text"><span class="narrative-good">✅ Tienes aliados. Los clanes amigos refuerzan tu posición.</span></p>` : ''}
    ${tieneParné ? `<p class="narrative-text"><span class="narrative-good">✅ Tienes parné suficiente para luchar legalmente.</span></p>` : '<p class="narrative-text"><span class="narrative-danger">⚠️ Estás tieso. Las opciones económicas están limitadas.</span></p>'}
    ${tieneHonra ? `<p class="narrative-text"><span class="narrative-good">✅ Tu Honra es alta. El clan te sigue sin dudar.</span></p>` : ''}
  `);

  const choices = [];
  const handlers = [];

  choices.push({
    text: '⚖️ Luchar legalmente: contratar abogado, apelar la orden, montar ruido mediático.',
    hint: 'Cuesta 40 pavos. Puede funcionar si tienes apoyo político.',
    good: tieneParné
  });
  handlers.push(() => chapter4_lucha_legal());

  if (tieneAliados) {
    choices.push({
      text: '🤝 Movilizar a todos los clanes aliados. Presión colectiva en la Junta.',
      hint: 'Requiere alianzas activas. Alta probabilidad de éxito.',
      good: true
    });
    handlers.push(() => chapter4_movilizacion_clanes());
  } else {
    choices.push({
      text: '📢 Llamar a los medios y hacer viral el caso del desalojo.',
      hint: 'Sin coste. Arriesgado. Puede salir muy bien o muy mal.',
    });
    handlers.push(() => chapter4_medios());
  }

  choices.push({
    text: '🔥 Resistencia: no nos movemos aunque vengan con la pasma.',
    hint: 'Desobediencia civil. Alto riesgo personal. Alta Honra si funciona.',
    danger: true
  });
  handlers.push(() => chapter4_resistencia());

  currentChoiceHandlers = handlers;
  renderChoices(choices);
}

function chapter4_lucha_legal() {
  if (GameState.stats.recursos < 40) {
    showNotification('No tienes suficiente parné. Necesitas 40.', 'bad');
    return;
  }
  addHistory('Luchaste legalmente contra el desalojo del mercadillo.');
  modStat('recursos', -40);

  const exito = rand(1, 10) <= (GameState.factions.ayuntamiento > 50 ? 8 : 5);

  if (exito) {
    modStat('honra', 20);
    modStat('recursos', 20);
    modFaction('ayuntamiento', 15);

    renderNarrative(`
      <div class="event-date">Capítulo IV — Victoria Legal</div>
      <h2 class="event-title">La Ley que Funciona</h2>
      <p class="narrative-text">
        Veintiocho días de peleas burocráticas. Recursos, apelaciones, informes. La abogada, una tía de Almería que ha ganado tres casos iguales, curra sin parar.
      </p>
      <p class="narrative-text">
        El día veintinueve, el juez paraliza la orden de desalojo. Hay irregularidades en el procedimiento. La Junta tiene que volver a empezar.
      </p>
      <p class="narrative-text">
        ${personajeImg('chatoRuiz')} <span class="narrative-char">El Chato</span> pierde la primera batalla. No la guerra, pero la primera batalla.
        <span class="stat-change stat-up">⭐ +20 Honra</span>
        <span class="stat-change stat-up">💶 +20 Parné (costas del juicio)</span>
        <span class="stat-change stat-up">🏛️ +15 Ayuntamiento</span>
      </p>
    `);
  } else {
    modStat('honra', -5);

    renderNarrative(`
      <div class="event-date">Capítulo IV — Derrota Legal</div>
      <h2 class="event-title">El Sistema</h2>
      <p class="narrative-text">
        La orden se confirma. El procedimiento era formalmente correcto aunque fuera injusto.
      </p>
      <p class="narrative-text">
        La abogada lo explica: <em>"No han hecho nada ilegal. Han usado la ley como permite ser usada. Podemos apelar, pero..."</em>
      </p>
      <p class="narrative-text">
        Hay que buscar otra manera.
        <span class="stat-change stat-down">💶 -40 Parné (sin retorno)</span>
        <span class="stat-change stat-down">⭐ -5 Honra</span>
      </p>
    `);
  }
  // REINICIO CAPÍTULO 4: si el clan se desmorona por baja Honra o falta de miembros
  if (GameState.stats.honra <= 0 || GameState.stats.miembros < 5) {
    renderNarrative(`
      <div class="event-date">Capítulo IV — Desintegración</div>
      <h2 class="event-title">El fin del clan</h2>
      <p class="narrative-text">
        A pesar de tus esfuerzos, el clan ya no puede mantenerse en pie. Los miembros restantes se dispersan en otros clanes o simplemente desaparecen. La historia de los ${GameState.clanData.nombre} termina aquí.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">EL CLAN SE HA EXTINGUIDO. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo IV', 'restartChapter4()');
    return;
  }
  renderContinue('▶ Continuar al Capítulo V — El Desenlace', 'startChapter5()');
}

function chapter4_movilizacion_clanes() {
  addHistory('Movilizaste a los clanes aliados para presionar contra el desalojo.');
  modStat('honra', 25);
  modStat('alianzas', 1);
  modFaction('clanes', 20);
  modFaction('ayuntamiento', 10);

  renderNarrative(`
    <div class="event-date">Capítulo IV — La Unión</div>
    <h2 class="event-title">Cuando los Clanes se Juntan</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🤝</span>
      <div class="image-overlay-text">Representantes de cinco clanes en la plaza de la Junta</div>
    </div>
    <p class="narrative-text">
      En tres días reúnes a representantes de cuatro clanes. El Romero, el Montoya, el Flores y el vuestro. En la historia de San Blas, esto no se veía en veinte años.
    </p>
    <p class="narrative-text">
      Cuarenta personas delante de la Junta Municipal. Sin follón, solo presencia. El Rafaelillo Montoya habla en nombre de todos con una dignidad que flipas.
    </p>
    <p class="narrative-text">
      El concejal sale a hablar. Ve a cuarenta gitanos con sus representantes, documentos y dos abogados. Revisa la orden. En tres días la paraliza.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +25 Honra</span>
      <span class="stat-change stat-up">🤝 +1 Alianza</span>
      <span class="stat-change stat-up">🔥 +20 con Otros Clanes</span>
      <span class="stat-change stat-up">🏛️ +10 Ayuntamiento</span>
    </p>
  `);
  // REINICIO CAPÍTULO 4: si el clan se desmorona por baja Honra o falta de miembros
  if (GameState.stats.honra <= 0 || GameState.stats.miembros < 5) {
    renderNarrative(`
      <div class="event-date">Capítulo IV — Desintegración</div>
      <h2 class="event-title">El fin del clan</h2>
      <p class="narrative-text">
        A pesar de tus esfuerzos, el clan ya no puede mantenerse en pie. Los miembros restantes se dispersan en otros clanes o simplemente desaparecen. La historia de los ${GameState.clanData.nombre} termina aquí.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">EL CLAN SE HA EXTINGUIDO. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo IV', 'restartChapter4()');
    return;
  }
  renderContinue('▶ Continuar al Capítulo V — El Desenlace', 'startChapter5()');
}

function chapter4_medios() {
  addHistory('Llamaste a los medios para hacer viral el caso del desalojo.');
  const exito = rand(1, 10) <= 6;

  if (exito) {
    modStat('honra', 15);
    modFaction('payos', 20);
    modFaction('ayuntamiento', -10);

    renderNarrative(`
      <div class="event-date">Capítulo IV — Viral</div>
      <h2 class="event-title">El Mundo Mirando</h2>
      <p class="narrative-text">
        Una periodista de un digital hace el artículo. Se hace viral en Twitter. Quince mil retuits. "La Junta de San Blas desaloja a una familia gitana en pleno luto".
      </p>
      <p class="narrative-text">
        El concejal recibe cien llamadas. Tres días después: la orden se suspende "para revisión".
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-up">⭐ +15 Honra</span>
        <span class="stat-change stat-up">😤 +20 Payos (simpatía del público)</span>
        <span class="stat-change stat-down">🏛️ -10 Ayuntamiento (no les gustó la presión)</span>
      </p>
    `);
  } else {
    modStat('honra', -10);
    modFaction('policia', -10);

    renderNarrative(`
      <div class="event-date">Capítulo IV — El Tiro por la Culata</div>
      <h2 class="event-title">La Historia Mal Contada</h2>
      <p class="narrative-text">
        La periodista escribe el artículo pero lo enfoca fatal. Habla de "conflicto en zona conflictiva". Los comentarios en redes son una basura.
      </p>
      <p class="narrative-text">
        La presión mediática sale mal. Ahora hay más atención policial en el barrio.
        <span class="stat-change stat-down">⭐ -10 Honra</span>
        <span class="stat-change stat-down">👮 -10 Policía</span>
      </p>
    `);
  }
  // REINICIO CAPÍTULO 4: si el clan se desmorona por baja Honra o falta de miembros
  if (GameState.stats.honra <= 0 || GameState.stats.miembros < 5) {
    renderNarrative(`
      <div class="event-date">Capítulo IV — Desintegración</div>
      <h2 class="event-title">El fin del clan</h2>
      <p class="narrative-text">
        A pesar de tus esfuerzos, el clan ya no puede mantenerse en pie. Los miembros restantes se dispersan en otros clanes o simplemente desaparecen. La historia de los ${GameState.clanData.nombre} termina aquí.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">EL CLAN SE HA EXTINGUIDO. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo IV', 'restartChapter4()');
    return;
  }
  renderContinue('▶ Continuar al Capítulo V — El Desenlace', 'startChapter5()');
}

function chapter4_resistencia() {
  addHistory('Elegiste la resistencia: no os moveréis del mercadillo pase lo que pase.');
  modStat('honra', 20);
  modFaction('policia', -25);
  modFaction('ayuntamiento', -20);
  GameState.flags.pegastePolicia = GameState.flags.pegastePolicia || false;

  renderNarrative(`
    <div class="event-date">Capítulo IV — La Resistencia</div>
    <h2 class="event-title">Aquí No Nos Movemos</h2>
    <p class="narrative-text">
      El día del desalojo, el clan entero está en los puestos. La abuela sentada en su silla de siempre. Los críos jugando. Todo igual que siempre.
    </p>
    <p class="narrative-text">
      Llegan seis agentes. ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span> al frente. Os miran. Ven a quince personas, una anciana, tres niños.
    </p>
    <p class="narrative-text">
      Torres habla por el walkie. Espera. Vuelve a hablar. Después de un cuarto de hora, la unidad se retira. La orden se paraliza "por razones humanitarias".
    </p>
    <p class="narrative-text">
      No es una victoria legal, pero es una victoria de dignidad.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +20 Honra</span>
      <span class="stat-change stat-down">👮 -25 Policía (Torres está quemado contigo)</span>
      <span class="stat-change stat-down">🏛️ -20 Ayuntamiento</span>
    </p>
    <p class="narrative-text">
      Pero todo el barrio lo ha visto. Y nadie lo va a olvidar.
    </p>
  `);
  // REINICIO CAPÍTULO 4: si el clan se desmorona por baja Honra o falta de miembros
  if (GameState.stats.honra <= 0 || GameState.stats.miembros < 5) {
    renderNarrative(`
      <div class="event-date">Capítulo IV — Desintegración</div>
      <h2 class="event-title">El fin del clan</h2>
      <p class="narrative-text">
        A pesar de tus esfuerzos, el clan ya no puede mantenerse en pie. Los miembros restantes se dispersan en otros clanes o simplemente desaparecen. La historia de los ${GameState.clanData.nombre} termina aquí.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">EL CLAN SE HA EXTINGUIDO. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo IV', 'restartChapter4()');
    return;
  }
  renderContinue('▶ Continuar al Capítulo V — El Desenlace', 'startChapter5()');
}
function restartChapter3() {
  restoreCurrentState();
  startChapter3();
}

function restartChapter4() {
  restoreCurrentState();
  startChapter4();
}
