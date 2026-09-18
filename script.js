const beobachtete_elemente = document.querySelectorAll('.fade-in');
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const modalDownload = document.getElementById('modal-download');

const observer = new IntersectionObserver((eintraege) => {
    eintraege.forEach((eintrag) => {
        if (eintrag.isIntersecting) {
            eintrag.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2
});

beobachtete_elemente.forEach((element) => {
    observer.observe(element)
});


const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const themeButton = document.getElementById('theme-toggle');
const html = document.documentElement;

const gespeichertesTheme = localStorage.getItem('theme');

if (gespeichertesTheme === 'light') {
    html.removeAttribute('data-theme');
    themeButton.textContent = '🌙';
} else {
    html.setAttribute('data-theme', 'dark');
    themeButton.textContent = '☀️';
}

themeButton.addEventListener('click', () => {
    const istDunkel = html.getAttribute('data-theme') === 'dark';

    if (istDunkel) {
        html.removeAttribute('data-theme');
        themeButton.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeButton.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

const projekte = {
    todo: {
        titel: "Todo-Liste",
        beschreibung: "Ein Kommandozeilen-Tool mit grafischer Oberfläche zur Aufgabenverwaltung.",
        tags: ["Python", "Tkinter", "JSON"],
        download: "https://github.com/Sxbriics-TV/Todo-Liste/tree/main",
        bild: "images/todo/todo.png",
        details: "Mein erstes richtiges Python-Projekt. Begonnen als einfaches Kommandozeilen-Tool mit Grundfunktionen wie Hinzufügen, Löschen und Markieren, später erweitert um dauerhafte Speicherung mit JSON und schließlich in eine grafische Oberfläche mit Tkinter umgewandelt.",
        herausforderungen: "Die größte Herausforderung war der Umgang mit Fehlerbehandlung (z.B. bei ungültigen Eingaben) und das Verständnis dafür, wie man Daten dauerhaft zwischen Programmstarts speichert."
    },
    passwort: {
        titel: "Passwort-Generator",
        beschreibung: "Generiert sichere, zufällige Passwörter mit einstellbaren Optionen.",
        tags: ["Python", "CustomTkinter"],
        download: "https://github.com/Sxbriics-TV/Passwort-Generator",
        bild: "images/pwgen/pwgen.png",
        details: "Ein Tool zur Generierung sicherer Passwörter mit modernem Design. Nutzt das random-Modul für echte Zufälligkeit und bietet anpassbare Optionen wie Länge und Sonderzeichen.",
        herausforderungen: "Besonders spannend war die Umstellung von normalem Tkinter auf CustomTkinter für ein moderneres Design, sowie das Verpacken zu einer eigenständigen .exe-Datei mit eingebettetem Icon."
    },
    bot: {
        titel: "Discord-Bot",
        beschreibung: "Ein umfangreicher Bot mit Ticket-System, Reaction Roles und mehr.",
        tags: ["Python", "discord.py"],
        download: "https://github.com/Sxbriics-TV/Discord-Bot",
        bild: "images/dcbot/dcbot.png",
        details: "Ein vollwertiger Discord-Bot mit Slash-Commands, automatischer Willkommensnachricht, Rollenvergabe per Reaction, und einem kompletten Ticket-System mit Claim-Funktion.",
        herausforderungen: "Das Arbeiten mit asynchronem Code (async/await) war komplett neu. Besonders das Debugging von Discord-spezifischen Eigenheiten wie fehlenden OAuth-Scopes und der Rollen-Hierarchie hat viel Geduld gebraucht."
    }
};


function oeffneModal(projektId) {
    const projekt = projekte[projektId];

    modalImage.src = projekt.bild;
    modalImage.alt = projekt.titel;
    modalTitle.textContent = projekt.titel;
    modalDescription.textContent = projekt.beschreibung;
    document.getElementById('modal-details').textContent = projekt.details;
    document.getElementById('modal-herausforderungen').textContent = projekt.herausforderungen;
    modalDownload.href = projekt.download;

    modalTags.innerHTML = '';
    projekt.tags.forEach((tag) => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('tag');
        tagElement.textContent = tag;
        modalTags.appendChild(tagElement);
    });

    modal.classList.add('active');
}

document.querySelectorAll('.card-button').forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const projektId = button.getAttribute('data-projekt');
        oeffneModal(projektId);
    });
});

document.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});

const navLinkElemente = document.querySelectorAll('.nav-links a');

navLinkElemente.forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});