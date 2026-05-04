/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULOS 3 y 4 v5.0 (San Blas Edition)
   Extendidos con más decisiones y eventos obligatorios
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
    renderContinue('🔄 Reiniciar Capítulo III', restartChapter3);
    return;
  }

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

  // Nueva escena obligatoria: discusión con el tío Antonio
  chapter3_discusion_familiar();
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
  chapter3_discusion_familiar();
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

  chapter3_discusion_familiar();
}

// ═══ ESCENA OBLIGATORIA: DISCUSIÓN CON EL TÍO ANTONIO ═══
function chapter3_discusion_familiar() {
  renderNarrative(`
    <div class="event-date">San Blas — Esa misma noche</div>
    <h2 class="event-title">Las Grietas del Clan</h2>
    <p class="narrative-text">
      ${personajeImg('tioAntonio')} <span class="narrative-char">El tío Antonio</span> se te planta delante en la cocina, con el cigarro en la mano y la mirada encendida. <em>"Llevo cuarenta años en este barrio y he visto cómo tu padre levantó este clan. No voy a dejar que lo tires por la borda con decisiones de chiquillo."</em>
    </p>
    <p class="narrative-text">
      Algunos familiares se han reunido alrededor. Unos apoyan al tío Antonio, otros te miran a ti esperando una respuesta. La tensión se masca.
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter3_calar_antonio(),
    () => chapter3_enfrentar_antonio(),
    () => chapter3_ignorar_antonio()
  ];

  renderChoices([
    {
      text: '🤲 Calmar al tío Antonio. Recordarle que todos remamos en la misma dirección.',
      hint: 'Mejora la diplomacia y la unidad del clan.',
      good: true
    },
    {
      text: '😤 Plantarle cara. Aquí el que manda eres tú.',
      hint: 'Ganas respeto por autoridad, pero el tío se resiente.',
      danger: true
    },
    {
      text: '🙄 Ignorarle. Bastante tengo yo con mis problemas.',
      hint: 'El tío Antonio se siente despreciado. Puede causar problemas más adelante.',
    }
  ]);
}

function chapter3_calar_antonio() {
  addHistory('Calmaste al tío Antonio con palabras sabias.');
  modStat('diplomacia', 5);
  modStat('honra', 3);

  renderNarrative(`
    <p class="narrative-text">
      Le pones la mano en el hombro. <em>"Tío, yo respeto todo lo que has hecho por este clan. Pero los tiempos cambian, y las decisiones no siempre son fáciles. Confía en mí, como confiaste en mi padre."</em>
    </p>
    <p class="narrative-text">
      El tío Antonio resopla, apaga el cigarro y te da un abrazo torpe. <em>"Está bien, muchacho. Pero no me la juegues."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🧠 +5 Diplomacia</span>
    </p>
  `);

  // Después de la discusión, evento intermedio antes del romance
  chapter3_evento_intermedio();
}

function chapter3_enfrentar_antonio() {
  addHistory('Te enfrentaste al tío Antonio. Tensión familiar.');
  modStat('intimidacion', 5);
  modFaction('clanes', -3);

  renderNarrative(`
    <p class="narrative-text">
      <em>"Tío, te respeto, pero las decisiones las tomo yo. Si no te gusta, ya sabes dónde está la puerta."</em>
    </p>
    <p class="narrative-text">
      El tío Antonio se queda mudo. La familia murmura. Él se va dando un portazo. Sigue en el clan, pero la herida queda abierta.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">😈 +5 Intimidación</span>
      <span class="stat-change stat-down">🔥 -3 con Otros Clanes</span>
    </p>
  `);

  chapter3_evento_intermedio();
}

function chapter3_ignorar_antonio() {
  addHistory('Ignoraste al tío Antonio. Se sintió despreciado.');
  modStat('honra', -3);

  renderNarrative(`
    <p class="narrative-text">
      Pasas de largo sin decir nada. El tío Antonio se queda con la palabra en la boca. Esa noche no cena con el resto de la familia.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">⭐ -3 Honra</span>
    </p>
  `);

  chapter3_evento_intermedio();
}

// ═══ EVENTO INTERMEDIO OBLIGATORIO ═══
function chapter3_evento_intermedio() {
  renderNarrative(`
    <div class="event-date">San Blas — Días después</div>
    <h2 class="event-title">La vida sigue en el barrio</h2>
    <p class="narrative-text">
      Mientras esperas noticias de Tomás y meditas sobre la decisión, ${personajeImg('miguelito')} te arrastra al bar de la plaza. <em>"Primo, que no todo es trabajar. Vente a tomar algo, que te veo muy serio."</em>
    </p>
    <p class="narrative-text">
      Allí coincidís con unos payos del barrio que no os miran mal. Uno se te acerca y te dice: <em>"Oye, siento lo del mercadillo. No todos pensamos igual."</em> Es un gesto pequeño, pero importante.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">😤 +3 Payos</span>
    </p>
  `);
  modFaction('payos', 3);
  renderContinue('▶ Continuar — La Lola y su amor prohibido', startRomanceLola);
}

// ═══ NUEVA ESCENA: CONFLICTO VECINAL (se mantiene igual) ═══
function chapter3_conflicto_vecinal() {
  renderNarrative(`
    <div class="event-date">San Blas — Una semana después</div>
    <h2 class="event-title">Fiesta y quejas</h2>
    <p class="narrative-text">
      Celebráis una fiesta en el barrio por el cumpleaños de la abuela. Cante, baile y una paella enorme. Pero a las dos de la mañana, un vecino nuevo, un payo que se ha mudado hace poco al bloque de al lado, llama a la policía por ruidos.
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> está que trina: <em>"¡Pero si llevamos toda la vida haciendo fiestas! ¡Este payo no tiene sangre!"</em>
    </p>
    <p class="narrative-text">
      La policía no ha llegado todavía, pero sabes que el agente Torres no tardará si el vecino insiste. ¿Cómo manejas la situación?
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter3_fiesta_disculparse(),
    () => chapter3_fiesta_plantarcara(),
    () => chapter3_fiesta_invitar()
  ];

  renderChoices([
    {
      text: '🙇 Ir a disculparte con el vecino antes de que llegue la pasma.',
      hint: 'Diplomacia pura. Evitas problemas.',
      good: true
    },
    {
      text: '😤 Plantarle cara al vecino. Que aprenda cómo funcionan las cosas aquí.',
      hint: 'Intimidación. Puede acabar mal.',
      danger: true
    },
    {
      text: '🍷 Invitar al vecino a la fiesta. Si no puedes con él, únetelo.',
      hint: 'Original. Puede convertir un enemigo en aliado.',
    }
  ]);
}

function chapter3_fiesta_disculparse() {
  addHistory('Te disculpaste con el vecino antes de que llamara a la policía.');
  modStat('diplomacia', 3);
  modFaction('payos', 5);

  renderNarrative(`
    <p class="narrative-text">
      Llamas al interfono del vecino y le dices que lamentáis el ruido, que la fiesta terminará en media hora. El vecino, descolocado, acepta.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🧠 +3 Diplomacia</span>
      <span class="stat-change stat-up">😤 +5 Payos</span>
    </p>
  `);

  renderContinue('▶ Continuar — El barrio se caldea', chapter3_barrio_tenso);
}

function chapter3_fiesta_plantarcara() {
  addHistory('Le plantaste cara al vecino. Casi acaba en pelea.');
  modStat('intimidacion', 5);
  modFaction('payos', -10);

  renderNarrative(`
    <p class="narrative-text">
      Subes al piso del vecino y le dejas claro que las fiestas son parte del barrio. El vecino se acojona y cierra la puerta. Pero sabes que esto no va a quedar así.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">😈 +5 Intimidación</span>
      <span class="stat-change stat-down">😤 -10 Payos</span>
    </p>
  `);

  renderContinue('▶ Continuar — El barrio se caldea', chapter3_barrio_tenso);
}

function chapter3_fiesta_invitar() {
  addHistory('Invitaste al vecino a la fiesta. Un payo menos amargado.');
  modStat('diplomacia', 5);
  modFaction('payos', 10);

  renderNarrative(`
    <p class="narrative-text">
      Le subes un plato de paella y una botella de vino. <em>"Vecino, si no puedes con el ruido, únete. Esto es San Blas, y aquí compartimos hasta las quejas."</em>
    </p>
    <p class="narrative-text">
      El vecino, entre sorprendido y abrumado, baja a la fiesta. Acaba bailando con la abuela. Al día siguiente, quita la denuncia.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🧠 +5 Diplomacia</span>
      <span class="stat-change stat-up">😤 +10 Payos</span>
    </p>
  `);

  renderContinue('▶ Continuar — El barrio se caldea', chapter3_barrio_tenso);
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

  // Nueva escena: solidaridad o conflicto tras la redada
  chapter3_postpolicia();
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
    renderContinue('🔄 Reiniciar Capítulo III', restartChapter3);
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

  chapter3_postpolicia();
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

  chapter3_postpolicia();
}

// ═══ NUEVA ESCENA: SOLIDARIDAD O CONFLICTO POST-POLICIAL ═══
function chapter3_postpolicia() {
  renderNarrative(`
    <div class="event-date">San Blas — Días después</div>
    <h2 class="event-title">El Barrio se Mueve</h2>
    <p class="narrative-text">
      La noticia de la investigación corre por el barrio. Algunos clanes vecinos se solidarizan, otros te culpan por atraer a la pasma. El Clan Montoya te envía un mensaje de apoyo.
    </p>
    <p class="narrative-text">
      ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span> te sugiere organizar una reunión con los clanes para limar asperezas. Pero también podrías centrarte solo en los tuyos.
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter3_postpolicia_reunion(),
    () => chapter3_postpolicia_ignorar(),
    () => chapter3_postpolicia_agradecer()
  ];

  renderChoices([
    {
      text: '🤝 Organizar una reunión de clanes para fortalecer lazos.',
      hint: 'Mejora las relaciones con otros clanes.',
      good: true
    },
    {
      text: '🙄 Pasar del tema. No necesito la opinión de nadie.',
      hint: 'Te aíslas un poco, pero evitas conflictos.',
    },
    {
      text: '💌 Agradecer el apoyo y seguir con lo nuestro.',
      hint: 'Refuerzas la alianza con los Montoya, sin grandes movimientos.',
    }
  ]);
}

function chapter3_postpolicia_reunion() {
  addHistory('Organizaste una reunión de clanes tras el incidente policial.');
  modStat('diplomacia', 5);
  modFaction('clanes', 10);

  renderNarrative(`
    <p class="narrative-text">
      Convidas a representantes de tres clanes a una comida en la plaza. Se habla, se comparte y se acuerda apoyarse mutuamente frente a la pasma.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🧠 +5 Diplomacia</span>
      <span class="stat-change stat-up">🔥 +10 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo IV', startChapter4);
}

function chapter3_postpolicia_ignorar() {
  addHistory('Ignoraste las reacciones del barrio tras el incidente.');
  modFaction('clanes', -5);

  renderNarrative(`
    <p class="narrative-text">
      No dices nada. La gente murmura, pero tú sigues a lo tuyo. Algunos clanes se distancian un poco.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">🔥 -5 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo IV', startChapter4);
}

function chapter3_postpolicia_agradecer() {
  addHistory('Agradeciste el apoyo del Clan Montoya.');
  modFaction('clanes', 5);

  renderNarrative(`
    <p class="narrative-text">
      Mandas un mensaje al Rafaelillo Montoya dándole las gracias. El gesto refuerza la alianza.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🔥 +5 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo IV', startChapter4);
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

  // Fase de preparación antes de la decisión principal
  chapter4_preparacion();
}

// ═══ PREPARACIÓN OBLIGATORIA ═══
function chapter4_preparacion() {
  renderNarrative(`
    <div class="event-date">San Blas — La planificación</div>
    <h2 class="event-title">Preparando la Defensa</h2>
    <p class="narrative-text">
      Tenéis treinta días, pero los recursos son limitados. ${personajeImg('laEncarna')} <span class="narrative-char">La Encarna</span> te presenta tres opciones para empezar a preparar el terreno antes de la batalla legal o social.
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter4_prep_abogado(),
    () => chapter4_prep_soborno(),
    () => chapter4_prep_medios()
  ];

  renderChoices([
    {
      text: '⚖️ Contratar a un abogado especializado en desahucios.',
      hint: 'Cuesta 25 pavos. Mejora las probabilidades de victoria legal.',
    },
    {
      text: '💰 Intentar sobornar a un funcionario de la Junta para retrasar la orden.',
      hint: 'Cuesta 30 pavos. Arriesgado si tienes mala relación con la pasma.',
      danger: GameState.flags.pegastePolicia
    },
    {
      text: '📢 Filtrar el caso a un periódico digital para generar presión mediática.',
      hint: 'Gratis. Puede ayudar si luego usas la vía mediática.',
      good: true
    }
  ]);
}

function chapter4_prep_abogado() {
  if (GameState.stats.recursos < 25) {
    showNotification('No tienes suficiente parné para el abogado.', 'bad');
    chapter4_gran_decision();
    return;
  }
  addHistory('Contrataste un abogado especializado.');
  modStat('recursos', -25);
  GameState.flags.abogadoContratado = true;

  renderNarrative(`
    <p class="narrative-text">
      El abogado, un tipo de Almería con experiencia en desahucios, acepta el caso. Te dice que las probabilidades son mejores si el Ayuntamiento no está muy en contra.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">💶 -25 Parné</span>
    </p>
  `);

  renderContinue('▶ Continuar con la estrategia principal', chapter4_gran_decision);
}

function chapter4_prep_soborno() {
  if (GameState.stats.recursos < 30) {
    showNotification('No tienes suficiente parné para el soborno.', 'bad');
    chapter4_gran_decision();
    return;
  }
  if (GameState.flags.pegastePolicia && rand(1, 10) <= 5) {
    renderNarrative(`
      <p class="narrative-text">
        Intentas contactar con el funcionario, pero la pasma se entera. El agente Torres te para antes de que llegues. <em>"Ni se te ocurra."</em>
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">El intento de soborno fracasa por tu historial policial.</span>
      </p>
    `);
    modFaction('policia', -10);
    renderContinue('▶ Continuar con la estrategia principal', chapter4_gran_decision);
    return;
  }
  addHistory('Sobornaste a un funcionario para retrasar la orden.');
  modStat('recursos', -30);
  GameState.flags.sobornoFuncionario = true;
  modFaction('ayuntamiento', 10);

  renderNarrative(`
    <p class="narrative-text">
      El funcionario acepta el sobre. La orden se retrasará un par de semanas, ganando tiempo.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">💶 -30 Parné</span>
      <span class="stat-change stat-up">🏛️ +10 Ayuntamiento</span>
    </p>
  `);

  renderContinue('▶ Continuar con la estrategia principal', chapter4_gran_decision);
}

function chapter4_prep_medios() {
  addHistory('Filtraste el caso a un periódico digital.');
  GameState.flags.filtracionMedios = true;

  renderNarrative(`
    <p class="narrative-text">
      Un redactor de un medio digital se interesa por la historia. Te entrevista y promete publicar un artículo en los próximos días.
    </p>
  `);

  renderContinue('▶ Continuar con la estrategia principal', chapter4_gran_decision);
}

// ═══ DECISIÓN PRINCIPAL DEL CAPÍTULO 4 ═══
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

  // Ajuste de probabilidad por preparación
  let probExito = GameState.factions.ayuntamiento > 50 ? 8 : 5;
  if (GameState.flags.abogadoContratado) probExito += 2;
  if (GameState.flags.filtracionMedios) probExito += 1;
  const exito = rand(1, 10) <= probExito;

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
    renderContinue('🔄 Reiniciar Capítulo IV', restartChapter4);
    return;
  }

  // Nueva escena: traición o lealtad
  chapter4_postcrisis();
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
    renderContinue('🔄 Reiniciar Capítulo IV', restartChapter4);
    return;
  }

  chapter4_postcrisis();
}

function chapter4_medios() {
  addHistory('Llamaste a los medios para hacer viral el caso del desalojo.');
  let probExito = 6;
  if (GameState.flags.filtracionMedios) probExito += 2;
  const exito = rand(1, 10) <= probExito;

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
    renderContinue('🔄 Reiniciar Capítulo IV', restartChapter4);
    return;
  }

  chapter4_postcrisis();
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
    renderContinue('🔄 Reiniciar Capítulo IV', restartChapter4);
    return;
  }

  chapter4_postcrisis();
}

// ═══ NUEVA ESCENA: TRAICIÓN O LEALTAD ═══
function chapter4_postcrisis() {
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">San Blas — Consecuencias</div>
    <h2 class="event-title">La Lealtad Puesta a Prueba</h2>
    <p class="narrative-text">
      Tras la crisis, uno de los miembros del clan, un primo lejano llamado <span class="narrative-char">El Chico</span>, ha estado recibiendo ofertas del Chato para traicionaros. Te lo cuenta porque tiene miedo, pero también dudas.
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter4_traidor_perdonar(),
    () => chapter4_traidor_expulsar(),
    () => chapter4_traidor_vigilar()
  ];

  renderChoices([
    {
      text: '🤝 Perdonarlo. Es familia y ha sido honesto al confesarlo.',
      hint: '+Honra, refuerzas la unidad.',
      good: true
    },
    {
      text: '🚫 Expulsarlo del clan. La traición no se tolera.',
      hint: '-Miembro, pero das un escarmiento.',
      danger: true
    },
    {
      text: '👀 Hacerle vigilar al Chato. Que nos dé información a cambio.',
      hint: 'Conviertes la debilidad en ventaja.',
    }
  ]);
}

function chapter4_traidor_perdonar() {
  addHistory('Perdonaste al Chico por su honestidad.');
  modStat('honra', 8);

  renderNarrative(`
    <p class="narrative-text">
      Le das un abrazo. <em>"Gracias por decírmelo. Eso es más de lo que muchos harían."</em> El Chico se queda en el clan y se convierte en uno de los más leales.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +8 Honra</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo V — El Desenlace', startChapter5);
}

function chapter4_traidor_expulsar() {
  addHistory('Expulsaste al Chico del clan.');
  modStat('miembros', -1);
  modStat('honra', -5);

  renderNarrative(`
    <p class="narrative-text">
      Le señalas la puerta. El Chico se va cabizbajo. El clan guarda silencio. La seguridad manda.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">👥 -1 Miembro</span>
      <span class="stat-change stat-down">⭐ -5 Honra</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo V — El Desenlace', startChapter5);
}

function chapter4_traidor_vigilar() {
  addHistory('Convertiste al Chico en un infiltrado.');
  modStat('intimidacion', 5);
  modFaction('clanes', -3);

  renderNarrative(`
    <p class="narrative-text">
      <em>"Te quedas, pero a partir de ahora me cuentas todo lo que veas. Y si me la juegas..."</em> El Chico asiente nervioso. Tendrás información de primera mano.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">😈 +5 Intimidación</span>
      <span class="stat-change stat-down">🔥 -3 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Continuar al Capítulo V — El Desenlace', startChapter5);
}

// ═══ FUNCIONES DE REINICIO ═══
function restartChapter3() {
  restoreCurrentState();
  startChapter3();
}

function restartChapter4() {
  restoreCurrentState();
  startChapter4();
}
