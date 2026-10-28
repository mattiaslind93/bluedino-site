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
    label: "DU FRÅGAR. AI FÖRESLÅR.",
    title: "Som att tänka högt.<br>Fast någon svarar.",
    description:
      "Du skriver en fråga, får ett förslag och bollar vidare. Be om en veckomeny, hjälp med ett knepigt mejl eller en enkel förklaring. Du håller i ratten.",
    example:
      "”Jag har linser, tomater och 20 minuter. Vad blir det till middag?”",
    caveat:
      "Bra att veta: AI kan låta säker och ändå ha fel. Dubbelkolla det viktiga.",
    visual:
      '<svg viewBox="0 0 230 220"><path d="M21 35q0-12 12-12h141q12 0 12 12v57q0 12-12 12H69l-24 23 3-23H33q-12 0-12-12Z" fill="#FBF9F0" stroke="#7B8A6C" stroke-width="1.8"/><path d="M44 49h115m-115 15h88m-88 15h104" stroke="#A5B090" stroke-width="3" stroke-linecap="round"/><path d="M65 127q0-11 11-11h123q11 0 11 11v51q0 11-11 11h-22l4 19-23-19H76q-11 0-11-11Z" fill="#D8DFCB" stroke="#7B8A6C" stroke-width="1.8"/><circle cx="105" cy="151" r="4" fill="#6B815E"/><circle cx="137" cy="151" r="4" fill="#6B815E"/><path d="M108 166q14 13 27-1" fill="none" stroke="#6B815E" stroke-width="2" stroke-linecap="round"/><path d="m197 24 4 10 11 3-11 4-4 10-3-10-11-4 11-3Z" fill="#D4A06B"/></svg>',
  },
  {
    label: "DU GER UPPDRAGET. AI TAR NÄSTA STEG.",
    title: "En hjälpreda.<br>Med en egen att-göra-lista.",
    description:
      "En agent kan använda verktyg och utföra flera steg i bakgrunden. Med din tillåtelse får den tillgång till kalender, mejl och filer. Du bestämmer uppdraget, behörigheterna och vad som måste godkännas.",
    example:
      "”Kolla morgondagens möten, hitta krockar och föreslå en lugnare plan.”",
    caveat:
      "Börja med läsbehörighet. Låt agenten fråga innan den skickar, bokar om eller raderar.",
    visual:
      '<svg viewBox="0 0 230 220"><g fill="none" stroke="#9BA98C" stroke-width="1.8" stroke-dasharray="4 5"><path d="M114 94 44 39m70 55 72-55m-72 55v88"/></g><g fill="#FBF9F0" stroke="#7B8A6C" stroke-width="1.8"><rect x="13" y="13" width="62" height="48" rx="8"/><rect x="156" y="13" width="62" height="48" rx="8"/><rect x="82" y="164" width="64" height="45" rx="8"/></g><path d="m20 23 24 21 24-21m98 6h41m-32-12v12m22-12v12m-99 159h33m-33 8h24" fill="none" stroke="#7B8A6C" stroke-width="1.5"/><circle cx="114" cy="105" r="36" fill="#D8DFCB" stroke="#7B8A6C" stroke-width="1.8"/><path d="m96 105 12 13 24-27" fill="none" stroke="#5E7A68" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    label: "EN SAK RIKTIGT BRA. IBLAND HELT HEMMA.",
    title: "Alla behöver inte<br>kunna allt.",
    description:
      "Vissa verktyg är specialister på röst, bilder, 3D eller kod. Andra är små modeller som kan köras privat på din egen dator eller telefon. Du väljer verktyg efter uppgiften.",
    example:
      "”Gör en röstanteckning till en inköpslista – direkt på min egen enhet.”",
    caveat:
      "Lokal AI kan köras utan att texten lämnar enheten. Kontrollera att du valt lokal körning och att verktyget passar din hårdvara.",
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
selectLesson(0);
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
      `Visar ${count} verktyg${filter === "alla" ? "" : ` i kategorin ${button.textContent.trim()}`}. ${filter === "gratis" ? "Gratis avser en begränsad gratisnivå eller fria lokala modeller; hårdvara kan tillkomma. " : ""}${filter === "agent" ? "Agentfunktioner kräver rätt plan och godkända kopplingar. " : ""}Personligheterna är förenklade intryck. Funktioner och gränser beror på plan, region och behörigheter. Länkarna går till tjänsternas egna villkor och priser.`;
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

const articles = [
  {
    title: "Så byggde jag min egen morgontidning som levereras kl. 06:00",
    meta: "VARDAGSAUTOMATIK · 24 OKT 2026 · 6 MIN LÄSNING",
    body: '<p class="article-intro">Tänk dig att öppna ett enda mejl och få precis så mycket omvärld som du faktiskt vill ha. Varken mer eller mindre.</p><p class="article-disclosure">Exempelartikel: ett möjligt upplägg att prova. Titeln illustrerar Vardagslabbets format och beskriver inte ett dokumenterat genomfört projekt.</p><h3>Börja med det du vill veta</h3><p>Det svåraste är inte att koppla ihop verktygen. Det är att välja bort. Skriv ned tre ämnen du bryr dig om. Kanske din bransch, något lokalt och ett intresse som inte har det minsta med jobbet att göra.</p><p>Välj sedan några källor du redan litar på. En lugn morgontidning behöver inte söka igenom hela internet. Den behöver hjälpa dig förstå vad som ändrats sedan igår.</p><h3>Ge redaktören en tydlig ram</h3><p>En bra instruktion kan vara: ”Sammanfatta högst fem nyheter från mina valda källor. Berätta vad som hänt, varför det spelar roll och länka till originalet. Om inget viktigt har hänt, skriv det. Hitta inte på något för att fylla plats.”</p><p>Be också om publiceringsdatum och låt verktyget markera osäkra uppgifter. En länk gör det lättare att gå vidare när något faktiskt väcker din nyfikenhet.</p><h3>Sätt väckarklockan på 06:00</h3><p>Använd en tjänst som stöder schemalagda uppgifter och den leverans du vill ha. En automatisering som skickar mejl behöver en godkänd mejlkoppling. Börja med att köra den manuellt och kontrollera resultatet innan du schemalägger.</p><h3>Låt tystnaden vara ett alternativ</h3><p>Lägg in en rad i instruktionen: ”Om ingen nyhet passerar ribban, leverera ett kort allt-är-lugnt-meddelande.” Att verktyget kan arbeta varje morgon betyder inte att det måste fylla den med information.</p><p>Testa i en vecka. Behåller du lugnet? Bra. Börjar brevet kännas som ännu en att-göra-punkt? Minska till två gånger i veckan. Tidningen jobbar för dig.</p>',
  },
  {
    title:
      "Digital butler i praktiken: Från 280 röriga påminnelser till totalt lugn",
    meta: "DIGITALT LUGN · 18 OKT 2026 · 5 MIN LÄSNING",
    body: '<p class="article-intro">En lång lista är ofta ett lager av gamla ambitioner, lösa idéer och några få saker som faktiskt behöver göras.</p><p class="article-disclosure">Exempelartikel: siffran 280 är ett illustrativt scenario, inte ett uppmätt kundresultat.</p><h3>Samla utan att lösa</h3><p>Börja med att samla alla påminnelser på ett ställe. Rensa bort privata detaljer innan du delar med en molntjänst, eller använd ett lokalt verktyg. Du behöver inte organisera materialet först. Det är precis det du ber om hjälp med.</p><p>Be AI hitta dubbletter, otydliga formuleringar och sådant som verkar inaktuellt. Be den fråga när den inte förstår. Den ska aldrig radera något på egen hand.</p><h3>Tre högar räcker långt</h3><p>Be om ett förslag till tre grupper: ”behöver göras”, ”vill göra” och ”kan släppa”. Gå sedan igenom förslaget själv. AI vet inte vad som är viktigt i ditt liv bara för att den kan sortera en lista.</p><p>Nästa instruktion: ”Hjälp mig välja tre rimliga saker för idag. Föreslå ett första steg för varje, som tar högst tio minuter.”</p><h3>Låt butlern påminna, inte bestämma</h3><p>När du valt din plan kan du lägga in den i din befintliga påminnelseapp. Om en agent ska göra det behöver den rätt koppling och ditt godkännande. Kontrollera datum och återkommande uppgifter innan du sparar.</p><p>Det viktiga är inte att tömma hela listan. Det är att kunna lägga ifrån sig den och veta vad nästa lilla steg är.</p>',
  },
  {
    title:
      "Veckans AI utan FOMO: Det enda du faktiskt behöver bry dig om just nu",
    meta: "LAGOM MYCKET AI · 12 OKT 2026 · 3 MIN LÄSNING",
    body: '<p class="article-intro">Du behöver inte läsa ikapp hela AI-internet. Börja med det som stör dig en helt vanlig tisdag.</p><p class="article-disclosure">Exempelartikel med tidlösa arbetssätt. Detta är ingen aktuell nyhetsöversikt.</p><h3>Veckans enda fråga</h3><p>”Vad gör jag om och om igen som jag gärna skulle få lite hjälp med?” Stanna där en stund. Ett återkommande mejl? Middagsplaneringen? Att få struktur på spretiga anteckningar?</p><p>Välj den minsta uppgiften som kommer tillbaka minst en gång i veckan. Det är ofta en bättre början än att försöka automatisera hela livet på lördag.</p><h3>Prova samma sak tre gånger</h3><p>Välj ett verktyg med gratisnivå och prova uppgiften tre gånger. Beskriv vad ett bra resultat innebär. Ge ett avpersonifierat exempel. Berätta vad du vill ändra i svaret.</p><p>Första gången blir det kanske ganska generiskt. Andra gången har du lärt dig vad du behöver säga. Tredje gången kan du bedöma om det sparar tid eller bara flyttar runt arbetet.</p><h3>Du får nöja dig</h3><p>Om en enda bra rutin gör vardagen enklare har du redan fått ut något. Du behöver inte byta verktyg för att en ny modell dyker upp. Lägg den energin på något du faktiskt längtar efter.</p><p>Och om AI inte hjälpte just här? Då har du också lärt dig något användbart. Ta en kaffe och låt resten av internet fortsätta springa.</p>',
  },
  {
    title: "Experiment: Kan en kalender skjuta skumpilar när man snoozar?",
    meta: "HELGLABBET · 5 OKT 2026 · 4 MIN LÄSNING",
    body: '<p class="article-intro">Vissa idéer börjar med ett problem. Andra börjar med ”det här vore ganska roligt”. Den här hör till den andra sorten.</p><p class="article-disclosure">Idéskiss för ett lekfullt helgprojekt. Ingen hårdvara är ansluten till webbplatsen, och experimentet beskrivs inte som genomfört.</p><h3>Ett fokusblock med personlighet</h3><p>Tänk dig ett kalenderblock märkt ”skriv klart”. Du snoozar det. En liten figur på skrivbordet lyfter på huvudet och frågar om det verkligen var planen. I den överdrivna versionen kommer en skumpil mot en tom måltavla.</p><p>Skämtet är att ge en annars osynlig händelse en fysisk reaktion. Tekniken ska vara rolig att leva med, inte bestraffa dig för att dagen ändrar riktning.</p><h3>Börja med lampan</h3><p>Första prototypen behöver varken motor eller avfyrning. Låt ett testblock i kalendern tända en lampa eller spela ett mjukt ljud. Använd en kalenderkoppling med begränsad behörighet och testa med påhittade händelser.</p><p>Vill du ta idén vidare till en fysisk leksak behövs en säker konstruktion, en tydlig avstängning och en tom, avskärmad måltavla. Rikta aldrig mot människor eller djur. Helglabbet fungerar precis lika bra med en liten flagga.</p><h3>Eller hälsa på Microduck</h3><p>En vänligare variant är en Microduck-skrivbordsrobot som läser upp dagens tre viktigaste punkter vid morgonkaffet. Kalendern står för underlaget, en godkänd rösttjänst för talet och du för urvalet.</p><p>Det kanske inte är det snabbaste sättet att läsa en lista. Men allt behöver inte optimeras. Ibland får man bygga något bara för att det gör en glad.</p>',
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
    document.getElementById("article-dialog-body").innerHTML = article.body;
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
      "Tack! Vad fint att du vill hänga med. Det här är ett formulärtest – din e-postadress har inte sparats eller skickats. Nu tar vi en kaffepaus. ☕";
    message.hidden = false;
    event.target.reset();
  });

document.getElementById("booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const topic = document.getElementById("booking-topic").value;
  const description = document
    .getElementById("booking-description")
    .value.trim();
  const text = `SAMTALSUNDERLAG – LUGNA LABBET AV BLUEDINO\n\nEn timme med Mattias\n\nJag vill ha hjälp med:\n${topic}\n\nMin vardag:\n${description || "Det berättar vi mer om under samtalet."}\n\nMålet för samtalet:\nHitta en konkret uppgift att förenkla och ett rimligt första steg.\n\nDetta är ett lokalt sparat underlag. Ingen bokning eller förfrågan har skickats.\n`;
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
