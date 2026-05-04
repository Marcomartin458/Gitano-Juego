/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULOS 1 y 2 v5.0 (San Blas Edition)
   Extendidos con más decisiones y escenas obligatorias
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

  // NUEVO: Decisión tras la pelea
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
  chapter1_evento_intermedio();
}

function chapter1_postpelea_calmar() {
  addHistory('Hablaste con los vecinos payos para calmar los ánimos tras la pelea.');
  modFaction('payos', 10);
  modStat('diplomacia', 3);
  chapter1_evento_intermedio();
}

function chapter1_postpelea_planificar() {
  addHistory('Planificaste con el clan los siguientes pasos.');
  modStat('diplomacia', 5);
  chapter1_evento_intermedio();
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

  // Decisión extra
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
  chapter1_evento_intermedio();
}

function chapter1_postfarol_tregua() {
  addHistory('Propusiste una tregua al Chato. Tiempo ganado.');
  modStat('diplomacia', 5);
  modFaction('payos', 10);
  chapter1_evento_intermedio();
}

function chapter1_postfarol_esperar() {
  addHistory('Decidiste esperar a ver cómo reacciona el Chato.');
  chapter1_evento_intermedio();
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

  // Decisión para recuperar confianza
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
  chapter1_evento_intermedio();
}

function chapter1_postretirada_disculpa() {
  addHistory('Te disculpaste con el clan por haberte rajado.');
  modStat('diplomacia', 5);
  chapter1_evento_intermedio();
}

function chapter1_postretirada_autoridad() {
  addHistory('Intentaste imponerte por autoridad tras la retirada.');
  modStat('intimidacion', 5);
  modFaction('clanes', -3);
  chapter1_evento_intermedio();
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

  // Decisión para recuperar
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
  chapter1_evento_intermedio();
}

function chapter1_postignorar_reunion() {
  addHistory('Convocaste una reunión de emergencia para calmar al clan.');
  modStat('diplomacia', 5);
  chapter1_evento_intermedio();
}

function chapter1_postignorar_pasotismo() {
  addHistory('Seguiste ignorando los problemas del clan.');
  modStat('honra', -5);
  chapter1_evento_intermedio();
}

// ═══ EVENTO INTERMEDIO OBLIGATORIO (siempre se ejecuta) ═══
function chapter1_evento_intermedio() {
  renderNarrative(`
    <div class="event-date">San Blas — Tarde de sábado</div>
    <h2 class="event-title">La vida en el barrio</h2>
    <p class="narrative-text">
      Mientras caminas por el barrio, te encuentras a la ${personajeImg('laLola')} charlando con unas vecinas. Se acerca y te dice: <em>"Primo, he oído rumores. La gente dice que el Chato está buscando apoyos. ¿Tú crees que se atreverá a algo gordo?"</em>
    </p>
    <p class="narrative-text">
      Más tarde, ${personajeImg('viejoCurro')} te pide que te acerques a su cuarto. Te habla de los viejos tiempos, de cuando él era jefe. Sus palabras pesan, pero también reconfortan.
    </p>
  `);
  modStat('honra', 2); // pequeño bonus por la charla con el patriarca
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
// EL CONFLICTO CON EL RIVAL — 3 FASES (sin cambios respecto a la versión anterior)
// ════════════════════════════════════════
// ... (mantén aquí todas las funciones de las fases, combate, policía, etc., exactamente igual que antes)

function restartChapter1() {
  restoreCurrentState();
  startChapter1();
}

function restartChapter2() {
  restoreCurrentState();
  startChapter2();
}
