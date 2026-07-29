/**
 * Zentrale Konfigurationsdatei der Reiki-Website.
 *
 * WICHTIG: Alle Werte in diesem File sind Platzhalter oder Beispieltexte.
 * Vor der Veröffentlichung müssen sie durch echte, geprüfte Angaben ersetzt
 * werden. Platzhalter sind durchgängig in eckigen Klammern gekennzeichnet,
 * z. B. [NAME DER ANBIETERIN].
 *
 * Diese Datei ist die einzige Stelle, an der Stammdaten, Preise, Texte und
 * rechtliche Hinweise gepflegt werden sollen. Komponenten und Seiten sollten
 * ausschließlich aus dieser Datei lesen, statt Texte doppelt zu pflegen.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  context: string;
};

export type PriceItem = {
  label: string;
  duration?: string;
  price: string;
  note?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  /** Optionaler Scan/Foto des Zertifikats. Wird nicht direkt angezeigt, sondern erst nach Klick geöffnet. */
  imageSrc?: string;
};

export type NewsPost = {
  /** ISO-Datum (YYYY-MM-DD), wird für Sortierung und Anzeige verwendet. */
  date: string;
  title: string;
  text: string;
};

export const siteConfig = {
  /** Praxisname, erscheint im Header, Footer und in Metadaten. */
  practiceName: "Reiki Studio Petra In-Albon",

  /** Zweizeilige Darstellung des Praxisnamens für den Header (neben dem Logo). */
  headerBrand: {
    line1: "Reiki Studio",
    line2: "Petra In-Albon"
  },

  /** Name der Anbieterin für Über-mich-Seite, Impressum und strukturierte Daten. */
  providerName: "Petra In-Albon",

  /** Berufs- bzw. Tätigkeitsbezeichnung. */
  jobTitle: "Reiki-Praktikerin für Menschen und Tiere",

  /** Kurzer Claim, u. a. für Footer und Meta-Beschreibung nutzbar. */
  tagline: "Achtsame Reiki-Begleitung für Menschen und Tiere",

  /**
   * Basis-URL der Website, wichtig für Canonical-Tags, Sitemap und OG-Bilder.
   * PLATZHALTER: Muss vor Veröffentlichung durch die echte Domain ersetzt werden.
   * Aus technischen Gründen (new URL() zur Build-Zeit) muss hier bereits eine
   * syntaktisch gültige URL stehen – keine eckigen Klammern verwenden.
   */
  url: "https://reiki-mensch-tier.ch",

  contact: {
    email: "info@reiki-mensch-tier.ch",
    phone: "+41763092206",
    phoneReadable: "076 309 22 06"
  },

  address: {
    street: "Aufeldweg 11",
    postalCode: "3205",
    city: "Gümmenen",
    region: "Kanton Bern, Schweiz",
    country: "Schweiz"
  },

  /** Region für lokale SEO-Formulierungen, z. B. "Reiki in [ORT] und Umgebung". */
  region: "Gümmenen im Raum Bern",

  openingHours: [
    { day: "Montag & Dienstag", hours: "9:00 – 18:00 Uhr" },
    { day: "Mittwoch – Freitag", hours: "nach Vereinbarung" },
    { day: "Samstag", hours: "9:00 – 12:00 Uhr" },
    { day: "Sonntag", hours: "geschlossen" }
  ],

  /** Hinweistext zur Terminvereinbarung, z. B. für die Kontaktseite. */
  bookingNote:
    "Termine finden nach vorheriger Vereinbarung statt. Bitte nehmen Sie unverbindlich Kontakt auf, damit wir gemeinsam einen passenden Termin finden.",

  social: {
    whatsapp: "https://wa.me/41763092206",
    facebook: "https://www.facebook.com/[PROFILNAME]"
  },

  /** Externer Link zur Routenplanung, ersetzt eine eingebettete Karte (Datenschutz). */
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Aufeldweg+11%2C+3205+G%C3%BCmmenen",

  /** Hinweise zur Erreichbarkeit, z. B. für die Kontaktseite. */
  directions: {
    heading: "Anfahrt",
    trainText: "Mit dem Zug gut erreichbar: ab Bern 15 Minuten, ab Westside 8 Minuten, ab Kerzers 4 Minuten.",
    parkingText: "Parkplatz vor Ort vorhanden."
  },

  legal: {
    /** Rechtsform / Zusatz für Impressum, z. B. "Einzelunternehmen". */
    legalForm: "[RECHTSFORM, z. B. Einzelunternehmen]",
    /** Handelsregistereintrag und/oder MWST-Nummer, sofern vorhanden. */
    vatInfo: "[HANDELSREGISTER-NR. UND/ODER MWST-NR., FALLS VORHANDEN]",
    /** Zuständige Aufsichts-/Meldebehörde, sofern zutreffend. */
    supervisoryAuthority: "[ZUSTÄNDIGE BEHÖRDE, FALLS ZUTREFFEND]",
    /** Verantwortliche Person für den Inhalt der Website. */
    contentResponsible: "Petra In-Albon"
  },

  /** Sachlicher, nicht alarmistischer medizinischer Hinweis. */
  medicalDisclaimer:
    "Reiki dient der Entspannung und dem allgemeinen Wohlbefinden. Es ersetzt keine medizinische, psychotherapeutische, heilpraktische oder tierärztliche Untersuchung, Diagnose oder Behandlung. Bei gesundheitlichen Beschwerden wenden Sie sich bitte an entsprechend qualifizierte Fachpersonen.",

  medicalDisclaimerAnimals:
    "Reiki für Tiere ersetzt keine tierärztliche Untersuchung, Diagnose oder Behandlung.",

  /** Hauptnavigation im Header. */
  mainNav: [
    { label: "Startseite", href: "/" },
    { label: "Über mich", href: "/ueber-mich" },
    { label: "Für Menschen", href: "/reiki-fuer-menschen" },
    { label: "Für Tiere", href: "/reiki-fuer-tiere" },
    { label: "Ablauf und Preise", href: "/ablauf-preise" },
    { label: "Erfahrungen", href: "/erfahrungen" },
    { label: "Kontakt", href: "/kontakt" }
  ] satisfies NavItem[],

  /** Zusätzliche Links im Footer (ohne Hauptnavigation). */
  footerNav: [
    { label: "Aktuelles", href: "/aktuelles" },
    { label: "Häufige Fragen", href: "/faq" },
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" }
  ] satisfies NavItem[],

  header: {
    ctaLabel: "Erstgespräch anfragen",
    ctaHref: "/kontakt"
  },

  hero: {
    heading: "Reiki für Menschen und Tiere",
    subheading: "Achtsame Begleitung für mehr Ruhe, Entspannung und Wohlbefinden.",
    text: "In meinem Reiki Studio in Gümmenen bei Bern begleite ich Menschen jeden Alters – Kinder wie Erwachsene – sowie Tiere mit individuell abgestimmten Reiki-Anwendungen. Ich nehme mir Zeit für Ihre Bedürfnisse und schaffe einen geschützten Raum, in dem Entspannung, Achtsamkeit und Wohlbefinden im Mittelpunkt stehen.",
    primaryCta: { label: "Erstgespräch anfragen", href: "/kontakt" },
    secondaryCta: { label: "Reiki kennenlernen", href: "#was-ist-reiki" }
  },

  trustFeatures: [
    {
      title: "Persönliche Begleitung",
      description:
        "Jede Anwendung wird individuell auf Ihre Situation oder die Ihres Tieres abgestimmt."
    },
    {
      title: "Ruhige Atmosphäre",
      description:
        "Ein geschützter Raum, in dem Zeit und Tempo keine Rolle spielen."
    },
    {
      title: "Respektvoller Umgang",
      description:
        "Nähe, Abstand und Tempo bestimmen Sie – bzw. Ihr Tier – selbst mit."
    },
    {
      title: "Für Menschen und Tiere",
      description:
        "Anwendungen sind gleichermaßen für Menschen wie für Tiere und deren Halter gedacht."
    }
  ] satisfies FeatureItem[],

  audienceHumans: {
    title: "Reiki für Menschen",
    text: "Eine bewusste Auszeit für Menschen, die Ruhe suchen, Stress reduzieren und sich Zeit für sich selbst nehmen möchten.",
    ctaLabel: "Reiki für Menschen",
    href: "/reiki-fuer-menschen"
  },

  audienceAnimals: {
    title: "Reiki für Tiere",
    text: "Eine ruhige und respektvolle Begleitung, bei der das Tier Nähe, Dauer und Abstand selbst mitbestimmen darf.",
    ctaLabel: "Reiki für Tiere",
    href: "/reiki-fuer-tiere"
  },

  introSection: {
    heading: "Mir ist wichtig, dass Sie sich willkommen fühlen",
    text: "Mir ist wichtig, dass sich Mensch und Tier sicher, respektiert und gut aufgehoben fühlen. Jede Anwendung wird individuell auf die jeweilige Situation abgestimmt.",
    ctaLabel: "Mehr über mich",
    href: "/ueber-mich"
  },

  whatIsReiki: {
    heading: "Was ist Reiki?",
    paragraphs: [
      "Reiki ist eine aus Japan stammende Form der energetischen Entspannungsarbeit. Im Mittelpunkt stehen Ruhe, Achtsamkeit und das persönliche Wohlbefinden. Während einer Anwendung liegt oder sitzt die behandelte Person bequem und bleibt vollständig bekleidet. Die Hände werden sanft aufgelegt oder mit etwas Abstand über dem Körper gehalten.",
      "Es findet keine Massage und keine körperliche Manipulation statt. Viele Menschen empfinden während einer Reiki-Anwendung Wärme, ein leichtes Kribbeln oder tiefe Entspannung. Andere nehmen kaum etwas wahr und erleben die ruhige Zeit dennoch als angenehm. Jede Anwendung wird individuell erlebt und darf ohne Erwartungen stattfinden.",
      "Reiki kann eine bewusste Auszeit im Alltag bieten und Menschen in stressreichen oder herausfordernden Lebensphasen ergänzend begleiten. Auch bei Tieren erfolgt die Anwendung ruhig und respektvoll, wobei das Tier Nähe und Abstand selbst mitbestimmen darf."
    ],
    disclaimer:
      "Reiki dient der Entspannung und dem allgemeinen Wohlbefinden. Es ersetzt keine medizinische, psychotherapeutische, heilpraktische oder tierärztliche Untersuchung, Diagnose oder Behandlung."
  },

  process: [
    {
      title: "Unverbindliche Kontaktaufnahme",
      description:
        "Sie schreiben mir oder rufen an – ganz ohne Verpflichtung."
    },
    {
      title: "Persönliches Vorgespräch",
      description:
        "Wir klären gemeinsam Ihr Anliegen und was Sie sich von einer Anwendung wünschen."
    },
    {
      title: "Individuelle Reiki-Anwendung",
      description:
        "Die Anwendung wird auf Sie bzw. Ihr Tier und die jeweilige Situation abgestimmt."
    },
    {
      title: "Ruhe und Abschlussgespräch",
      description:
        "Zeit zum Nachspüren sowie ein kurzer Austausch zum Abschluss."
    }
  ] satisfies ProcessStep[],

  /**
   * ECHTE ERFAHRUNGSBERICHTE (mit Einverständnis der jeweiligen Personen).
   * Bewusst zurückhaltend formuliert: Namen sind als Initialen anonymisiert,
   * konkrete Diagnosen und Heilversprechen wurden entfernt bzw. in
   * persönliche Wohlbefinden-Erlebnisse umformuliert (kein Ersatz für
   * ärztliche/tierärztliche Behandlung – siehe medicalDisclaimer).
   */
  testimonials: [
    {
      id: "erfahrung-1",
      quote:
        "Nach den Anwendungen fühle ich mich insgesamt entspannter und beweglicher. Die Zeit bei Petra tut mir sehr gut – ich komme seither regelmässig.",
      author: "M.H., Laupen",
      context: "Regelmässige Anwendungen"
    },
    {
      id: "erfahrung-2",
      quote:
        "Ich schlafe seither ruhiger und blicke entspannter und mit weniger Sorgen in die Zukunft.",
      author: "H.M., Bern",
      context: "Reiki-Anwendung zur Entspannung"
    },
    {
      id: "erfahrung-3",
      quote:
        "Unser Hund wirkte nach der Behandlung im Rückenbereich sichtlich entspannter. Vielen Dank dafür.",
      author: "B.M.",
      context: "Reiki für Hund"
    },
    {
      id: "erfahrung-4",
      quote:
        "Ich habe immer wieder Verspannungen, und die Zeit bei Petra tut mir jedes Mal sehr gut. Ich gehe danach spürbar entspannter aus der Behandlung und freue mich schon auf die nächste Sitzung.",
      author: "P.I., Gümmenen",
      context: "Regelmässige Anwendungen"
    },
    {
      id: "erfahrung-5",
      quote:
        "Nach einem Sturz mit Prellungen im Bein hat mir die Reiki-Anwendung geholfen, zur Ruhe zu kommen und mich zu entspannen. Ganz toll!",
      author: "G.Z., Bern",
      context: "Reiki-Anwendung nach einem Sturz"
    },
    {
      id: "erfahrung-6",
      quote:
        "Unser Sohn (6 Jahre) geniesst die Zeit bei Petra sehr und wirkt danach jedes Mal ruhig und ausgeglichen. Wir kommen gerne wieder.",
      author: "S.Z., Villarepos",
      context: "Reiki für Kinder"
    },
    {
      id: "erfahrung-7",
      quote: "Aktiver geworden und frisst wieder gut – ich bin mega froh darüber.",
      author: "F.I., Bern",
      context: "Reiki für Tier"
    },
    {
      id: "erfahrung-8",
      quote: "Meine junge Hündin wirkt seither ruhiger und ausgeglichener.",
      author: "I.F., Bern",
      context: "Reiki für Tier"
    },
    {
      id: "erfahrung-9",
      quote:
        "Besten Dank für die Fernbehandlung – ich habe danach mehr Energie gespürt und schlafe seither besser.",
      author: "M.I., Paraguay",
      context: "Fernbehandlung"
    },
    {
      id: "erfahrung-10",
      quote: "Herzlichen Dank, dass du mir die Arthrosen-Schmerzen erträglicher machst.",
      author: "Dini Mama ❤️",
      context: "Reiki für Menschen"
    }
  ] satisfies Testimonial[],

  closingSection: {
    heading: "Sie möchten Reiki unverbindlich kennenlernen?",
    text: "Schreiben Sie mir gerne. Gemeinsam klären wir, ob und in welcher Form eine Anwendung passend sein könnte.",
    ctaLabel: "Kontakt aufnehmen",
    href: "/kontakt"
  },

  aboutPage: {
    heading: "Über mich",
    intro:
      "Mein Weg zu Reiki begann mit dem Wunsch, Menschen in herausfordernden Lebensphasen einen ruhigen und geschützten Raum anzubieten. Mit der Zeit entstand daraus eine Arbeit, bei der Achtsamkeit, Respekt und persönliche Begegnung im Mittelpunkt stehen.",
    path: {
      heading: "Mein Weg zu Reiki",
      paragraphs: [
        "Jeder Mensch hat seinen eigenen Weg – meiner hat mich zu Reiki geführt. Schon immer haben mich das Wohlbefinden von Menschen und Tieren sowie ein achtsamer Umgang miteinander begleitet. Mit Reiki habe ich eine Möglichkeit gefunden, einen Raum der Ruhe und Entspannung zu schaffen, in dem Körper und Geist zur Ruhe kommen dürfen.",
        "Die Ausbildung zur Reiki-Praktizierenden hat meinen Wunsch bestärkt, Menschen und Tiere auf ihrem individuellen Weg zu begleiten. Heute ist es mir eine Herzensangelegenheit, Zeit, Aufmerksamkeit und einen geschützten Rahmen für jede Begegnung zu schenken."
      ]
    },
    motivation: {
      heading: "Meine Motivation",
      paragraphs: [
        "In unserer schnelllebigen Zeit bleibt oft wenig Raum für Ruhe und bewusstes Innehalten. Genau diesen Raum möchte ich schaffen. Es erfüllt mich, Menschen und Tiere in einer entspannten Atmosphäre zu begleiten und ihnen einen Moment der Gelassenheit und des Wohlbefindens zu ermöglichen.",
        "Jede Begegnung ist einzigartig. Deshalb begegne ich jedem Menschen und jedem Tier mit Offenheit, Respekt und ohne Erwartungen. Im Mittelpunkt stehen Vertrauen, Achtsamkeit und ein wertschätzender Umgang."
      ]
    },
    approach: {
      heading: "Meine Arbeitsweise",
      paragraphs: [
        "Jede Reiki-Anwendung beginnt mit einem persönlichen Gespräch, in dem wir Ihre Wünsche und Bedürfnisse besprechen. Anschliessend findet die Behandlung in ruhiger Atmosphäre statt. Während der Anwendung bleiben Sie vollständig bekleidet und dürfen einfach loslassen und entspannen.",
        "Bei Tieren richte ich mich ganz nach ihrem Tempo und ihren Signalen. Sie entscheiden selbst, wie viel Nähe sie zulassen möchten. Mir ist wichtig, eine ruhige und vertrauensvolle Umgebung zu schaffen, in der sich Mensch und Tier wohlfühlen können."
      ]
    },
    animals: {
      heading: "Meine Verbindung zu Tieren",
      paragraphs: [
        "Tiere begleiten mich seit vielen Jahren und nehmen einen besonderen Platz in meinem Leben ein. Ihre feine Wahrnehmung, ihre Ehrlichkeit und ihr Vertrauen faszinieren mich immer wieder. Deshalb liegt mir auch die Begleitung von Tieren besonders am Herzen.",
        "Jedes Tier ist einzigartig und verdient einen respektvollen, liebevollen Umgang. Bei einer Reiki-Anwendung steht niemals Leistung oder Erwartung im Vordergrund – vielmehr darf das Tier selbst entscheiden, wie es die Begegnung erleben möchte. Mit Geduld, Ruhe und Einfühlungsvermögen begegne ich jedem Tier auf Augenhöhe."
      ]
    },
    values: {
      heading: "Was mir wichtig ist",
      items: [
        "Achtsamkeit gegenüber Mensch und Tier",
        "Ehrlichkeit statt Versprechen",
        "Respekt vor individuellem Tempo und eigenen Grenzen",
        "Vertraulichkeit und ein geschützter Rahmen"
      ]
    }
  },

  /**
   * PLATZHALTER-ZERTIFIKATE
   * Bitte durch echte, nachweisbare Qualifikationen ersetzen.
   */
  certificates: [
    {
      title: "Kundalini Reiki Meister (Grad 1–3)",
      issuer: "Romina Scheidegger, Kundalini Reiki Meisterin",
      year: "2026",
      imageSrc: "/images/zertifikat-kundalini-reiki-meister.png"
    }
  ] satisfies Certificate[],

  humansPage: {
    heading: "Reiki für Menschen",
    intro:
      "Reiki für Menschen richtet sich an Gross und Klein – an Kinder und Erwachsene jeden Alters, die eine bewusste Auszeit suchen, unabhängig davon, ob Sie Reiki bereits kennen oder zum ersten Mal davon hören.",
    /**
     * Bewusst zurückhaltend formuliert (kein Heilversprechen, keine
     * medizinische Wirkaussage) – passend zum Disclaimer weiter unten auf
     * dieser Seite.
     */
    benefits: [
      "gibt neue Energie",
      "kann zur Entspannung beitragen",
      "kann Stress reduzieren helfen",
      "wird von vielen als schlaffördernd empfunden",
      "unterstützt das allgemeine Wohlbefinden",
      "kann Körper und Geist neue Kraft schenken",
      "aktiviert die körpereigenen Selbstheilungskräfte",
      "wird von manchen als schmerzlindernd empfunden",
      "kann zum Lösen von Verspannungen beitragen",
      "kann als sanfte Begleitung während der Erholungsphase nach Operationen dienen"
    ],
    audience: {
      heading: "Für wen ist das Angebot gedacht?",
      text: "Das Angebot richtet sich an Menschen, die sich in ihrem Alltag mehr Ruhe wünschen oder eine ergänzende Möglichkeit zur Entspannung suchen. Vorerfahrung mit Reiki ist nicht notwendig.",
      occasions: [
        "Wunsch nach Entspannung",
        "stressreiche Lebensphasen",
        "innere Unruhe",
        "persönliche Veränderungen",
        "bewusste Auszeiten",
        "ergänzende Begleitung in belastenden Situationen"
      ]
    },
    procedure: {
      heading: "Wie läuft eine Anwendung ab?",
      text: "Zu Beginn nehmen wir uns Zeit für ein kurzes Gespräch. Anschließend liegen oder sitzen Sie bequem und bekleidet, während die Hände sanft aufgelegt oder mit Abstand über dem Körper gehalten werden. Im Anschluss ist Raum für Ruhe und einen kurzen Austausch."
    },
    atmosphere: {
      heading: "Welche Atmosphäre erwartet Sie?",
      text: "Ein ruhiger, aufgeräumter Raum mit gedämpftem Licht und angenehmer Temperatur. Es gibt keinen Druck, sich auf etwas Bestimmtes einlassen zu müssen."
    },
    clothing: {
      heading: "Was ziehe ich am besten an?",
      text: "Bequeme, bequem sitzende Kleidung ist ideal. Sie bleiben während der gesamten Anwendung vollständig bekleidet."
    },
    duration: {
      heading: "Wie lange dauert eine Sitzung?",
      text: "Eine Anwendung dauert 40 Minuten, Kurzanwendungen bzw. Wiederholungen 30 Minuten. Genaue Angaben finden Sie auf der Seite Ablauf und Preise."
    },
    beforeAfter: {
      heading: "Vor und nach der Anwendung",
      text: "Planen Sie nach Möglichkeit etwas Zeit ein, um nicht direkt im Anschluss in Termindruck zu geraten. Trinken Sie ausreichend Wasser und geben Sie sich selbst die Erlaubnis, in Ruhe nachzuspüren."
    },
    homeVisit: {
      heading: "Praxis oder Hausbesuch",
      text: "Anwendungen finden im Studio statt. Auf Wunsch sind auch Hausbesuche möglich, etwa wenn Ihnen die gewohnte Umgebung wichtiger ist. Details und Fahrtkosten finden Sie auf der Seite Ablauf und Preise."
    },
    /**
     * Bewusst zurückhaltend formuliert: Herkunft/Konzept sachlich
     * beschrieben, Wirkung als subjektive Erfahrung ("manche empfinden…"),
     * kein Heilversprechen und keine Chakra-Aussage als Tatsachenbehauptung.
     */
    kundaliniReiki: {
      heading: "Kundalini Reiki",
      paragraphs: [
        "Kundalini Reiki ist eine Weiterentwicklung des klassischen Reiki, die von Ole Gabrielsen begründet wurde. Die Methode orientiert sich am Konzept der Kundalini-Energie, wie es in verschiedenen spirituellen Traditionen beschrieben wird, und überträgt diesen Ansatz in eine ruhige, achtsame Anwendung.",
        "Der Ablauf ähnelt einer klassischen Reiki-Anwendung: Sie liegen oder sitzen bequem und bleiben vollständig bekleidet, während die Hände sanft aufgelegt oder mit etwas Abstand über dem Körper gehalten werden. Kundalini Reiki gilt als eigenständige Ausrichtung mit eigener Einweihungsstruktur und wird häufig als intensiver empfunden als klassisches Reiki.",
        "Manche Menschen empfinden Kundalini Reiki als besonders kraftvoll und beschreiben ein angenehmes Gefühl von Wärme, Leichtigkeit oder tiefer Entspannung. Auch spürbare Anspannungen und Verspannungen können sich dabei lösen. Andere nehmen die Anwendung eher subtil wahr – auch das ist völlig normal.",
        "Wie bei jeder Reiki-Anwendung wird nichts erzwungen: Es gibt keine feste Erwartung daran, was Sie spüren oder erleben sollten. Die Erfahrung ist von Person zu Person unterschiedlich, und jede Sitzung darf für sich stehen."
      ],
      safetyNote:
        "Kundalini Reiki ist als ergänzende, entspannungsfördernde Anwendung gedacht und ersetzt keine medizinische Behandlung. Bei Herzschrittmacher oder anderen implantierten medizinischen Geräten bitte vorab Rücksprache mit der behandelnden Ärztin oder dem behandelnden Arzt halten. Nach Möglichkeit sollten Metallgegenstände wie Schmuck oder Uhren vor der Anwendung abgelegt werden."
    },
    disclaimer:
      "Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend empfunden. Es ersetzt jedoch keine ärztliche oder psychotherapeutische Behandlung und ist als ergänzendes Angebot zu verstehen.",
    cta: {
      heading: "Neugierig geworden?",
      text: "Gerne kläre ich mit Ihnen in einem unverbindlichen Gespräch, ob Reiki für Sie passend sein könnte.",
      label: "Erstgespräch anfragen",
      href: "/kontakt"
    }
  },

  animalsPage: {
    heading: "Reiki für Tiere",
    intro:
      "Bei einer Reiki-Anwendung entscheidet das Tier selbst, wie viel Nähe es zulassen möchte. Manche Tiere suchen den direkten Kontakt, andere bleiben lieber in etwas Abstand. Beides wird respektiert.",
    /**
     * Bewusst zurückhaltend formuliert (kein Heilversprechen, keine
     * tierärztliche Wirkaussage) – passend zum Disclaimer weiter unten auf
     * dieser Seite.
     */
    benefits: [
      "kann zu mehr Gelassenheit beitragen",
      "wird von vielen Tieren als angenehm empfunden",
      "gibt neue Energie",
      "kann das Wohlbefinden fördern",
      "kann zur Beruhigung beitragen",
      "kann bei ängstlichem Verhalten unterstützend wirken",
      "wird von manchen Tieren als schmerzlindernd empfunden",
      "aktiviert die körpereigenen Selbstheilungskräfte"
    ],
    occasions: {
      heading: "In welchen Situationen kann Reiki Tiere begleitend unterstützen?",
      text: "Reiki kann Ihr Tier in unterschiedlichen Lebenssituationen begleiten – als sanfte Ergänzung zum allgemeinen Wohlbefinden und nicht als Ersatz für eine tierärztliche Untersuchung oder Behandlung.",
      items: [
        "Eingewöhnung in ein neues Zuhause – z. B. nach einem Umzug oder bei Tieren aus dem Tierschutz.",
        "Begleitung bei Veränderungen – etwa bei einem Besitzerwechsel, Familienzuwachs oder anderen Veränderungen im gewohnten Umfeld.",
        "Unterstützung in stressigen Situationen – beispielsweise bei Silvester, Gewitter, Reisen oder Tierarztbesuchen.",
        "Begleitung während der Erholungsphase – ergänzend zur tierärztlichen Behandlung nach Operationen oder Erkrankungen.",
        "Unterstützung älterer Tiere – als ruhige Auszeit zur Förderung von Entspannung und Wohlbefinden im Alltag.",
        "Begleitung in herausfordernden Lebensphasen – wenn Tiere nach belastenden Erfahrungen Zeit und Ruhe benötigen.",
        "Förderung von Ruhe und Gelassenheit – für sensible oder leicht gestresste Tiere.",
        "Unterstützung der Mensch-Tier-Bindung – durch eine achtsame und entspannte gemeinsame Erfahrung.",
        "Entspannung für Tiere mit hohem Aktivitätsniveau – um bewusst zur Ruhe kommen zu können.",
        "Begleitung in besonderen Lebenssituationen – individuell auf die Bedürfnisse des jeweiligen Tieres abgestimmt."
      ]
    },
    species: {
      heading: "Welche Tiere können begleitet werden?",
      text: "Grundsätzlich können viele Tierarten begleitet werden, etwa Hunde, Katzen, Kleintiere und Pferde. Bei Unsicherheit sprechen Sie mich gerne im Vorgespräch darauf an."
    },
    consent: {
      heading: "Freiwilligkeit steht an erster Stelle",
      text: "Ihr Tier wird nicht festgehalten oder zu etwas gezwungen. Nähe und Abstand werden vom Tier selbst mitbestimmt – das gilt während der gesamten Anwendung."
    },
    distance: {
      heading: "Anwendung mit Abstand",
      text: "Eine Anwendung kann auch aus einiger Entfernung im selben Raum stattfinden, wenn das Tier direkten Kontakt (noch) nicht wünscht."
    },
    homeVisits: {
      heading: "Hausbesuche",
      text: "Hausbesuche sind grundsätzlich möglich, damit sich Ihr Tier in seiner gewohnten Umgebung befindet. Details und Fahrtkosten finden Sie auf der Seite Ablauf und Preise."
    },
    ownerPresence: {
      heading: "Anwesenheit der Halterin oder des Halters",
      text: "Sie sind als Halterin oder Halter herzlich willkommen, während der Anwendung anwesend zu bleiben. Das gibt vielen Tieren zusätzliche Sicherheit."
    },
    duration: {
      heading: "Wie lange dauert eine Anwendung?",
      text: "Eine Anwendung dauert in der Regel etwa 30 Minuten, abhängig davon, wie das Tier die Situation annimmt."
    },
    firstMeeting: {
      heading: "Die erste Begegnung",
      text: "Zu Beginn nehmen wir uns Zeit, damit Ihr Tier die Umgebung und mich in Ruhe kennenlernen kann. Es gibt keinen festen Ablaufplan – das Tempo bestimmt Ihr Tier."
    },
    disclaimer:
      "Reiki für Tiere ersetzt keine tierärztliche Untersuchung, Diagnose oder Behandlung.",
    cta: {
      heading: "Fragen zu Ihrem Tier?",
      text: "Gerne bespreche ich vorab über das Kontaktformular, ob und wie eine Anwendung für Ihr Tier passend sein könnte.",
      label: "Erstgespräch anfragen",
      href: "/kontakt"
    }
  },

  pricing: {
    humans: {
      heading: "Reiki für Menschen",
      items: [
        {
          label: "Erstanwendung inkl. Erstgespräch",
          duration: "40 Minuten",
          price: "CHF 80.-"
        },
        {
          label: "Nachfolgebehandlung",
          duration: "30 Minuten",
          price: "CHF 60.-"
        },
        {
          label: "Hausbesuch",
          price: "+ CHF 10.-",
          note: "zzgl. Fahrtkosten (siehe „Gut zu wissen“ unten)"
        },
        {
          label: "Fernbehandlung",
          price: "CHF 30.-"
        }
      ] satisfies PriceItem[]
    },
    animals: {
      heading: "Reiki für Tiere",
      items: [
        {
          label: "Reiki-Anwendung",
          duration: "30 Minuten",
          price: "CHF 60.-"
        },
        {
          label: "Hausbesuch",
          price: "+ CHF 10.-",
          note: "zzgl. Fahrtkosten (siehe „Gut zu wissen“ unten)"
        }
      ] satisfies PriceItem[]
    },
    details: {
      heading: "Gut zu wissen",
      items: [
        {
          title: "Dauer",
          text: "Die angegebenen Zeiten sind Richtwerte und können je nach Situation leicht variieren."
        },
        {
          title: "Vorbereitung",
          text: "Bequeme Kleidung genügt. Weitere Hinweise erhalten Sie im Vorgespräch."
        },
        {
          title: "Bezahlung",
          text: "Möglich sind TWINT, Barzahlung oder Rechnung."
        },
        {
          title: "Absageregelung",
          text: "Absagen sind bis 24 Stunden vor dem Termin kostenlos möglich."
        },
        {
          title: "Fahrtkosten",
          text: "Bei Hausbesuchen kommen CHF 20.- Fahrkosten (bis 10 km) sowie CHF 1.- pro zusätzlichem Kilometer dazu. Bei Besuchen bei Heimbewohnerinnen/-bewohnern oder Firmenbesuchen werden die Fahrtkosten ab zwei aufeinanderfolgenden Sitzungen nur einmal berechnet."
        },
        {
          title: "Terminvereinbarung",
          text: "Termine vereinbaren wir persönlich über das Kontaktformular oder per E-Mail."
        }
      ]
    },
    voucher: {
      heading: "Reiki-Gutschein verschenken",
      text: "Was gibt es Schöneres zum Geburtstag, Jubiläum, Hochzeitstag, Weihnachten oder einfach als herzliches Dankeschön, als einen Reiki-Gutschein zu verschenken? Wohlbefinden, Entspannung und Stressabbau – ein Geschenk, das guttut.",
      note: "Melden Sie sich einfach über das Kontaktformular mit der Option „Gutschein verschenken“ – ich stelle Ihnen den Gutschein gerne aus.",
      priceNote: "Gutscheinversand: CHF 2.-",
      cta: {
        label: "Gutschein anfragen",
        href: "/kontakt"
      }
    },
    disclaimer: "Preisänderungen vorbehalten."
  },

  reviewsPage: {
    heading: "Erfahrungen",
    intro:
      "Rückmeldungen von Menschen, die bereits eine Reiki-Anwendung bei mir oder ihrem Tier erlebt haben. Namen sind auf Wunsch der jeweiligen Person anonymisiert.",
    moderationNote:
      "Erfahrungsberichte werden ausschließlich mit vorheriger Zustimmung der jeweiligen Person veröffentlicht und vor Veröffentlichung geprüft. Es erscheint keine Einreichung automatisch öffentlich.",
    shareCta: {
      label: "Eigene Erfahrung mitteilen",
      href: "/kontakt"
    }
  },

  newsPage: {
    heading: "Aktuelles",
    intro: "Neuigkeiten rund um das Reiki Studio in Gümmenen.",
    /**
     * Reihenfolge egal – die Seite sortiert automatisch nach Datum
     * (neueste zuerst). Einträge hier ergänzen, ändern oder entfernen.
     */
    posts: [
      {
        date: "2026-07-04",
        title: "Studioeröffnung & Einweihungsfeier",
        text: "Am 4. Juli 2026 feiern wir die Eröffnung und Einweihung des Reiki Studios in Gümmenen. Herzlich willkommen!"
      }
    ] satisfies NewsPost[]
  },

  faq: [
    {
      question: "Was ist Reiki?",
      answer:
        "Reiki ist eine aus Japan stammende Form der energetischen Entspannungsarbeit, bei der die Hände sanft aufgelegt oder mit Abstand gehalten werden."
    },
    {
      question: "Wie läuft eine Reiki-Anwendung ab?",
      answer:
        "Nach einem kurzen Gespräch liegen oder sitzen Sie bequem, während die Hände in verschiedenen Positionen sanft aufgelegt oder mit etwas Abstand gehalten werden."
    },
    {
      question: "Muss ich an Reiki glauben?",
      answer:
        "Nein. Es genügt eine offene, neugierige Haltung. Ein bestimmter Glaube ist nicht erforderlich."
    },
    {
      question: "Bleibt man während der Anwendung angezogen?",
      answer:
        "Ja, Sie bleiben während der gesamten Anwendung vollständig bekleidet. Bequeme Kleidung ist empfehlenswert."
    },
    {
      question: "Was kann man während einer Anwendung empfinden?",
      answer:
        "Viele Menschen berichten von Wärme, Ruhe oder tiefer Entspannung. Das Erleben ist jedoch individuell und kann von Sitzung zu Sitzung unterschiedlich sein."
    },
    {
      question: "Wie lange dauert eine Sitzung?",
      answer:
        "Eine Anwendung dauert 40 Minuten, Kurzanwendungen bzw. Wiederholungen 30 Minuten. Bei Tieren 30 Minuten. Details finden Sie unter Ablauf und Preise."
    },
    {
      question: "Wie viele Sitzungen sind sinnvoll?",
      answer:
        "Das ist individuell verschieden. Häufig wird zunächst eine einzelne Anwendung gebucht, weitere Termine ergeben sich nach Bedarf im gemeinsamen Gespräch."
    },
    {
      question: "Ist Reiki auch für Kinder geeignet?",
      answer:
        "Anwendungen für Kinder sind grundsätzlich möglich und finden ausschließlich in Begleitung eines Erziehungsberechtigten statt. Bitte sprechen Sie mich vorab an."
    },
    {
      question: "Wie läuft Reiki bei Tieren ab?",
      answer:
        "Das Tier bestimmt Nähe und Abstand selbst mit. Die Anwendung kann direkt am Tier oder mit etwas Abstand im selben Raum stattfinden."
    },
    {
      question: "Wird ein Tier während der Anwendung festgehalten?",
      answer:
        "Nein. Ihr Tier wird nicht festgehalten oder zu etwas gezwungen. Freiwilligkeit steht an erster Stelle."
    },
    {
      question: "Kann Reiki eine ärztliche oder tierärztliche Behandlung ersetzen?",
      answer:
        "Nein. Reiki ersetzt keine medizinische, psychotherapeutische, heilpraktische oder tierärztliche Untersuchung, Diagnose oder Behandlung."
    },
    {
      question: "Sind Hausbesuche möglich?",
      answer:
        "Ja, sowohl für Menschen als auch für Tiere sind Hausbesuche möglich. Details und mögliche Fahrtkosten besprechen wir vorab."
    },
    {
      question: "Wie kann ich einen Termin absagen?",
      answer:
        "Bitte sagen Sie einen Termin frühzeitig über das Kontaktformular oder per E-Mail ab. Details zur Absagefrist finden Sie unter Ablauf und Preise."
    },
    {
      question: "Welche Zahlungsmöglichkeiten gibt es?",
      answer:
        "[PLATZHALTER: Bitte konkrete Zahlungsmöglichkeiten ergänzen, z. B. Barzahlung, Überweisung oder Kartenzahlung.]"
    }
  ] satisfies FaqItem[],

  contactPage: {
    heading: "Kontakt",
    intro:
      "Sie erreichen mich unverbindlich über das Kontaktformular oder per E-Mail. Ich melde mich in der Regel innerhalb weniger Werktage bei Ihnen zurück.",
    privacyNote:
      "Ihre Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben. Weitere Informationen finden Sie in der Datenschutzerklärung.",
    successMessage:
      "Vielen Dank für Ihre Nachricht. Ich melde mich persönlich bei Ihnen zurück.",
    submitLabel: "Unverbindliche Anfrage senden"
  },

  legalPagesNotice:
    "Diese Seite enthält Platzhaltertexte. Sie muss vor Veröffentlichung durch eine rechtlich geprüfte, an Rechtsform, Land, Hosting, Analysewerkzeuge, Formulardienst und eingesetzte Drittanbieter angepasste Fassung ersetzt werden. Dieser Hinweis stellt keine Rechtsberatung dar."
};

export type SiteConfig = typeof siteConfig;
