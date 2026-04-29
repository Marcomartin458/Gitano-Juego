/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULOS 3 y 4 v4.0
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// CAPÍTULO 3: LA FAMILIA
// ════════════════════════════════════════
function startChapter3() {
  GameState.chapter = 3;
  updateStats();
  const clan = GameState.clanData;
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo III — La Familia</div>
    <h2 class="event-title">Lo que Viene de Dentro</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">👨‍👩‍👧‍👦</span>
      <div class="image-overlay-text">La familia reunida. La cocina que lo aguanta todo.</div>
    </div>
    <p class="narrative-text">
      Dos meses después de todo lo del mercadillo, las cosas han vuelto a un ritmo que se parece a la normalidad. Pero en el clan hay una conversación que no puede esperar más.
    </p>
    <p class="narrative-text">
      El ${personajeImg('viejoCurro')} <span class="narrative-char">Viejo Curro</span> está peor. Los médicos ya no hablan de "cosa del pecho" sino de palabras más serias. Hay que pensar en el futuro del clan cuando el patriarca ya no esté.
    </p>
    <p class="narrative-text">
      Y entonces llega el ${personajeImg('tomas')} <span class="narrative-char">Tomás</span>, tu hermano mayor, que llevaba tres años trabajando en Cataluña. Llega con noticias: le han ofrecido una oportunidad de negocio importante en Barcelona. Necesita la inversión del clan. <span class="narrative-danger">30.000 euros.</span>
    </p>
    <p class="narrative-text">
      La familia tiene opiniones divididas. Tu ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> dice que es un sueño de ${calóWord('gili')}. Tu prima ${personajeImg('laLola')} <span class="narrative-char">Lola</span> dice que hay que apoyar a la sangre. La abuela no habla pero te mira.
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
      hint: 'Alto riesgo. Puede multiplicar recursos o hundirlos.',
      danger: GameState.stats.recursos < 80
    },
    {
      text: '❌ Negarte. El dinero del clan se queda en el clan, siempre.',
      hint: 'El hermano puede marcharse resentido. +Estabilidad.',
    },
    {
      text: '🤝 Ofrecer 10.000€ y apoyo moral. No todo pero tampoco nada.',
      hint: 'Equilibrio. Satisface a la familia, protege los recursos.',
      good: true
    }
  ]);
}

function chapter3_apoyar_tomas() {
  if (GameState.stats.recursos < 30) {
    showNotification('No tienes suficiente parné para esto.', 'bad');
    currentChoiceHandlers[2](); return;
  }
  addHistory('Invertiste 30.000€ en el negocio de Tomás. Apuesta arriesgada.');
  modStat('recursos', -30);
  modStat('honra', 5);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Apuesta</div>
    <h2 class="event-title">La Sangre Tira</h2>
    <p class="narrative-text">
      <em>"Tomás, eres mi hermano. El clan invierte en los suyos. Toma el dinero, ponlo a trabajar, y cuando vuelvas nos lo devuelves con lo que Dios mande."</em>
    </p>
    <p class="narrative-text">
      El ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> te abraza. El ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> sale del cuarto refunfuñando. La abuela asiente muy despacio.
    </p>
    <p class="narrative-text">
      Dos meses después recibes noticias: el negocio ha arrancado bien. Tomás manda 5.000 de vuelta como primer pago. Dice que en seis meses debería poder devolver el resto con intereses.
    </p>
    <p class="narrative-text">
      Pero también llega otra noticia: en el barrio han detenido a tres jóvenes del Clan Romero por una pelea que no tuvo nada que ver con ellos. La situación con la pasma está caldeada.
      <span class="stat-change stat-down">💶 -30 Parné</span>
      <span class="stat-change stat-up">⭐ +5 Honra (lealtad familiar)</span>
      <span class="stat-change stat-up">💶 +5 Parné (primer retorno)</span>
    </p>
  `);

  renderContinue('▶ Continuar — La Lola y su amor prohibido', 'startRomanceLola()');
}

function chapter3_negar_tomas() {
  addHistory('Negaste la inversión al hermano Tomás. Prioridad: estabilidad del clan.');
  modStat('honra', -5);
  modFaction('clanes', -5);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Negativa</div>
    <h2 class="event-title">El Deber Antes que Todo</h2>
    <p class="narrative-text">
      <em>"Tomás, tú eres mi hermano y te quiero. Pero el dinero del clan pertenece a todos, no solo a nosotros dos. Si arriesgo eso y sale mal, ¿qué le digo a la abuela? ¿A los críos? No puedo."</em>
    </p>
    <p class="narrative-text">
      El ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> no dice nada. Se levanta, coge su bolsa y se va. Tres semanas después, sabes que encontró la inversión en otro sitio, con alguien que no es de la familia. Eso duele de otra manera.
    </p>
    <p class="narrative-text">
      Pero el clan está estable. Y la abuela te aprieta la mano esa noche con algo que parece aprobación.
      <span class="stat-change stat-down">⭐ -5 Honra (percepción de frialdad)</span>
    </p>
    <p class="narrative-text">
      <em>Años después recordarás esta decisión. Y seguirás sin saber si fue la correcta.</em>
    </p>
  `);

  GameState.flags.tomasEstaPreso = false;
  renderContinue('▶ Continuar — La Lola y su amor prohibido', 'startRomanceLola()');
}

function chapter3_mitad_tomas() {
  addHistory('Ofreciste apoyo parcial al hermano Tomás. Decisión equilibrada.');
  modStat('recursos', -10);
  modStat('honra', 8);

  renderNarrative(`
    <div class="event-date">Capítulo III — El Equilibrio</div>
    <h2 class="event-title">Lo que Puede Dar el Clan</h2>
    <p class="narrative-text">
      <em>"Tomás, el clan no puede apostar lo que no tiene. Pero tampoco te voy a dejar solo. Aquí tienes diez. Con eso demuestras que el negocio funciona, y entonces hablamos de más."</em>
    </p>
    <p class="narrative-text">
      El ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> entiende. No es lo que quería, pero es respeto. Se marcha con el dinero y la bendición de la familia.
    </p>
    <p class="narrative-text">
      El ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span>, por primera vez en semanas, te da una palmada en el hombro.
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
      <div class="image-overlay-text">El barrio está cambiando. Nuevos pisos, nuevas caras, nueva tensión.</div>
    </div>
    <p class="narrative-text">
      El barrio está cambiando rápido. La gentrificación llega también a donde vivís. Nuevos pisos con portero automático. Un café de esos que cobran cuatro euros por el café. Vecinos nuevos que miran raro si aparcas en la acera.
    </p>
    <p class="narrative-text">
      Y entonces una noche, el ${personajeImg('agenteTorres')} <span class="narrative-char">agente Torres</span> llega al barrio con otros tres coches. No por nada del clan directamente. Hay una denuncia: un vecino nuevo ha denunciado <em>"ruidos molestos y actividad sospechosa"</em>. La denuncia os nombra.
    </p>
    <p class="narrative-text">
      Torres entra en la cocina del clan con esa cara de siempre. Esta vez tiene algo diferente: un papel con sellos del juzgado.
    </p>
    <p class="narrative-text">
      <em>"Hay una orden de investigación. Por ahora es solo eso. Pero si encontramos algo..."</em>
    </p>
    ${GameState.flags.pegastePolicia ? `
    <p class="narrative-text">
      <span class="narrative-danger">⚠️ Torres te mira especialmente a ti. El incidente del mercadillo sigue en su memoria.</span>
    </p>
    ` : ''}
    <div class="cultural-note">
      📚 <b>Dato real:</b> Las denuncias por "actividad sospechosa" contra comunidades gitanas han sido documentadas por la Comisión Europea contra el Racismo e Intolerancia como una forma de acoso institucional.
    </div>
  `);

  currentChoiceHandlers = [
    () => chapter3_cooperar_policia(),
    () => chapter3_resistir_policia(),
    () => chapter3_abogado(),
  ];

  renderChoices([
    {
      text: '🤝 Cooperar con Torres. Mostrar que no tenéis nada que ocultar.',
      hint: GameState.flags.pegastePolicia
        ? '+Relación policía (difícil por el historial). Requiere paciencia.'
        : '+15 Relación policía. Torres puede ser un aliado.',
      good: !GameState.flags.pegastePolicia
    },
    {
      text: '😠 Negarte a cualquier registro sin orden judicial completa.',
      hint: 'Legal. Pero Torres se lo tomará a mal.',
      danger: true
    },
    {
      text: '⚖️ Llamar a un abogado antes de decir nada.',
      hint: 'Cuesta recursos pero es la jugada inteligente.',
    }
  ]);
}

function chapter3_cooperar_policia() {
  const basePenalty = GameState.flags.pegastePolicia ? -5 : 15;
  addHistory('Cooperaste con la policía durante la investigación.');
  modFaction('policia', basePenalty);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Cooperación</div>
    <h2 class="event-title">La Apertura de Puertas</h2>
    <p class="narrative-text">
      <em>"Torres, mira, entra. Aquí no hay nada. Nunca ha habido nada. Somos una familia, no una banda."</em>
    </p>
    <p class="narrative-text">
      Los agentes recorren la casa. Encuentran lo que hay en cualquier casa: ropa, comida, facturas, fotos en la pared. El ${personajeImg('agenteTorres')} <span class="narrative-char">agente Torres</span>, al final, parece casi incómodo.
    </p>
    ${GameState.flags.pegastePolicia ? `
    <p class="narrative-text">
      Torres te mira antes de salir: <em>"La próxima vez que haya un incidente en el mercadillo, te juro que no lo gestiono así."</em> La cooperación amortigua el problema, pero no lo elimina.
      <span class="stat-change stat-up">👮 +${basePenalty} Policía (pequeña mejora)</span>
    </p>
    ` : `
    <p class="narrative-text">
      Al salir, Torres te para en la puerta: <em>"Oye. No hay nada. Cerraremos el expediente. La denuncia viene de ese vecino nuevo, el de los vaqueros ajustados. Sabemos cómo va esto."</em>
      <span class="stat-change stat-up">👮 +15 Policía</span>
    </p>
    `}
  `);

  renderContinue('▶ Continuar al Capítulo IV', 'startChapter4()');
}

function chapter3_resistir_policia() {
  addHistory('Te negaste al registro policial sin orden judicial completa.');
  modFaction('policia', -20);
  modStat('honra', 8);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Resistencia Legal</div>
    <h2 class="event-title">La Ley que También Nos Ampara</h2>
    <p class="narrative-text">
      <em>"Torres, con todo el respeto: sin orden de registro firmada por un juez, no entra nadie en esta casa. Es la ley. La misma que tú aplicas."</em>
    </p>
    <p class="narrative-text">
      ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span> te mira largo rato. No dice nada. Cierra su libreta. Se va.
    </p>
    <p class="narrative-text">
      Tres días después llega la orden judicial. Os registran igualmente. Pero en esos tres días, habéis podido llamar a un abogado y estar preparados.
    </p>
    <p class="narrative-text">
      No encuentran nada. Porque no hay nada.
      <span class="stat-change stat-down">👮 -20 Policía (Torres no lo olvida)</span>
      <span class="stat-change stat-up">⭐ +8 Honra (demostraste que conoces tus derechos)</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo IV', 'startChapter4()');
}

function chapter3_abogado() {
  if (GameState.stats.recursos < 20) {
    showNotification('No tienes suficiente parné para el abogado.', 'bad');
    return;
  }
  addHistory('Contrataste un abogado para gestionar la investigación policial.');
  modStat('recursos', -20);
  modFaction('policia', 5);
  modFaction('ayuntamiento', 10);

  renderNarrative(`
    <div class="event-date">Capítulo III — El Abogado</div>
    <h2 class="event-title">La Ley en el Bolsillo</h2>
    <p class="narrative-text">
      <em>"Torres, voy a pedir que mi abogado esté presente antes de cualquier conversación."</em>
    </p>
    <p class="narrative-text">
      El abogado llega en veinte minutos. Un tipo joven pero con cara de saber lo que hace. Habla con ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span> en el pasillo durante diez minutos. Cuando vuelve, la investigación queda en "en revisión".
    </p>
    <p class="narrative-text">
      Semana y media después, el expediente se cierra. La denuncia del vecino no tenía fundamento legal suficiente.
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
  GameState.chapter = 4;
  updateStats();

  const enCrisis = GameState.stats.honra < 35;

  renderNarrative(`
    <div class="event-date">Capítulo IV — La Crisis</div>
    <h2 class="event-title">${enCrisis ? 'El Clan en la Cuerda Floja' : 'Cuando Todo se Pone a Prueba'}</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🌩️</span>
      <div class="image-overlay-text">Las noches que definen a los clanes</div>
    </div>
    <p class="narrative-text">
      El ${personajeImg('viejoCurro')} <span class="narrative-char">Viejo Curro</span> ha muerto.
    </p>
    <p class="narrative-text">
      No fue de golpe. Fue poco a poco, como las cosas importantes. El velatorio duró dos días. Vinieron gentes de cinco clanes distintos, de toda Andalucía, a darle el último adiós. Cantaron ${calóWord('duquelas')} hasta que salió el sol.
    </p>
    <p class="narrative-text">
      Ahora el clan está formalmente sin patriarca. Y tú eres el referente. El peso que antes era compartido es ahora solo tuyo.
    </p>
    <p class="narrative-text">
      Pero justo en este momento llega el golpe más duro: el ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span>, aprovechando la debilidad del momento de luto, ha conseguido que el Ayuntamiento emita una orden de <span class="narrative-danger">desalojo del mercadillo completo</span>. En treinta días.
    </p>
    ${enCrisis ? `
    <p class="narrative-text">
      <span class="narrative-danger">⚠️ El clan está en crisis de Honra. Hay miembros que consideran marcharse. Si no recuperas terreno este capítulo, el clan puede disolverse.</span>
    </p>
    ` : `
    <p class="narrative-text">
      El clan confía en ti. Pero nunca habéis tenido que resolver algo tan grande. Hay que actuar en tres frentes simultáneos.
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
      Treinta días. En la cocina, con todos reunidos, tenéis que decidir el plan. No hay opción perfecta. Hay que elegir dónde poner los esfuerzos.
    </p>
    ${tieneAliados ? `<p class="narrative-text"><span class="narrative-good">✅ Tus aliados pueden ayudarte. Los clanes aliados refuerzan tu posición.</span></p>` : ''}
    ${tieneParné ? `<p class="narrative-text"><span class="narrative-good">✅ Tienes recursos suficientes para luchar legalmente.</span></p>` : '<p class="narrative-text"><span class="narrative-danger">⚠️ Tus recursos son bajos. Las opciones económicas están limitadas.</span></p>'}
    ${tieneHonra ? `<p class="narrative-text"><span class="narrative-good">✅ Tu Honra es alta. El clan te sigue sin dudar.</span></p>` : ''}
  `);

  const choices = [];
  const handlers = [];

  choices.push({
    text: '⚖️ Luchar legalmente: contratar abogado, apelar la orden, hacer ruido mediático.',
    hint: 'Cuesta 40 recursos. Puede funcionar si tienes apoyo político.',
    good: tieneParné
  });
  handlers.push(() => chapter4_lucha_legal());

  if (tieneAliados) {
    choices.push({
      text: '🤝 Movilizar a todos los clanes aliados. Presión colectiva ante el Ayuntamiento.',
      hint: 'Requiere alianzas activas. Alta probabilidad de éxito.',
      good: true
    });
    handlers.push(() => chapter4_movilizacion_clanes());
  } else {
    choices.push({
      text: '📢 Llamar a los medios de comunicación y hacer viral el caso de desalojo.',
      hint: 'Sin coste. Arriesgado. Puede salir muy bien o muy mal.',
    });
    handlers.push(() => chapter4_medios());
  }

  choices.push({
    text: '🔥 Enfrentamiento directo: no os vais a mover aunque vengan con la policía.',
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
        Veintiocho días de batallas burocráticas. Recursos, apelaciones, informes. La abogada, una mujer de Almería que ha ganado tres casos similares, trabaja sin parar.
      </p>
      <p class="narrative-text">
        El día veintinueve, el juez paraliza la orden de desalojo. Hay irregularidades en el procedimiento. El Ayuntamiento tiene que volver a empezar.
      </p>
      <p class="narrative-text">
        El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> pierde la primera batalla. No la guerra, pero la primera batalla.
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
        La abogada lo explica: <em>"No han hecho nada ilegal. Han usado la ley exactamente como permite ser usada. Podemos apelar, pero..."</em>
      </p>
      <p class="narrative-text">
        Hay que encontrar otra manera.
        <span class="stat-change stat-down">💶 -40 Parné (sin retorno)</span>
        <span class="stat-change stat-down">⭐ -5 Honra</span>
      </p>
    `);
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
      <div class="image-overlay-text">Representantes de cinco clanes en la plaza del Ayuntamiento</div>
    </div>
    <p class="narrative-text">
      En tres días consigues reunir representantes de cuatro clanes. El Romero, el Montoya, el Flores y el vuestro. En la historia del barrio, esto no se ha visto en veinte años.
    </p>
    <p class="narrative-text">
      Cuarenta personas delante del Ayuntamiento. Ordenadas. Sin follón. Solo presencia. El Rafaelillo Montoya habla en nombre de todos con una dignidad que la prensa recoge.
    </p>
    <p class="narrative-text">
      El concejal sale a hablar. Ve a cuarenta gitanos con sus representantes, sus documentos, y dos abogados. Revisa la orden. En tres días la paraliza.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +25 Honra</span>
      <span class="stat-change stat-up">🤝 +1 Alianza</span>
      <span class="stat-change stat-up">🔥 +20 con Otros Clanes</span>
      <span class="stat-change stat-up">🏛️ +10 Ayuntamiento</span>
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> La Unión Romaní y la Fundación Secretariado Gitano han utilizado la movilización comunitaria como herramienta legal para revertir órdenes de desalojo en múltiples municipios españoles. La unidad entre familias ha sido históricamente el mecanismo más efectivo.
    </div>
  `);

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
        Una periodista de un periódico digital hace el artículo. Se hace viral en Twitter. Quince mil retuits. "El Ayuntamiento desaloja a familia gitana el día de su luto".
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
      <h2 class="event-title">La Historia que Nadie Quiso Contar Bien</h2>
      <p class="narrative-text">
        La periodista escribe el artículo pero lo enmarca de la manera equivocada. Habla de "conflicto en zona conflictiva". Los comentarios en redes son un desastre.
      </p>
      <p class="narrative-text">
        La presión mediática sale mal. Ahora hay más atención policial en el barrio.
        <span class="stat-change stat-down">⭐ -10 Honra</span>
        <span class="stat-change stat-down">👮 -10 Policía</span>
      </p>
    `);
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
      El día del desalojo, el clan entero está en los puestos. La abuela está sentada en su silla de siempre. Los críos juegan. Todo igual que siempre.
    </p>
    <p class="narrative-text">
      Llegan seis agentes. ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span> al frente. Os miran. Os miran a todos. Ven a quince personas, a una anciana, a tres niños.
    </p>
    <p class="narrative-text">
      Torres habla por el walkie. Espera. Vuelve a hablar. Después de quince minutos, la unidad se retira. La orden se ha paralizado temporalmente "por razones humanitarias".
    </p>
    <p class="narrative-text">
      No es una victoria legal. Es una victoria de dignidad.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +20 Honra</span>
      <span class="stat-change stat-down">👮 -25 Policía (la relación con Torres está muy dañada)</span>
      <span class="stat-change stat-down">🏛️ -20 Ayuntamiento</span>
    </p>
    <p class="narrative-text">
      Pero todo el mundo en el barrio lo ha visto. Y nadie lo olvidará.
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo V — El Desenlace', 'startChapter5()');
}