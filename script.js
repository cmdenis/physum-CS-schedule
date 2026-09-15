/* ==========================================================================
   script.js
   Moteur du calendrier: addEvent() crée une carte et l'ajoute dans la bonne
   cellule (jour x créneau) du HTML. Les cellules sont repérées dans le HTML
   par des attributs data-day / data-slot.
   ========================================================================== */

const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
const SLOTS = ['am', 'lunch', 'pm'];

/**
 * Ajoute une carte d'événement dans une cellule du calendrier.
 *
 * @param {string} day   - 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi'
 * @param {string} slot  - 'am' | 'lunch' | 'pm'
 * @param {Object} event
 * @param {string} [event.title]       - Titre de l'événement (gras, première ligne)
 * @param {string} [event.location]    - Lieu (ex: "@Campus MIL")
 * @param {string} [event.time]        - Heure (ex: "12:30 – 13:30")
 * @param {string} [event.description] - Texte libre additionnel (les \n sont respectés)
 * @param {string} [event.color]       - Couleur de fond de la carte (défaut: blanc)
 * @param {string} [event.textColor]   - Couleur du texte (défaut: bleu foncé)
 * @param {string} [event.borderColor] - Couleur de la bordure (défaut: même que le texte)
 * @returns {HTMLElement|null} l'élément carte créé, ou null si la cellule n'existe pas
 */
function addEvent(day, slot, event = {}) {
  const dayKey = String(day).trim().toLowerCase();
  const slotKey = String(slot).trim().toLowerCase();

  if (!DAYS.includes(dayKey) || !SLOTS.includes(slotKey)) {
    console.error(
      `addEvent: "${day}"/"${slot}" invalide. Jours valides: ${DAYS.join(', ')}. Créneaux valides: ${SLOTS.join(', ')}.`
    );
    return null;
  }

  const cell = document.querySelector(`.cell[data-day="${dayKey}"][data-slot="${slotKey}"]`);
  if (!cell) {
    console.error(`addEvent: aucune cellule trouvée pour day="${dayKey}" slot="${slotKey}".`);
    return null;
  }

  const {
    title = '',
    location = '',
    time = '',
    description = '',
    color = '#ffffff',
    textColor = '#1d2036',
    borderColor = textColor,
  } = event;

  const box = document.createElement('div');
  box.className = 'event-box';
  box.style.backgroundColor = color;
  box.style.color = textColor;
  box.style.borderColor = borderColor;

  const addLine = (text, className) => {
    if (!text) return;
    const line = document.createElement('div');
    line.className = className;
    line.textContent = text;
    box.appendChild(line);
  };

  addLine(title, 'event-title');
  addLine(location, 'event-location');
  addLine(time, 'event-time');
  addLine(description, 'event-desc');

  cell.appendChild(box);
  return box;
}

/** Vide une seule cellule (jour + créneau). */
function clearCell(day, slot) {
  const cell = document.querySelector(
    `.cell[data-day="${String(day).toLowerCase()}"][data-slot="${String(slot).toLowerCase()}"]`
  );
  if (cell) cell.innerHTML = '';
}

/** Vide tout le calendrier (utile avant de le repeupler). */
function clearSchedule() {
  document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
}

/* ==========================================================================
   Exemple d'utilisation — reproduit l'horaire de référence.
   Supprime ou remplace tout ce bloc par tes propres appels à addEvent().
   ========================================================================== */

function populateExampleSchedule() {
  addEvent('mardi', 'lunch', {
    title: 'Tricot & Crochet 🧶',
    location: '@LaPlanck',
    time: '12:30 – 13:30',
  });

  addEvent('mercredi', 'lunch', {
    title: 'Club de journal 🔬',
    location: '@MIL',
    time: '12:30 – 13:30',
  });

  addEvent('vendredi', 'lunch', {
    title: 'Conférence du vendredi 📣',
    location: '@A3521.1',
    time: '11:30 – 13:00',
  });

  addEvent('jeudi', 'lunch', {
    title: 'Franco-midis! 🇫🇷',
    location: '@La Planck',
    time: '12:30 – 13:30'
  });

  addEvent('jeudi', 'pm', {
    title: 'Veillée de la FAECUM 🎉',
    location: '@Pav. Jean-Brillant',
    time: '11:30 – 13:00',
    color: '#ffe15a',
    textColor: '#1d2036'
  });

  addEvent('mercredi', 'pm', {
    title: 'Foire des comités 🎪',
    location: '@La Planck',
    time: '17:30'
  });


}

populateExampleSchedule();