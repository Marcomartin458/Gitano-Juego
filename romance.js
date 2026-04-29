/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — ROMANCE Y TRAGEDIAS GITANAS v5.0
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// EVENTO: EL AMOR PROHIBIDO DE LA LOLA
// ════════════════════════════════════════

function startRomanceLola() {
  GameState.flags.amorProhibido = true;
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">San Blas — Amor en el barrio</div>
    <h2 class="event-title">💔 La Lola está camelando con un payo</h2>
    <div class="image-placeholder">
      ${personajeImg('laLola')}
      <span class="image-placeholder-emoji">💃</span>
      <div class="image-overlay-text">La Lola, más gitana que las palmas, y el corazón partío</div>
    </div>
    <p class="narrative-text">
      Tu prima ${personajeImg('laLola')} <span class="narrative-char">La Lola</span> lleva un tiempo rara. Sale de noche, vuelve tarde, y se pinta los ojos como si fuera a salir en TikTok. El ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> te lo ha dicho: <em>"${name}, la Lola está camelando con un ${calóWord('payo')} que trabaja en el bar de la plaza."</em>
    </p>
    <p class="narrative-text">
      El chaval se llama <span class="narrative-char">Alejandro</span>, camarero, buena gente pero payo. La Lola dice que lo quiere, que quiere casarse. El ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> está que se lo lleva el diablo: <em>"¡Un gachó! ¡En mi familia no!"</em> La ${personajeImg('laEncarna')} <span class="narrative-char">Encarna</span> dice que los tiempos cambian. La abuela, callada, mira a la Lola con esos ojos que parecen rayos X.
    </p>
    <p class="narrative-text">
      La Lola te pide que la apoyes. Dice que Alejandro quiere pedir su mano, pero que tiene miedo de la <span class="narrative-emph">prueba del pañuelo</span> y del qué dirán.
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> La "prueba del pañuelo" es una tradición gitana donde las mujeres casadas de la familia comprueban la virginidad de la novia antes de la boda. Hoy en día muchas familias gitanas modernas la han abandonado, pero sigue siendo un símbolo potente de la cultura caló.
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
      text: '💍 Apoyar a la Lola. Si el payo es buena gente, que venga a pedir su mano como es debido.',
      hint: '+Payos, -Honra entre los clanes más rancios. La Lola será feliz.',
      good: true
    },
    {
      text: '🚫 Negarse. La sangre gitana no se mezcla con payos. Es lo que hay.',
      hint: '+Honra tradicional, pero la Lola te odiará. Riesgo de fuga.',
      danger: true
    },
    {
      text: '🗣️ Hablar con la Lola a solas. Saber qué siente de verdad antes de decidir.',
      hint: 'Descubrirás si es amor o un calentón.',
    },
    {
      text: '🔒 Prohibirle que vea a ese payo y punto. Aquí mando yo.',
      hint: '+Intimidación, pero la Lola puede hacer una locura.',
      danger: true
    }
  ]);
}

// ═══ RAMAS DEL ROMANCE ═══

function romance_aceptar_pedimiento() {
  addHistory('Aceptaste el pedimiento del payo Alejandro. Amor por encima de la tradición.');
  modStat('honra', -10);
  modFaction('payos', 20);
  modFaction('clanes', -5);
  GameState.flags.pedimientoAceptado = true;
  GameState.inventory.push('💍 Pedimiento aceptado: La Lola y Alejandro');

  // Probabilidad de embarazo tras la boda
  GameState.flags.embarazoLola = Math.random() < 0.7;

  renderNarrative(`
    <div class="event-date">San Blas — La boda</div>
    <h2 class="event-title">Boda gitana en el barrio</h2>
    <div class="image-placeholder">
      ${personajeImg('laLola')}
      <span class="image-placeholder-emoji">💒</span>
      <div class="image-overlay-text">La Lola, radiante, con su payo Alejandro</div>
    </div>
    <p class="narrative-text">
      Al final, el ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> se levanta y se va sin decir nada. Pero la abuela asiente despacio. Y cuando la abuela asiente, eso es ley.
    </p>
    <p class="narrative-text">
      Alejandro llega una semana después, con un ramo de flores para la abuela y una botella de vino para ti. El Miguelito le hace un interrogatorio: <em>"¿Tú qué buscas aquí, payo? ¿Camelar a mi prima o qué?"</em> Pero al final le da una palmada en la espalda que casi lo tira al suelo.
    </p>
    <p class="narrative-text">
      La <span class="narrative-emph">prueba del pañuelo</span> se decide saltársela. La Encarna convence a las mujeres mayores de que la Lola ya ha demostrado su honra de sobra. La boda es en la explanada, con cante, baile y una paella gigante. Vienen hasta los payos del bar de la plaza.
    </p>
    ${GameState.flags.embarazoLola ? `
    <p class="narrative-text">
      <span class="narrative-good">👶 Tres meses después, la Lola anuncia que está embarazada. ¡El primer gitano-payo del clan! La abuela llora de alegría. El tío Antonio refunfuña, pero le hemos visto comprar un osito de peluche en el chino de la esquina.</span>
    </p>
    ` : ''}
    <p class="narrative-text">
      <span class="stat-change stat-up">😤 +20 Payos</span>
      <span class="stat-change stat-down">⭐ -10 Honra (los clanes más antiguos te critican)</span>
    </p>
  `);

  renderContinue('▶ Continuar — El barrio se caldea', 'chapter3_barrio_tenso()');
}

function romance_rechazar_pedimiento() {
  addHistory('Rechazaste el pedimiento del payo. La tradición por encima del amor.');
  modStat('honra', 5);
  modFaction('payos', -20);
  GameState.flags.amorProhibido = false;
  GameState.flags.fugaDeAmantes = Math.random() < 0.6;

  if (GameState.flags.fugaDeAmantes) {
    renderNarrative(`
      <div class="event-date">San Blas — La fuga</div>
      <h2 class="event-title">💨 La Lola se ha pirado</h2>
      <div class="image-placeholder">
        ${personajeImg('laLola')}
        <span class="image-placeholder-emoji">🏃‍♀️</span>
        <div class="image-overlay-text">La ventana abierta. La cama vacía. La Lola se ha ido con el payo.</div>
      </div>
      <p class="narrative-text">
        Tres días después, la cama de la Lola aparece vacía. En la almohada, una nota con su letra: <em>"Primo, me voy con él. No me busquéis. Os quiero."</em>
      </p>
      <p class="narrative-text">
        El ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> quiere salir con el coche y la escopeta de caza. La peña del barrio está revolucionada.
      </p>
    `);

    currentChoiceHandlers = [
      () => romance_buscar_y_perdonar(),
      () => romance_dejar_que_se_vaya(),
      () => romance_maldicion_familiar()
    ];

    renderChoices([
      {
        text: '🕊️ Ir a buscarla para darle la bendición. Lo hecho, hecho está.',
        hint: '+Honra a largo plazo. La Lola vuelve al clan.',
        good: true
      },
      {
        text: '😔 Dejar que se vaya. Si ha elegido, que asuma.',
        hint: 'La Lola se va para siempre. El clan pierde un miembro.',
      },
      {
        text: '👿 Que el tío Antonio la busque y la traiga por la fuerza.',
        hint: 'La Lola vuelve pero os odiará siempre.',
        danger: true
      }
    ]);
  } else {
    modStat('miembros', -1);
    renderNarrative(`
      <div class="event-date">San Blas — Corazón roto</div>
      <h2 class="event-title">Los ojos apagados</h2>
      <p class="narrative-text">
        La Lola no se fuga. Se queda. Pero ya no canta en las fiestas, ya no se ríe con los chistes del Miguelito. Sus ojos parecen dos pozos secos.
      </p>
      <p class="narrative-text">
        Una noche, la abuela te dice bajito: <em>"Esa chiquilla se nos apaga. A veces la tradición es más fuerte que el amor, pero el amor siempre pasa factura."</em>
      </p>
      <p class="narrative-text">
        <span class="stat-change stat-down">👥 -1 Miembro (en espíritu)</span>
      </p>
    `);
    renderContinue('▶ Continuar — El barrio se caldea', 'chapter3_barrio_tenso()');
  }
}

function romance_buscar_y_perdonar() {
  addHistory('Buscaste a La Lola y la perdonaste. El amor puede más que la tradición.');
  modStat('honra', 5);
  modFaction('payos', 15);
  GameState.flags.pedimientoAceptado = true;
  GameState.flags.embarazoLola = Math.random() < 0.5;

  renderNarrative(`
    <div class="event-date">Estación de autobuses — Canillejas</div>
    <h2 class="event-title">El perdón del clan</h2>
    <p class="narrative-text">
      La encuentras en la estación de autobuses, a punto de subirse a un Expreso a Barcelona. La Lola te ve y se echa a llorar como una cría.
    </p>
    <p class="narrative-text">
      <em>"No me regañes, primo. Le quiero. Le quiero más que a mi vida."</em>
    </p>
    <p class="narrative-text">
      Le pones la mano en el hombro. <em>"No vengo a regañarte. Vengo a decirte que la abuela te espera en casa. Y que si ese payo te quiere de verdad, que venga a pedirte como es debido."</em>
    </p>
    <p class="narrative-text">
      La Lola vuelve al clan. Alejandro, una semana después, se presenta con más regalos todavía. El pedimiento se repite y esta vez todos aceptan. Es la primera vez en tres generaciones que un payo entra en la familia.
    </p>
    ${GameState.flags.embarazoLola ? `
    <p class="narrative-text">
      <span class="narrative-good">👶 Un año después, nace el primer churumbel de la Lola y Alejandro. Le llaman Antonio, como el tío, y es lo más bonito que ha pisado el barrio desde que trajeron el WiFi.</span>
    </p>
    ` : ''}
  `);

  renderContinue('▶ Continuar — El barrio se caldea', 'chapter3_barrio_tenso()');
}

function romance_dejar_que_se_vaya() {
  addHistory('Dejaste que La Lola se fuera. El clan pierde un miembro para siempre.');
  modStat('miembros', -1);
  modStat('honra', -5);

  renderNarrative(`
    <div class="event-date">San Blas — La silla vacía</div>
    <h2 class="event-title">La ausencia</h2>
    <p class="narrative-text">
      No la buscas. Es su vida. La Lola se fue a Barcelona con el payo y, según cuentan, han abierto un bar de tapas en el Raval y les va bien.
    </p>
    <p class="narrative-text">
      Pero en la mesa del clan, su silla está vacía. Las navidades no son lo mismo. La abuela nunca lo dice, pero cuando mira hacia el sitio donde se sentaba la Lola, sus ojos se humedecen.
    </p>
  `);

  renderContinue('▶ Continuar — El barrio se caldea', 'chapter3_barrio_tenso()');
}

function romance_maldicion_familiar() {
  addHistory('Forzaste a La Lola a volver. La tradición se impuso con violencia.');
  modStat('honra', -15);
  modFaction('payos', -30);
  GameState.flags.venganzaAmorosa = true;

  renderNarrative(`
    <div class="event-date">San Blas — La jaula</div>
    <h2 class="event-title">La sangre no perdona</h2>
    <p class="narrative-text">
      El ${personajeImg('tioAntonio')} <span class="narrative-char">tío Antonio</span> la trae de vuelta en el coche. La Lola no habla, no mira a nadie. Se encierra en su cuarto y no sale en dos semanas.
    </p>
    <p class="narrative-text">
      El payo Alejandro intentó volver a buscarla. El Miguelito y otros dos primos le dieron una paliza en el callejón del bar. Ahora el bar de la plaza está cerrado y el barrio entero os mira con miedo y rencor.
    </p>
    <p class="narrative-text">
      La Lola se queda, pero cada vez que te mira, ves algo oscuro en sus ojos.
    </p>
  `);

  renderContinue('▶ Continuar — El barrio se caldea', 'chapter3_barrio_tenso()');
}

function romance_hablar_con_lola() {
  addHistory('Hablaste con La Lola a solas. Descubriste la verdad de su corazón.');
  modStat('diplomacia', 5);

  renderNarrative(`
    <div class="event-date">Patio del bloque — San Blas</div>
    <h2 class="event-title">Lo que te cuenta la Lola</h2>
    <p class="narrative-text">
      Te sientas con ella en el patio del bloque, entre las cuerdas de tender y las macetas de geranios. La Lola habla durante una hora seguida. Te cuenta cómo conoció a Alejandro, cómo le hablaba con respeto, cómo le regaló un abanico y ni siquiera intentó besarla.
    </p>
    <p class="narrative-text">
      <em>"Primo, no es un payo cualquiera. Es buena gente. Me quiere como me hubiera querido el mejor de los gitanicos. Y yo a él."</em>
    </p>
    <p class="narrative-text">
      Le escuchas. No dices nada. Al final, le das un abrazo. <em>"Voy a hablar con el clan. No prometo nada, pero voy a intentarlo."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => romance_aceptar_pedimiento(),
    () => romance_rechazar_pedimiento()
  ];

  renderChoices([
    {
      text: '💍 Apoyar a la Lola. Convencer al clan de que acepte al payo.',
      hint: '+Diplomacia, posible aceptación.',
      good: true
    },
    {
      text: '🚫 A pesar de todo, rechazar el pedimiento. La tradición manda.',
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
  GameState.flags.fugaDeAmantes = Math.random() < 0.8;

  if (GameState.flags.fugaDeAmantes) {
    renderNarrative(`
      <div class="event-date">San Blas — La fuga</div>
      <h2 class="event-title">La ventana abierta</h2>
      <p class="narrative-text">
        Esa misma noche, la Lola se va. No deja nota. Solo la ventana abierta y el olor de su perfume en el aire.
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
      <div class="event-date">San Blas — La sombra</div>
      <h2 class="event-title">Los ojos apagados</h2>
      <p class="narrative-text">
        La Lola se queda. Obedece. Pero su espíritu se ha roto. Ya no baila, ya no canta. Es una sombra que deambula por el bloque.
      </p>
    `);
    renderContinue('▶ Continuar — El barrio se caldea', 'chapter3_barrio_tenso()');
  }
}
