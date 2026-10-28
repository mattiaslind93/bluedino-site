"use strict";

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const numberFormat = new Intl.NumberFormat("sv-SE", {
  maximumFractionDigits: 1,
});

// Illustrative estimates, based on 30 days per month.
const timeInputs = [...document.querySelectorAll("[data-minutes]")];
const dailyOutput = document.getElementById("daily-total");
const monthlyOutput = document.getElementById("monthly-total");
let currentMinutes = 25;
let counterFrame;
function updateTime() {
  const total = timeInputs.reduce(
    (sum, input) => sum + (input.checked ? Number(input.dataset.minutes) : 0),
    0,
  );
  cancelAnimationFrame(counterFrame);
  const from = currentMinutes;
  const start = performance.now();
  const duration = motionQuery.matches ? 0 : 550;
  function frame(now) {
    const progress = duration ? Math.min((now - start) / duration, 1) : 1;
    currentMinutes = from + (total - from) * (1 - Math.pow(1 - progress, 3));
    dailyOutput.textContent = numberFormat.format(Math.round(currentMinutes));
    monthlyOutput.textContent = numberFormat.format(
      Math.round(currentMinutes * 5) / 10,
    );
    if (progress < 1) counterFrame = requestAnimationFrame(frame);
  }
  counterFrame = requestAnimationFrame(frame);
  document.getElementById("time-announcement").textContent =
    `Ungefär ${total} minuter per dag, eller ${numberFormat.format(total / 2)} timmar per månad. Ett räkneexempel baserat på 30 dagar.`;
}
timeInputs.forEach((input) => input.addEventListener("change", updateTime));
updateTime();

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("main-nav");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  navigation.classList.toggle("is-open", !expanded);
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);

const lessons = [
  {
    label: "DEN DU PRATAR MED.",
    title: "En chattbot<br>svarar på frågor.",
    description:
      "En chattbot kan förklara något eller ge ett snabbt svar. Vill du slippa göra jobbet själv? Då är agenten nästa steg. Den kan ta hand om återkommande uppgifter åt dig.",
    example: "Chattbotten berättar hur. Agenten kan göra det åt dig.",
    caveat: "AI kan ha fel. Kontrollera det som är viktigt för dig.",
    visual:
      '<svg viewBox="0 0 230 220"><path d="M21 35q0-12 12-12h141q12 0 12 12v57q0 12-12 12H69l-24 23 3-23H33q-12 0-12-12Z" fill="#FBF9F0" stroke="#7B8A6C" stroke-width="1.8"/><path d="M44 49h115m-115 15h88m-88 15h104" stroke="#A5B090" stroke-width="3" stroke-linecap="round"/><path d="M65 127q0-11 11-11h123q11 0 11 11v51q0 11-11 11h-22l4 19-23-19H76q-11 0-11-11Z" fill="#D8DFCB" stroke="#7B8A6C" stroke-width="1.8"/><circle cx="105" cy="151" r="4" fill="#6B815E"/><circle cx="137" cy="151" r="4" fill="#6B815E"/><path d="M108 166q14 13 27-1" fill="none" stroke="#6B815E" stroke-width="2" stroke-linecap="round"/><path d="m197 24 4 10 11 3-11 4-4 10-3-10-11-4 11-3Z" fill="#D4A06B"/></svg>',
  },
  {
    label: "HJÄLP SOM JOBBAR I BAKGRUNDEN.",
    title: "Din digitala butler<br>tar hand om jobbet.",
    description:
      "En agent kan sköta flera steg åt dig. Den sorterar inkorgen, förbereder svar och hittar nya tider när möten krockar. Du kopplar in de appar den behöver en gång. Sedan kan jobbet skötas i bakgrunden.",
    example:
      "Ett möte krockar. Butlern hittar en ny tid och förbereder ombokningen. Du godkänner.",
    caveat:
      "Du väljer vad butlern får göra själv och vad du vill godkänna först.",
    visual:
      '<svg viewBox="0 0 230 220"><g fill="none" stroke="#9BA98C" stroke-width="1.8" stroke-dasharray="4 5"><path d="M114 94 44 39m70 55 72-55m-72 55v88"/></g><g fill="#FBF9F0" stroke="#7B8A6C" stroke-width="1.8"><rect x="13" y="13" width="62" height="48" rx="8"/><rect x="156" y="13" width="62" height="48" rx="8"/><rect x="82" y="164" width="64" height="45" rx="8"/></g><path d="m20 23 24 21 24-21m98 6h41m-32-12v12m22-12v12m-99 159h33m-33 8h24" fill="none" stroke="#7B8A6C" stroke-width="1.5"/><circle cx="114" cy="105" r="36" fill="#D8DFCB" stroke="#7B8A6C" stroke-width="1.8"/><path d="m96 105 12 13 24-27" fill="none" stroke="#5E7A68" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    label: "HJÄLP MED EN VISS SAK.",
    title: "Mötet är slut.<br>Anteckningarna är klara.",
    description:
      "Vissa verktyg sköter ett enda jobb. Ett mötesverktyg kan till exempel sammanfatta beslut och nästa steg automatiskt. Andra kan bearbeta dokument på din egen dator.",
    example:
      "Efter mötet får du en kort sammanfattning. Du slipper skriva rent anteckningarna.",
    caveat:
      "Välj ett verktyg som fungerar med dina appar. Alla ska känna till och godkänna en eventuell inspelning.",
    visual:
      '<svg viewBox="0 0 230 220"><rect x="30" y="55" width="166" height="112" rx="9" fill="#FBF9F0" stroke="#7B8A6C" stroke-width="1.8"/><rect x="43" y="68" width="140" height="84" rx="3" fill="#DFE4D3"/><path d="m12 176 18-9h166l18 9-3 9H16Z" fill="#C3CEB4" stroke="#7B8A6C" stroke-width="1.8"/><g fill="none" stroke="#708363" stroke-width="3" stroke-linecap="round"><path d="M66 107v10m9-20v30m9-39v47m9-38v29m9-19v10"/><rect x="121" y="91" width="39" height="34" rx="3" stroke-width="1.5"/><path d="m125 120 10-13 10 8 8-10 5 15" stroke-width="1.5"/></g><path d="M147 36v-8q0-13 13-13t13 13v8m-29 0h32v26h-32Z" fill="#E5BF85" stroke="#9E865F" stroke-width="1.5"/><circle cx="160" cy="46" r="3" fill="#9E865F"/></svg>',
  },
];
const schoolTabs = [...document.querySelectorAll("[data-school]")];
const schoolPanel = document.getElementById("school-panel");
function animatePanel(panel) {
  panel.classList.remove("panel-enter");
  void panel.offsetWidth;
  panel.classList.add("panel-enter");
}
function selectLesson(index) {
  const lesson = lessons[index];
  schoolTabs.forEach((tab, i) => {
    tab.setAttribute("aria-selected", String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
    tab.classList.toggle("active", i === index);
  });
  schoolPanel.setAttribute("aria-labelledby", `school-tab-${index}`);
  document.getElementById("lesson-label").textContent = lesson.label;
  document.getElementById("lesson-title").innerHTML = lesson.title;
  document.getElementById("lesson-description").textContent =
    lesson.description;
  document.getElementById("lesson-example").textContent = lesson.example;
  document.getElementById("lesson-caveat").textContent = lesson.caveat;
  document.getElementById("lesson-visual").innerHTML = lesson.visual;
  animatePanel(schoolPanel);
}
function keyboardTabs(tabs, onSelect, orientation = "horizontal") {
  tabs.forEach((tab, index) =>
    tab.addEventListener("keydown", (event) => {
      const vertical =
        typeof orientation === "function"
          ? orientation() === "vertical"
          : orientation === "vertical";
      let next;
      if (event.key === (vertical ? "ArrowDown" : "ArrowRight"))
        next = (index + 1) % tabs.length;
      if (event.key === (vertical ? "ArrowUp" : "ArrowLeft"))
        next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        onSelect(next);
        tabs[next].focus();
      }
    }),
  );
}
schoolTabs.forEach((tab, index) =>
  tab.addEventListener("click", () => selectLesson(index)),
);
keyboardTabs(schoolTabs, selectLesson, () =>
  document.querySelector(".school-tabs").getAttribute("aria-orientation"),
);
selectLesson(1);
const schoolLayout = window.matchMedia("(max-width: 920px)");
function updateSchoolOrientation() {
  document
    .querySelector(".school-tabs")
    .setAttribute(
      "aria-orientation",
      schoolLayout.matches ? "horizontal" : "vertical",
    );
}
updateSchoolOrientation();
schoolLayout.addEventListener("change", updateSchoolOrientation);

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const toolCards = [...document.querySelectorAll(".tool-card")];
filterButtons.forEach((button) =>
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((other) => {
      const selected = other === button;
      other.classList.toggle("active", selected);
      other.setAttribute("aria-pressed", String(selected));
    });
    let count = 0;
    toolCards.forEach((card) => {
      const visible =
        filter === "alla" || card.dataset.tags.split(" ").includes(filter);
      card.hidden = !visible;
      if (visible) {
        count++;
        animatePanel(card);
      }
    });
    document.getElementById("filter-status").textContent =
      `Visar ${count} verktyg${filter === "alla" ? "" : ` i kategorin ${button.textContent.trim()}`}. ${filter === "gratis" ? "Gratis gäller en begränsad nivå eller AI på din egen dator. " : ""}Automatisk hjälp kan kräva betalplan och kopplingar till dina appar. Du väljer vad tjänsten får komma åt. Stödet varierar mellan konton och länder. Läs mer hos varje tjänst.`;
  }),
);

const trackTabs = [...document.querySelectorAll("[data-track]")];
function selectTrack(index) {
  trackTabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    tab.classList.toggle("active", selected);
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.hidden = !selected;
    if (selected) animatePanel(panel);
  });
}
trackTabs.forEach((tab, index) =>
  tab.addEventListener("click", () => selectTrack(index)),
);
keyboardTabs(trackTabs, selectTrack);

const groceryLayout = window.matchMedia("(max-width: 700px)");
function updateGroceryOrientation() {
  document.querySelectorAll(".grocery-tabs").forEach((tablist) => {
    tablist.setAttribute(
      "aria-orientation",
      groceryLayout.matches ? "vertical" : "horizontal",
    );
  });
}
groceryLayout.addEventListener("change", updateGroceryOrientation);
let selectedGroceryLevel = 0;
let groceryWidgetCount = 0;
function selectGroceryLevel(index) {
  selectedGroceryLevel = index;
  document.querySelectorAll("[data-grocery-widget]").forEach((widget) => {
    widget.querySelectorAll("[data-grocery-tab]").forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    widget.querySelectorAll("[data-grocery-panel]").forEach((panel, i) => {
      panel.hidden = i !== index;
    });
  });
}
function initGroceryWidgets(root) {
  root.querySelectorAll("[data-grocery-widget]").forEach((widget) => {
    if (widget.dataset.initialized) return;
    widget.append(
      document.getElementById("grocery-steps-template").content.cloneNode(true),
    );
    widget.dataset.initialized = "true";
    const prefix = `grocery-${++groceryWidgetCount}`;
    const tabs = [...widget.querySelectorAll("[data-grocery-tab]")];
    const panels = [...widget.querySelectorAll("[data-grocery-panel]")];
    tabs.forEach((tab, i) => {
      tab.id = `${prefix}-tab-${i}`;
      panels[i].id = `${prefix}-panel-${i}`;
      tab.setAttribute("aria-controls", panels[i].id);
      panels[i].setAttribute("aria-labelledby", tab.id);
      tab.addEventListener("click", () => selectGroceryLevel(i));
    });
    keyboardTabs(tabs, selectGroceryLevel, () =>
      widget.querySelector(".grocery-tabs").getAttribute("aria-orientation"),
    );
  });
  updateGroceryOrientation();
  selectGroceryLevel(selectedGroceryLevel);
}
initGroceryWidgets(document);

const articles = [
  {
    title: "Din morgontidning blir klar automatiskt kl. 06:00",
    image: "img/blog-morgontidning.jpg",
    imageAlt: "En lugn morgon med tidning och kaffe på köksbordet",
    caption: "06:00 • DIN EGEN MORGONTIDNING",
    imageWidth: 1152,
    imageHeight: 864,
    meta: "VARDAGSAUTOMATIK · 24 OKT 2026 · 6 MIN LÄSNING",
    body: '<p class="article-intro">Ett enda kort brev väntar när du vaknar. Agenten har läst dina valda nyhetskällor och samlat det viktigaste. Du slipper leta själv.</p><p class="article-disclosure">Exempel på en automatisk rutin. Det här är inget genomfört projekt eller en tjänst som är ansluten till sidan.</p><h3>Välj det du vill hålla koll på</h3><p>Börja med två eller tre ämnen. Kanske lokala nyheter, jobbet och ett fritidsintresse. Välj några källor du litar på.</p><p>Det här väljer du en gång. Sedan kan agenten gå igenom samma källor varje morgon. Du behöver inte starta om jobbet varje dag.</p><h3>Låt agenten göra läsjobbet</h3><p>Agenten letar efter nya artiklar, tar bort dubbletter och sammanfattar högst fem nyheter. Varje nyhet får datum och länk till originalet.</p><p>Du läser den korta översikten. Vill du veta mer finns källan ett klick bort. Du slipper öppna tio flikar för att förstå vad som har hänt.</p><h3>Brevet blir klart kl. 06:00</h3><p>Välj en tjänst som kan köra uppgifter på bestämda tider. Koppla in dina källor och välj hur resultatet ska komma fram. Ett brev till inkorgen kräver en fungerande mejlkoppling.</p><h3>Prova en morgon. Låt det sedan rulla.</h3><p>Kontrollera det första brevet. Är nyheterna relevanta och länkarna rätt? Då kan samma rutin fortsätta varje morgon. Om inget viktigt har hänt räcker en kort notis.</p><p>Du väljer hur ofta brevet ska komma. Varje dag eller två gånger i veckan. Målet är mindre letande och mer tid till en lugn morgon.</p>',
  },
  {
    title: "Låt butlern hålla koll på räkningar och påminnelser",
    image: "img/blog-butler-paminnelser.jpg",
    imageAlt:
      "Anteckningsbok, penna och nycklar på ett varmt upplyst skrivbord",
    caption: "KODACHROME 64 • DIGITALT LUGN",
    imageWidth: 1152,
    imageHeight: 864,
    meta: "DIGITALT LUGN · 18 OKT 2026 · 5 MIN LÄSNING",
    body: '<p class="article-intro">Räkningar kommer i mejlen. Påminnelser ligger i olika listor. En digital butler kan samla det som behöver göras och säga till i tid.</p><p class="article-disclosure">Exempel på ett möjligt upplägg. Inga räkningar eller personliga listor är anslutna till sidan.</p><h3>Koppla in det butlern ska hålla koll på</h3><p>Välj mejlmappen och listorna som butlern får läsa. Den kan samla datum och hitta samma påminnelse på flera ställen. Du slipper gå igenom allt själv.</p><p>Börja med en lista och en mapp. Butlern får bara tillgång till det du väljer. Gamla påminnelser kan föreslås för rensning. Du godkänner innan något tas bort.</p><h3>Få en kort översikt i rätt tid</h3><p>Butlern går igenom det nya på ett schema. Den visar vad som behöver göras idag och vad som snart ska betalas. Samma rutin fortsätter utan att du behöver starta den igen.</p><p>En notis kan till exempel säga: ”Elräkningen ska betalas på fredag. Beloppet är 680 kronor.” Du öppnar originalet och kontrollerar belopp och datum.</p><h3>Du tar besluten. Butlern håller koll.</h3><p>Med rätt koppling kan butlern lägga in en påminnelse i appen du redan använder. Du väljer hur långt före sista dagen du vill bli påmind. Betalningen sköter du i banken.</p><p>Du slipper minnas varje datum och leta i flera appar. Det viktiga kommer till dig när det är dags.</p>',
  },
  {
    title: "Låt ett tråkigt jobb sköta sig varje vecka",
    image: "img/spar-vardag.jpg",
    imageAlt: "Ett solbelyst skrivbord med böcker och växter",
    caption: "KODACHROME 64 • LÅT DET VARA LAGOM",
    imageWidth: 1200,
    imageHeight: 675,
    meta: "VARDAGSAUTOMATIK · 12 OKT 2026 · 3 MIN LÄSNING",
    body: '<p class="article-intro">Välj ett digitalt jobb du gör om och om igen. Låt AI ta hand om det i bakgrunden. Det räcker som första steg.</p><p class="article-disclosure">Exempel på hur du kan komma igång. Vilka jobb som kan skötas automatiskt beror på tjänsten och dina appar.</p><h3>Välj något du gärna slipper</h3><p>Kanske går du igenom samma sorts mejl varje morgon. Eller skriver rent anteckningar efter varje möte. Välj ett litet jobb som återkommer ofta.</p><p>Inkorgen kan sorteras automatiskt. Möten kan sammanfattas när de är slut. Du får resultatet utan att kopiera in text i en chatt varje gång.</p><h3>Koppla in hjälpen en gång</h3><p>Välj en tjänst som stöder jobbet. Koppla in mejlen, kalendern eller mötesappen den behöver. Bestäm när jobbet ska köras och vad du vill godkänna själv.</p><p>Testa med ett mejl eller ett möte. Kontrollera att det blir rätt. Låt sedan rutinen sköta samma jobb nästa gång. Betalningar, utskick och ombokningar kan stanna för ditt godkännande.</p><h3>Se om du faktiskt får tid över</h3><p>Efter en vecka: blir jobbet gjort och behöver du lägga mindre tid på det? Då hjälper rutinen. Om du måste rätta allt kan du välja en enklare uppgift.</p><p>En fungerande rutin räcker långt. Du får använda tiden till något annat och låta hjälpen fortsätta i bakgrunden.</p>',
  },
  {
    title: "Helglabbet: När kalendern får saker att hända",
    image: "img/blog-nerf-kalender.jpg",
    imageAlt: "Ett lekfullt skrivbordsexperiment med kalender och skumpilar",
    caption: "KODACHROME 64 • HELGLABBET",
    imageWidth: 1152,
    imageHeight: 864,
    meta: "HELGLABBET · 5 OKT 2026 · 4 MIN LÄSNING",
    body: '<p class="article-intro">När ett kalenderblock börjar tänds en lampa på skrivbordet. Du behöver inte hålla koll på klockan. Det är ett litet exempel på något som händer automatiskt.</p><p class="article-disclosure">Idé till ett helgprojekt. Ingen lampa, robot eller annan utrustning är ansluten till sidan.</p><h3>Kalendern startar jobbet</h3><p>Välj ett kalenderblock, till exempel en paus. När tiden är inne skickar en ansluten tjänst en signal till lampan. Den tänds utan att du trycker på något.</p><p>En sådan rutin behöver ofta ingen AI alls. Kalendern håller tiden och lampan visar att det är dags. AI kan hjälpa när innehållet också behöver väljas eller sammanfattas.</p><h3>Börja med en lampa</h3><p>Koppla ett testblock i kalendern till en lampa eller ett mjukt ljud. Det kräver en tjänst som fungerar med både kalendern och lampan. Testa att signalen kommer vid rätt tid.</p><p>Skumpilsidén på bilden är den lekfulla varianten. Den får stanna vid en tom, avskärmad måltavla och ha en tydlig avstängning. En lampa eller liten flagga räcker lika bra.</p><h3>En morgonhälsning från Microduck</h3><p>En liten Microduck-robot skulle kunna läsa upp dagens tre viktigaste punkter. En agent hämtar kalendern, gör en kort sammanfattning och skickar den till robotens röst.</p><p>När allt är kopplat kan morgonhälsningen starta av sig själv. Du får dagens översikt till kaffet. Ibland får automatisk hjälp också vara lite rolig.</p>',
  },
  {
    title:
      "Säg bara 'Handla mat' – Låt butlern sköta veckohandlingen i 3 nivåer",
    meta: "VARDAGSAUTOMATIK · 28 OKT 2026 · 8 MIN LÄSNING",
    image: "img/blog-willys-mat.jpg",
    imageAlt:
      "En matkasse med grönsaker, bröd och mjölk bredvid telefonens inköpslista",
    caption: "KODACHROME 64 • FRÅN LISTA TILL MIDDAG",
    imageWidth: 1152,
    imageHeight: 864,
    body: document.getElementById("grocery-article-template").innerHTML,
  },
];
const articleDialog = document.getElementById("article-dialog");
const bookingDialog = document.getElementById("booking-dialog");
let dialogTrigger;
let savedScroll = 0;
function openDialog(dialog, trigger) {
  dialogTrigger = trigger;
  savedScroll = window.scrollY;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = "hidden";
}
document.querySelectorAll("[data-article]").forEach((button) =>
  button.addEventListener("click", () => {
    const article = articles[Number(button.dataset.article)];
    document.getElementById("article-dialog-meta").textContent = article.meta;
    document.getElementById("article-dialog-title").textContent = article.title;
    const image = document.getElementById("article-dialog-image");
    image.src = article.image;
    image.alt = article.imageAlt;
    image.width = article.imageWidth;
    image.height = article.imageHeight;
    document.getElementById("article-dialog-caption").textContent =
      article.caption;
    document.getElementById("article-dialog-body").innerHTML = article.body;
    initGroceryWidgets(document.getElementById("article-dialog-body"));
    openDialog(articleDialog, button);
  }),
);
document
  .querySelectorAll("[data-booking]")
  .forEach((button) =>
    button.addEventListener("click", () => openDialog(bookingDialog, button)),
  );
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog
    .querySelectorAll("[data-close]")
    .forEach((button) =>
      button.addEventListener("click", () => dialog.close()),
    );
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    window.scrollTo({ top: savedScroll, behavior: "instant" });
    if (dialogTrigger) dialogTrigger.focus({ preventScroll: true });
  });
});

document
  .getElementById("newsletter-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("newsletter-email");
    if (!input.reportValidity()) return;
    const message = document.getElementById("newsletter-message");
    message.textContent =
      "Tack! Det här är ett formulärtest. Din e-postadress har inte sparats eller skickats.";
    message.hidden = false;
    event.target.reset();
  });

document.getElementById("booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const topic = document.getElementById("booking-topic").value;
  const description = document
    .getElementById("booking-description")
    .value.trim();
  const text = `SAMTALSUNDERLAG – LUGNA LABBET AV BLUEDINO\n\nEn timme med Mattias\n\nJag vill ha hjälp med:\n${topic}\n\nMin vardag:\n${description || "Det berättar vi mer om under samtalet."}\n\nMålet för samtalet:\nHitta ett digitalt jobb som kan skötas automatiskt och ett första steg för att komma igång.\n\nDetta är ett lokalt sparat underlag. Ingen bokning eller förfrågan har skickats.\n`;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lugna-labbet-samtalsunderlag.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const message = document.getElementById("booking-message");
  message.textContent =
    "Ditt samtalsunderlag är klart och laddas ned som en textfil. Ingen tid har bokats och inget har skickats.";
  message.hidden = false;
});

document.getElementById("year").textContent = new Date().getFullYear();
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("is-pending");
        revealObserver.unobserve(entry.target);
      }),
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((element) => {
    if (motionQuery.matches) return;
    element.classList.add("is-pending");
    revealObserver.observe(element);
  });
  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("main > section[id]")
    .forEach((section) => navObserver.observe(section));
}
