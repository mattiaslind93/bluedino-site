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
    title: "Din morgontidning skrivs ut automatiskt kl. 06:00",
    image: "img/blog-morgontidning.jpg",
    imageAlt: "En lugn morgon med tidning och kaffe på köksbordet",
    caption: "06:00 • DIN EGEN MORGONTIDNING",
    imageWidth: 1152,
    imageHeight: 864,
    meta: "VARDAGSAUTOMATIK · 24 OKT 2026 · 6 MIN LÄSNING",
    body: '<p class="article-intro">Din egen papperstidning väntar när du vaknar. Agenten har läst dina valda nyhetskällor, samlat det viktigaste och skickat en A4-tidning till skrivaren hemma kl. 06:00.</p><p class="article-disclosure">Exempel på en automatisk rutin. Det här är inget genomfört projekt eller en tjänst som är ansluten till sidan.</p><h3>Välj det du vill hålla koll på</h3><p>Börja med två eller tre ämnen. Kanske lokala nyheter, jobbet och ett fritidsintresse. Välj några källor du litar på.</p><p>Det här väljer du en gång. Sedan kan agenten gå igenom samma källor varje morgon. Du behöver inte starta om jobbet varje dag.</p><h3>Låt agenten göra läsjobbet</h3><p>Agenten letar efter nya artiklar, tar bort dubbletter och sammanfattar högst fem nyheter. Varje nyhet får datum och källhänvisning.</p><p>Låt agenten sätta samman nyheterna i en lättläst PDF i A4-format, med tydliga rubriker och lagom stor text. Lägg till korta källadresser eller QR-koder om du vill kunna läsa vidare på mobilen.</p><h3>Prova en morgon</h3><p>Kontrollera den första PDF-filen. Är nyheterna relevanta, källorna rätt och texten lätt att läsa på papper? Justera urval och layout tills tidningen känns som din.</p><h3>Koppla flödet till din vanliga skrivare hemma</h3><p>Lägg till skrivaren på en dator eller liten hemmaserver i samma nätverk, via AirPrint om skrivaren stöder det eller som en skrivarkö i CUPS. Låt flödet spara A4-PDF:en där och skicka den till skrivarkön automatiskt. Datorn eller hemmaservern som sköter utskriften behöver vara på och vaken när jobbet körs.</p><p>Har skrivaren en egen e-postadress med stöd för utskrift av PDF-bilagor? Då kan flödet i stället mejla tidningen dit. Aktivera funktionen hos skrivaren och godkänn flödets avsändaradress om det behövs.</p><h3>Papperstidningen väntar kl. 06:00</h3><p>Schemalägg insamlingen och PDF-bygget en stund i förväg och den automatiska utskriften till kl. 06:00 varje morgon, i din lokala tidszon. Gör en provutskrift och se till att skrivaren är ansluten, kan ta emot utskriftsjobb och har A4-papper.</p><p>Ställ skrivaren vid kaffebryggaren och låt rutinen rulla. Varje morgon kl. 06:00 skrivs din egen A4-tidning ut automatiskt och väntar som en fysisk papperstidning vid kaffebryggaren.</p>',
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
  {
    title:
      "När proppen går i hallen: Visa proppskåpet med kameran och få hjälp direkt",
    image: "img/blog-proppskap.jpg",
    imageAlt:
      "Ett proppskåp med porslinsproppar visas för en röstagent via mobilkameran",
    caption: "KODACHROME 64 • LIVE RÖST & VIDEO",
    imageWidth: 1152,
    imageHeight: 864,
    meta: "LIVE RÖST & VIDEO · 28 OKT 2026 · 4 MIN LÄSNING",
    body: `<p class="article-intro">Plötsligt blir det mörkt i köket eller hallen. Med en live röstagent som kan se genom mobilkameran kan du visa proppskåpet och få hjälp att läsa märkningen, förstå nästa steg och hitta rätt reservpropp.</p>
      <p class="article-disclosure">Exempel på ett möjligt upplägg. Det kräver en tjänst med live röst och video. För butikssökningen behövs även tillgång till aktuella butikssidor eller lageruppgifter.</p>
      <h3>Steg 1: Slå på kameran och visa proppskåpet</h3>
      <p>Öppna röstläget i en tjänst som stöder live-video och slå på kameran. Stå stadigt med bra belysning och visa först hela proppskåpet. Säg: ”Strömmen har gått i hallen. Kan du hjälpa mig att se vilken propp jag ska kontrollera?”</p>
      <p>Rikta sedan kameran mot porslinspropparnas små fönster. Agenten kan hjälpa dig att upptäcka en propp där signalpärlan, det lilla ögat, har lossnat. Visa också gruppförteckningen så att ni kan jämföra med köket eller hallen. En kamerabild eller signalpärla räcker inte för en säker bedömning. Är bilden eller märkningen oklar, stanna och be om hjälp på plats.</p>
      <h3>Steg 2: Bryt strömmen och läs märkningen tillsammans</h3>
      <p>Be agenten ta ett moment i taget med rösten. Stäng av apparaterna i den berörda gruppen och slå av huvudströmbrytaren innan du skruvar ur propphuven. Med torra händer skruvar du försiktigt ur den hela, oskadade propphuven och tar ut säkringen. Håll i huven och rör aldrig kontakterna inne i skåpet. Huvudströmbrytaren gör inte alla delar av skåpet spänningslösa.</p>
      <p>Visa säkringen nära kameran och läs själv upp texten. Agenten hjälper dig att jämföra färgmarkering och ampere-tal: exempelvis röd 10A eller grå 16A. Läs även typ och eventuell märkning för trög säkring. Passkontakten i sockeln begränsar vilken säkring som passar; låt den sitta orörd och använd aldrig högre ampere-tal. Kameran kan hjälpa till att tolka synlig märkning, men du behöver inte röra eller ta loss passkontakten.</p>
      <p>Byt bara en vanlig användaråtkomlig proppsäkring om du vet hur det ska göras och propphuven är hel. Vid sprickor, bränd lukt, missfärgning eller osäkerhet avbryter du och kontaktar en elektriker.</p>
      <h3>Steg 3: Hitta rätt reservpropp i en butik nära dig</h3>
      <p>Är reservlådan tom? Visa proppen i handen och säg: ”Hjälp mig hitta samma typ nära mig, till exempel Diazed 10A trög. Vilken butik har öppet och har den på hyllan?” Ange ort eller ungefärlig plats. Låt agenten jämföra typ, storlek, ampere-tal och märkning med butikens produktuppgifter.</p>
      <p>Med tillgång till aktuella uppgifter kan agenten söka hos exempelvis Clas Ohlson, Jula, Biltema eller matbutiken runt hörnet. Be om närmaste öppna butik, exakt produkt, adress, öppettider och källa till lagersaldot. Saknas aktuellt lagersaldo behöver butiken bekräfta det, exempelvis per telefon, innan du åker.</p>
      <p>När du har rätt ersättare och huvudströmbrytaren fortfarande är av sätter du säkringen i den hela propphuven och skruvar tillbaka den försiktigt. Slå på huvudströmbrytaren och därefter apparaterna en i taget. Går den nya proppen direkt igen, sluta byta och låt en elektriker undersöka orsaken.</p>`,
  },
  {
    title:
      "Låt butlern bevaka lokala jobb och förbereda personliga brev åt dig",
    image: "img/blog-jobb-bevakning.jpg",
    imageAlt:
      "Jobbevakning och ett utkast till personligt brev på ett skrivbord",
    caption: "KODACHROME 64 • AUTOMATISK JOBBSPANING",
    imageWidth: 1152,
    imageHeight: 864,
    meta: "AUTOMATISK JOBBSPANING · 28 OKT 2026 · 4 MIN LÄSNING",
    body: `<p class="article-intro">Du behöver inte skrolla platsannonser varje kväll. En digital butler kan bevaka jobb nära dig, välja ut de få som passar och förbereda personliga brev som låter som du. Varje morgon väntar ett litet urval att ta ställning till.</p>
      <p class="article-disclosure">Exempel på en automatisk rutin. Du behöver en agent med schemalagda körningar och tillgång till valda annonskällor och dina dokument. Ingen jobbevakning är ansluten till den här sidan.</p>
      <h3>Steg 1: Beskriv jobbet du faktiskt vill göra</h3>
      <p>Börja med platsen: din stad eller högst tre mil från där du bor. Lägg till vad som passar din vardag, till exempel deltid, dagtid, en viss restid eller möjlighet att arbeta hemifrån. Sätt sedan ord på uppgifterna du gillar och det du redan kan.</p>
      <p>En instruktion kan vara: ”Bevaka jobb inom tre mil från min stad där jag får hjälpa kunder, planera och lösa praktiska problem. Jag har erfarenhet av butik och administration och vill arbeta dagtid.” Då kan butlern hitta relevanta roller även när arbetsgivaren använder en annan jobbtitel.</p>
      <p>Välj vilka annonskällor den ska läsa, till exempel sparade jobbevakningar, annonsflöden och lokala arbetsgivares karriärsidor. Ge den ditt aktuella CV och ett par tidigare texter som du själv har skrivit. Bestäm en morgontid och var du vill få resultatet, till exempel i en egen mapp med en kort sammanställning.</p>
      <h3>Steg 2: Låt butlern sålla varje morgon</h3>
      <p>Schemalägg rutinen en gång, exempelvis till klockan 07 varje vardag. Agenten läser nya annonser i bakgrunden, tar bort dubbletter och sådant du redan har sett och jämför arbetsuppgifter, ort och villkor med dina önskemål.</p>
      <p>Be den skilja på verkliga grundkrav och sådant arbetsgivaren beskriver som meriterande. En lång kravlista behöver inte utesluta ett jobb, men ett obligatoriskt körkort eller en behörighet som du saknar ska framgå tydligt. Välj högst tre starka träffar per morgon och låt den säga till när inget passar.</p>
      <p>För varje träff får du annonslänk, arbetsgivare, plats, sista ansökningsdag och en kort förklaring till varför jobbet passar. Eventuella luckor i din erfarenhet följer med så att du kan bedöma dem själv.</p>
      <h3>Steg 3: Få ett brevutkast i din egen ton</h3>
      <p>För varje utvald tjänst läser agenten annonsen och företagets egen webbplats. Den kopplar konkreta arbetsuppgifter till erfarenheter i ditt CV och använder dina tidigare texter för att hitta din ton, dina vanliga ord och hur kort eller personligt du brukar skriva.</p>
      <p>Ge en tydlig instruktion: ”Skriv ett kort utkast i min stil. Använd två konkreta exempel från mitt CV som passar tjänsten. Undvik klyschor och hitta inte på erfarenheter eller intresse för företaget. Markera sådant du behöver fråga mig om.” Då bygger brevet på det du faktiskt har gjort.</p>
      <p>Låt butlern spara ett separat utkast per tjänst, tillsammans med annonslänken och en kort lista över det du behöver kontrollera. Läs igenom, rätta fakta och finputsa formuleringarna tills brevet känns som ditt. Du väljer vilka jobb du vill söka och skickar ansökan själv.</p>
      <p>Efter den första veckan kan du berätta vilka träffar som var bra och vilka du valde bort. Justera avstånd, arbetsuppgifter och urval. Nästa morgon fortsätter samma rutin med en tydligare bild av vad du söker.</p>`,
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
