/* ═══════════════════════════════════════════════════════════
   EL GITANO JUEGO — CAPÍTULO 6: MADRID SE REARMA v6.0
   (versión extendida con Los Payos Renovados)
   ═══════════════════════════════════════════════════════════ */

'use strict';

console.log('Cargando chapter6...');
console.log('Funciones disponibles:', typeof chapter6_visita_tomas);

// ════════════════════════════════════════
// CAPÍTULO 6: MADRID SE REARMA
// ════════════════════════════════════════
function startChapter6() {
  saveCurrentState();
  GameState.chapter = 6;
  updateStats();

  const name = GameState.playerName;
  const clan = GameState.clanData;

  renderNarrative(`
    <div class="event-date">Capítulo VI — Madrid se Rearma</div>
    <h2 class="event-title">El Barrio Ya No Es Lo Que Era</h2>
    <div class="image-placeholder">
      <span class="image-placeholder-emoji">🏙️</span>
      <div class="image-overlay-text">San Blas, cuatro años después. Starbucks, patinetes y un gimnasio de lujo donde antes estaba el bar de Manolo.</div>
    </div>
    <p class="narrative-text">
      Cuatro años han pasado desde la Batalla de San Blas. El ${clan.nombre} controla tres mercadillos y ha abierto una tienda de artesanía gitana que regenta ${GameState.flags.pedimientoAceptado ? 'La Lola' : 'una prima tuya'}. Las cosas han mejorado, pero el barrio está irreconocible.
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> se ha hecho youtuber. Su canal "Miguelito Fight Club" tiene 50.000 suscriptores. El otro día le patrocinó una bebida energética. <em>"Primo, me han pagado por pegarle a un payo que se cayó de un patinete. Este es el mejor trabajo del mundo."</em>
    </p>
    <p class="narrative-text">
      La abuela ha descubierto TikTok. Se hace llamar "abuelagitanafire" y sube vídeos cocinando potaje mientras insulta a los que no echan comino. Tiene más likes que tú.
    </p>
    <p class="narrative-text">
      Pero no todo es fiesta. Esta mañana aparece ${personajeImg('rizos')} <span class="narrative-char">La Rizos</span>, una prima lejana que trabaja en la Junta Municipal, con una noticia bomba: el ${personajeImg('viejoSebastian')} <span class="narrative-char">Viejo Sebastián</span> ha muerto esta noche. Se convoca una reunión de emergencia de todos los clanes de Madrid para elegir nuevo mediador principal.
    </p>
    <p class="narrative-text">
      La Rizos te mira con esos ojos que significan problemas: <em>"Todos los clanes están moviendo ficha. Si no te presentas, otro ocupará el puesto y nos dejará fuera."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter6_presentarse_mediador(),
    () => chapter6_apoyar_flores(),
    () => chapter6_ignorar_eleccion()
  ];

  renderChoices([
    {
      text: '👑 Presentarte como candidato a mediador. Es hora de liderar a todos los clanes.',
      hint: 'Necesitas alta Honra y aliados. Puede darte el control de Madrid.',
      good: true
    },
    {
      text: '🌸 Apoyar a la Abuela Flor, de Las Flores. Es respetada y te debe un favor.',
      hint: 'Ganas una aliada poderosa, pero no tendrás el poder directo.',
    },
    {
      text: '🤷 Ignorar la elección. Bastante tengo con lo mío.',
      hint: 'Otro clan tomará el control y podría volverse en tu contra.',
      danger: true
    }
  ]);
}

function chapter6_presentarse_mediador() {
  if (GameState.stats.honra < 50) {
    renderNarrative(`
      <div class="event-date">Reunión de clanes — Usera</div>
      <h2 class="event-title">Poca Honra, poco voto</h2>
      <p class="narrative-text">
        Intentas presentarte, pero los clanes más antiguos se ríen. "¿Con esa honra? Vuelve cuando hayas demostrado algo, chaval."
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">No tienes suficiente Honra para ser mediador. Debes ganarte el respeto antes.</span>
      </p>
    `);
    renderContinue('▶ Volver a intentarlo', 'startChapter6()');
    return;
  }

  addHistory('Te presentaste como candidato a mediador de todos los clanes de Madrid.');
  GameState.flags.mediadorElegido = true;
  modStat('honra', 15);
  modFaction('clanes', 20);

  renderNarrative(`
    <div class="event-date">Reunión de clanes — Usera</div>
    <h2 class="event-title">El Discurso del Candidato</h2>
    <p class="narrative-text">
      La nave industrial de Usera está abarrotada. Representantes de diez clanes de todo Madrid te miran con escepticismo. La ${personajeImg('abuelaFlor')} <span class="narrative-char">Abuela Flor</span> fuma un puro en primera fila. ${personajeImg('elWifi')} <span class="narrative-char">El WiFi</span> te graba con el móvil.
    </p>
    <p class="narrative-text">
      Te levantas. Recuerdas las palabras del Viejo Curro, del Viejo Sebastián, de todos los que lucharon antes. Hablas de unidad, de resistencia, de futuro. No gritas, pero tu voz retumba en las paredes de la nave.
    </p>
    <p class="narrative-text">
      <em>"Si queremos que nos respeten, tenemos que hablar con una sola voz. Yo no soy mejor que nadie, pero sé lo que es luchar por los nuestros. Y estoy dispuesto a luchar por todos."</em>
    </p>
    <p class="narrative-text">
      El aplauso estalla. Incluso la Abuela Flor deja de fumar para aplaudir. Has sido elegido mediador principal de los clanes de Madrid.
    </p>
    <p class="narrative-text">
      ${personajeImg('rizos')} <span class="narrative-char">La Rizos</span> se te acerca: <em>"No está mal, para ser un cabeza de barrio. Pero ahora viene lo difícil."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +15 Honra</span>
      <span class="stat-change stat-up">🔥 +20 con Otros Clanes</span>
    </p>
    <div class="cultural-note">
      📚 <b>Dato real:</b> La figura del mediador es central en la cultura gitana. Su autoridad no viene de ningún poder formal, sino del respeto acumulado. Esta tradición se mantiene viva en muchas comunidades gitanas españolas actuales.
    </div>
  `);

  GameState.inventory.push('🏅 Medallón de Mediador de Madrid');
  renderContinue('▶ Continuar — Una visita inesperada', 'chapter6_visita_tomas');
}

function chapter6_apoyar_flores() {
  addHistory('Apoyaste a la Abuela Flor como mediadora. Ahora tienes una aliada poderosa.');
  GameState.flags.alianzaFlores = true;
  modStat('alianzas', 1);
  modFaction('clanes', 10);
  modStat('honra', 5);

  renderNarrative(`
    <div class="event-date">Reunión de clanes — Usera</div>
    <h2 class="event-title">La Abuela Flor, mediadora</h2>
    <p class="narrative-text">
      La ${personajeImg('abuelaFlor')} <span class="narrative-char">Abuela Flor</span> es elegida mediadora por aclamación. Cuando se levanta, el loro Sultán grita: "¡Viva la gitana!" y la nave se viene abajo de risas.
    </p>
    <p class="narrative-text">
      Antes de irse, la Abuela Flor te agarra del brazo: <em>"Tú has sido leal, muchacho. Cuando necesites algo, las Flores estamos contigo. Y por cierto, mi nieta La Pelirroja te ha echado el ojo. No me hagas quedar mal."</em>
    </p>
    <p class="narrative-text">
      La Pelirroja se acerca con una sonrisa descarada. Es guapa, lista y tiene más arte que un tablao. <em>"¿Eres tú el que se ha ganado a mi abuela? Pues ya estás tardando en invitarme a un café."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +5 Honra</span>
      <span class="stat-change stat-up">🤝 +1 Alianza (Las Flores)</span>
    </p>
  `);

  currentChoiceHandlers = [
    () => romance_pelirroja_aceptar(),
    () => romance_pelirroja_rechazar(),
    () => romance_pelirroja_amistad()
  ];

  renderChoices([
    {
      text: '💘 Aceptar la invitación de La Pelirroja. Un café no se le niega a nadie.',
      hint: 'Comienzas un romance con la nieta de la Abuela Flor. +Honra, +Alianza.',
      good: true
    },
    {
      text: '🙅 Rechazarla amablemente. No estoy para romances ahora.',
      hint: 'Mantienes la alianza pero te pierdes una oportunidad.',
    },
    {
      text: '🤝 Quedar como amigos. Me interesa más la política que el amor.',
      hint: 'Ganas una aliada sin compromisos románticos.',
    }
  ]);
}

function romance_pelirroja_aceptar() {
  addHistory('Aceptaste la invitación de La Pelirroja. Comienza un romance estratégico.');
  GameState.flags.romancePelirroja = true;
  modStat('honra', 5);
  modFaction('clanes', 5);

  renderNarrative(`
    <p class="narrative-text">
      Quedas con La Pelirroja en el café de la plaza. Resulta que es tan divertida como su abuela, pero con ideas modernas. Te habla de sus planes para modernizar el mercadillo sin perder la tradición.
    </p>
    <p class="narrative-text">
      <em>"Mi abuela cree que solo sirvo para casarme, pero yo quiero ayudar a Las Flores a crecer. Y tú me gustas porque no eres un mandado."</em>
    </p>
    <p class="narrative-text">
      El café acaba en cena, y la cena en un paseo por La Latina. La Pelirroja te besa en la mejilla al despedirse. <em>"Esto no significa que vaya a obedecerte, ¿vale? Pero me caes bien."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +5 Honra</span>
      <span class="stat-change stat-up">🤝 +5 Alianza con Las Flores</span>
    </p>
  `);

  GameState.inventory.push('💘 Romance con La Pelirroja');
  renderContinue('▶ Continuar — Una visita inesperada', 'chapter6_visita_tomas');
}

function romance_pelirroja_rechazar() {
  addHistory('Rechazaste a La Pelirroja. La Abuela Flor lo respeta, pero se nota el desaire.');
  modFaction('clanes', -2);

  renderNarrative(`
    <p class="narrative-text">
      Le dices a La Pelirroja que ahora mismo no estás para citas. Ella encoje los hombros: <em>"Bueno, tú te lo pierdes, chaval."</em> La Abuela Flor te mira con un poco de decepción, pero no insiste.
    </p>
    <p class="narrative-text">
      La alianza sigue en pie, aunque el ambiente se ha enfriado un poco.
    </p>
  `);

  renderContinue('▶ Continuar — Una visita inesperada', 'chapter6_visita_tomas');
}

function romance_pelirroja_amistad() {
  addHistory('Decidiste ser amigo de La Pelirroja. Alianza estratégica sin romance.');
  modStat('diplomacia', 3);
  modFaction('clanes', 3);

  renderNarrative(`
    <p class="narrative-text">
      Le propones a La Pelirroja que os veáis como colegas. Ella se ríe: <em>"Por fin un hombre que no quiere casarme. Me gustas, tío. Seremos buenos socios."</em>
    </p>
    <p class="narrative-text">
      Charláis sobre los problemas del Rastro y las amenazas de los Payos Renovados. Descubres que La Pelirroja tiene mucha información útil. La Abuela Flor te da un puro como agradecimiento.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🧠 +3 Diplomacia</span>
    </p>
  `);

  renderContinue('▶ Continuar — Una visita inesperada', 'chapter6_visita_tomas');
}

function chapter6_ignorar_eleccion() {
  addHistory('Ignoraste la elección del mediador. Ahora otro clan controla las decisiones importantes.');
  modFaction('clanes', -10);
  modStat('honra', -5);

  renderNarrative(`
    <div class="event-date">San Blas — Al día siguiente</div>
    <h2 class="event-title">El nuevo mediador</h2>
    <p class="narrative-text">
      Te enteras por el Miguelito: el nuevo mediador es un tipo del Clan de los Cárdenas, un payo-gitano con fama de corrupto. Su primera decisión ha sido subir las tasas de los mercadillos para todos los clanes excepto el suyo.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">⭐ -5 Honra</span>
      <span class="stat-change stat-down">🔥 -10 con Otros Clanes</span>
      <br>Ahora tendrás que lidiar con un mediador hostil.
    </p>
  `);

  renderContinue('▶ Continuar — Una visita inesperada', 'chapter6_visita_tomas');
}

function chapter6_visita_tomas() {
  console.log('Entrando en visita_tomas');
  const name = GameState.playerName;

  renderNarrative(`
    <div class="event-date">San Blas — Esa misma noche</div>
    <h2 class="event-title">El Regreso de Tomás</h2>
    <p class="narrative-text">
      ${personajeImg('tomas')} <span class="narrative-char">Tomás</span> ha vuelto de Barcelona. Viene con un Mercedes negro y un reloj que brilla más que el oro de la abuela. Su negocio ha prosperado y quiere devolver al clan el triple de lo que invirtió. Pero también trae malas noticias.
    </p>
    <p class="narrative-text">
      <em>"${name}, he oído cosas en Barcelona. ${GameState.flags.primeraVictoriaCombate ? 'El Chato Ruiz' : 'Un tal Ingeniero'} está moviendo hilos. Quiere vengarse de lo de San Blas. Y tiene dinero detrás, mucho dinero."</em>
    </p>
    <p class="narrative-text">
      Esa misma madrugada, un grito desgarra la noche. ${personajeImg('tioAntonio')} <span class="narrative-char">El Tío Antonio</span> ha aparecido muerto en el callejón detrás del mercadillo. Una puñalada limpia, de las que solo sabe dar un profesional. Junto al cuerpo, una nota: <em>"Esto es solo el principio. Vuestra mediadora no os salvará."</em>
    </p>
    <p class="narrative-text">
      El clan entra en duelo. Pero tú no puedes permitirte llorar ahora. Tienes que investigar quién ha sido y por qué.
    </p>
  `);

  GameState.flags.tioAntonioAsesinado = true;
  modStat('miembros', -1);

  currentChoiceHandlers = [
    () => chapter6_investigar_gatos(),
    () => chapter6_investigar_ingeniero(),
    () => chapter6_venganza_directa()
  ];

  renderChoices([
    {
      text: '🐱 Ir a hablar con Los Gatos. Ellos controlan la información en la calle.',
      hint: 'Pueden tener datos sobre quién apuñaló al tío Antonio.',
      good: true
    },
    {
      text: '🏗️ Investigar al Ingeniero y a la inmobiliaria.',
      hint: 'Si el Chato no está, el Ingeniero es el principal sospechoso.',
    },
    {
      text: '💀 Venganza directa. Da igual quién fue. Alguien va a pagar.',
      hint: 'Alto riesgo. Puedes cargarte a un inocente y empeorar las cosas.',
      danger: true
    }
  ]);
}

function chapter6_investigar_gatos() {
  addHistory('Fuiste a Los Gatos para obtener información sobre el asesinato.');
  modStat('diplomacia', 5);
  GameState.flags.alianzaGatos = true;
  GameState.inventory.push('🐱 Información de Los Gatos');

  renderNarrative(`
    <div class="event-date">Usera — Guarida de Los Gatos</div>
    <h2 class="event-title">El Precio de la Información</h2>
    <p class="narrative-text">
      ${personajeImg('elWifi')} <span class="narrative-char">El WiFi</span> te recibe en un sótano lleno de monitores, cables y carteles de anime. <em>"¿El asesinato del viejo? Claro que sé quién fue. Pero la información no es gratis, compadre."</em>
    </p>
    <p class="narrative-text">
      Te explica que el Chato (o el Ingeniero) contrató a un matón profesional a través de un intermediario de Los Gatos. Ellos no sabían para qué era, pero tienen el nombre y la dirección del sicario. A cambio, quieren que inviertas 20.000 € en su "exchange" de criptomonedas gitanas, el "CalóCoin".
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter6_pagar_gatos(),
    () => chapter6_amenazar_gatos(),
    () => chapter6_colaborar_policia()
  ];

  renderChoices([
    {
      text: '💶 Pagar los 20.000 €. Es caro, pero la información vale oro.',
      hint: 'Obtienes el nombre del sicario y pruebas sólidas.',
      good: true
    },
    {
      text: '😈 Amenazar al WiFi. Es un crío, seguro que se acojona.',
      hint: 'Consigues la información gratis pero Los Gatos se vuelven enemigos.',
      danger: true
    },
    {
      text: '👮 Colaborar con la policía. Que investiguen ellos.',
      hint: '+Relación con la pasma, pero Los Gatos te llamarán chivato.',
    }
  ]);
}

function chapter6_pagar_gatos() {
  if (GameState.stats.recursos < 20) {
    showNotification('No tienes suficiente parné, makina.', 'bad');
    return;
  }
  modStat('recursos', -20);
  GameState.flags.investigacionCompleta = true;

  renderNarrative(`
    <p class="narrative-text">
      Le pasas un fajo de billetes al WiFi. Él sonríe y te da una carpeta con el nombre, la foto y la dirección del sicario. Se llama "El Serbio", un matón de los Balcanes que trabaja para cualquiera que pague.
    </p>
    <p class="narrative-text">
      <em>"Ha sido un placer hacer negocios. Cuando quieras invertir en CalóCoin, ya sabes dónde encontrarme."</em>
    </p>
    <p class="narrative-text">
      Ahora tienes la información. Pero necesitas decidir qué hacer con ella.
    </p>
  `);

  renderContinue('▶ Decidir cómo actuar', 'chapter6_decidir_venganza');
}

function chapter6_amenazar_gatos() {
  modStat('intimidacion', 10);
  modFaction('clanes', -5);
  GameState.flags.investigacionCompleta = true;

  renderNarrative(`
    <p class="narrative-text">
      Te levantas y golpeas la mesa. Los monitores tiemblan. <em>"Mira, chaval. O me das ese nombre ahora mismo, o le cuento a la Abuela Flor que fuisteis vosotros los que filtrasteis la información del asesinato. ¿Qué crees que hará?"</em>
    </p>
    <p class="narrative-text">
      El WiFi traga saliva. Sabe que la Abuela Flor no se anda con tonterías. Te da el nombre del sicario sin cobrarte, pero su mirada te dice que esto no se olvidará.
    </p>
  `);

  renderContinue('▶ Decidir cómo actuar', 'chapter6_decidir_venganza');
}

function chapter6_colaborar_policia() {
  modFaction('policia', 15);
  modFaction('clanes', -10);
  GameState.flags.investigacionCompleta = true;

  renderNarrative(`
    <p class="narrative-text">
      Llamas a ${personajeImg('agenteTorres')} <span class="narrative-char">Torres</span> y le cuentas lo que sabes. Él no te pone pegas esta vez. <em>"Dame 48 horas. Encontraremos al sicario."</em>
    </p>
    <p class="narrative-text">
      Dos días después, Torres te confirma que han detenido al Serbio. El tipo confesó que lo contrató el Chato (o el Ingeniero). La investigación avanza, pero en el barrio corre el rumor de que colaboraste con la pasma. Algunos clanes te miran raro.
    </p>
  `);

  renderContinue('▶ Continuar', 'chapter6_decidir_venganza');
}

function chapter6_investigar_ingeniero() {
  addHistory('Investigaste al Ingeniero por tu cuenta.');
  modStat('diplomacia', 5);
  GameState.flags.investigacionCompleta = true;

  renderNarrative(`
    <div class="event-date">Oficinas de la Inmobiliaria</div>
    <h2 class="event-title">Siguiendo el Rastro</h2>
    <p class="narrative-text">
      Pasas dos días siguiendo al Ingeniero. Descubres que se reúne regularmente con un concejal corrupto y con un tipo con pinta de matón. Consigues fotos de los tres juntos.
    </p>
    <p class="narrative-text">
      La ${personajeImg('laEncarna')} <span class="narrative-char">Encarna</span> te ayuda a analizar las pruebas: el matón es "El Serbio", un sicario profesional. Las fotos son suficientes para presentar una denuncia, pero necesitas un testigo que declare.
    </p>
  `);

  renderContinue('▶ Decidir cómo actuar', 'chapter6_decidir_venganza');
}

function chapter6_venganza_directa() {
  addHistory('Optaste por la venganza directa sin investigar. Mataste a un sospechoso equivocado.');
  modStat('honra', -20);
  modFaction('clanes', -15);
  modFaction('policia', -20);

  if (GameState.stats.honra < 15) {
    renderNarrative(`
      <div class="event-date">San Blas — Consecuencias</div>
      <h2 class="event-title">Sangre inocente</h2>
      <p class="narrative-text">
        Acusas a un chaval de Los Gatos sin pruebas. Le das una paliza delante de todos. Luego se descubre que no tuvo nada que ver. La Abuela Flor te retira su apoyo. Los clanes te dan la espalda.
      </p>
      <p class="narrative-text">
        <span class="narrative-danger">HAS PERDIDO TODA TU HONRA. EL CLAN SE DISUELVE. Debes reiniciar el capítulo.</span>
      </p>
    `);
    renderContinue('🔄 Reiniciar Capítulo VI', 'restartChapter6()');
    return;
  }

  renderNarrative(`
    <div class="event-date">San Blas — Consecuencias</div>
    <h2 class="event-title">Sangre por sangre</h2>
    <p class="narrative-text">
      Sin investigar, señalas al primer sospechoso que encuentras. Resulta ser un inocente. La noticia corre por todo Madrid: el nuevo mediador (si lo eres) es un impulsivo que no respeta la Ley del Camino.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">⭐ -20 Honra</span>
      <span class="stat-change stat-down">🔥 -15 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Continuar a pesar de todo', 'chapter6_elecciones_convocadas');
}

function chapter6_decidir_venganza() {
  renderNarrative(`
    <div class="event-date">San Blas — La decisión</div>
    <h2 class="event-title">¿Qué haces con el sicario?</h2>
    <p class="narrative-text">
      Tienes la información. Sabes quién mató al Tío Antonio y quién lo ordenó. Ahora debes decidir cómo actuar. La Ley del Camino te da varias opciones, pero no todas son igual de sabias.
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter6_venganza_legal(),
    () => chapter6_venganza_sangre(),
    () => chapter6_venganza_publica()
  ];

  renderChoices([
    {
      text: '⚖️ Entregar las pruebas a la fiscalía. Que sea la ley paya la que actúe.',
      hint: '+Respeto institucional. Algunos clanes te llamarán chivato.',
      good: true
    },
    {
      text: '🗡️ Venganza de sangre. Encontrar al sicario y ajusticiarlo.',
      hint: '+Honra callejera. La policía te buscará.',
      danger: true
    },
    {
      text: '📢 Convocar una reunión de clanes y exponer al culpable públicamente.',
      hint: 'Equilibrio. Ganas respeto sin mancharte las manos.',
    }
  ]);
}

function chapter6_venganza_legal() {
  addHistory('Entregaste las pruebas a la fiscalía. La justicia paya actuó.');
  modFaction('policia', 20);
  modFaction('payos', 15);
  modStat('honra', 5);

  renderNarrative(`
    <p class="narrative-text">
      Llevas las pruebas a un fiscal honrado. En una semana, el sicario está detenido y el Chato (o el Ingeniero) es llamado a declarar. La prensa se hace eco. El clan recibe una disculpa pública del Ayuntamiento.
    </p>
    <p class="narrative-text">
      ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> está decepcionado: <em>"Podíamos haberlo matado nosotros. Así no mola."</em> Pero la abuela te aprieta la mano. Ella entiende.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">👮 +20 Policía</span>
      <span class="stat-change stat-up">😤 +15 Payos</span>
      <span class="stat-change stat-up">⭐ +5 Honra</span>
    </p>
  `);

  renderContinue('▶ Continuar — Las elecciones se acercan', 'chapter6_elecciones_convocadas');
}

function chapter6_venganza_sangre() {
  addHistory('Ejecutaste la venganza de sangre. El sicario apareció muerto.');
  modStat('honra', 15);
  modFaction('policia', -25);
  GameState.flags.venganzaRealizada = true;

  renderNarrative(`
    <p class="narrative-text">
      Encuentras al Serbio en un polígono industrial. No hay testigos. Cuando termina la noche, el sicario ha dejado de existir. La policía encuentra el cuerpo por la mañana, pero no hay pruebas que te vinculen.
    </p>
    <p class="narrative-text">
      En el barrio, la noticia corre como la pólvora. Saben que fuiste tú. Te respetan. Te temen. El Chato (o el Ingeniero) se lo pensará dos veces antes de volver a atacar.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +15 Honra</span>
      <span class="stat-change stat-down">👮 -25 Policía</span>
    </p>
  `);

  renderContinue('▶ Continuar — Las elecciones se acercan', 'chapter6_elecciones_convocadas');
}

function chapter6_venganza_publica() {
  addHistory('Expusiste al culpable ante todos los clanes. Humillación pública.');
  modStat('honra', 10);
  modFaction('clanes', 15);

  renderNarrative(`
    <p class="narrative-text">
      Convocas una reunión de todos los clanes en la nave de Usera. Presentas las pruebas delante de todos: las fotos, los testimonios, la confesión del sicario.
    </p>
    <p class="narrative-text">
      El Chato (o el Ingeniero) es desterrado de Madrid por la Ley del Camino. No podrá volver jamás. Los clanes aplauden tu templanza. ${personajeImg('abuelaFlor')} <span class="narrative-char">La Abuela Flor</span> se levanta y te abraza: <em>"Eres un mediador de verdad, muchacho."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +10 Honra</span>
      <span class="stat-change stat-up">🔥 +15 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Continuar — Las elecciones se acercan', 'chapter6_elecciones_convocadas');
}

function chapter6_elecciones_convocadas() {
  renderNarrative(`
    <div class="event-date">Junta Municipal — Una semana después</div>
    <h2 class="event-title">Elecciones anticipadas</h2>
    <p class="narrative-text">
      El escándalo de corrupción ha salpicado al Ayuntamiento. El alcalde dimite y se convocan elecciones municipales en seis meses. ${personajeImg('donFederico')} <span class="narrative-char">Don Federico</span>, un concejal con pinta de no haber salido nunca de la oficina, te cita en su despacho.
    </p>
    <p class="narrative-text">
      <em>"Necesitamos a alguien que... ejem... entienda las dinámicas de las comunidades urbanas con rasgos culturales diferenciados. Y usted, según me han dicho, es un... ejem... 'líder natural'."</em>
    </p>
    <p class="narrative-text">
      La propuesta es clara: el voto gitano a su candidatura a cambio de nombrarte asesor de Cultura y Tradiciones Populares. Es tu oportunidad de entrar en política.
    </p>
    <p class="narrative-text">
      ${personajeImg('rizos')} <span class="narrative-char">La Rizos</span>, que ha estado asesorándote todo este tiempo, te mira con esos ojos que significan algo más que política: <em>"Si aceptas, te ayudo. Pero esto no va solo de discursos. Va de saber jugar sucio cuando haga falta."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter6_aceptar_politica(),
    () => chapter6_rechazar_politica(),
    () => chapter6_romance_rizos()
  ];

  renderChoices([
    {
      text: '🏛️ Aceptar la oferta de Don Federico. Es hora de entrar en política.',
      hint: 'Inicias el camino hacia las elecciones. +Respeto institucional.',
      good: true
    },
    {
      text: '🚫 Rechazar la oferta. La política es cosa de payos.',
      hint: 'Te mantienes en la calle. Pierdes la oportunidad de influir.',
      danger: true
    },
    {
      text: '💘 Antes de decidir, hablar con La Rizos. Esto entre nosotros es más que política.',
      hint: 'Inicias el romance con La Rizos.',
      good: true
    }
  ]);
}

function chapter6_aceptar_politica() {
  addHistory('Aceptaste la oferta de Don Federico. Empieza la carrera política.');
  modFaction('ayuntamiento', 20);
  modStat('diplomacia', 10);
  GameState.flags.eleccionesGanadas = false;

  renderNarrative(`
    <p class="narrative-text">
      Le das la mano a Don Federico. <em>"Trato hecho, payo. Pero mi gente no es moneda de cambio. Si me la juegas, te arrepentirás."</em>
    </p>
    <p class="narrative-text">
      Don Federico sonríe incómodo. Ahora eres oficialmente asesor del Ayuntamiento. Tu foto sale en los periódicos. En el barrio, unos te aplauden y otros te llaman vendido. Pero el poder real está más cerca que nunca.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🏛️ +20 Ayuntamiento</span>
      <span class="stat-change stat-up">🧠 +10 Diplomacia</span>
    </p>
  `);

  renderContinue('▶ Continuar — Los nuevos aliados', 'chapter6_fer_y_los_renovados');
}

function chapter6_rechazar_politica() {
  addHistory('Rechazaste la oferta política. Te mantienes en la calle.');
  modFaction('ayuntamiento', -10);

  renderNarrative(`
    <p class="narrative-text">
      <em>"Gracias, Don Federico, pero yo no sirvo para llevar corbata. Mi sitio está en el barrio, con los míos."</em>
    </p>
    <p class="narrative-text">
      Don Federico encaja la negativa con resignación. Pero sabes que otro clan aceptará su oferta, y ese clan tendrá ventaja sobre el tuyo en el futuro.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">🏛️ -10 Ayuntamiento</span>
    </p>
  `);

  renderContinue('▶ Continuar — Fin del Capítulo VI', 'chapter6_final');
}

function chapter6_romance_rizos() {
  addHistory('Iniciaste un romance con La Rizos. Amor y política se mezclan.');
  GameState.flags.romanceRizos = true;
  modStat('honra', 10);

  renderNarrative(`
    <div class="event-date">San Blas — Noche de confesiones</div>
    <h2 class="event-title">Más que política</h2>
    <p class="narrative-text">
      Quedas con ${personajeImg('rizos')} <span class="narrative-char">La Rizos</span> en el bar de tapas de La Lola. Entre cañas y risas, te confiesa que su padre fue desterrado del clan hace veinte años por un delito que no cometió. Creció con el estigma de ser "la hija del traidor".
    </p>
    <p class="narrative-text">
      <em>"Por eso me hice abogada. Para demostrar que valgo más que mi apellido. Y para entender por qué la Ley del Camino a veces es injusta."</em>
    </p>
    <p class="narrative-text">
      La noche acaba con un beso en el callejón de detrás del mercadillo. Miguelito os pilla y grita: <em>"¡Al fin, coño! ¡Que ya era hora!"</em>
    </p>
    <p class="narrative-text">
      Ahora La Rizos es algo más que tu asesora. Pero el romance con una mujer con su historia puede traer problemas con los clanes más tradicionales.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +10 Honra</span>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter6_aceptar_politica(),
    () => chapter6_rechazar_politica()
  ];

  renderChoices([
    {
      text: '🏛️ Ahora sí, aceptar la oferta de Don Federico.',
      hint: 'Con La Rizos a tu lado, la política será más llevadera.',
      good: true
    },
    {
      text: '🚫 Seguir en la calle. La política no es para nosotros.',
      hint: 'La Rizos te apoyará igualmente.',
    }
  ]);
}

// ════════════════════════════════════════
// NUEVA TRAMA: EL DESAFÍO DE LOS PAYOS RENOVADOS
// ════════════════════════════════════════
function chapter6_fer_y_los_renovados() {
  renderNarrative(`
    <div class="event-date">Malasaña — Local de Los Payos Renovados</div>
    <h2 class="event-title">Fer, el de la kombucha</h2>
    <p class="narrative-text">
      Al día siguiente de aceptar el cargo de asesor, te llega un mensaje de un tal <span class="narrative-char">Fer</span>, líder de Los Payos Renovados. Quiere reunirse contigo en su "espacio de co-creación" de Malasaña.
    </p>
    <p class="narrative-text">
      El sitio está lleno de muebles reciclados, luces de neón y un fuerte olor a kombucha de jengibre. Fer te recibe con un café de especialidad y una sonrisa de esas que no sabes si es sincera o de anuncio.
    </p>
    <p class="narrative-text">
      <em>"Mira, tío, sé que no somos del mismo palo, pero el mercadillo puede ser más grande para todos si lo modernizamos."</em>
    </p>
    <p class="narrative-text">
      Te propone una alianza comercial: ellos ponen la tecnología y la imagen de marca, vosotros ponéis la tradición y los contactos. A cambio, quieren tres puestos en el mercadillo de San Blas para vender sus productos.
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter6_aceptar_fer(),
    () => chapter6_rechazar_fer(),
    () => chapter6_contraoferta_fer()
  ];

  renderChoices([
    {
      text: '🤝 Aceptar la alianza con Los Payos Renovados. La modernidad no está reñida con la tradición.',
      hint: '+Recursos, +Relación con Payos. Algunos clanes te criticarán.',
    },
    {
      text: '🚫 Rechazar la oferta. Esto es cosa nuestra.',
      hint: 'Mantienes la tradición, pero pierdes una oportunidad de negocio.',
      danger: true
    },
    {
      text: '🔄 Proponer una colaboración parcial: un solo puesto experimental.',
      hint: 'Equilibrio. Mides cómo funciona antes de comprometerte.',
      good: true
    }
  ]);
}

function chapter6_aceptar_fer() {
  addHistory('Aceptaste la alianza con Los Payos Renovados. El mercadillo se moderniza.');
  modStat('recursos', 30);
  modFaction('payos', 20);
  modFaction('clanes', -10);
  GameState.flags.alianzaPayosRenovados = true;

  renderNarrative(`
    <p class="narrative-text">
      Le das la mano a Fer. <em>"Trato hecho, pero como me vendas kombucha caducada te meto el puesto por donde no brilla el sol."</em>
    </p>
    <p class="narrative-text">
      Fer se ríe nervioso. A la semana siguiente, los puestos de Los Renovados están llenos de jóvenes con patinete comprando camisetas con frases motivacionales. El mercadillo ahora es una mezcla rara de tradición y modernidad.
    </p>
    <p class="narrative-text">
      La Abuela Flor te llama: <em>"Muchacho, ¿qué es eso de los puestos con luces de colores? No me gusta, pero si da dinero, bien."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">💶 +30 Parné</span>
      <span class="stat-change stat-up">😤 +20 Payos</span>
      <span class="stat-change stat-down">🔥 -10 con Otros Clanes</span>
    </p>
  `);

  GameState.inventory.push('🛴 Alianza con Los Payos Renovados');
  renderContinue('▶ Continuar con la campaña electoral', 'chapter6_campana_electoral');
}

function chapter6_rechazar_fer() {
  addHistory('Rechazaste a Los Payos Renovados. La tradición se mantiene intacta.');
  modStat('honra', 5);
  modFaction('payos', -10);

  renderNarrative(`
    <p class="narrative-text">
      <em>"Gracias, Fer, pero esto es un mercadillo de toda la vida. Aquí no vendemos camisetas de 'good vibes'."</em>
    </p>
    <p class="narrative-text">
      Fer encaja la negativa con deportividad, pero sus seguidores tuitean en contra del clan. Aun así, los viejos del barrio te aplauden.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +5 Honra</span>
      <span class="stat-change stat-down">😤 -10 Payos</span>
    </p>
  `);

  renderContinue('▶ Continuar con la campaña electoral', 'chapter6_campana_electoral');
}

function chapter6_contraoferta_fer() {
  addHistory('Propusiste una colaboración parcial con Los Payos Renovados. Equilibrio.');
  modStat('recursos', 10);
  modStat('diplomacia', 5);
  modFaction('payos', 10);

  renderNarrative(`
    <p class="narrative-text">
      <em>"Mira, Fer, te dejo un puesto durante tres meses. Si funciona, hablamos de más. Si no, recoges tus luces de neón y a otro barrio."</em>
    </p>
    <p class="narrative-text">
      Fer acepta encantado. El puesto experimental tiene éxito moderado. Los clanes tradicionales no se enfadan demasiado y tú consigues una nueva fuente de ingresos sin vender tu alma.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">💶 +10 Parné</span>
      <span class="stat-change stat-up">🧠 +5 Diplomacia</span>
      <span class="stat-change stat-up">😤 +10 Payos</span>
    </p>
  `);

  renderContinue('▶ Continuar con la campaña electoral', 'chapter6_campana_electoral');
}

function chapter6_campana_electoral() {
  renderNarrative(`
    <div class="event-date">Madrid — Seis meses después</div>
    <h2 class="event-title">La Campaña</h2>
    <p class="narrative-text">
      La campaña electoral está en marcha. Don Federico te ha puesto al frente del "voto popular". Tienes que conseguir que los clanes y los barrios os apoyen. Pero no será fácil: otros candidatos también cortejan a los gitanos, y algunos usan métodos sucios.
    </p>
    <p class="narrative-text">
      ${personajeImg('rizos')} <span class="narrative-char">La Rizos</span> te pone al día: <em>"Hay tres frentes abiertos: convencer a los clanes, ganar a los payos del barrio y desenmascarar a un candidato rival que está comprando votos."</em>
    </p>
  `);

  currentChoiceHandlers = [
    () => chapter6_mitin_clanes(),
    () => chapter6_desprestigiar_rival(),
    () => chapter6_compra_votos()
  ];

  renderChoices([
    {
      text: '🎤 Organizar un mitin en Usera. Reunir a todos los clanes y hablarles claro.',
      hint: 'Convences a los clanes con un discurso sincero.',
      good: true
    },
    {
      text: '🕵️ Desenmascarar al candidato corrupto que está comprando votos.',
      hint: 'Eliminas a un rival, pero te arriesgas a represalias.',
    },
    {
      text: '💶 Comprar votos tú también. Si no puedes con ellos, únete.',
      hint: 'Cuesta dinero. Ganas votos pero tu Honra se resiente.',
      danger: true
    }
  ]);
}

function chapter6_mitin_clanes() {
  addHistory('Diste un mitin histórico en Usera. Los clanes se unieron a tu causa.');
  modStat('honra', 15);
  modFaction('clanes', 20);

  renderNarrative(`
    <p class="narrative-text">
      La nave de Usera está a reventar. Gitanos de diez clanes distintos te escuchan en silencio. Hablas de educación, de respeto, de futuro. No prometes milagros, prometes trabajo y dignidad.
    </p>
    <p class="narrative-text">
      <em>"No os pido que votéis a un payo. Os pido que votéis por nosotros mismos, por nuestros hijos, por los que vienen detrás. Si no estamos en las instituciones, otros decidirán por nosotros."</em>
    </p>
    <p class="narrative-text">
      El aplauso es unánime. ${personajeImg('abuelaFlor')} <span class="narrative-char">La Abuela Flor</span> se levanta y dice: <em>"Este chico vale. Votadle."</em> Y cuando la Abuela Flor habla, todos obedecen.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +15 Honra</span>
      <span class="stat-change stat-up">🔥 +20 con Otros Clanes</span>
    </p>
  `);

  renderContinue('▶ Día de las elecciones', 'chapter6_dia_elecciones');
}

function chapter6_desprestigiar_rival() {
  addHistory('Desenmascaraste al candidato corrupto. Cayó en desgracia.');
  modStat('diplomacia', 10);
  modFaction('payos', 10);

  renderNarrative(`
    <p class="narrative-text">
      Con la ayuda de ${personajeImg('elWifi')} <span class="narrative-char">El WiFi</span>, consigues grabaciones del candidato rival comprando votos en Vallecas. Las filtras a la prensa. El escándalo estalla. El candidato se retira de la carrera electoral.
    </p>
    <p class="narrative-text">
      Don Federico está encantado. <em>"Ha sido... ejem... poco ortodoxo, pero efectivo. Me gusta su estilo."</em>
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">🧠 +10 Diplomacia</span>
      <span class="stat-change stat-up">😤 +10 Payos</span>
    </p>
  `);

  renderContinue('▶ Día de las elecciones', 'chapter6_dia_elecciones');
}

function chapter6_compra_votos() {
  if (GameState.stats.recursos < 30) {
    showNotification('No tienes suficiente parné para comprar votos.', 'bad');
    return;
  }
  addHistory('Compraste votos. Ganaste las elecciones pero tu Honra se resintió.');
  modStat('recursos', -30);
  modStat('honra', -10);
  modFaction('policia', -10);

  renderNarrative(`
    <p class="narrative-text">
      Repartes sobres con dinero en los barrios. Compras silencios y promesas. Las elecciones se inclinan a tu favor, pero en el fondo sabes que has traicionado tus principios.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-down">💶 -30 Parné</span>
      <span class="stat-change stat-down">⭐ -10 Honra</span>
    </p>
  `);

  renderContinue('▶ Día de las elecciones', 'chapter6_dia_elecciones');
}

function chapter6_dia_elecciones() {
  GameState.flags.eleccionesGanadas = true;
  modStat('honra', 10);
  modFaction('ayuntamiento', 30);

  renderNarrative(`
    <div class="event-date">Noche electoral</div>
    <h2 class="event-title">Victoria en las urnas</h2>
    <p class="narrative-text">
      Los resultados son claros: Don Federico ha ganado las elecciones por un margen ajustado, y los barrios gitanos han sido clave. Esa noche, la fiesta en San Blas es histórica. ${personajeImg('miguelito')} <span class="narrative-char">Miguelito</span> retransmite en directo para sus seguidores.
    </p>
    <p class="narrative-text">
      ${personajeImg('donFederico')} <span class="narrative-char">Don Federico</span> te llama por teléfono: <em>"Mañana le tomo juramento como asesor oficial. Esto es solo el principio."</em>
    </p>
    <p class="narrative-text">
      ${personajeImg('rizos')} <span class="narrative-char">La Rizos</span> te besa delante de todos. Miguelito grita: <em>"¡Boda, boda, boda!"</em> La abuela sonríe desde su silla. Por primera vez en mucho tiempo, el futuro parece brillante.
    </p>
    <p class="narrative-text">
      <span class="stat-change stat-up">⭐ +10 Honra</span>
      <span class="stat-change stat-up">🏛️ +30 Ayuntamiento</span>
    </p>
    <div class="event-title">CONTINUARÁ...</div>
  `);

  GameState.inventory.push('🏛️ Asesor del Ayuntamiento de Madrid');

  renderContinue('▶ Ir al Capítulo VII', 'startChapter7()');
}

function chapter6_final() {
  renderNarrative(`
    <div class="event-date">San Blas — Fin del Capítulo VI</div>
    <h2 class="event-title">La calle como única bandera</h2>
    <p class="narrative-text">
      Has decidido mantenerte al margen de la política. El barrio te respeta, pero otro clan ha ocupado el espacio que dejaste vacío. Ahora tienes que convivir con un asesor gitano que no es de los tuyos y que tomará decisiones que te afectarán.
    </p>
    <p class="narrative-text">
      El camino se estrecha. Pero mientras haya mercadillo, mientras haya clan, hay esperanza.
    </p>
    <div class="event-title">CONTINUARÁ...</div>
  `);

  renderContinue('▶ Ir al Capítulo VII', 'startChapter7()');
}

function restartChapter6() {
  restoreCurrentState();
  startChapter6();
}

// Nota: startChapter7() se definirá en chapters7.js
