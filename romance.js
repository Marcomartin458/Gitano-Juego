/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — ROMANCE Y TRAGEDIAS GITANAS v4.0
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// EVENTO: EL AMOR PROHIBIDO DE LA LOLA
// ════════════════════════════════════════

function startRomanceLola() {
  // Este evento se dispara durante el Capítulo 3, después de la trama de Tomás
  GameState.flags.amorProhibido = true;

  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">Capítulo III — El Amor Prohibido</div>
    <h2 class="event-title">💔 La Sangre que se Mezcla</h2>
    <div class="image-placeholder">
      ${personajeImg('laLola')}
      <span class="image-placeholder-emoji">💃</span>
      <div class="image-overlay-text">La Lola, la prima más joven del clan, con el corazón partido</div>
    </div>
    <p class="narrative-text">
      Tu prima <span class="narrative-char">La Lola</span> lleva semanas rara. Sale de noche, vuelve tarde, y se pinta los ojos de una manera que no es para ir al mercadillo. El <span class="narrative-char">Miguelito</span> te lo ha dicho: <em>"${name}, la Lola está camelando con un ${calóWord('payo')}."</em>
    </p>
    <p class="narrative-text">
      El muchacho se llama <span class="narrative-char">Alejandro</span>, un camarero del bar de tapas de la plaza. Gachó, sí, pero honrado. La Lola dice que la quiere de verdad, que quiere casarse con ella. El pedimiento está sobre la mesa.
    </p>
    <p class="narrative-text">
      La familia está dividida. El ${personajeImg('tioAntonio')} <span class="narrative-char">Tío Antonio</span> dice que es una vergüenza. La ${personajeImg('laEncarna')} <span class="narrative-char">Encarna</span> dice que los tiempos cambian. La abuela no habla pero la mira fijo a la Lola con esos ojos que todo lo saben.
    </p>
    <p class="narrative-text">
      La Ley del Camino no prohíbe casarse con payos, pero la costumbre lo mira mal. Si aceptas el pedimiento, ganas un aliado en el mundo payo pero pierdes respeto entre algunos clanes. Si lo rechazas, la Lola puede fugarse o romperse el corazón.
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> El "pedimiento" es la ceremonia gitana de pedir la mano. El padre del novio visita a la familia de la novia con regalos y negocian el acuerdo matrimonial. Es uno de los rituales más preservados hasta hoy, aunque las uniones mixtas han aumentado en el siglo XXI.
    </div>
  `);

  currentChoiceHandlers = [
    () => romance_aceptar_pedimiento(),
    () => romance_rechazar_pedimiento(),
    () => romance_hablar_con_lola(),
    () => romance_prohibir_sin_hablar()
  ];

  renderChoices([
    {
      text: '💍 Aceptar el pedimiento del payo. Si es honrado, que demuestre que quiere a la Lola de verdad.',
      hint: '+15 Payos, -10 Honra. La Lola será feliz. El tío Antonio se enfada.',
      good: true
    },
    {
      text: '🚫 Rechazar el pedimiento. La sangre gitana no se mezcla. Es la costumbre.',
      hint: '+5 Honra, -20 Payos. La Lola se resentirá. Riesgo de fuga.',
      danger: true
    },
    {
      text: '🗣️ Hablar con la Lola a solas primero. Quiero entender qué siente antes de decidir.',
      hint: 'Descubrirás los verdaderos sentimientos de tu prima.',
    },
    {
      text: '🔒 Prohibirle que vea a ese payo. Se acabó la discusión.',
      hint: '+10 Honra temporal. La Lola puede fugarse o hacer algo peor.',
      danger: true
    }
  ]);
}

// ═══ RAMAS DEL ROMANCE ═══

function romance_aceptar_pedimiento() {
  addHistory('Aceptaste el pedimiento del payo Alejandro para La Lola. Amor por encima de la sangre.');
  modStat('honra', -10);
  modFaction('payos', 15);
  modFaction('clanes', -5);
  GameState.flags.pedimientoAceptado = true;
  GameState.inventory.push('💍 Pedimiento aceptado: La Lola y Alejandro');

  renderNarrative(`
    <div class="event-date">Capítulo III — El Pedimiento</div>
    <h2 class="event-title">La Boda que Nadie Esperaba</h2>
    <div class="image-placeholder">
      ${personajeImg('laLola')}
      <span class="image-placeholder-emoji">💒</span>
      <div class="image-overlay-text">La Lola, radiante, el día que el clan aceptó a su payo</div>
    </div>
    <p class="narrative-text">
      El <span class="narrative-char">Tío Antonio</span> se levanta y se va sin decir nada. Pero la abuela, esa mujer que pesa más que todos juntos, asiente despacio. Y cuando la abuela asiente, el mundo se para.
    </p>
    <p class="narrative-text">
      <em>"Que venga el gachó ese. Quiero verle la cara."</em>
    </p>
    <p class="narrative-text">
      Alejandro llega una semana después, con un ramo de flores para la abuela y una botella de vino para ti. Es un chaval nervioso pero con mirada limpia. El Miguelito le hace un interrogatorio de media hora y al final le da una palmada en la espalda que casi lo tira al suelo.
    </p>
    <p class="narrative-text">
      La boda se celebra en la explanada, con cante y baile hasta el amanecer. Los payos del bar de tapas vienen todos. Por primera vez en mucho tiempo, payos y calés beben juntos sin mirarse mal.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">😤 +15 Payos</span>
      <span class="stat-change stat-down">⭐ -10 Honra (algunos clanes lo ven mal)</span>
      <span class="stat-change stat-down">🔥 -5 Otros Clanes</span>
    </p>
    <p class="narrative-text">
      La Lola te abraza antes de irse con su marido. <em>"Primo, no sabes lo que has hecho por mí. Nunca lo olvidaré."</em>
    </p>
  `);

  renderContinue('▶ Continuar — El barrio sigue cambiando', 'chapter3_barrio_tenso()');
}

function romance_rechazar_pedimiento() {
  addHistory('Rechazaste el pedimiento del payo. La tradición por encima del amor.');
  modStat('honra', 5);
  modFaction('payos', -20);
  GameState.flags.amorProhibido = false;
  GameState.flags.fugaDeAmantes = Math.random() < 0.6; // 60% de probabilidad de fuga

  if (GameState.flags.fugaDeAmantes) {
    renderNarrative(`
      <div class="event-date">Capítulo III — La Fuga</div>
      <h2 class="event-title">💨 Como el Viento por la Noche</h2>
      <div class="image-placeholder">
        ${personajeImg('laLola')}
        <span class="image-placeholder-emoji">🏃‍♀️</span>
        <div class="image-overlay-text">La ventana abierta. La cama vacía. La Lola se ha ido.</div>
      </div>
      <p class="narrative-text">
        Tres días después del rechazo, la Lola no aparece en el desayuno. Su cama está hecha, pero la ventana abierta. Encima del colchón, una nota escrita con prisa: <em>"Primo, me voy con él. No me busquéis. Os quiero."</em>
      </p>
      <p class="narrative-text">
        El <span class="narrative-char">Tío Antonio</span> quiere salir a buscarla con el coche y la escopeta. La abuela llora en silencio en su silla. El Miguelito te mira esperando órdenes.
      </p>
      <p class="narrative-text">
        Es la peor ofensa que puede hacer una gitana a su clan: fugarse sin permiso. Pero también es un acto de amor desesperado. ¿Qué haces?
      </p>
    `);

    currentChoiceHandlers = [
      () => romance_buscar_y_perdonar(),
      () => romance_dejar_que_se_vaya(),
      () => romance_maldicion_familiar()
    ];

    renderChoices([
      {
        text: '🕊️ Ir a buscarla, pero para darle la bendición. Lo hecho, hecho está.',
        hint: '+Honra a largo plazo. La Lola vuelve al clan.',
        good: true
      },
      {
        text: '😔 Dejar que se vaya. Si ha elegido, que asuma su camino.',
        hint: 'La Lola se va para siempre. El clan pierde un miembro.',
      },
      {
        text: '👿 Que el Tío Antonio la busque y la traiga por la fuerza. Es la ley gitana.',
        hint: 'La Lola vuelve pero os odiará para siempre.',
        danger: true
      }
    ]);
  } else {
    modStat('miembros', -1);
    renderNarrative(`
      <div class="event-date">Capítulo III — El Corazón Roto</div>
      <h2 class="event-title">Los Ojos que Ya No Brillan</h2>
      <p class="narrative-text">
        La Lola no se fuga. Se queda. Pero ya no es la misma. Ya no canta mientras barre el patio. Ya no se ríe cuando el Miguelito hace el tonto. Sus ojos parecen dos pozos secos.
      </p>
      <p class="narrative-text">
        Una noche, la abuela te dice bajito: <em>"Esa chiquilla se nos apaga, ${name}. A veces la costumbre es más dura que el amor, pero el amor es más fuerte que la costumbre."</em>
      </p>
      <p class="narrative-text">
        La Lola se queda en el clan pero su espíritu se ha ido. Pierdes un miembro productivo y la alegría de la casa se apaga un poco.
        <span class="stat-change stat-down">👥 -1 Miembro (en espíritu, no en número)</span>
      </p>
    `);
    renderContinue('▶ Continuar — El barrio sigue cambiando', 'chapter3_barrio_tenso()');
  }
}

function romance_buscar_y_perdonar() {
  addHistory('Buscaste a La Lola y la perdonaste. El amor puede más que la tradición.');
  modStat('honra', 5);
  modFaction('payos', 10);

  renderNarrative(`
    <div class="event-date">Capítulo III — El Perdón</div>
    <h2 class="event-title">Las Lágrimas de la Mañana</h2>
    <p class="narrative-text">
      La encuentras en la estación de autobuses, a punto de subirse a un Expreso que va a Madrid. La Lola te ve llegar y se echa a llorar como una cría pequeña.
    </p>
    <p class="narrative-text">
      <em>"No me regañes, primo. No me mires así. Le quiero, ${name}. Le quiero más que a mi vida."</em>
    </p>
    <p class="narrative-text">
      Le pones la mano en el hombro. <em>"No vengo a regañarte, Lola. Vengo a decirte que la abuela te espera en casa. Y que si ese gachó te quiere de verdad, que venga a pedirte como es debido. Aunque sea la segunda vez."</em>
    </p>
    <p class="narrative-text">
      La Lola vuelve al clan. Alejandro, una semana después, se presenta con más regalos todavía. El pedimiento se repite, esta vez con el consentimiento de todos. Es la primera vez en tres generaciones que un payo entra en la familia por la puerta grande.
    </p>
  `);

  renderContinue('▶ Continuar — El barrio sigue cambiando', 'chapter3_barrio_tenso()');
}

function romance_dejar_que_se_vaya() {
  addHistory('Dejaste que La Lola se fuera. El clan pierde un miembro para siempre.');
  modStat('miembros', -1);
  modStat('honra', -5);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Silla Vacía</div>
    <h2 class="event-title">La Ausencia</h2>
    <p class="narrative-text">
      No la buscas. Es su vida. La Lola se fue a Madrid con el payo y, según cuentan los primos de allí, han abierto un bar de tapas en Vallecas y les va bien.
    </p>
    <p class="narrative-text">
      Pero en la mesa del clan, su silla está vacía. Las navidades no son lo mismo. La abuela nunca lo dice, pero cuando mira hacia el sitio donde se sentaba la Lola, sus ojos se humedecen.
    </p>
  `);

  renderContinue('▶ Continuar — El barrio sigue cambiando', 'chapter3_barrio_tenso()');
}

function romance_maldicion_familiar() {
  addHistory('Forzaste a La Lola a volver. La tradición se impuso con violencia.');
  modStat('honra', -15);
  modFaction('payos', -30);
  GameState.flags.venganzaAmorosa = true;

  renderNarrative(`
    <div class="event-date">Capítulo III — La Maldición</div>
    <h2 class="event-title">La Jaula de Sangre</h2>
    <p class="narrative-text">
      El Tío Antonio la trae de vuelta en el asiento de atrás del coche. La Lola no habla. No mira a nadie. Se encierra en su cuarto y no sale en dos semanas.
    </p>
    <p class="narrative-text">
      El payo Alejandro intentó volver a buscarla. El Miguelito y otros dos primos le dieron una paliza en el callejón. Ahora el bar de tapas está cerrado y el barrio entero os mira con miedo y rencor.
    </p>
    <p class="narrative-text">
      La Lola se queda. Pero cada vez que te mira, ves un brillo que no es amor. Es otra cosa. Algo más oscuro.
    </p>
  `);

  renderContinue('▶ Continuar — El barrio sigue cambiando', 'chapter3_barrio_tenso()');
}

function romance_hablar_con_lola() {
  addHistory('Hablaste con La Lola a solas. Descubriste la verdad de su corazón.');
  modStat('diplomacia', 5);

  renderNarrative(`
    <div class="event-date">Capítulo III — La Confesión</div>
    <h2 class="event-title">Lo que Susurra el Corazón</h2>
    <p class="narrative-text">
      Te sientas con ella en el patio, bajo la parra. La Lola habla durante una hora seguida. Te cuenta cómo conoció a Alejandro, cómo le hablaba con respeto, cómo le regaló un abanico el día de la romería y ni siquiera intentó besarla.
    </p>
    <p class="narrative-text">
      <em>"Primo, no es un gachó cualquiera. Es bueno. Me quiere como me hubiera querido el mejor de los calés. Y yo a él."</em>
    </p>
    <p class="narrative-text">
      Le escuchas. No dices nada. Al final, le das un abrazo. <em>"Voy a hablar con el clan. No prometo nada. Pero voy a intentarlo."</em>
    </p>
    <p class="narrative-text">
      Ahora sabes la verdad. Puedes decidir con todo el conocimiento.
    </p>
  `);

  currentChoiceHandlers = [
    () => romance_aceptar_pedimiento(),
    () => romance_rechazar_pedimiento()
  ];

  renderChoices([
    {
      text: '💍 Apoyar a La Lola. Convencer al clan de que acepte al payo.',
      hint: '+Diplomacia, posible aceptación del pedimiento.',
      good: true
    },
    {
      text: '🚫 A pesar de todo, rechazar el pedimiento. La costumbre es la costumbre.',
      hint: 'La Lola se sentirá traicionada por ti.',
      danger: true
    }
  ]);
}

function romance_prohibir_sin_hablar() {
  addHistory('Prohibiste a La Lola ver al payo sin escucharla. Mano dura.');
  modStat('honra', 5);
  modStat('intimidacion', 10);
  modFaction('payos', -25);
  GameState.flags.fugaDeAmantes = Math.random() < 0.8; // 80% de fuga cuando se prohíbe sin escuchar

  if (GameState.flags.fugaDeAmantes) {
    renderNarrative(`
      <div class="event-date">Capítulo III — La Fuga</div>
      <h2 class="event-title">La Ventana Abierta</h2>
      <p class="narrative-text">
        Esa misma noche, la Lola se va. No deja nota. Solo la ventana abierta y el olor de su perfume en el aire.
      </p>
      <p class="narrative-text">
        El Tío Antonio dice que mejor, que ya volverá cuando se le pase. Pero la abuela te mira y niega con la cabeza muy despacio. Ese gesto dice más que mil palabras.
      </p>
    `);
    currentChoiceHandlers = [
      () => romance_buscar_y_perdonar(),
      () => romance_dejar_que_se_vaya()
    ];
    renderChoices([
      {
        text: '🕊️ Ir a buscarla para perdonarla.',
        hint: 'Aún estás a tiempo.',
        good: true
      },
      {
        text: '😔 Dejar que se vaya.',
        hint: 'El orgullo por delante.',
      }
    ]);
  } else {
    modStat('miembros', -1);
    renderNarrative(`
      <div class="event-date">Capítulo III — La Rendición</div>
      <h2 class="event-title">Los Ojos Apagados</h2>
      <p class="narrative-text">
        La Lola se queda. Obedece. Pero su espíritu se ha roto. Ya no baila, ya no canta, ya no es La Lola. Es una sombra que deambula por la casa.
      </p>
    `);
    renderContinue('▶ Continuar — El barrio sigue cambiando', 'chapter3_barrio_tenso()');
  }
}