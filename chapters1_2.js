/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULOS 1 y 2 v4.0
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// CAPÍTULO 1: LOS COMIENZOS
// ════════════════════════════════════════
function startChapter1() {
  GameState.chapter = 1;
  updateStats();

  const clan = GameState.clanData;
  const name = GameState.playerName;
  const barrio = clan.barrio;

  renderNarrative(`
    <div class="event-date">Capítulo I — El Barrio</div>
    <h2 class="event-title">La Ley del Camino</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🌅</span>
      <div class="image-overlay-text">Amanecer sobre ${barrio}</div>
    </div>
    <p class="narrative-text">
      Te llaman <span class="narrative-char">${name}</span>. Eres el nuevo ${GameState.playerRole === 'cabeza' ? 'cabeza' : GameState.playerRole === 'guerrero' ? 'brazo derecho' : 'cerebro'} del ${calóWord('calé')} ${clan.nombre}, y esta mañana de lunes el sol pega fuerte sobre ${barrio}.
    </p>
    <p class="narrative-text">
      Tu papá, el ${personajeImg('viejoCurro')} <span class="narrative-char">Viejo Curro</span>, lleva dos semanas con una tos que no para. Los médicos dicen que es algo del pecho. El clan mira hacia ti. Quince personas, primas, tíos, la abuela que sabe más que todos juntos, y los críos que corren descalzos entre los coches aparcados en la acera.
    </p>
    <p class="narrative-text">
      Hoy hay junta en la cocina de tu tía. Hay que hablar de <span class="narrative-emph">${clan.enemigoDesc}</span>
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Tu primo Miguelito</span> entra dando una palmada: <em>"${pick(EXPRESIONES_GITANAS)}, ${name}, que viene el Toni diciendo que anoche le echaron del puesto en el mercadillo. ${pick(INSULTOS_PAYOS)}"</em>
    </p>
    <p class="narrative-text">
      La junta espera tu primera decisión como ${GameState.playerRole === 'cabeza' ? 'cabeza del clan' : 'referente de los tuyos'}.
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter1_a_confrontacion(),
    () => chapter1_b_informacion(),
    () => chapter1_c_ignorar(),
  ];

  renderChoices([
    {
      text: '🔥 "¡Vamos todos a hablar con ese payico ahora mismo sus muertos pisaos!" — Confrontación directa.',
      hint: 'Sube Intimidación. Baja relación con Payos.',
      danger: true
    },
    {
      text: '🧠 "Antes de moverse, hay que saber con quién tratamos." — Investigar primero.',
      hint: 'Descubres información valiosa sobre el enemigo.',
      good: true
    },
    {
      text: '😤 "Que el Toni resuelva sus problemas. Nosotros tenemos lo nuestro." — Ignorarlo.',
      hint: 'Baja la Honra. El clan empieza a perder el respeto.',
    }
  ]);
}

function chapter1_a_confrontacion() {
  addHistory('Decidiste confrontar directamente al rival sin información previa.');
  modStat('honra', 5);
  modStat('intimidacion', 10);
  modFaction('payos', -15);
  modFaction('clanes', 10);

  const name = GameState.playerName;
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena 2</div>
    <h2 class="event-title">El Primer Movimiento</h2>
    <p class="narrative-text">
      Llegas al mercadillo con siete hombres del clan. La gente se aparta. Encuentras al ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> en su puesto de atrás, ese que vende de todo y paga a nadie, rata de los cojones.
    </p>
    <p class="narrative-text">
      Es un tío gordo, con cadena de oro y gafas de sol aunque está nublado. Te mira de arriba abajo y suelta una carcajada: <em>"Ay, qué monada, ¡si vienen los gitanillos a protestar!"</em>
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> da un paso adelante. El ambiente se tensa. Los puestos de alrededor empiezan a recoger sus cosas.
    </p>
    <p class="narrative-text">
      El ${clan.enemigoPrincipal} saca el móvil: <em>"Llamo a la pasma si no os largáis en diez segundos, ${calóWord('gili')}s."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter1_pelea_mercadillo(),
    () => chapter1_intimidar_sin_pegar(),
    () => chapter1_retroceder_mercadillo(),
  ];

  renderChoices([
    {
      text: `💥 Darle una ${calóWord('palanqueta')} verbal y si se pone, que se ponga. Aquí no le tenéis miedo.`,
      hint: 'Combate posible. Alta recompensa, alto riesgo.',
      danger: true
    },
    {
      text: '😈 Acercarte mucho, mirarle fijo, y decirle muy bajito lo que le puede pasar.',
      hint: 'Faroleo. Si tu Honra es alta, funciona.',
      good: true
    },
    {
      text: '🚶 Retirarse ahora. Esto necesita más planificación.',
      hint: 'Baja Honra pero evitas problemas con la policía.',
    }
  ]);
}

function chapter1_pelea_mercadillo() {
  addHistory('Te enfrentaste físicamente al rival en el mercadillo.');
  GameState.flags.reputacionCallejera = true;
  GameState.flags.pegastePolicia = true;
  modFaction('policia', -20);
  modFaction('payos', -20);

  const name = GameState.playerName;
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena 3: Consecuencias</div>
    <h2 class="event-title">El Mercadillo Arde</h2>
    <p class="narrative-text">
      Lo que empieza como empujones acaba con cuatro cristales rotos y una furgoneta con el espejo arrancado. ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> sale corriendo gritando que llama a la pasma.
    </p>
    <p class="narrative-text">
      Cinco minutos después, dos coches de policía. ${personajeImg('agenteTorres')} <span class="narrative-char">El agente Torres</span> os conoce del barrio. Te mira con esa cara de <em>"otra vez estos"</em>.
    </p>
    <p class="narrative-text">
      <em>"${name}, te aviso: si vuelvo a verte aquí con este follón, te llevo detenido aunque no haya tocado nadie a nadie. Tengo muchas formas de joderte el día, ¿me entiendes?"</em>
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> El pueblo gitano históricamente ha sufrido un sistema judicial que aplica el delito de <i>asociación ilícita</i> de forma desproporcionada cuando varios miembros de una familia coinciden en un conflicto, independientemente de quién inició el problema.
    </div>
    <p class="narrative-text">
      <span class="stat-change stat-down">👮 Policía -20</span>
      <span class="stat-change stat-down">😤 Payos -20</span>
      <br>La calle ya sabe que el ${clan.nombre} no se deja pisar. Pero la pasma también te tiene en el punto de mira.
    </p>
  `);

  renderContinue('▶ Continuar — Esa tarde en casa...', 'chapter1_tarde_en_casa()');
}

function chapter1_intimidar_sin_pegar() {
  addHistory('Intimidaste al rival sin llegar a las manos. Estrategia de faroleo.');
  modStat('honra', 8);
  modStat('intimidacion', 8);
  modFaction('payos', -8);

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena 3</div>
    <h2 class="event-title">El Duende de los Ojos</h2>
    <p class="narrative-text">
      Te acercas. Sin correr. Sin alzar la voz. Eso es lo que más le asusta, que no te pongas histérico. Te quedas a veinte centímetros de su cara.
    </p>
    <p class="narrative-text">
      <em>"Escúchame bien, gachó. No te estoy amenazando. Te estoy explicando cómo funciona el mundo donde vives. Este mercadillo lleva aquí desde antes de que tú nacieras. Mi familia lo ha regado con trabajo. Y si vuelves a echarle a alguien del mío..."</em>
    </p>
    <p class="narrative-text">
      Dejas la frase en el aire. Le sostienes la mirada hasta que aparta los ojos.
    </p>
    <p class="narrative-text">
      El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> traga saliva. No llama a la policía. Solo dice que lo va a hablar con su abogado. Pero ya no ríe.
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te mira con admiración. El clan lo ha visto. Saben que tienes el duende en los ojos.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +8 Honra</span>
      <span class="stat-change stat-up">😈 +8 Intimidación</span>
    </p>
  `);

  renderContinue('▶ Continuar — Esa tarde en casa...', 'chapter1_tarde_en_casa()');
}

function chapter1_retroceder_mercadillo() {
  addHistory('Decidiste retirarte del mercadillo sin confrontación.');
  modStat('honra', -10);
  modFaction('clanes', -5);

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena 3</div>
    <h2 class="event-title">La Retirada</h2>
    <p class="narrative-text">
      Tiras de la manga del Miguelito y te marchas. El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> os llama algo por detrás que no merece repetirse.
    </p>
    <p class="narrative-text">
      De vuelta al barrio, nadie habla. Tu prima ${personajeImg('laLola')} <span class="narrative-char">La Lola</span> te mira con una pregunta en los ojos. Tu ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> simplemente va a fumarse un cigarro al balcón.
    </p>
    <p class="narrative-text">
      No hay que decir nada. Lo que no se hace también se dice. El clan necesita verte fuerte pronto o empezarán a buscar otro referente.
      <span class="stat-change stat-down">⭐ -10 Honra</span>
    </p>
  `);

  renderContinue('▶ Continuar — Esa tarde en casa...', 'chapter1_tarde_en_casa()');
}

function chapter1_b_informacion() {
  addHistory('Decidiste investigar antes de actuar. Movimiento estratégico.');
  modStat('diplomacia', 8);

  const name = GameState.playerName;
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena 2</div>
    <h2 class="event-title">Información es Poder</h2>
    <p class="narrative-text">
      <em>"Espera, Miguelito. Antes de moverse, hay que saber con quién tratamos."</em>
    </p>
    <p class="narrative-text">
      Pasas la tarde haciendo llamadas. Tu prima ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span>, que trabaja en el ayuntamiento. El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> que lo sabe todo del mercadillo. Incluso hablas con el ${calóWord('gachó')} que regenta el bar de enfrente.
    </p>
    <p class="narrative-text">
      Resultado: el ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> tiene deudas con tres personas distintas y un expediente de fraude fiscal sin resolver. Además, su socio es cuñado de un concejal del Ayuntamiento, lo cual explica por qué siempre sale airoso.
    </p>
    <p class="narrative-text">
      Pero también descubres algo interesante: el <span class="narrative-char">Clan Montoya</span>, que lleva años en el barrio de al lado, tiene un pleito pendiente con el mismo hombre. Un enemigo compartido puede ser el comienzo de una alianza.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🧠 +8 Diplomacia</span>
      <span class="stat-change stat-up">📋 Nueva info: Debilidades de ${clan.enemigoPrincipal}</span>
    </p>
  `);

  GameState.flags.clanRicoReputacion = true;
  GameState.inventory.push('📋 Información sobre ' + clan.enemigoPrincipal);

  currentChoiceHandlers = [
    () => { GameState.flags.alianzaMontoya = true; modStat('alianzas', 1); modFaction('clanes', 15); chapter1_tarde_en_casa(); },
    () => { modStat('recursos', -20); modFaction('ayuntamiento', 15); chapter1_tarde_en_casa(); },
    () => { chapter1_tarde_en_casa(); },
  ];

  renderChoices([
    {
      text: '🤝 Visitar al Clan Montoya y proponer una alianza contra el enemigo común.',
      hint: '+1 Alianza, +15 con otros clanes.',
      good: true
    },
    {
      text: '🏛️ Usar esa información para presionar al concejal vía el Ayuntamiento.',
      hint: 'Cuesta 20€ de parné. +15 con Ayuntamiento.',
    },
    {
      text: '📦 Guardar la información para el momento exacto.',
      hint: 'Sin coste. Usarás esto más adelante.',
    }
  ]);
}

function chapter1_c_ignorar() {
  addHistory('Ignoraste el problema del Toni. El clan pierde confianza.');
  modStat('honra', -15);
  modFaction('clanes', -10);

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena 2</div>
    <h2 class="event-title">El Silencio que Duele</h2>
    <p class="narrative-text">
      Miguelito te mira. Abre la boca. La cierra. Se va de la cocina sin decir nada.
    </p>
    <p class="narrative-text">
      Tres días después, el Toni ha perdido el puesto definitivamente. Ha tenido que trabajar de ayudante en una frutería de Triana, lo cual para un hombre orgulloso como él es una pequeña muerte.
    </p>
    <p class="narrative-text">
      En el barrio ya se comenta: <em>"¿Y el ${GameState.playerName}? ¿Ese no era el nuevo cabeza? Pues menuda cabeza..."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">⭐ -15 Honra</span>
      <span class="stat-change stat-down">🔥 -10 con Otros Clanes</span>
      <br>Necesitas recuperar terreno rápido.
    </p>
  `);

  renderContinue('▶ Continuar — Una semana después...', 'chapter1_tarde_en_casa()');
}

function chapter1_tarde_en_casa() {
  updateStats();

  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena Final</div>
    <h2 class="event-title">Esa Noche en Casa</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🏠</span>
      <div class="image-overlay-text">Las cocinas del clan, donde se toman las decisiones de verdad</div>
    </div>
    <p class="narrative-text">
      Esa noche, tu papá ${personajeImg('viejoCurro')} <span class="narrative-char">Viejo Curro</span> te llama a su cuarto. Está en la cama pero tiene los ojos vivos como siempre. Te coge de la mano con una fuerza que no cuadra con lo flaco que está.
    </p>
    <p class="narrative-text">
      <em>"${name}, hijo. El camino de nuestra gente siempre ha sido así: duro por fuera, tierno por dentro. No somos ni mejores ni peores que nadie, pero somos lo que somos. Y lo que somos tiene ${calóWord('lacha')}, tiene dignidad. Nunca la cambies por nada."</em>
    </p>
    <p class="narrative-text">
      Esa noche también llega una carta del Ayuntamiento. Tienen previsto <span class="narrative-danger">revisar los permisos de los puestos del mercadillo</span>. La reunión es en tres semanas. Si no tenéis los papeles en regla, os pueden quitar el puesto al Toni y otros tres más del clan.
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> Las "revisiones de permisos" y los desalojos administrativos han sido utilizados históricamente como mecanismos de presión contra comunidades gitanas que ocupaban espacios comerciales o habitacionales de forma legal pero informal. La Fundación Secretariado Gitano documenta estos casos desde 1982.
    </div>
    <p class="narrative-text">
      La mañana del capítulo siguiente llega con una amenaza de tres frentes.
    </p>
  `);

  renderContinue('▶ Pasar al Capítulo II — La Reunión del Mercadillo', 'startChapter2()');
}

// ════════════════════════════════════════
// CAPÍTULO 2: LA REUNIÓN
// ════════════════════════════════════════
function startChapter2() {
  GameState.chapter = 2;
  updateStats();
  const clan = GameState.clanData;
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo II — La Reunión</div>
    <h2 class="event-title">Tres Semanas Después</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🏛️</span>
      <div class="image-overlay-text">Sede del Ayuntamiento, planta baja</div>
    </div>
    <p class="narrative-text">
      La sala huele a papel mojado y café malo. Hay seis personas al otro lado de la mesa: un concejal que no para de mirarse el móvil, dos funcionarios con cara de no querer estar aquí, y la sorpresa de la tarde: el ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> en persona, sentado ahí como si formara parte de la reunión oficial.
    </p>
    <p class="narrative-text">
      Tu prima ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span>, que estudió Derecho aunque no terminó la carrera, te susurra: <em>"Esto no es legal que él esté aquí. Es interesado."</em>
    </p>
    <p class="narrative-text">
      El concejal abre con su discurso de siempre sobre <em>"regularización del espacio público"</em> y <em>"interés general del vecindario"</em>. La traducción real: quieren quedarse con cuatro puestos del mercadillo y dárselos a otros.
    </p>
    ${GameState.flags.pegastePolicia ? `
    <p class="narrative-text">
      <span class="narrative-danger">⚠️ ${personajeImg('agenteTorres')} El agente Torres está en la sala. Te mira desde la puerta. Se sabe lo del día del mercadillo. La tensión sube.</span>
    </p>
    ` : ''}
    ${GameState.flags.alianzaMontoya ? `
    <p class="narrative-text">
      <span class="narrative-good">✅ El representante del Clan Montoya está en la sala de espera. Vino por si le necesitas.</span>
    </p>
    ` : ''}
    ${GameState.inventory.includes('📋 Información sobre ' + clan.enemigoPrincipal) ? `
    <p class="narrative-text">
      <span class="narrative-good">📋 Tienes en el bolsillo la información sobre las deudas y el fraude fiscal. Puedes usarla.</span>
    </p>
    ` : ''}
  `);

  const choices = [];
  const handlers = [];

  const negoPenalty = GameState.flags.pegastePolicia ? ' (Más difícil: la pasma está presente)' : '';
  choices.push({
    text: `🗣️ Pedir la palabra y negociar directamente con el concejal.${negoPenalty}`,
    hint: GameState.flags.pegastePolicia
      ? 'La policía complica la negociación. Probabilidad de éxito reducida.'
      : 'Buena opción diplomática.',
    good: !GameState.flags.pegastePolicia
  });
  handlers.push(() => chapter2_negociar());

  if (GameState.inventory.includes('📋 Información sobre ' + clan.enemigoPrincipal)) {
    choices.push({
      text: `📋 Sacar la información del fraude fiscal del ${clan.enemigoPrincipal} encima de la mesa.`,
      hint: 'Alto impacto. Puede volverse contra ti si no lo haces bien.',
      good: true
    });
    handlers.push(() => chapter2_usar_informacion());
  } else {
    choices.push({
      text: `😡 Protestar en voz alta por la presencia ilegal del ${clan.enemigoPrincipal}.`,
      hint: 'Baja relación con Ayuntamiento. Pero señala la irregularidad.',
      danger: true
    });
    handlers.push(() => chapter2_protestar());
  }

  if (GameState.flags.alianzaMontoya) {
    choices.push({
      text: '🤝 Llamar al representante Montoya para que entre y apoye vuestra posición.',
      hint: 'Mostrar que no estáis solos. +Fuerza negociadora.',
      good: true
    });
    handlers.push(() => chapter2_alianza_montoya());
  } else {
    choices.push({
      text: '💶 Ofrecer un acuerdo económico: pagaréis más tasa a cambio de mantener los puestos.',
      hint: 'Cuesta 40 recursos. Puede funcionar.',
    });
    handlers.push(() => chapter2_soborno_legal());
  }

  currentChoiceHandlers = handlers;
  renderChoices(choices);
}

function chapter2_negociar() {
  const penaltyActivo = GameState.flags.pegastePolicia;
  const exito = penaltyActivo ? rand(1, 10) <= 4 : rand(1, 10) <= 7;

  addHistory(exito
    ? 'Negociaste con éxito en el Ayuntamiento.'
    : 'La negociación con el Ayuntamiento fracasó.' + (penaltyActivo ? ' (La policía interfirió)' : ''));

  if (exito) {
    modStat('honra', 10);
    modStat('recursos', -15);
    modFaction('ayuntamiento', 20);

    renderNarrative(`
      <div class="event-date">Capítulo II — Negociación</div>
      <h2 class="event-title">Las Palabras Justas</h2>
      <p class="narrative-text">
        Te levantas. Hablas despacio, con las palabras medidas como cuando se sirve el vino.
      </p>
      <p class="narrative-text">
        <em>"Con el respeto que me merezco y el que a ustedes les corresponde: llevamos quince años pagando nuestra tasa municipal sin un solo retraso. Hemos formado parte del tejido comercial de este barrio cuando nadie quería invertir aquí. Si hay una revisión, que sea justa y que empiece por quien no lleva ni tres años."</em>
      </p>
      <p class="narrative-text">
        El concejal se aclara la garganta. La funcionaria de la derecha está tomando notas con un poco más de atención.
      </p>
      <p class="narrative-text">
        Al final de la reunión, el resultado: se mantienen tres de los cuatro puestos amenazados. El cuarto pasa a revisión. Es un resultado aceptable.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-up">⭐ +10 Honra</span>
        <span class="stat-change stat-down">💶 -15 Parné (gestiones)</span>
        <span class="stat-change stat-up">🏛️ +20 Ayuntamiento</span>
      </p>
    `);
  } else {
    modStat('honra', -5);
    modFaction('ayuntamiento', -10);
    modFaction('policia', -15);

    renderNarrative(`
      <div class="event-date">Capítulo II — Negociación</div>
      <h2 class="event-title">La Trampa Tendida</h2>
      <p class="narrative-text">
        Intentas hablar pero el ${personajeImg('agenteTorres')} <span class="narrative-char">agente Torres</span> interrumpe con un comentario sobre "antecedentes de comportamiento alterado en vía pública". El concejal lo anota.
      </p>
      <p class="narrative-text">
        La reunión se tuerce. El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> sonríe desde su silla.
      </p>
      <p class="narrative-text">
        Resultado: se pierden dos puestos. El Toni no lo tomará bien.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-down">⭐ -5 Honra</span>
        <span class="stat-change stat-down">🏛️ -10 Ayuntamiento</span>
        <span class="stat-change stat-down">👮 -15 Policía</span>
        <br><span class="narrative-danger">El historial de violencia te ha pasado factura.</span>
      </p>
      ${GameState.flags.pegastePolicia ? '<div class="cultural-note">⚠️ <b>Consecuencia persistente:</b> Pegar a un policía en el capítulo anterior ha hecho la negociación significativamente más difícil. Las decisiones tienen memoria.</div>' : ''}
    `);
  }

  renderContinue('▶ Continuar — El conflicto escala', 'chapter2_escala_conflicto()');
}

function chapter2_usar_informacion() {
  addHistory('Usaste información confidencial sobre el rival en la reunión del Ayuntamiento.');
  modStat('honra', 15);
  modStat('recursos', 10);
  modFaction('ayuntamiento', 15);
  modFaction('payos', -20);
  GameState.flags.clanRicoReputacion = true;

  renderNarrative(`
    <div class="event-date">Capítulo II — Jugada Maestra</div>
    <h2 class="event-title">El Papel que Todo lo Dice</h2>
    <p class="narrative-text">
      En el momento exacto, abres tu carpeta y deslizas las fotocopias por la mesa hacia el concejal. Debes de haberte preparado para esto porque no dices nada. Solo señalas los documentos.
    </p>
    <p class="narrative-text">
      El silencio dura cinco segundos eternos. El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> se levanta.
    </p>
    <p class="narrative-text">
      <em>"Eso es mentira, son documentos falsos, yo voy a—"</em>
    </p>
    <p class="narrative-text">
      <em>"Siéntese, por favor."</em> La funcionaria de la izquierda habla por primera vez. Toma los documentos. Los examina. Pide un receso de diez minutos.
    </p>
    <p class="narrative-text">
      El receso dura cuarenta minutos. Cuando vuelven, el concejal tiene una expresión nueva. Los puestos del clan se mantienen todos. La revisión de permisos se suspende.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +15 Honra</span>
      <span class="stat-change stat-up">💶 +10 Parné (puestos asegurados)</span>
      <span class="stat-change stat-up">🏛️ +15 Ayuntamiento</span>
      <span class="stat-change stat-down">😤 -20 Payos (el rival os odia ahora)</span>
    </p>
    <p class="narrative-text">
      El ${GameState.clanData.enemigoPrincipal} te mira al salir con unos ojos que dicen que esto no ha terminado. <em>"Ya nos veremos, ${calóWord('calé')}."</em>
    </p>
  `);

  renderContinue('▶ Continuar — El rival no descansa', 'chapter2_escala_conflicto()');
}

function chapter2_protestar() {
  addHistory('Protestaste en voz alta en la reunión del Ayuntamiento.');
  modFaction('ayuntamiento', -15);
  modStat('honra', 5);

  renderNarrative(`
    <div class="event-date">Capítulo II — Protesta</div>
    <h2 class="event-title">La Voz que No Calla</h2>
    <p class="narrative-text">
      <em>"Un momento. Quiero saber por qué este señor está aquí sentado en una reunión oficial cuando tiene interés directo en el resultado."</em>
    </p>
    <p class="narrative-text">
      El concejal parpadea. La Encarna te pasa una nota: <em>"Bien. Sigue."</em>
    </p>
    <p class="narrative-text">
      La reunión se alarga dos horas más. Al final, el ${GameState.clanData.enemigoPrincipal} tiene que salir de la sala. Los puestos se mantienen provisionalmente mientras se revisa el procedimiento.
    </p>
    <p class="narrative-text">
      No es una victoria total, pero tampoco es una derrota.
      <span class="stat-change stat-up">⭐ +5 Honra</span>
      <span class="stat-change stat-down">🏛️ -15 Ayuntamiento</span>
    </p>
  `);

  renderContinue('▶ Continuar — El conflicto escala', 'chapter2_escala_conflicto()');
}

function chapter2_alianza_montoya() {
  addHistory('Llamaste al Clan Montoya para apoyarte en la reunión del Ayuntamiento.');
  modStat('honra', 12);
  modStat('alianzas', 1);
  modFaction('clanes', 10);
  modFaction('ayuntamiento', 10);

  renderNarrative(`
    <div class="event-date">Capítulo II — La Alianza</div>
    <h2 class="event-title">Unidos por el Camino</h2>
    <p class="narrative-text">
      Cuando el representante del <span class="narrative-char">Clan Montoya</span> entra en la sala, el cambio es palpable. Son dos familias, con su historia y su peso. El concejal ya no parece tan seguro.
    </p>
    <p class="narrative-text">
      <span class="narrative-char">El Rafaelillo Montoya</span> expone que ellos también tienen puestos afectados y que han contratado un abogado. La reunión cambia de tono.
    </p>
    <p class="narrative-text">
      Al final: todos los puestos se mantienen. La revisión se pospone seis meses. Y el ${GameState.clanData.enemigoPrincipal} sale de la sala sin haber podido decir prácticamente nada.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +12 Honra</span>
      <span class="stat-change stat-up">🤝 +1 Alianza (Clan Montoya)</span>
      <span class="stat-change stat-up">🔥 +10 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Continuar — El rival planea su respuesta', 'chapter2_escala_conflicto()');
}

function chapter2_soborno_legal() {
  if (GameState.stats.recursos < 40) {
    showNotification('No tienes suficiente parné para esta opción.', 'bad');
    return;
  }
  addHistory('Ofreciste un acuerdo económico al Ayuntamiento para mantener los puestos.');
  modStat('recursos', -40);
  modFaction('ayuntamiento', 25);
  GameState.flags.sobornoPagado = true;

  renderNarrative(`
    <div class="event-date">Capítulo II — El Acuerdo</div>
    <h2 class="event-title">El Parné Habla</h2>
    <p class="narrative-text">
      Al acabar la parte oficial de la reunión, pides hablar con el concejal a solas. Deslizas un sobre con la propuesta escrita: pago adelantado de seis meses de tasa, más diez por ciento de aumento voluntario.
    </p>
    <p class="narrative-text">
      El concejal lo mira. Lo cierra. Se lo mete en el bolsillo interior.
    </p>
    <p class="narrative-text">
      <em>"Revisaremos su caso con atención."</em>
    </p>
    <p class="narrative-text">
      Una semana después: los puestos se mantienen. Sin explicación oficial.
      <span class="stat-change stat-down">💶 -40 Parné</span>
      <span class="stat-change stat-up">🏛️ +25 Ayuntamiento</span>
    </p>
  `);

  renderContinue('▶ Continuar — El rival no se rinde', 'chapter2_escala_conflicto()');
}

function chapter2_escala_conflicto() {
  updateStats();
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Capítulo II — La Escalada</div>
    <h2 class="event-title">La Respuesta del Rival</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🌙</span>
      <div class="image-overlay-text">Las calles del barrio, de madrugada</div>
    </div>
    <p class="narrative-text">
      El ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> no es de los que se quedan quietos. Una semana después del Ayuntamiento, el ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> aparece con un labio partido y el dinero de la semana robado. Dos tipos que nadie del barrio conoce.
    </p>
    <p class="narrative-text">
      No hay duda de dónde vienen las órdenes.
    </p>
    <p class="narrative-text">
      Tu ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span>, que lleva cuarenta años en este barrio y ha visto de todo, viene a hablarte esa tarde: <em>"${GameState.playerName}, esto ha llegado al punto donde la ${calóWord('lacha')} ya no se negocia con palabras. Pero tú decides cómo se responde. Que el modo en que respondas hoy va a definir a este clan durante años."</em>
    </p>
    ${GameState.stats.honra < 40 ? `
    <p class="narrative-text">
      <span class="narrative-danger">⚠️ Tu Honra está muy baja. Algunos miembros del clan empiezan a hablar de buscar a otro cabeza. Necesitas actuar con firmeza.</span>
    </p>
    ` : ''}
    <p class="narrative-text">
      Ha llegado el momento de pasar por las tres fases de <span class="narrative-emph">La Ley del Camino</span>.
    </p>
  `);

  GameState.flags.clanRivalActivo = true;
  renderContinue('▶ Iniciar el proceso — Fase 1: El Aviso', 'startPhase1ConflictoRival()');
}

// ════════════════════════════════════════
// EL CONFLICTO CON EL RIVAL — 3 FASES
// ════════════════════════════════════════
function startPhase1ConflictoRival() {
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">El Conflicto — Fase 1</div>
    <h2 class="event-title">⚖️ El Aviso</h2>
    <p class="narrative-text">
      Según la <span class="narrative-emph">Ley del Camino</span>, el primer paso es enviar un representante a comunicar formalmente el agravio. Es un acto de respeto, incluso hacia el rival. Dice: <em>"Sabemos lo que hiciste. Te damos la oportunidad de responder honradamente."</em>
    </p>
    <p class="narrative-text">
      Quién envías y cómo lo envías ya es un mensaje en sí mismo.
    </p>
  `);

  currentChoiceHandlers = [
    () => phase1_enviarMiguelito(),
    () => phase1_enviarEncarna(),
    () => phase1_irTuMismo(),
  ];

  renderChoices([
    {
      text: '💪 Enviar al Miguelito como muestra de fuerza. "Que vea con quién se juega."',
      hint: 'Mensaje intimidatorio. Puede resolver o escalar.',
      danger: true
    },
    {
      text: '📜 Enviar a La Encarna, que sabe hablar en términos legales y formales.',
      hint: 'Mensaje civilizado. Reduce probabilidad de violencia.',
      good: true
    },
    {
      text: '👑 Ir tú mismo. Es la máxima señal de que esto es serio.',
      hint: 'Alto riesgo personal. Alta ganancia de Honra.',
    }
  ]);
}

function phase1_enviarMiguelito() {
  addHistory('Enviaste a Miguelito como representante intimidatorio en Fase 1.');
  modStat('intimidacion', 10);
  modFaction('payos', -10);

  renderNarrative(`
    <div class="event-date">Fase 1 — El Aviso</div>
    <h2 class="event-title">El Mensaje de los Puños</h2>
    <p class="narrative-text">
      El ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> llega con su cara de pocos amigos al negocio del ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span>. Le entrega el mensaje: <em>"El ${GameState.playerName} y el ${GameState.clanData.nombre} saben lo que hiciste. Tienes tres días para responder con honra."</em>
    </p>
    <p class="narrative-text">
      El ${GameState.clanData.enemigoPrincipal} ríe. Le dice al Miguelito que se vaya a la mierda y que "habla con sus abogados".
    </p>
    <p class="narrative-text">
      El Aviso ha fracasado. La mediación es ahora obligatoria.
    </p>
  `);

  renderContinue('▶ Fase 2: La Mediación', 'startPhase2ConflictoRival()');
}

function phase1_enviarEncarna() {
  addHistory('Enviaste a La Encarna como representante formal. Movimiento inteligente.');
  modStat('diplomacia', 8);
  modStat('honra', 5);

  renderNarrative(`
    <div class="event-date">Fase 1 — El Aviso</div>
    <h2 class="event-title">La Palabra que Pesa</h2>
    <p class="narrative-text">
      La ${personajeImg('laEncarna')} <span class="narrative-char">Encarna</span> lleva el mensaje con toda la dignidad del mundo. Le habla al ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> de responsabilidad civil, de testigos, de la documentación que tenéis de lo sucedido. Le habla como habla la ley.
    </p>
    <p class="narrative-text">
      El rival está incómodo. No esperaba esto. Pide tiempo para consultar con su socio.
    </p>
    <p class="narrative-text">
      Resultado: no hay disculpa, pero tampoco hay escalada inmediata. El proceso continúa.
      <span class="stat-change stat-up">⭐ +5 Honra</span>
      <span class="stat-change stat-up">🧠 +8 Diplomacia</span>
    </p>
  `);

  renderContinue('▶ Fase 2: La Mediación', 'startPhase2ConflictoRival()');
}

function phase1_irTuMismo() {
  addHistory('Fuiste tú mismo a entregar el aviso. Acto de máxima seriedad.');
  modStat('honra', 12);
  modFaction('payos', -5);

  renderNarrative(`
    <div class="event-date">Fase 1 — El Aviso</div>
    <h2 class="event-title">El Cara a Cara</h2>
    <p class="narrative-text">
      Vas solo. Eso también es un mensaje: no necesitas a nadie que te proteja.
    </p>
    <p class="narrative-text">
      El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> te recibe con cara de sorpresa. Le miras a los ojos y hablas despacio:
    </p>
    <p class="narrative-text">
      <em>"Tú y yo sabemos lo que pasó. Yo no he venido a amenazarte. He venido a darte la oportunidad de ser hombre. Tienes tres días."</em>
    </p>
    <p class="narrative-text">
      Se te queda mirando largo rato. Luego dice que lo pensará.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +12 Honra</span> El clan lo sabrá. Eres de los que se planta.
    </p>
  `);

  renderContinue('▶ Fase 2: La Mediación', 'startPhase2ConflictoRival()');
}

function startPhase2ConflictoRival() {
  renderNarrative(`
    <div class="event-date">El Conflicto — Fase 2</div>
    <h2 class="event-title">⚖️ La Mediación</h2>
    <p class="narrative-text">
      El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span>, patriarca del Clan Romero y hombre respetado en toda Andalucía, acepta ser el mediador. Tiene ochenta años, camina con bastón y su palabra vale más que muchos contratos escritos.
    </p>
    <p class="narrative-text">
      Propone reunirse en la trastienda del bar de siempre, en terreno neutral. Los términos sobre la mesa: el ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> pagará el dinero robado al Miguelito con un recargo del veinte por ciento como compensación de honor.
    </p>
    <p class="narrative-text">
      El rival, sorprendentemente, acepta entrar a la mediación. Eso es ya una señal de que algo le preocupa.
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> La figura del <i>anciano mediador</i> en la resolución de conflictos gitanos es una institución central de la cultura romaní. Su autoridad no viene de ningún poder formal sino del respeto acumulado y de ser reconocido como justo por todas las partes. Esta tradición se mantiene activa en comunidades gitanas españolas de hoy.
    </div>
  `);

  currentChoiceHandlers = [
    () => phase2_aceptar_terminos(),
    () => phase2_negociar_mas(),
    () => phase2_rechazar(),
  ];

  renderChoices([
    {
      text: '✅ Aceptar los términos del Viejo Sebastián. Cierra el conflicto con honor.',
      hint: '+Honra. Cierra el conflicto sin combate.',
      good: true
    },
    {
      text: '🤝 Aceptar el dinero pero exigir también una disculpa pública en el mercadillo.',
      hint: 'Puede que el rival se niegue y escalemos al combate.',
    },
    {
      text: '❌ Rechazar la mediación. Solo el combate resuelve esto.',
      hint: 'Directo al duelo. Alta Honra si ganas.',
      danger: true
    }
  ]);
}

function phase2_aceptar_terminos() {
  addHistory('Aceptaste los términos de mediación del Viejo Sebastián. Conflicto resuelto con honor.');
  modStat('honra', 15);
  modStat('recursos', 20);
  modFaction('clanes', 10);
  GameState.flags.clanRivalActivo = false;

  renderNarrative(`
    <div class="event-date">Fase 2 — Resolución</div>
    <h2 class="event-title">La Paz Ganada</h2>
    <p class="narrative-text">
      Estrechas la mano. El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> asiente con la cabeza como si confirmara algo que ya sabía. El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> parece incómodo pero cumple: esa misma tarde llega el dinero.
    </p>
    <p class="narrative-text">
      Hay conflictos que se ganan peleando y conflictos que se ganan aguantando. Este lo has ganado siendo más listo.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +15 Honra</span>
      <span class="stat-change stat-up">💶 +20 Parné (compensación)</span>
      <span class="stat-change stat-up">🔥 +10 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo III', 'startChapter3()');
}

function phase2_negociar_mas() {
  const exito = GameState.stats.honra > 50 ? rand(1, 10) <= 6 : rand(1, 10) <= 3;
  addHistory(exito ? 'Exigiste más en la mediación y conseguiste la disculpa pública.' : 'La exigencia de más rompió la mediación.');

  if (exito) {
    modStat('honra', 20);
    modStat('recursos', 15);
    modFaction('clanes', 15);

    renderNarrative(`
      <div class="event-date">Fase 2 — Victoria Completa</div>
      <h2 class="event-title">La Disculpa Ante Todos</h2>
      <p class="narrative-text">
        Contra todo pronóstico, el rival acepta. El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> le ha convencido de que una disculpa pública es mejor que lo que viene si no.
      </p>
      <p class="narrative-text">
        Tres días después, en el mercadillo, delante de todo el barrio, el ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> se acerca al Miguelito y le dice en voz alta que lo que pasó fue un error y que lo lamenta.
      </p>
      <p class="narrative-text">
        No suena del todo sincero. Pero se ha dicho. El barrio lo ha oído. La Ley del Camino ha funcionado.
        <span class="stat-change stat-up">⭐ +20 Honra</span>
        <span class="stat-change stat-up">💶 +15 Parné</span>
      </p>
    `);
    renderContinue('▶ Capítulo III', 'startChapter3()');
  } else {
    modStat('honra', -5);
    modFaction('payos', -10);

    renderNarrative(`
      <div class="event-date">Fase 2 — Ruptura</div>
      <h2 class="event-title">El Orgullo que Rompe</h2>
      <p class="narrative-text">
        El ${personajeImg('chatoRuiz')} <span class="narrative-char">${GameState.clanData.enemigoPrincipal}</span> se levanta de la silla: <em>"¿Disculpa pública? ${pick(INSULTOS_PAYOS)} ¡Esto ha terminado!"</em>
      </p>
      <p class="narrative-text">
        La mediación se rompe. El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> te mira con pena y resignación. Ya no hay vuelta atrás. El siguiente paso es el duelo.
        <span class="stat-change stat-down">⭐ -5 Honra (rompiste la mediación)</span>
      </p>
    `);
    renderContinue('▶ Fase 3: El Duelo', 'startCombat_fase3()');
  }
}

function phase2_rechazar() {
  addHistory('Rechazaste la mediación y elegiste el duelo directo.');
  modStat('honra', 5);

  renderNarrative(`
    <div class="event-date">Fase 2 — Duelo Aceptado</div>
    <h2 class="event-title">La Ley Más Antigua</h2>
    <p class="narrative-text">
      El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> te mira largo rato. Asiente lentamente. Él también sabe cuándo hay cosas que solo se resuelven de una manera.
    </p>
    <p class="narrative-text">
      <em>"Que sea justo entonces. Un hombre de cada parte. Al amanecer, en la explanada del polígono."</em>
    </p>
    <p class="narrative-text">
      El aviso llega a los dos clanes esta misma tarde. Mañana se sabe quién es quién.
    </p>
  `);

  renderContinue('▶ Fase 3: El Duelo al Amanecer', 'startCombat_fase3()');
}

// ════════════════════════════════════════
// SISTEMA DE COMBATE
// ════════════════════════════════════════
function startCombat_fase3() {
  const clan = GameState.clanData;
  const name = GameState.playerName;

  GameState.combat = {
    playerHP: 100,
    enemyHP: 100,
    playerMaxHP: 100,
    enemyMaxHP: 100,
    round: 1,
    enemyName: clan.enemigoPrincipal,
    enemyStr: 45 + (GameState.flags.pegastePolicia ? -5 : 0),
    playerStr: GameState.stats.combate,
    playerAgi: 50 + (GameState.playerRole === 'guerrero' ? 15 : 0),
    playerRep: GameState.stats.honra,
    enemyRep: 40,
    log: [],
    stamina: 100,
    resolved: false,
  };

  const c = GameState.combat;

  document.getElementById('playerFighterName').textContent = name;
  document.getElementById('enemyFighterName').textContent = c.enemyName;
  document.getElementById('playerHP').textContent = c.playerHP;
  document.getElementById('enemyHP').textContent = c.enemyHP;
  document.getElementById('roundNum').textContent = c.round;
  document.getElementById('playerHealth').style.width = '100%';
  document.getElementById('enemyHealth').style.width = '100%';

  document.getElementById('combatTitle').textContent = '⚔️ EL DUELO';
  document.getElementById('combatSubtitle').textContent = 'La navaja silba en el aire del amanecer';

  const logEl = document.getElementById('combatLog');
  logEl.innerHTML = '';
  addCombatLog(`${name} se planta frente a ${c.enemyName}. La explanada del polígono huele a madrugada y tierra húmeda.`);
  addCombatLog(`${pick(EXPRESIONES_GITANAS)}. El corazón te late fuerte, pero los pies están quietos.`);

  showScreen('combat');
}

function addCombatLog(text) {
  const log = document.getElementById('combatLog');
  const p = document.createElement('p');
  p.className = 'combat-log-line';
  p.textContent = text;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

function updateHealthBars() {
  const c = GameState.combat;
  const ph = Math.max(0, (c.playerHP / c.playerMaxHP) * 100);
  const eh = Math.max(0, (c.enemyHP / c.enemyMaxHP) * 100);
  document.getElementById('playerHealth').style.width = ph + '%';
  document.getElementById('enemyHealth').style.width = eh + '%';
  document.getElementById('playerHP').textContent = Math.max(0, c.playerHP);
  document.getElementById('enemyHP').textContent = Math.max(0, c.enemyHP);
  document.getElementById('roundNum').textContent = c.round;
}

function combatAction(action) {
  if (GameState.combat.resolved) return;
  const c = GameState.combat;
  const name = GameState.playerName;

  document.querySelectorAll('#combatActions .btn').forEach(b => b.disabled = true);

  let playerDamage = 0;
  let enemyDamage = 0;
  let playerMsg = '';
  let enemyMsg = '';

  const roll = rand(1, 20);

  if (action === 'attack') {
    playerDamage = rand(15, 30) + Math.floor(c.playerStr / 10);
    if (roll >= 17) {
      playerDamage = Math.floor(playerDamage * 1.8);
      playerMsg = `💥 ¡CRÍTICO! ${name} lanza un golpe con toda la fuerza del clan. El ${c.enemyName} tambalea. (-${playerDamage} HP)`;
    } else if (roll <= 3) {
      playerDamage = 0;
      playerMsg = `💨 El golpe de ${name} sale mal. ${c.enemyName} se aparta a tiempo.`;
    } else {
      playerMsg = `👊 ${name} golpea directo. ${c.enemyName} recibe el impacto con un gruñido. (-${playerDamage} HP)`;
    }
    c.stamina = Math.max(0, c.stamina - 15);
  }

  if (action === 'dodge') {
    const incoming = rand(10, 25);
    if (roll >= 14) {
      playerDamage = rand(20, 35);
      enemyDamage = Math.floor(incoming * 0.3);
      playerMsg = `💨 ${name} esquiva con elegancia y contraataca. ¡Duende en los pies! (-${playerDamage} HP al rival, -${enemyDamage} HP a ti)`;
    } else {
      enemyDamage = Math.floor(incoming * 0.6);
      playerDamage = rand(5, 15);
      playerMsg = `💨 Esquiva parcial. ${name} evita lo peor pero recibe algo. (-${enemyDamage} HP, contraataca -${playerDamage} HP)`;
    }
  }

  if (action === 'bluff') {
    const repDiff = c.playerRep - c.enemyRep;
    if (repDiff > 20 || roll >= 15) {
      playerMsg = `😈 ${name} da un paso adelante y dice algo muy bajito al oído de ${c.enemyName}. El rival palidece. `;
      if (roll >= 18 || repDiff > 40) {
        c.enemyHP = 0;
        addCombatLog(playerMsg + `${c.enemyName} da un paso atrás. Dos pasos. Se gira y se va. ¡Ha huido!`);
        updateHealthBars();
        setTimeout(() => resolveCombat(true, 'huida'), 1500);
        return;
      } else {
        enemyDamage = 0;
        playerDamage = rand(10, 20);
        playerMsg += `Le congela por un momento. Aprovechas para atacar. (-${playerDamage} HP)`;
      }
    } else {
      enemyDamage = rand(20, 35);
      playerMsg = `😤 El faroleo no funciona. ${c.enemyName} se ríe: "${pick(INSULTOS_GITANOS)}" y te da donde duele. (-${enemyDamage} HP a ti)`;
      playerDamage = 0;
    }
  }

  c.enemyHP -= playerDamage;
  addCombatLog(playerMsg);

  setTimeout(() => {
    if (c.enemyHP > 0) {
      const eRoll = rand(1, 20);
      const eAction = rand(1, 3);

      if (eAction <= 2) {
        let eDmg = rand(12, 25) + Math.floor(c.enemyStr / 12);
        if (eRoll >= 17) {
          eDmg = Math.floor(eDmg * 1.6);
          enemyMsg = `💥 ${c.enemyName} te lanza como un perro rabioso con un golpe brutal. (-${eDmg} HP)`;
        } else if (eRoll <= 3) {
          eDmg = 0;
          enemyMsg = `💨 ${c.enemyName} falla el golpe. La adrenalina le traiciona.`;
        } else {
          enemyMsg = `😤 ${c.enemyName} te da donde te duele. (-${eDmg} HP)`;
        }
        c.playerHP -= eDmg;
      } else {
        enemyMsg = `💨 ${c.enemyName} retrocede un paso, buscando apertura.`;
      }

      if (enemyMsg) addCombatLog(enemyMsg);
      if (action !== 'dodge' && enemyDamage > 0) {
        c.playerHP -= enemyDamage;
      }
    }

    c.round++;
    updateHealthBars();

    if (c.playerHP <= 0) {
      setTimeout(() => resolveCombat(false, 'derrota'), 800);
    } else if (c.enemyHP <= 0) {
      setTimeout(() => resolveCombat(true, 'victoria'), 800);
    } else if (c.round > 8) {
      setTimeout(() => resolveCombat(null, 'empate'), 800);
    } else {
      setTimeout(() => {
        document.querySelectorAll('#combatActions .btn').forEach(b => b.disabled = false);
      }, 200);
    }
  }, 1200);
}

function resolveCombat(playerWon, type) {
  GameState.combat.resolved = true;
  const c = GameState.combat;
  const name = GameState.playerName;

  document.getElementById('combatActions').innerHTML = '';

  if (playerWon === true) {
    GameState.flags.primeraVictoriaCombate = true;
    modStat('honra', type === 'huida' ? 20 : 25);
    modStat('recursos', 30);
    modFaction('clanes', 15);
    modFaction('payos', -15);
    addHistory(`Ganaste el duelo contra ${c.enemyName}${type === 'huida' ? ' (huyó)' : ''}.`);
    GameState.inventory.push('🏆 Victoria sobre ' + c.enemyName);

    addCombatLog(`═══════════════════════`);
    addCombatLog(`🏆 VICTORIA — ${name} ha ganado el duelo.`);

    setTimeout(() => {
      showScreen('game');
      updateStats();
      renderNarrative(`
        <div class="event-date">El Duelo — Resultado</div>
        <h2 class="event-title">🏆 La Victoria del Camino</h2>
        <p class="narrative-text">
          ${type === 'huida'
            ? `El ${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> ha huido. En la Ley del Camino, huir es la derrota más deshonrosa. El testigo, el ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span>, lo ha visto todo.`
            : `El ${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> está en el suelo. No muerto, no gravemente herido, pero vencido. El testigo, el ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span>, levanta tu mano.`
          }
        </p>
        <p class="narrative-text">
          En el barrio, la noticia corre antes del mediodía. El ${GameState.clanData.nombre} no se toca. Y tú eres ${calóWord('juncal')}, ${name}. Digno y elegante como los buenos.
        </p>
        <p class="narrative-text">
          <span class="stat-change stat-up">⭐ +25 Honra</span>
          <span class="stat-change stat-up">💶 +30 Parné</span>
          <span class="stat-change stat-up">🔥 +15 con Otros Clanes</span>
        </p>
      `);
      renderContinue('▶ Continuar al Capítulo III', 'startChapter3()');
    }, 1500);

  } else if (playerWon === false) {
    GameState.flags.combatePerdido = true;
    modStat('honra', -20);
    modStat('miembros', -1);
    modFaction('clanes', -10);
    addHistory(`Perdiste el duelo contra ${c.enemyName}. Humillación pública.`);

    addCombatLog(`═══════════════════════`);
    addCombatLog(`💀 DERROTA — ${name} ha caído.`);

    setTimeout(() => {
      showScreen('game');
      updateStats();
      renderNarrative(`
        <div class="event-date">El Duelo — Derrota</div>
        <h2 class="event-title">La Caída</h2>
        <p class="narrative-text">
          Estás en el suelo. No sientes vergüenza todavía, eso vendrá después. Ahora solo sientes el frío del asfalto y la respiración entrecortada.
        </p>
        <p class="narrative-text">
          El ${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> se aleja sin decir nada. Eso es casi peor.
        </p>
        <p class="narrative-text">
          El ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te ayuda a levantarte. No dice nada. La deuda de honor queda pendiente.
        </p>
        <p class="narrative-text">
          <span class="stat-change stat-down">⭐ -20 Honra</span>
          <span class="stat-change stat-down">👥 -1 Miembro</span>
          <span class="stat-change stat-down">🔥 -10 con Otros Clanes</span>
        </p>
        <p class="narrative-text">
          Esto no ha terminado. La revancha está en el aire. Pero primero hay que recuperarse.
        </p>
      `);
      renderContinue('▶ Continuar al Capítulo III', 'startChapter3()');
    }, 1500);

  } else {
    modStat('honra', 5);
    addHistory(`El duelo contra ${c.enemyName} terminó en empate por agotamiento.`);

    addCombatLog(`═══════════════════════`);
    addCombatLog(`🤝 EMPATE — Ninguno puede más.`);

    setTimeout(() => {
      showScreen('game');
      updateStats();
      renderNarrative(`
        <div class="event-date">El Duelo — Empate</div>
        <h2 class="event-title">Los Dos Cansados</h2>
        <p class="narrative-text">
          Después de ocho rondas, los dos estáis exhaustos. El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> interviene: <em>"Ya está. Los dos habéis mostrado lo que sois. No hay ganador ni perdedor hoy."</em>
        </p>
        <p class="narrative-text">
          En la Ley del Camino, el empate honrado es respetable. No resuelve la disputa, pero demuestra que los dos lados tienen peso.
          <span class="stat-change stat-up">⭐ +5 Honra</span>
        </p>
      `);
      renderContinue('▶ Continuar al Capítulo III', 'startChapter3()');
    }, 1500);
  }
}
