/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULOS 1 y 2 v5.0 (San Blas Edition)
   Extendidos con más decisiones
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// CAPÍTULO 1: LOS COMIENZOS
// ════════════════════════════════════════
function startChapter1() {
  saveCurrentState();
  GameState.chapter = 1;
  updateStats();

  const clan = GameState.clanData;
  const name = GameState.playerName;
  const barrio = clan.barrio;

  renderNarrative(`
    <div class="event-date">Capítulo I — El Barrio</div>
    <h2 class="event-title">La Ley del Camino en ${barrio}</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🌅</span>
      <div class="image-overlay-text">Amanece sobre ${barrio}. Olor a churros y gasolina.</div>
    </div>
    <p class="narrative-text">
      Te llaman <span class="narrative-char">${name}</span>. Eres el nuevo ${GameState.playerRole === 'cabeza' ? 'cabeza' : GameState.playerRole === 'guerrero' ? 'brazo derecho' : 'cerebro'} del clan ${clan.nombre}, y esta mañana de lunes el sol pega fuerte sobre las calles de ${barrio}.
    </p>
    <p class="narrative-text">
      Tu viejo, ${personajeImg('viejoCurro')} <span class="narrative-char">el Viejo Curro</span>, lleva dos semanas con una tos que no se va. Los médicos dicen que es algo del pecho. El clan mira hacia ti. Quince personas entre primos, tíos, la abuela que sabe más que todos juntos, y los críos que corren descalzos entre los coches aparcados en doble fila.
    </p>
    <p class="narrative-text">
      Hoy hay junta en la cocina de tu tía. Hay que hablar de <span class="narrative-emph">${clan.enemigoDesc}</span>. Ese payo, el ${clan.enemigoPrincipal}, se está pasando.
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Tu primo Miguelito</span> entra dando una palmada: <em>"¡${pick(EXPRESIONES_GITANAS)}! ${name}, que viene el Toni diciendo que anoche le echaron de su puesto en el mercadillo de Canillejas. ¡${pick(INSULTOS_PAYOS)}!"</em>
    </p>
    <p class="narrative-text">
      La peña espera tu primera decisión como ${GameState.playerRole === 'cabeza' ? 'cabeza del clan' : 'referente de los tuyos'}. ¿Qué vas a hacer, makina?
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter1_a_confrontacion(),
    () => chapter1_b_informacion(),
    () => chapter1_c_ignorar(),
  ];

  renderChoices([
    {
      text: '🔥 "¡Vamos todos a darle un susto a ese payo ahora mismo!" — Confrontación directa.',
      hint: 'Sube Intimidación. Baja relación con Payos.',
      danger: true
    },
    {
      text: '🧠 "Espera, Miguelito. Antes de liarla, hay que saber con quién nos jugamos los cuartos." — Investigar.',
      hint: 'Descubres mierda valiosa sobre el enemigo.',
      good: true
    },
    {
      text: '😤 "Que el Toni se busque la vida. Nosotros ya tenemos bastante." — Ignorarlo.',
      hint: 'Baja la Honra. El clan empieza a dudar de ti.',
    }
  ]);
}

function chapter1_a_confrontacion() {
  addHistory('Decidiste ir a por el payo sin pensarlo. A lo loco.');
  modStat('honra', 5);
  modStat('intimidacion', 10);
  modFaction('payos', -15);
  modFaction('clanes', 10);

  const name = GameState.playerName;
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Capítulo I — Mercadillo de Canillejas</div>
    <h2 class="event-title">El Primer Movimiento</h2>
    <p class="narrative-text">
      Llegas al mercadillo con siete colegas del clan. La gente se aparta. Encuentras a ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> en su puesto del fondo, ese que vende de todo y no paga impuestos.
    </p>
    <p class="narrative-text">
      Es un tío gordo, con cadena de oro y gafas de sol aunque está nublado. Te mira de arriba abajo y suelta una carcajada: <em>"Ay, qué monada, ¡vienen los gitanicos de San Blas a protestar!"</em>
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> da un paso adelante. El ambiente se tensa. Los puestos de alrededor empiezan a recoger.
    </p>
    <p class="narrative-text">
      El Chato saca el móvil: <em>"Llamo a la pasma si no os largáis en diez segundos, ${calóWord('gili')}s."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter1_pelea_mercadillo(),
    () => chapter1_intimidar_sin_pegar(),
    () => chapter1_retroceder_mercadillo(),
  ];

  renderChoices([
    {
      text: `💥 Darle una ${calóWord('palanqueta')} verbal y si se pone chulo, liarse. Aquí no tenemos miedo.`,
      hint: 'Combate posible. Puede acabar mal, pero la calle hablará.',
      danger: true
    },
    {
      text: '😈 Acercarte mucho, mirarle fijo, y susurrarle algo que le hiele la sangre.',
      hint: 'Faroleo puro. Si tienes Honra, el payo se cagará.',
      good: true
    },
    {
      text: '🚶 Dar media vuelta ahora. Esto hay que planearlo mejor.',
      hint: 'Baja Honra pero evitas problemas con la pasma.',
    }
  ]);
}

function chapter1_pelea_mercadillo() {
  addHistory('Te liate a golpes en el mercadillo. La pasma vino.');
  GameState.flags.reputacionCallejera = true;
  GameState.flags.pegastePolicia = true;
  modFaction('policia', -20);
  modFaction('payos', -20);

  const name = GameState.playerName;
  const clan = GameState.clanData;

  // REINICIO CAPÍTULO 1
  if (GameState.factions.policia < 20) {
    renderNarrative(`
      <div class="event-date">Capítulo I — Consecuencias</div>
      <h2 class="event-title">Arrestado</h2>
      <p class="narrative-text">
        La bronca ha sido demasiado. Los agentes te tiran al suelo y te ponen las esposas. Torres te lee los derechos. El clan queda descabezado.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">EL CLAN SE HA DISUELTO. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo I', 'restartChapter1()');
    return;
  }

  renderNarrative(`
    <div class="event-date">Capítulo I — Consecuencias</div>
    <h2 class="event-title">El Mercadillo Arde</h2>
    <p class="narrative-text">
      Empieza con empujones, acaba con cristales rotos y una furgoneta con el espejo colgando. ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> sale corriendo mientras grita "¡policía!".
    </p>
    <p class="narrative-text">
      Cinco minutos después, dos coches de la pasma. ${personajeImg('agenteTorres')} <span class="narrative-char">El agente Torres</span> os conoce del barrio. Te mira con esa cara de <em>"otra vez estos"</em>.
    </p>
    <p class="narrative-text">
      <em>"${name}, te aviso: como vuelva a verte montando pollos, te meto en el calabozo aunque no hayas tocado a nadie. Tengo mil maneras de joderte el día, ¿me pillas?"</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">👮 Pasma -20</span>
      <span class="stat-change stat-down">😤 Payos -20</span>
      <br>Ahora en el barrio saben que el ${clan.nombre} no se deja pisar. Pero la pasma te tiene fichado.
    </p>
  `);

  // NUEVO: Tercera decisión tras la pelea
  renderNarrative(`
    <p class="narrative-text">
      De vuelta al barrio, ${personajeImg('tioAntonio')} <span class="narrative-char">el tío Antonio</span> te espera en la puerta. <em>"He oído lo del mercadillo. Unos dicen que eres un valiente, otros que estás chalado. ¿Qué piensas hacer ahora? El Toni sigue sin puesto, los vecinos están asustados, y la pasma nos va a tener entre ceja y ceja."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter1_postpelea_celebrar(),
    () => chapter1_postpelea_calmar(),
    () => chapter1_postpelea_planificar()
  ];

  renderChoices([
    {
      text: '🎉 Celebrar la victoria en el bar con los colegas. Que nos vean fuertes.',
      hint: 'Sube la moral del clan, pero la pasma nos vigilará más.',
    },
    {
      text: '🧘 Ir a hablar con los vecinos payos para calmar los ánimos.',
      hint: 'Mejora la relación con los payos del barrio.',
      good: true
    },
    {
      text: '📋 Reunir al clan para planificar los próximos pasos.',
      hint: 'Preparas mejor el siguiente movimiento.',
    }
  ]);
}

function chapter1_postpelea_celebrar() {
  addHistory('Celebraste la pelea en el bar. La moral está alta.');
  modStat('honra', 5);
  modFaction('policia', -5);
  chapter1_tarde_en_casa();
}

function chapter1_postpelea_calmar() {
  addHistory('Hablaste con los vecinos payos para calmar los ánimos tras la pelea.');
  modFaction('payos', 10);
  modStat('diplomacia', 3);
  chapter1_tarde_en_casa();
}

function chapter1_postpelea_planificar() {
  addHistory('Planificaste con el clan los siguientes pasos.');
  modStat('diplomacia', 5);
  chapter1_tarde_en_casa();
}


function chapter1_intimidar_sin_pegar() {
  addHistory('Miedo le metiste al payo sin tocarle un pelo. Eres un máquina faroleando.');
  modStat('honra', 8);
  modStat('intimidacion', 8);
  modFaction('payos', -8);

  renderNarrative(`
    <div class="event-date">Capítulo I — El Farol</div>
    <h2 class="event-title">El Duende en los Ojos</h2>
    <p class="narrative-text">
      Te plantas a veinte centímetros de su cara. No gritas, no alzas la voz. Eso le acojona más que cualquier grito.
    </p>
    <p class="narrative-text">
      <em>"Escúchame bien, payo. No te estoy amenazando. Te estoy contando cómo funcionan las cosas aquí. Este mercadillo lleva aquí desde que tu abuela era un proyecto. Mi gente lo ha currao. Y si vuelves a echarnos a alguien..."</em>
    </p>
    <p class="narrative-text">
      Dejas la frase en el aire. Le aguantas la mirada hasta que aparta los ojos.
    </p>
    <p class="narrative-text">
      ${personajeImg('chatoRuiz')} <span class="narrative-char">El Chato</span> traga saliva. No llama a la policía. Balbucea algo de "ya hablaremos". Pero ya no ríe.
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te mira con orgullo. Saben que tienes el duende en los ojos.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +8 Honra</span>
      <span class="stat-change stat-up">😈 +8 Intimidación</span>
    </p>
  `);

  // Tercera decisión: ¿cómo manejamos la información del farol?
  renderNarrative(`
    <p class="narrative-text">
      De vuelta en el barrio, ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span> te comenta: <em>"Has asustado al Chato, pero ahora hay que mover ficha. Podemos aprovechar el miedo para negociar o para atacar."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter1_postfarol_seguir_presion(),
    () => chapter1_postfarol_tregua(),
    () => chapter1_postfarol_esperar()
  ];

  renderChoices([
    {
      text: '😤 Seguir presionando al Chato. Que sepa que no hemos terminado.',
      hint: 'Aumenta la intimidación, riesgo de represalias.',
      danger: true
    },
    {
      text: '🤝 Proponer una tregua temporal al Chato para ganar tiempo.',
      hint: 'Mejora relaciones con payos, pierdes un poco de respeto callejero.',
      good: true
    },
    {
      text: '⏳ No hacer nada de momento y ver cómo reacciona.',
      hint: 'Ni ganas ni pierdes, pero el Chato podría reorganizarse.',
    }
  ]);
}

function chapter1_postfarol_seguir_presion() {
  addHistory('Seguiste presionando al Chato tras el farol.');
  modStat('intimidacion', 5);
  modFaction('payos', -10);
  chapter1_tarde_en_casa();
}

function chapter1_postfarol_tregua() {
  addHistory('Propusiste una tregua al Chato. Tiempo ganado.');
  modStat('diplomacia', 5);
  modFaction('payos', 10);
  chapter1_tarde_en_casa();
}

function chapter1_postfarol_esperar() {
  addHistory('Decidiste esperar a ver cómo reacciona el Chato.');
  chapter1_tarde_en_casa();
}


function chapter1_retroceder_mercadillo() {
  addHistory('Te rajaste en el mercadillo. El clan se decepcionó.');
  modStat('honra', -10);
  modFaction('clanes', -5);

  renderNarrative(`
    <div class="event-date">Capítulo I — La Retirada</div>
    <h2 class="event-title">La Lache</h2>
    <p class="narrative-text">
      Agarras del brazo al Miguelito y os largáis. El ${personajeImg('chatoRuiz')} <span class="narrative-char">Chato</span> os insulta por detrás con una guarrería que prefiero no repetir.
    </p>
    <p class="narrative-text">
      De vuelta al barrio, nadie dice nada. ${personajeImg('laLola')} <span class="narrative-char">La Lola</span> te mira con una pregunta en los ojos. ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> se va al balcón a fumarse un cigarro sin mirarte.
    </p>
    <p class="narrative-text">
      La lache te come. El clan necesita ver liderazgo ya o buscarán otro cabeza.
      <span class="stat-change stat-down">⭐ -10 Honra</span>
    </p>
  `);

  // Tercera decisión: ¿cómo recuperas la confianza?
  renderNarrative(`
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> se te acerca: <em>"La gente está mosqueada, primo. ¿Qué les digo? ¿Que nos vamos a quedar de brazos cruzados o que esto va en serio?"</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter1_postretirada_promesa(),
    () => chapter1_postretirada_disculpa(),
    () => chapter1_postretirada_autoridad()
  ];

  renderChoices([
    {
      text: '💪 Prometer que la próxima vez no nos rajamos.',
      hint: 'Recuperas algo de Honra, pero quedas en deuda.',
      good: true
    },
    {
      text: '😔 Disculparte con el clan. La cagaste.',
      hint: 'Ganas respeto por humildad, aunque la Honra tarda en volver.',
    },
    {
      text: '👑 Imponerte por autoridad. Aquí mandas tú, aunque no te sigan.',
      hint: 'Arriesgas que te ignoren aún más.',
      danger: true
    }
  ]);
}

function chapter1_postretirada_promesa() {
  addHistory('Prometiste al clan que la próxima vez no te rajarías.');
  modStat('honra', 5);
  chapter1_tarde_en_casa();
}

function chapter1_postretirada_disculpa() {
  addHistory('Te disculpaste con el clan por haberte rajado.');
  modStat('diplomacia', 5);
  chapter1_tarde_en_casa();
}

function chapter1_postretirada_autoridad() {
  addHistory('Intentaste imponerte por autoridad tras la retirada.');
  modStat('intimidacion', 5);
  modFaction('clanes', -3);
  chapter1_tarde_en_casa();
}


function chapter1_b_informacion() {
  addHistory('Investigaste antes de actuar. Listo, muy listo.');
  modStat('diplomacia', 8);

  const name = GameState.playerName;
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena 2</div>
    <h2 class="event-title">Información es Poder</h2>
    <p class="narrative-text">
      <em>"Para el carro, Miguelito. Antes de dar el palo, hay que saber a quién nos enfrentamos."</em>
    </p>
    <p class="narrative-text">
      Te tiras la tarde haciendo llamadas. ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span>, tu prima que curra en la junta municipal, te da datos. ${personajeImg('viejoSebastian')} <span class="narrative-char">El Viejo Sebastián</span>, que conoce todo el cotarro, te cuenta los trapos sucios del Chato.
    </p>
    <p class="narrative-text">
      Resultado: el ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> debe pasta a tres personas distintas y tiene un marrón de fraude fiscal sin resolver. Además, su socio es cuñado de un concejal del Ayuntamiento, por eso siempre se va de rositas.
    </p>
    <p class="narrative-text">
      Pero también te enteras de algo interesante: el <span class="narrative-char">Clan Montoya</span>, del barrio de al lado, también está peleado con el mismo payo. Un enemigo compartido puede ser el comienzo de una alianza.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🧠 +8 Diplomacia</span>
      <span class="stat-change stat-up">📋 Nueva info marrón del Chato</span>
    </p>
  `);

  GameState.flags.clanRicoReputacion = true;
  GameState.inventory.push('📋 Marrones del Chato Ruiz');

  currentChoiceHandlers = [
    () => { GameState.flags.alianzaMontoya = true; modStat('alianzas', 1); modFaction('clanes', 15); chapter1_tarde_en_casa(); },
    () => { modStat('recursos', -20); modFaction('ayuntamiento', 15); chapter1_tarde_en_casa(); },
    () => { chapter1_tarde_en_casa(); },
  ];

  renderChoices([
    {
      text: '🤝 Visitar al Clan Montoya y proponer una alianza contra el Chato.',
      hint: '+1 Alianza, +15 con otros clanes.',
      good: true
    },
    {
      text: '🏛️ Usar esa info para presionar al concejal en el Ayuntamiento.',
      hint: 'Cuesta 20€ de parné. +15 con Ayuntamiento.',
    },
    {
      text: '📦 Guardar la información para el momento justo.',
      hint: 'Sin coste. La usarás más adelante.',
    }
  ]);
}

function chapter1_c_ignorar() {
  addHistory('Pasaste del Toni. El clan se sintió abandonado.');
  modStat('honra', -15);
  modFaction('clanes', -10);

  // REINICIO CAPÍTULO 1
  if (GameState.stats.honra < 20) {
    renderNarrative(`
      <div class="event-date">Capítulo I — El Silencio</div>
      <h2 class="event-title">El clan se desmorona</h2>
      <p class="narrative-text">
        Después de ignorar al Toni, la gente empieza a marcharse. Primero fue tu tío Antonio, luego los primos. Ya no confían en ti.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">EL CLAN SE HA DISUELTO. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo I', 'restartChapter1()');
    return;
  }

  renderNarrative(`
    <div class="event-date">Capítulo I — El Silencio</div>
    <h2 class="event-title">La Decepción</h2>
    <p class="narrative-text">
      Miguelito te mira, abre la boca, la cierra. Se va de la cocina sin decir nada.
    </p>
    <p class="narrative-text">
      Tres días después, el Toni ha perdido el puesto para siempre. Ahora está currando de ayudante en una frutería de Alcalá, lo cual para un hombre orgulloso es como estar muerto.
    </p>
    <p class="narrative-text">
      En el barrio ya se comenta: <em>"¿Y ${GameState.playerName}? ¿Ese no era el nuevo cabeza? Pues menudo cabeza..."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">⭐ -15 Honra</span>
      <span class="stat-change stat-down">🔥 -10 con Otros Clanes</span>
      <br>Necesitas remontar como sea.
    </p>
  `);

  // Tercera decisión: ¿cómo recuperas la situación?
  renderNarrative(`
    <p class="narrative-text">
      Esa noche, la abuela te llama al cuarto. <em>"He oído lo del Toni. La gente está disgustada. ¿Vas a quedarte mirando o vas a hacer algo?"</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter1_postignorar_ayudar_toni(),
    () => chapter1_postignorar_reunion(),
    () => chapter1_postignorar_pasotismo()
  ];

  renderChoices([
    {
      text: '🤲 Ir a ver al Toni y ofrecerle ayuda personalmente.',
      hint: 'Recuperas Honra, pero requiere tiempo y recursos.',
      good: true
    },
    {
      text: '📢 Convocar una reunión de emergencia para calmar al clan.',
      hint: 'Mejora la diplomacia y la moral.',
    },
    {
      text: '🙄 Seguir ignorando el problema. Ya se calmarán.',
      hint: 'Riesgo de que la Honra baje aún más.',
      danger: true
    }
  ]);
}

function chapter1_postignorar_ayudar_toni() {
  addHistory('Fuiste personalmente a ayudar al Toni.');
  modStat('honra', 5);
  modStat('recursos', -5);
  chapter1_tarde_en_casa();
}

function chapter1_postignorar_reunion() {
  addHistory('Convocaste una reunión de emergencia para calmar al clan.');
  modStat('diplomacia', 5);
  chapter1_tarde_en_casa();
}

function chapter1_postignorar_pasotismo() {
  addHistory('Seguiste ignorando los problemas del clan.');
  modStat('honra', -5);
  chapter1_tarde_en_casa();
}


function chapter1_tarde_en_casa() {
  updateStats();
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo I — Escena Final</div>
    <h2 class="event-title">Esa Noche en Casa</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🏠</span>
      <div class="image-overlay-text">Las cocinas del clan, donde se cuece todo</div>
    </div>
    <p class="narrative-text">
      Esa noche, tu viejo ${personajeImg('viejoCurro')} <span class="narrative-char">el Viejo Curro</span> te llama a su cuarto. Está en la cama pero con los ojos vivos como brasas. Te agarra la mano con una fuerza que no pega con lo delgado que está.
    </p>
    <p class="narrative-text">
      <em>"${name}, hijo. El camino de nuestra gente siempre ha sido así: duro por fuera, tierno por dentro. No somos ni mejores ni peores que nadie, pero tenemos ${calóWord('lache')}, tenemos dignidad. Nunca la pierdas."</em>
    </p>
    <p class="narrative-text">
      Esa misma noche llega un burofax de la Junta Municipal. Van a <span class="narrative-danger">revisar los permisos de los puestos del mercadillo</span>. La reunión es en tres semanas. Si no tenéis los papeles en regla, os pueden quitar el puesto al Toni y otros tres más del clan.
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> Las "revisiones de permisos" y los desalojos administrativos se han usado mucho contra las comunidades gitanas que ocupaban espacios comerciales o habitacionales. La Fundación Secretariado Gitano lo documenta desde 1982.
    </div>
    <p class="narrative-text">
      Mañana empieza el siguiente capítulo, con amenazas por tres frentes.
    </p>
  `);

  renderContinue('▶ Pasar al Capítulo II — La Reunión', 'startChapter2()');
}

// ════════════════════════════════════════
// CAPÍTULO 2: LA REUNIÓN
// ════════════════════════════════════════
function startChapter2() {
  saveCurrentState();
  GameState.chapter = 2;
  updateStats();
  const clan = GameState.clanData;
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo II — La Reunión</div>
    <h2 class="event-title">Tres Semanas Después — Junta Municipal</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🏛️</span>
      <div class="image-overlay-text">Sede de la Junta Municipal de San Blas, planta baja</div>
    </div>
    <p class="narrative-text">
      La sala huele a papel mojado y café malo. Hay seis personas al otro lado: un concejal que no levanta la vista del móvil, dos funcionarios con cara de no querer estar allí, y la sorpresa: ${personajeImg('chatoRuiz')} <span class="narrative-char">${clan.enemigoPrincipal}</span> en persona, sentado como si fuera de la familia.
    </p>
    <p class="narrative-text">
      ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span>, que estudió Derecho aunque no terminó, te susurra: <em>"Esto no es legal que esté aquí el payo este. Es interesado."</em>
    </p>
    <p class="narrative-text">
      El concejal empieza con su rollo de siempre: <em>"regularización del espacio público"</em>, <em>"interés general del vecindario"</em>. Traducción: quieren echaros de cuatro puestos y dárselos a otros.
    </p>
    ${GameState.flags.pegastePolicia ? `
    <p class="narrative-text">
      <span class="narrative-danger">⚠️ ${personajeImg('agenteTorres')} El agente Torres está al fondo, apoyado en la pared. Te mira fijamente. Lo del mercadillo aún coleca.</span>
    </p>
    ` : ''}
    ${GameState.flags.alianzaMontoya ? `
    <p class="narrative-text">
      <span class="narrative-good">✅ Un representante del Clan Montoya está en la sala de espera. Vino por si necesitas refuerzo.</span>
    </p>
    ` : ''}
    ${GameState.inventory.includes('📋 Marrones del Chato Ruiz') ? `
    <p class="narrative-text">
      <span class="narrative-good">📋 Tienes en el bolsillo los trapos sucios del Chato. Puedes reventar la reunión si quieres.</span>
    </p>
    ` : ''}
  `);

  const choices = [];
  const handlers = [];

  const negoPenalty = GameState.flags.pegastePolicia ? ' (Más difícil: la pasma está al loro)' : '';
  choices.push({
    text: `🗣️ Pedir la palabra y negociar como un señor.${negoPenalty}`,
    hint: GameState.flags.pegastePolicia ? 'La pasma te tiene fichado, costará más.' : 'Buena opción diplomática.',
    good: !GameState.flags.pegastePolicia
  });
  handlers.push(() => chapter2_negociar());

  if (GameState.inventory.includes('📋 Marrones del Chato Ruiz')) {
    choices.push({
      text: `📋 Soltar la bomba de los marrones del Chato encima de la mesa.`,
      hint: 'Alto impacto. Puede salir mal si no lo haces fino.',
      good: true
    });
    handlers.push(() => chapter2_usar_informacion());
  } else {
    choices.push({
      text: `😡 Protestar por la presencia ilegal del Chato.`,
      hint: 'Baja relación con Ayuntamiento pero dejas claro que no sois tontos.',
      danger: true
    });
    handlers.push(() => chapter2_protestar());
  }

  if (GameState.flags.alianzaMontoya) {
    choices.push({
      text: '🤝 Llamar al Montoya para que entre y apoye.',
      hint: 'Mostrar que no estáis solos. +Fuerza negociadora.',
      good: true
    });
    handlers.push(() => chapter2_alianza_montoya());
  } else {
    choices.push({
      text: '💶 Ofrecer un trato económico: pagar más tasa a cambio de mantener los puestos.',
      hint: 'Cuesta 40 pavos. Puede funcionar.',
    });
    handlers.push(() => chapter2_soborno_legal());
  }

  currentChoiceHandlers = handlers;
  renderChoices(choices);
}

function chapter2_negociar() {
  const penaltyActivo = GameState.flags.pegastePolicia;
  const exito = penaltyActivo ? rand(1, 10) <= 4 : rand(1, 10) <= 7;

  addHistory(exito ? 'Negociaste como un jefe en la Junta.' : 'La negociación se fue al garete.' + (penaltyActivo ? ' (La pasma te boicoteó)' : ''));

  if (exito) {
    modStat('honra', 10);
    modStat('recursos', -15);
    modFaction('ayuntamiento', 20);

    renderNarrative(`
      <div class="event-date">Capítulo II — Negociación</div>
      <h2 class="event-title">Las Palabras Justas</h2>
      <p class="narrative-text">
        Te levantas. Hablas despacio, sin gritar, como quien sirve el vino en la mesa.
      </p>
      <p class="narrative-text">
        <em>"Con el respeto que merezco y el que les corresponde: llevamos quince años pagando la tasa sin un solo retraso. Hemos sido parte del tejido comercial de este barrio cuando nadie quería invertir aquí. Si hay revisión, que sea justa, y que empiece por quien no lleva ni tres años."</em>
      </p>
      <p class="narrative-text">
        El concejal se aclara la garganta. La funcionaria de la derecha toma notas con más atención.
      </p>
      <p class="narrative-text">
        Al final: mantienes tres de los cuatro puestos amenazados. El cuarto queda en revisión. No está mal.
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
      <div class="event-date">Capítulo II — Negociación fallida</div>
      <h2 class="event-title">La Trampa</h2>
      <p class="narrative-text">
        Intentas hablar, pero ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span> interrumpe con un comentario sobre "antecedentes de altercados en vía pública". El concejal lo apunta.
      </p>
      <p class="narrative-text">
        La reunión se tuerce. El Chato sonríe desde su silla. Pierdes dos puestos. El Toni no va a estar contento.
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-down">⭐ -5 Honra</span>
        <span class="stat-change stat-down">🏛️ -10 Ayuntamiento</span>
        <span class="stat-change stat-down">👮 -15 Policía</span>
        <br><span class="narrative-danger">La bronca del mercadillo te ha pasado factura.</span>
      </p>
      ${GameState.flags.pegastePolicia ? '<div class="cultural-note">⚠️ <b>Consecuencia:</b> Pegar a un policía antes ha hecho que negociar sea mucho más difícil. Las decisiones importan, makina.</div>' : ''}
    `);
  }

  // Nueva decisión después de la negociación
  renderNarrative(`
    <p class="narrative-text">
      ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> te espera en la puerta de la Junta. <em>"He visto al Chato salir con cara de pocos amigos. ¿Qué ha pasado ahí dentro? ¿Hay que prepararse para algo gordo?"</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter2_postnegociacion_tranquilizar(),
    () => chapter2_postnegociacion_alerta(),
    () => chapter2_postnegociacion_indiferencia()
  ];

  renderChoices([
    {
      text: '😌 Tranquilizar al tío Antonio. Todo está bajo control.',
      hint: 'Mantienes la calma en el clan.',
    },
    {
      text: '⚠️ Advertir que hay que estar preparados por si acaso.',
      hint: 'El clan se pone en alerta, posible mejora de combate.',
      danger: true
    },
    {
      text: '🤷 Quitarle importancia. No es para tanto.',
      hint: 'Puede que el clan se confíe demasiado.',
    }
  ]);
}

function chapter2_postnegociacion_tranquilizar() {
  addHistory('Tranquilizaste al tío Antonio tras la reunión.');
  modStat('diplomacia', 3);
  chapter2_escala_conflicto();
}

function chapter2_postnegociacion_alerta() {
  addHistory('Pusiste al clan en alerta tras la reunión.');
  modStat('combate', 3);
  chapter2_escala_conflicto();
}

function chapter2_postnegociacion_indiferencia() {
  addHistory('Quitas importancia a la reunión delante del tío Antonio.');
  chapter2_escala_conflicto();
}


function chapter2_usar_informacion() {
  addHistory('Soltaste los trapos sucios del Chato en la reunión. ¡Bomba!');
  modStat('honra', 15);
  modStat('recursos', 10);
  modFaction('ayuntamiento', 15);
  modFaction('payos', -20);
  GameState.flags.clanRicoReputacion = true;

  renderNarrative(`
    <div class="event-date">Capítulo II — Jugada Maestra</div>
    <h2 class="event-title">El Papel que Todo lo Dice</h2>
    <p class="narrative-text">
      En el momento justo, abres la carpeta y deslizas las fotocopias por la mesa hacia el concejal. No dices ni mu. Solo señalas los papeles.
    </p>
    <p class="narrative-text">
      Silencio de cinco segundos eternos. ${personajeImg('chatoRuiz')} <span class="narrative-char">El Chato</span> se levanta de golpe.
    </p>
    <p class="narrative-text">
      <em>"¡Eso es mentira, son documentos falsos!"</em>
    </p>
    <p class="narrative-text">
      <em>"Siéntese, por favor."</em> —dice la funcionaria. Toma los papeles, los examina. Pide un receso de diez minutos.
    </p>
    <p class="narrative-text">
      El receso dura cuarenta minutos. Cuando vuelven, el concejal parece un flan. Los puestos del clan se mantienen todos. La revisión de permisos se suspende.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +15 Honra</span>
      <span class="stat-change stat-up">💶 +10 Parné (puestos asegurados)</span>
      <span class="stat-change stat-up">🏛️ +15 Ayuntamiento</span>
      <span class="stat-change stat-down">😤 -20 Payos (el Chato te odia más que nunca)</span>
    </p>
    <p class="narrative-text">
      El Chato te mira al salir: <em>"Ya nos veremos, gitanico..."</em>
    </p>
  `);

  renderContinue('▶ Continuar — El Chato no se rinde', 'chapter2_escala_conflicto()');
}

function chapter2_protestar() {
  addHistory('Protestaste como un campeón en la Junta.');
  modFaction('ayuntamiento', -15);
  modStat('honra', 5);

  renderNarrative(`
    <div class="event-date">Capítulo II — Protesta</div>
    <h2 class="event-title">La Voz que No Calla</h2>
    <p class="narrative-text">
      <em>"¡Un momento! Quiero saber por qué este señor está aquí sentado en una reunión oficial si tiene intereses directos en el resultado."</em>
    </p>
    <p class="narrative-text">
      El concejal parpadea. La Encarna te desliza una nota: <em>"Bien, sigue."</em>
    </p>
    <p class="narrative-text">
      La reunión se alarga dos horas más. Al final, el Chato tiene que salir de la sala. Los puestos se mantienen provisionalmente.
    </p>
    <p class="narrative-text">
      No es una victoria total, pero tampoco es una derrota.
      <span class="stat-change stat-up">⭐ +5 Honra</span>
      <span class="stat-change stat-down">🏛️ -15 Ayuntamiento</span>
    </p>
  `);

  renderContinue('▶ Continuar — El conflicto se calienta', 'chapter2_escala_conflicto()');
}

function chapter2_alianza_montoya() {
  addHistory('Llamaste al Clan Montoya para que te apoyara. ¡Unión calé!');
  modStat('honra', 12);
  modStat('alianzas', 1);
  modFaction('clanes', 10);
  modFaction('ayuntamiento', 10);

  renderNarrative(`
    <div class="event-date">Capítulo II — La Alianza</div>
    <h2 class="event-title">Unidos por el Camino</h2>
    <p class="narrative-text">
      Cuando el representante del <span class="narrative-char">Clan Montoya</span> entra, la cosa cambia. Dos familias, con su peso y su historia. El concejal ya no parece tan seguro.
    </p>
    <p class="narrative-text">
      <span class="narrative-char">El Rafaelillo Montoya</span> explica que ellos también tienen puestos amenazados y han contratado abogado. La reunión cambia de tono.
    </p>
    <p class="narrative-text">
      Al final: todos los puestos se mantienen. La revisión se pospone seis meses. El Chato sale echando humo.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +12 Honra</span>
      <span class="stat-change stat-up">🤝 +1 Alianza (Clan Montoya)</span>
      <span class="stat-change stat-up">🔥 +10 con Otros Clanes</span>
    </p>
  `);

  // Nueva escena: el Montoya te invita a una celebración
  renderNarrative(`
    <p class="narrative-text">
      El Rafaelillo Montoya te invita a una pequeña fiesta en su barrio para celebrar la alianza. <em>"Ven con los tuyos, así nos conocemos mejor."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter2_postmontoya_aceptar(),
    () => chapter2_postmontoya_rechazar()
  ];

  renderChoices([
    {
      text: '🎉 Aceptar la invitación. Es bueno estrechar lazos.',
      hint: 'Refuerzas la alianza con los Montoya.',
      good: true
    },
    {
      text: '🙅 Rechazar amablemente. Prefiero mantenerme neutral.',
      hint: 'Evitas compromisos, pero la alianza se enfría un poco.',
    }
  ]);
}

function chapter2_postmontoya_aceptar() {
  addHistory('Aceptaste la invitación del Clan Montoya. La alianza se fortalece.');
  modFaction('clanes', 5);
  renderContinue('▶ Continuar — El Chato trama algo', 'chapter2_escala_conflicto()');
}

function chapter2_postmontoya_rechazar() {
  addHistory('Rechazaste la invitación del Clan Montoya.');
  modFaction('clanes', -2);
  renderContinue('▶ Continuar — El Chato trama algo', 'chapter2_escala_conflicto()');
}


function chapter2_soborno_legal() {
  if (GameState.stats.recursos < 40) {
    showNotification('No tienes suficiente parné, makina.', 'bad');
    return;
  }

  // REINICIO CAPÍTULO 2
  if (GameState.flags.pegastePolicia && rand(1, 10) <= 4) {
    renderNarrative(`
      <div class="event-date">Capítulo II — El Acuerdo</div>
      <h2 class="event-title">Te han pillao</h2>
      <p class="narrative-text">
        Intentas sobornar al concejal, pero el agente Torres estaba vigilando. Te pilla con las manos en la masa.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">Te arrestan por soborno. El clan se desmorona. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo II', 'restartChapter2()');
    return;
  }

  addHistory('Pagaste un trato al Ayuntamiento. El dinero abre puertas.');
  modStat('recursos', -40);
  modFaction('ayuntamiento', 25);
  GameState.flags.sobornoPagado = true;

  renderNarrative(`
    <div class="event-date">Capítulo II — El Acuerdo</div>
    <h2 class="event-title">El Parné Habla</h2>
    <p class="narrative-text">
      Al acabar la parte oficial, pides hablar a solas con el concejal. Le deslizas un sobre con la propuesta: pago adelantado de seis meses de tasa, más un diez por ciento extra.
    </p>
    <p class="narrative-text">
      El concejal mira el sobre, lo guarda, y dice: <em>"Revisaremos su caso con mucha atención."</em>
    </p>
    <p class="narrative-text">
      Una semana después: los puestos se mantienen. Sin dar explicaciones.
      <span class="stat-change stat-down">💶 -40 Parné</span>
      <span class="stat-change stat-up">🏛️ +25 Ayuntamiento</span>
    </p>
  `);

  renderContinue('▶ Continuar — El Chato no se rinde', 'chapter2_escala_conflicto()');
}

function chapter2_escala_conflicto() {
  updateStats();
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Capítulo II — La Escalada</div>
    <h2 class="event-title">La Respuesta del Chato</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🌙</span>
      <div class="image-overlay-text">Las calles del barrio, de madrugada</div>
    </div>
    <p class="narrative-text">
      ${personajeImg('chatoRuiz')} <span class="narrative-char">El Chato</span> no es de los que se están quietos. Una semana después, ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> aparece con el labio partido y la recaudación robada. Dos matones que nadie conoce.
    </p>
    <p class="narrative-text">
      No hay duda de quién dio la orden.
    </p>
    <p class="narrative-text">
      ${personajeImg('tioAntonio')} <span class="narrative-char">Tu tío Antonio</span>, que lleva cuarenta años en el barrio y ha visto de todo, te dice: <em>"${GameState.playerName}, esto ya no se arregla con palabras. Decide cómo respondemos, porque lo que hagas hoy definirá al clan durante años."</em>
    </p>
    ${GameState.stats.honra < 40 ? `
    <p class="narrative-text">
      <span class="narrative-danger">⚠️ Tu Honra está baja. Algunos en el clan ya murmuran. Tienes que actuar con firmeza.</span>
    </p>
    ` : ''}
    <p class="narrative-text">
      Toca seguir la <span class="narrative-emph">Ley del Camino</span>: aviso, mediación y, si no hay remedio, duelo.
    </p>
  `);

  GameState.flags.clanRivalActivo = true;
  renderContinue('▶ Fase 1: El Aviso', 'startPhase1ConflictoRival()');
}



// ════════════════════════════════════════
// EL CONFLICTO CON EL RIVAL — 3 FASES
// ════════════════════════════════════════
function startPhase1ConflictoRival() {
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Conflicto — Fase 1</div>
    <h2 class="event-title">⚖️ El Aviso</h2>
    <p class="narrative-text">
      Según la <span class="narrative-emph">Ley del Camino</span>, el primer paso es enviar un representante a comunicar formalmente el agravio. Es un gesto de respeto, incluso hacia el rival. Viene a decir: <em>"Sabemos lo que has hecho. Te damos la oportunidad de responder con honra."</em>
    </p>
    <p class="narrative-text">
      Quién envíes y cómo ya es un mensaje en sí mismo.
    </p>
  `);

  currentChoiceHandlers = [
    () => phase1_enviarMiguelito(),
    () => phase1_enviarEncarna(),
    () => phase1_irTuMismo(),
  ];

  renderChoices([
    {
      text: '💪 Enviar al Miguelito, para que vea con quién se juega.',
      hint: 'Mensaje intimidante. Puede resolver o escalar.',
      danger: true
    },
    {
      text: '📜 Enviar a La Encarna, que sabe hablar en legal.',
      hint: 'Mensaje civilizado. Baja probabilidad de violencia.',
      good: true
    },
    {
      text: '👑 Ir tú mismo. Es la máxima señal de que esto va en serio.',
      hint: 'Alto riesgo personal. Alta ganancia de Honra.',
    }
  ]);
}

function phase1_enviarMiguelito() {
  addHistory('Enviaste a Miguelito como aviso. Matón pero efectivo.');
  modStat('intimidacion', 10);
  modFaction('payos', -10);

  renderNarrative(`
    <div class="event-date">Fase 1 — El Aviso</div>
    <h2 class="event-title">El Mensaje de los Puños</h2>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> se planta en el negocio del Chato con su cara de pocos amigos. Le suelta el mensaje: <em>"El ${GameState.playerName} y el ${GameState.clanData.nombre} saben lo que hiciste. Tienes tres días para responder con honra."</em>
    </p>
    <p class="narrative-text">
      El Chato se ríe. Le dice que se vaya a la mierda y que "ya hablará con sus abogados".
    </p>
    <p class="narrative-text">
      El aviso fracasa. Habrá que buscar mediación.
    </p>
  `);

  renderContinue('▶ Fase 2: La Mediación', 'startPhase2ConflictoRival()');
}

function phase1_enviarEncarna() {
  addHistory('Enviaste a La Encarna como aviso. Elegante y legal.');
  modStat('diplomacia', 8);
  modStat('honra', 5);

  renderNarrative(`
    <div class="event-date">Fase 1 — El Aviso</div>
    <h2 class="event-title">La Palabra que Pesa</h2>
    <p class="narrative-text">
      ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span> se presenta con toda la dignidad del mundo. Le habla al Chato de responsabilidad civil, de testigos, de la documentación que tenéis. Le habla como quien sabe de leyes.
    </p>
    <p class="narrative-text">
      El Chato está incómodo. No se lo esperaba. Pide tiempo para consultar con su socio.
    </p>
    <p class="narrative-text">
      Resultado: no hay disculpa, pero tampoco escalada inmediata. El proceso sigue.
      <span class="stat-change stat-up">⭐ +5 Honra</span>
      <span class="stat-change stat-up">🧠 +8 Diplomacia</span>
    </p>
  `);

  renderContinue('▶ Fase 2: La Mediación', 'startPhase2ConflictoRival()');
}

function phase1_irTuMismo() {
  addHistory('Fuiste tú mismo a dar la cara. Respeto máximo.');
  modStat('honra', 12);
  modFaction('payos', -5);

  renderNarrative(`
    <div class="event-date">Fase 1 — El Aviso</div>
    <h2 class="event-title">El Cara a Cara</h2>
    <p class="narrative-text">
      Vas solo. Sin escolta. Eso ya es un mensaje: no necesitas a nadie que te proteja.
    </p>
    <p class="narrative-text">
      ${personajeImg('chatoRuiz')} <span class="narrative-char">El Chato</span> te recibe con cara de sorpresa. Le miras a los ojos:
    </p>
    <p class="narrative-text">
      <em>"Tú y yo sabemos lo que pasó. No he venido a amenazarte. He venido a darte la oportunidad de ser hombre. Tienes tres días."</em>
    </p>
    <p class="narrative-text">
      Se te queda mirando un rato largo. Luego dice que lo pensará.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +12 Honra</span> El clan lo sabrá. Eres de los que se plantan.
    </p>
  `);

  renderContinue('▶ Fase 2: La Mediación', 'startPhase2ConflictoRival()');
}

function startPhase2ConflictoRival() {
  renderNarrative(`
    <div class="event-date">Conflicto — Fase 2</div>
    <h2 class="event-title">⚖️ La Mediación</h2>
    <p class="narrative-text">
      ${personajeImg('viejoSebastian')} <span class="narrative-char">El Viejo Sebastián</span>, patriarca del Clan Romero y respetado en todo Madrid, acepta mediar. Tiene ochenta años, bastón y una palabra que vale más que un contrato.
    </p>
    <p class="narrative-text">
      Propone juntarse en la trastienda del bar de siempre, terreno neutral. Condiciones: el Chato pagará el dinero robado al Miguelito con un recargo del 20% como compensación de honor.
    </p>
    <p class="narrative-text">
      El Chato, sorprendentemente, acepta la mediación. Algo le preocupa.
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> La figura del <i>anciano mediador</i> en los conflictos gitanos es central. Su autoridad viene del respeto y de ser visto como justo por todas las partes. Sigue vigente hoy en muchas comunidades gitanas españolas.
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
      hint: '+Honra. Cierra el conflicto sin pelea.',
      good: true
    },
    {
      text: '🤝 Aceptar el dinero pero exigir también una disculpa pública en el mercadillo.',
      hint: 'Puede que el Chato se niegue y acabe en duelo.',
    },
    {
      text: '❌ Rechazar la mediación. Solo un duelo lo arregla.',
      hint: 'Directo a la pelea. Alta Honra si ganas.',
      danger: true
    }
  ]);
}

function phase2_aceptar_terminos() {
  addHistory('Aceptaste los términos del Viejo Sebastián. Conflicto resuelto con honor.');
  modStat('honra', 15);
  modStat('recursos', 20);
  modFaction('clanes', 10);
  GameState.flags.clanRivalActivo = false;

  renderNarrative(`
    <div class="event-date">Fase 2 — Resolución</div>
    <h2 class="event-title">La Paz Ganada</h2>
    <p class="narrative-text">
      Estrechas la mano. ${personajeImg('viejoSebastian')} <span class="narrative-char">Sebastián</span> asiente. El Chato parece incómodo pero paga esa misma tarde.
    </p>
    <p class="narrative-text">
      Hay conflictos que se ganan pegando y otros con inteligencia. Este lo has ganado siendo más listo.
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
  addHistory(exito ? 'Exigiste más en la mediación y conseguiste la disculpa.' : 'La exigencia de más rompió la mediación.');

  if (exito) {
    modStat('honra', 20);
    modStat('recursos', 15);
    modFaction('clanes', 15);

    renderNarrative(`
      <div class="event-date">Fase 2 — Victoria Completa</div>
      <h2 class="event-title">La Disculpa Ante Todos</h2>
      <p class="narrative-text">
        Contra todo pronóstico, el Chato acepta. El Viejo Sebastián le ha convencido de que una disculpa pública es mejor que lo que se le viene encima si no.
      </p>
      <p class="narrative-text">
        Tres días después, en el mercadillo, delante de todo el barrio, el Chato se acerca al Miguelito y le suelta en voz alta que lo que pasó fue un error y que lo lamenta.
      </p>
      <p class="narrative-text">
        No suena muy sincero, pero la gente lo ha oído. La Ley del Camino ha funcionado.
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
        El Chato se levanta de golpe: <em>"¿Disculpa pública? ${pick(INSULTOS_PAYOS)} ¡Esto se ha acabado!"</em>
      </p>
      <p class="narrative-text">
        La mediación se rompe. El Viejo Sebastián te mira con pena. Ya no hay vuelta atrás. Solo queda el duelo.
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
      ${personajeImg('viejoSebastian')} <span class="narrative-char">El Viejo Sebastián</span> te mira largamente. Asiente despacio. Él también sabe cuándo las cosas solo se arreglan de una manera.
    </p>
    <p class="narrative-text">
      <em>"Que sea justo entonces. Un hombre de cada parte. Al amanecer, en la explanada del polígono."</em>
    </p>
    <p class="narrative-text">
      El aviso llega a los dos clanes esta tarde. Mañana se verá quién es quién.
    </p>
  `);

  renderContinue('▶ Fase 3: El Duelo al Amanecer', 'startCombat_fase3()');
}

// ════════════════════════════════════════
// SISTEMA DE COMBATE (con evento ¡Policía!)
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
    policeInterrupt: false
  };

  const c = GameState.combat;

  document.getElementById('playerFighterName').textContent = name;
  document.getElementById('enemyFighterName').textContent = c.enemyName;
  document.getElementById('playerFighterImg').src = GameState.personajes.jugador.img;
  document.getElementById('enemyFighterImg').src = getEnemyImgUrl(c.enemyName);
  document.getElementById('playerHP').textContent = c.playerHP;
  document.getElementById('enemyHP').textContent = c.enemyHP;
  document.getElementById('roundNum').textContent = c.round;
  document.getElementById('playerHealth').style.width = '100%';
  document.getElementById('enemyHealth').style.width = '100%';
  document.getElementById('combatTitle').textContent = '⚔️ EL DUELO';
  document.getElementById('combatSubtitle').textContent = 'La navaja silba en el aire del amanecer de Canillejas';

  const logEl = document.getElementById('combatLog');
  logEl.innerHTML = '';
  addCombatLog(`${name} se planta frente a ${c.enemyName}. La explanada del polígono huele a tierra húmeda y gasolina.`);
  addCombatLog(`${pick(EXPRESIONES_GITANAS)}. El corazón te late fuerte, pero los pies están clavados en el suelo.`);

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
      playerMsg = `💥 ¡CRÍTICO! ${name} suelta un golpe con toda la furia del clan. ${c.enemyName} se tambalea. (-${playerDamage} HP)`;
    } else if (roll <= 3) {
      playerDamage = 0;
      playerMsg = `💨 ${name} falla el golpe. ${c.enemyName} se aparta a tiempo.`;
    } else {
      playerMsg = `👊 ${name} golpea de lleno. ${c.enemyName} gruñe. (-${playerDamage} HP)`;
    }
    c.stamina = Math.max(0, c.stamina - 15);
  }

  if (action === 'dodge') {
    const incoming = rand(10, 25);
    if (roll >= 14) {
      playerDamage = rand(20, 35);
      enemyDamage = Math.floor(incoming * 0.3);
      playerMsg = `💨 ${name} esquiva con estilo y contraataca. ¡Duende en los pies! (-${playerDamage} HP al rival, -${enemyDamage} HP a ti)`;
    } else {
      enemyDamage = Math.floor(incoming * 0.6);
      playerDamage = rand(5, 15);
      playerMsg = `💨 Esquiva parcial. ${name} evita lo peor pero recibe un roce. (-${enemyDamage} HP, contraataca -${playerDamage} HP)`;
    }
  }

  if (action === 'bluff') {
    const repDiff = c.playerRep - c.enemyRep;
    if (repDiff > 20 || roll >= 15) {
      playerMsg = `😈 ${name} avanza y susurra algo al oído de ${c.enemyName}. El rival palidece. `;
      if (roll >= 18 || repDiff > 40) {
        c.enemyHP = 0;
        addCombatLog(playerMsg + `${c.enemyName} retrocede, se gira y sale corriendo. ¡Ha huido!`);
        updateHealthBars();
        setTimeout(() => resolveCombat(true, 'huida'), 1500);
        return;
      } else {
        enemyDamage = 0;
        playerDamage = rand(10, 20);
        playerMsg += `Se queda helado un momento. Aprovechas para golpear. (-${playerDamage} HP)`;
      }
    } else {
      enemyDamage = rand(20, 35);
      playerMsg = `😤 El farol no cuela. ${c.enemyName} se ríe: "${pick(INSULTOS_GITANOS)}" y te suelta un golpe. (-${enemyDamage} HP a ti)`;
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
          enemyMsg = `💥 ${c.enemyName} te lanza un golpe bestial. (-${eDmg} HP)`;
        } else if (eRoll <= 3) {
          eDmg = 0;
          enemyMsg = `💨 ${c.enemyName} falla el golpe. Los nervios le traicionan.`;
        } else {
          enemyMsg = `😤 ${c.enemyName} te da donde duele. (-${eDmg} HP)`;
        }
        c.playerHP -= eDmg;
      } else {
        enemyMsg = `💨 ${c.enemyName} retrocede buscando una abertura.`;
      }

      if (enemyMsg) addCombatLog(enemyMsg);
      if (action !== 'dodge' && enemyDamage > 0) {
        c.playerHP -= enemyDamage;
      }
    }

    c.round++;
    updateHealthBars();

    // ¡Evento inesperado! Posibilidad de que aparezca la pasma
    if (!c.policeInterrupt && c.round === 3 && rand(1, 10) <= 4) {
      c.policeInterrupt = true;
      addCombatLog('🚨 ¡De repente, sirenas! Dos coches de policía aparecen en la explanada.');
      addCombatLog('El agente Torres grita: "¡Alto! ¡Se acabó el espectáculo!"');
      document.querySelectorAll('#combatActions .btn').forEach(b => b.disabled = true);
      setTimeout(() => policeInterruption(), 1500);
      return;
    }

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

function policeInterruption() {
  const c = GameState.combat;
  const name = GameState.playerName;
  document.getElementById('combatLog').innerHTML += '<p class="combat-log-line">🚔 La pasma os tiene rodeados. ¿Qué haces?</p>';

  const actions = document.getElementById('combatActions');
  actions.innerHTML = `
    <button class="btn btn-warning flex-fill" onclick="policeAction('sobornar')"><i class="fas fa-euro-sign"></i> SOBORNAR</button>
    <button class="btn btn-primary flex-fill" onclick="policeAction('correr')"><i class="fas fa-running"></i> CORRER</button>
    <button class="btn btn-danger flex-fill" onclick="policeAction('enfrentar')"><i class="fas fa-fist-raised"></i> ENFRENTAR</button>
  `;
}

function policeAction(action) {
  const c = GameState.combat;
  const name = GameState.playerName;
  const clan = GameState.clanData;

  if (action === 'sobornar') {
    if (GameState.stats.recursos >= 30) {
      modStat('recursos', -30);
      addCombatLog('Le pasas un fajo de billetes en un apretón de manos al agente Torres.');
      addCombatLog('"No hemos visto nada. Largo de aquí." —dice Torres.');
      modFaction('policia', 5);
      setTimeout(() => resolveCombat(null, 'interrumpido_policia'), 1000);
    } else {
      addCombatLog('Intentas sobornar pero no tienes suficiente parné. Torres se ríe.');
      addCombatLog('"Me debes una, gitanico." Te deja ir pero con advertencia.');
      modFaction('policia', -10);
      setTimeout(() => resolveCombat(null, 'interrumpido_policia'), 1000);
    }
  } else if (action === 'correr') {
    addCombatLog(`${name} y ${c.enemyName} intercambian una mirada cómplice. Ambos salen corriendo por el callejón.`);
    addCombatLog('La pasma no os pilla. El duelo queda en empate técnico.');
    modFaction('policia', -5);
    setTimeout(() => resolveCombat(null, 'empate'), 1000);
  } else if (action === 'enfrentar') {
    addCombatLog('Te encaras con Torres. "Esto es un duelo legal, no tienes nada que hacer aquí."');
    addCombatLog('Torres se tensa, pero reconoce que no puede deteneros sin pruebas. Se va refunfuñando.');
    modFaction('policia', -10);
    modStat('honra', 5);
    // Reanudar combate
    c.policeInterrupt = true;
    document.getElementById('combatActions').innerHTML = `
      <button class="btn btn-danger flex-fill" onclick="combatAction('attack')"><i class="fas fa-fist-raised"></i> ATACAR</button>
      <button class="btn btn-primary flex-fill" onclick="combatAction('dodge')"><i class="fas fa-wind"></i> ESQUIVAR</button>
      <button class="btn btn-warning flex-fill" onclick="combatAction('bluff')"><i class="fas fa-face-smile"></i> FAROLEAR</button>
    `;
    document.querySelectorAll('#combatActions .btn').forEach(b => b.disabled = false);
    addCombatLog('El duelo continúa...');
  }
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
            ? `${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> ha salido corriendo. En la Ley del Camino, huir es la derrota más deshonrosa. El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> lo ha visto.`
            : `${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> está en el suelo, vencido. El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> alza tu mano.`
          }
        </p>
        <p class="narrative-text">
          En el barrio la noticia corre antes del mediodía. El ${GameState.clanData.nombre} no se toca. Y tú eres ${calóWord('juncal')}, ${name}. Digno y elegante como los buenos.
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
          ${personajeImg('chatoRuiz')} <span class="narrative-char">${c.enemyName}</span> se aleja sin decir nada. Es casi peor.
        </p>
        <p class="narrative-text">
          ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te ayuda a levantarte. No dice nada. La deuda de honor queda pendiente.
        </p>
        <p class="narrative-text">
          <span class="stat-change stat-down">⭐ -20 Honra</span>
          <span class="stat-change stat-down">👥 -1 Miembro</span>
          <span class="stat-change stat-down">🔥 -10 con Otros Clanes</span>
        </p>
        <p class="narrative-text">
          Esto no se ha acabado. La revancha está en el aire. Pero primero hay que recuperarse.
        </p>
      `);
      renderContinue('▶ Continuar al Capítulo III', 'startChapter3()');
    }, 1500);

  } else {
    // Empate o interrupción por policía
    modStat('honra', type === 'interrumpido_policia' ? 0 : 5);
    addHistory(`El duelo contra ${c.enemyName} terminó en ${type === 'interrumpido_policia' ? 'interrupción policial' : 'empate'}.`);

    addCombatLog(`═══════════════════════`);
    addCombatLog(type === 'interrumpido_policia' ? `🚔 INTERRUPCIÓN — La pasma ha cortado el duelo.` : `🤝 EMPATE — Ninguno puede más.`);

    setTimeout(() => {
      showScreen('game');
      updateStats();
      renderNarrative(`
        <div class="event-date">El Duelo — ${type === 'interrumpido_policia' ? 'Interrupción' : 'Empate'}</div>
        <h2 class="event-title">${type === 'interrumpido_policia' ? 'La Pasma en Medio' : 'Los Dos Cansados'}</h2>
        <p class="narrative-text">
          ${type === 'interrumpido_policia'
            ? `La policía ha disuelto el duelo. No hay ganador ni perdedor, pero todo el barrio se ha enterado del enfrentamiento. El Chato y tú os habéis visto las caras.`
            : `Después de ocho rondas, los dos estáis reventados. El ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> interviene: <em>"Ya está. Los dos habéis demostrado lo que sois. No hay ganador ni perdedor hoy."</em>`
          }
        </p>
        <p class="narrative-text">
          La cosa no se resuelve, pero al menos no has perdido la honra.
          <span class="stat-change stat-up">⭐ +5 Honra</span>
        </p>
      `);
      renderContinue('▶ Continuar al Capítulo III', 'startChapter3()');
    }, 1500);
  }
}
function restartChapter1() {
  restoreCurrentState();
  startChapter1();
}

function restartChapter2() {
  restoreCurrentState();
  startChapter2();
}
