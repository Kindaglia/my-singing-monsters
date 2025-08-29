// ===============================
// CONFIGURAZIONE MOSTRI
// ===============================
const monsters = {
    'mammott': 'sounds/mammott.mp3',
    'kayna': 'sounds/kayna.mp3',
    'clamble': 'sounds/clamble.mp3',
    'drumpler': 'sounds/drumpler.mp3',
    'furcorn': 'sounds/furcorn.mp3',
    'noggin': 'sounds/noggin.mp3',
    'parlsona': 'sounds/parlsona.mp3',
    'quibble': 'sounds/quibble.mp3',
    'rare-jammer': 'sounds/rare-jammer.mp3',
    'shrubb': 'sounds/shrubb.mp3',
    'tawkerr': 'sounds/tawkerr.mp3',
    'tweedle': 'sounds/tweedle.mp3',
    'potbelly': 'sounds/potbelly.mp3',
    'maw': 'sounds/maw.mp3',
    'stoowarb': 'sounds/stoowarb.mp3',
    'stogg': 'sounds/stogg.mp3',
    'bowhead': 'sounds/bowhead.mp3',
    'wubbox': 'sounds/wubbox.mp3',
    'rare-wubbox': 'sounds/rare-wubbox.mp3',
    'hoola': 'sounds/hoola.mp3',
    'pompom': 'sounds/pompom.mp3',
    'scups': 'sounds/scups.mp3',
    'quarrister': 'sounds/quarrister.mp3',
    'epic-wubbox-earth': 'sounds/epic-wubbox.mp3',
    'yawstrich-air-island': 'sounds/yawstrich-air-island.mp3',
    'yawstrich-mythical-island': 'sounds/yawstrich-mythical-island.mp3',
    'monculus-wublin-island': 'sounds/monculus-wublin-island.mp3',
    'monculus-ethereal-island': 'sounds/monculus-ethereal-island.mp3',
    'monculus-seasonal-shanty': 'sounds/monculus-seasonal-shanty.mp3'
};

// ===============================
// VARIABILI GLOBALI
// ===============================
const audioObjects = {};
const openingMusic = new Audio("sounds/opening-music.mp3");

// ===============================
// FUNZIONI DI GENERAZIONE HTML
// ===============================

/**
 * Genera dinamicamente i bottoni dei mostri
 */
function generateMonsterButtons() {
    const container = document.getElementById('monster-container');
    const monsterNames = Object.keys(monsters);
    const monstersPerRow = 6;
    
    for (let i = 0; i < monsterNames.length; i += monstersPerRow) {
        const row = document.createElement('div');
        row.className = 'row';
        
        for (let j = i; j < i + monstersPerRow && j < monsterNames.length; j++) {
            const col = document.createElement('div');
            col.className = 'col-lg-2 col-md-4 col-sm-6';
            
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `${monsterNames[j]} monster btn btn-outline-danger`;
            
            col.appendChild(button);
            row.appendChild(col);
        }
        
        container.appendChild(row);
    }
}

/**
 * Genera dinamicamente i bottoni mystery
 */
function generateMysteryButtons() {
    const container = document.getElementById('mystery-container');
    const totalButtons = 24; // 4 righe x 6 bottoni
    const buttonsPerRow = 6;
    
    for (let i = 0; i < totalButtons; i += buttonsPerRow) {
        const row = document.createElement('div');
        row.className = 'row';
        
        for (let j = 0; j < buttonsPerRow; j++) {
            const col = document.createElement('div');
            col.className = 'col-lg-2 col-md-4 col-sm-6';
            
            const button = document.createElement('button');
            button.type = 'button';
            button.disabled = true;
            button.className = 'mystery monster btn btn-outline-danger';
            
            col.appendChild(button);
            row.appendChild(col);
        }
        
        container.appendChild(row);
    }
}

// ===============================
// FUNZIONI AUDIO
// ===============================

/**
 * Crea dinamicamente tutti gli oggetti audio
 */
function initializeAudioObjects() {
    Object.keys(monsters).forEach(monster => {
        audioObjects[monster] = new Audio(monsters[monster]);
    });
}

/**
 * Verifica se un audio è in riproduzione
 * @param {Audio} audio - Oggetto audio da verificare
 * @returns {boolean} - True se l'audio è in riproduzione
 */
function isAudioPlaying(audio) {
    return audio && 
           audio.currentTime > 0 && 
           !audio.paused && 
           !audio.ended && 
           audio.readyState > 2;
}

/**
 * Gestisce il click su un mostro (play/pause audio + stile)
 * @param {string} monsterClass - Classe CSS del mostro
 * @param {Audio} audio - Oggetto audio del mostro
 */
function handleMonsterClick(monsterClass, audio) {
    const $element = $(`.${monsterClass}`);
    
    if (isAudioPlaying(audio)) {
        // Ferma l'audio e rimuovi l'evidenziazione
        audio.pause();
        audio.currentTime = 0;
        $element.removeClass("monster-background-color");
    } else {
        // Avvia l'audio e aggiungi l'evidenziazione
        audio.play();
        $element.addClass("monster-background-color");
    }
}

// ===============================
// FUNZIONI UI
// ===============================

/**
 * Gestisce l'inserimento del nome e la transizione alla schermata mostri
 */
function displayName() {
    $("#name-button").fadeOut();
    $("#input-name").fadeOut();
    const name = $("#input-name").val();
    $(".name").text("Welcome " + name + " click a monster to make sounds.");
    $("#monsters").fadeIn();
    $("#mystery-monsters").fadeOut(0);
    openingMusic.pause();
}

// ===============================
// INIZIALIZZAZIONE
// ===============================

/**
 * Inizializza tutta l'applicazione
 */
function initializeApp() {
    // Genera l'HTML dinamicamente
    generateMonsterButtons();
    generateMysteryButtons();
    
    // Inizializza gli oggetti audio
    initializeAudioObjects();
    
    // Nasconde la sezione mostri inizialmente
    $("#monsters").fadeOut(0);
    
    // Avvia la musica di apertura
    openingMusic.play();
}

// ===============================
// EVENT LISTENERS
// ===============================

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Click sul bottone Enter
$("#name-button").click(function () {
    displayName();
});

// Pressione tasto Enter
$("body").keydown(function (event) {
    if (event.key === "Enter") {
        displayName();
    }
});

// Event delegation per i click sui mostri
$(document).on('click', '.monster:not(.mystery)', function() {
    const classes = this.className.split(' ');
    const monsterClass = classes.find(cls => monsters.hasOwnProperty(cls));
    
    if (monsterClass && audioObjects[monsterClass]) {
        handleMonsterClick(monsterClass, audioObjects[monsterClass]);
    }
});