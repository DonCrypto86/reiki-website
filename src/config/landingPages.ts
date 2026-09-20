/**
 * Zentrale Datenquelle für alle SEO-Landingpages. Bewusst als einzelne
 * Datenquelle gehalten (statt Inhalte über mehrere Dateien verteilt), damit
 * Routing, Sitemap und interne Verlinkung immer konsistent bleiben.
 *
 * Drei Kategorien, jeweils unter einem bestehenden oder neuen "Pillar" (siehe
 * README, Abschnitt "SEO-Landingpages"):
 * - "ort": Standort-Seiten unter /reiki-in/[slug]
 * - "mensch-thema": Themen-Seiten unter /reiki-fuer-menschen/[slug]
 * - "tier": Tierarten-Seiten unter /reiki-fuer-tiere/[slug]
 *
 * Formulierungen bewusst konsistent mit humansPage/animalsPage in site.ts
 * gehalten: keine Heilversprechen, keine medizinischen/tierärztlichen
 * Wirkaussagen, Reiki stets als ergänzendes, entspannungsförderndes Angebot
 * dargestellt.
 */

export type LandingPageCategory = "ort" | "mensch-thema" | "tier";

export type LandingPageSection = {
  heading: string;
  text: string;
};

export type LandingPageFaqItem = {
  question: string;
  answer: string;
};

export type LandingPage = {
  slug: string;
  category: LandingPageCategory;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  benefits?: string[];
  sections: LandingPageSection[];
  /** Mindestens 3 seiten-spezifische Fragen, keine generischen/kopierten FAQ. */
  faq: LandingPageFaqItem[];
  disclaimer: string;
  cta: { heading: string; text: string; label: string; href: string };
  /** Pfade (nicht Slugs) zu 2–4 thematisch verwandten Seiten für interne Verlinkung. */
  relatedPaths: { label: string; href: string }[];
};

const defaultCta = {
  heading: "Interesse an einem Termin?",
  text: "Gerne kläre ich mit Ihnen in einem unverbindlichen Gespräch, ob und wie Reiki für Sie passend sein könnte.",
  label: "Erstgespräch anfragen",
  href: "/kontakt"
};

const defaultAnimalCta = {
  heading: "Fragen zu Ihrem Tier?",
  text: "Gerne bespreche ich vorab über das Kontaktformular, ob und wie eine Anwendung für Ihr Tier passend sein könnte.",
  label: "Erstgespräch anfragen",
  href: "/kontakt"
};

const humanDisclaimer =
  "Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend empfunden. Es ersetzt jedoch keine ärztliche oder psychotherapeutische Behandlung und ist als ergänzendes Angebot zu verstehen.";

const animalDisclaimer =
  "Reiki für Tiere ersetzt keine tierärztliche Untersuchung, Diagnose oder Behandlung.";

export function landingPagePath(entry: Pick<LandingPage, "category" | "slug">): string {
  switch (entry.category) {
    case "ort":
      return `/reiki-in/${entry.slug}`;
    case "mensch-thema":
      return `/reiki-fuer-menschen/${entry.slug}`;
    case "tier":
      return `/reiki-fuer-tiere/${entry.slug}`;
    default:
      return "/";
  }
}

export const landingPages: LandingPage[] = [
  // ---------------------------------------------------------------------
  // Orte (Service-Area-Seiten: Hausbesuche bzw. Fernbehandlung, kein
  // eigener Praxisstandort in diesen Orten – das Studio bleibt Gümmenen).
  // ---------------------------------------------------------------------
  {
    slug: "guemmenen",
    category: "ort",
    metaTitle: "Reiki Studio Gümmenen bei Bern | Petra In-Albon",
    metaDescription:
      "Reiki Studio in 3205 Gümmenen, Aufeldweg 11: ruhige Praxis im Kanton Bern, mit Zug und Auto erreichbar, Parkplatz vor Ort. Für Menschen und Tiere.",
    h1: "Reiki Studio in Gümmenen",
    intro:
      "Gümmenen liegt an der Saane, unweit der Kantonsgrenze zu Freiburg, ein Stück ausserhalb der Stadt Bern. Genau hier, an der Aufeldweg 11, 3205 Gümmenen, befindet sich mein Reiki Studio: ein ruhiger Ort abseits vom städtischen Trubel, an dem Anwendungen für Menschen und Tiere ungestört stattfinden können. Dies ist der einzige tatsächliche Praxisstandort – die übrigen Ortsseiten dieser Website beschreiben, wie das Studio von dort aus erreichbar ist.",
    sections: [
      {
        heading: "Warum Gümmenen?",
        text: "Die dörfliche, ruhige Umgebung von Gümmenen eignet sich besonders gut für Reiki-Anwendungen: kein Verkehrslärm, keine Eile, keine Hektik. Diese Ruhe wirkt sich oft schon vor Beginn der eigentlichen Anwendung entspannend aus."
      },
      {
        heading: "Anfahrt mit Zug und Auto",
        text: "Gümmenen ist mit dem Zug gut erreichbar: ab Bern in rund 15 Minuten, ab Westside in rund 8 Minuten, ab Kerzers in etwa 4 Minuten. Auch mit dem Auto ist das Studio unkompliziert zu finden, ein Parkplatz steht direkt vor Ort zur Verfügung."
      },
      {
        heading: "Ablauf, Preise und Terminvereinbarung",
        text: "Eine Erstanwendung dauert 40 Minuten, eine Folgeanwendung 30 Minuten. Die vollständige Preisübersicht sowie Details zum Ablauf einer Sitzung finden Sie auf der Seite Ablauf und Preise. Einen Termin vereinbaren Sie unkompliziert über das Kontaktformular."
      },
      {
        heading: "Für Menschen und Tiere",
        text: "Im Studio in Gümmenen finden Anwendungen sowohl für Menschen als auch für Hunde und Katzen statt. Ist ein Besuch vor Ort nicht möglich, biete ich für die nähere Umgebung auch Hausbesuche sowie schweizweit eine Fernbehandlung an."
      }
    ],
    faq: [
      {
        question: "Wo genau befindet sich das Reiki Studio?",
        answer: "Das Studio liegt an der Aufeldweg 11, 3205 Gümmenen, im Kanton Bern. Es ist der einzige feste Praxisstandort – für die umliegenden Orte biete ich zusätzlich Hausbesuche an."
      },
      {
        question: "Gibt es einen Parkplatz beim Studio?",
        answer: "Ja, direkt vor Ort steht ein Parkplatz zur Verfügung, sodass die Anreise mit dem Auto unkompliziert ist."
      },
      {
        question: "Wie komme ich mit dem Zug nach Gümmenen?",
        answer: "Der Bahnhof Gümmenen ist gut angebunden: ab Bern rund 15 Minuten, ab Kerzers rund 4 Minuten Fahrzeit. Den genauen Fussweg vom Bahnhof zum Studio bespreche ich bei der Terminvereinbarung gerne mit Ihnen."
      },
      {
        question: "Bietet das Studio auch Hausbesuche oder eine Fernbehandlung an?",
        answer: "Ja. Für die nähere Umgebung sind Hausbesuche gegen Aufpreis und Fahrkosten möglich, für Menschen und Tiere in der ganzen Schweiz zusätzlich eine Fernbehandlung."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Über Petra In-Albon", href: "/ueber-mich" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" },
      { label: "Wie eine Reiki-Behandlung abläuft", href: "/reiki-behandlung" },
      { label: "Reiki in Bern", href: "/reiki-in/bern" },
      { label: "Kontakt", href: "/kontakt" }
    ]
  },
  {
    slug: "bern",
    category: "ort",
    metaTitle: "Reiki in Bern | Praxis in Gümmenen bei Bern",
    metaDescription:
      "Reiki im Raum Bern: Praxis in Gümmenen, ab Bern in rund 15 Zugminuten erreichbar. Ablauf, Dauer, Preise und Hausbesuche für Menschen und Tiere.",
    h1: "Reiki in Bern – Praxis in Gümmenen",
    intro:
      "Mein Reiki Studio liegt nicht in der Stadt Bern selbst, sondern im nahen Gümmenen – bewusst so, denn dort finde ich für meine Arbeit die notwendige Ruhe. Für Menschen und Tiere aus Bern ist das Studio unkompliziert erreichbar, wahlweise ist auch ein Hausbesuch möglich.",
    sections: [
      {
        heading: "Reiki im Raum Bern – Praxis in Gümmenen",
        text: "Wer aus Bern eine Reiki-Anwendung sucht, findet in Gümmenen eine ruhige Praxis ausserhalb des städtischen Alltags – nah genug für einen unkomplizierten Termin, weit genug für echte Distanz zum Alltagstrubel."
      },
      {
        heading: "Anfahrt aus Bern: mit dem Zug oder dem Auto",
        text: "Mit dem Zug ist Gümmenen ab Bern in rund 15 Minuten erreichbar. Auch die Anfahrt mit dem Auto ist unkompliziert. Details zur Anfahrt und zum genauen Ablauf bespreche ich gerne vorab bei der Terminvereinbarung."
      },
      {
        heading: "Ablauf, Dauer und Preise",
        text: "Eine Erstanwendung dauert 40 Minuten (CHF 80.-), eine Folgeanwendung 30 Minuten (CHF 60.-). Für einen Hausbesuch in Bern kommen CHF 10.- sowie Fahrkosten dazu. Die vollständige Preisübersicht finden Sie auf der Seite Ablauf und Preise."
      },
      {
        heading: "Reiki für Hunde und Katzen aus Bern",
        text: "Auch für Hunde und Katzen aus Bern biete ich Anwendungen an, die sich ganz nach dem Tempo des Tieres richten – im Studio in Gümmenen oder als Hausbesuch bei Ihnen zu Hause."
      },
      {
        heading: "Petra In-Albon – Ihre Ansprechperson in der Region",
        text: "Mehr über meinen Werdegang und meine Arbeitsweise erfahren Sie auf der Seite Über mich. Erfahrungsberichte bisheriger Kundinnen und Kunden finden Sie unter Erfahrungen."
      }
    ],
    faq: [
      {
        question: "Wie weit ist das Reiki Studio von Bern entfernt?",
        answer: "Das Studio liegt in Gümmenen, mit dem Zug ab Bern in rund 15 Minuten erreichbar. Mit dem Auto ist die Strecke ebenfalls unkompliziert zu fahren, ein Parkplatz steht vor Ort zur Verfügung."
      },
      {
        question: "Kann ich von Bern mit öffentlichen Verkehrsmitteln zum Reiki Studio kommen?",
        answer: "Ja, Gümmenen ist mit dem Zug ab Bern in etwa 15 Minuten erreichbar. Den Fussweg ab Bahnhof bespreche ich bei der Terminvereinbarung gerne mit Ihnen."
      },
      {
        question: "Sind auch Hausbesuche in Bern möglich?",
        answer: "Ja, ein Hausbesuch in Bern ist gegen Aufpreis und Fahrkosten möglich. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Über Petra In-Albon", href: "/ueber-mich" },
      { label: "Erfahrungen", href: "/erfahrungen" },
      { label: "Reiki für Hunde", href: "/reiki-fuer-tiere/hunde" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "laupen",
    category: "ort",
    metaTitle: "Reiki in Laupen | Reiki Studio in der Nähe",
    metaDescription:
      "Reiki für Menschen und Tiere aus Laupen: Praxis im nahen Gümmenen, historisches Städtchen mit Schloss Laupen. Auch Hausbesuche möglich.",
    h1: "Reiki in Laupen",
    intro:
      "Das Städtchen Laupen mit seinem Schloss und der historischen Altstadt liegt nur wenige Kilometer von Gümmenen entfernt. Aus Laupen ist mein Studio dadurch besonders unkompliziert erreichbar – für einen Termin vor Ort oder, wenn gewünscht, als Hausbesuch.",
    sections: [
      {
        heading: "Kurzer Weg aus dem historischen Laupen",
        text: "Wer in der Nähe von Schloss Laupen oder der Altstadt wohnt, hat es zu meinem Studio in Gümmenen nicht weit. Das macht auch regelmässige Anwendungen im Alltag gut umsetzbar."
      },
      {
        heading: "Für Menschen und Tiere",
        text: "Ob Reiki für sich selbst oder für Hund und Katze: Anwendungen aus Laupen richte ich ganz nach den Bedürfnissen von Mensch oder Tier – im Studio oder auf Wunsch bei Ihnen zu Hause."
      },
      {
        heading: "Hausbesuche und Fahrkosten",
        text: "Ein Hausbesuch in Laupen ist gegen einen Aufpreis sowie Fahrkosten möglich. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie weit ist es von Laupen zum Reiki Studio?",
        answer: "Nur wenige Kilometer – von Laupen aus ist das Studio in Gümmenen rasch mit dem Auto erreichbar, ein Parkplatz steht vor Ort zur Verfügung."
      },
      {
        question: "Gibt es Reiki für Menschen und Tiere aus Laupen?",
        answer: "Ja, sowohl für Menschen als auch für Hunde und Katzen aus Laupen biete ich Anwendungen im Studio oder als Hausbesuch an."
      },
      {
        question: "Was kostet ein Hausbesuch in Laupen?",
        answer: "Zum Preis der jeweiligen Anwendung kommen ein Aufpreis sowie Fahrkosten dazu. Die genauen Beträge finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Reiki in Neuenegg", href: "/reiki-in/neuenegg" },
      { label: "Reiki in Bern", href: "/reiki-in/bern" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "murten",
    category: "ort",
    metaTitle: "Reiki in Murten | Reiki Studio in Gümmenen",
    metaDescription:
      "Reiki für Menschen und Tiere aus Murten: Praxis im nahen Gümmenen, in der zweisprachigen Seeregion am Murtensee. Auch Hausbesuche möglich.",
    h1: "Reiki in Murten",
    intro:
      "Murten mit seiner mittelalterlichen Altstadt direkt am Murtensee liegt in der zweisprachigen Seeregion zwischen den Kantonen Bern und Freiburg. Von dort aus ist mein Studio in Gümmenen in angenehmer Fahrdistanz erreichbar.",
    sections: [
      {
        heading: "Aus der Seeregion nach Gümmenen",
        text: "Ob Sie in der Altstadt von Murten wohnen oder in der weiteren Seeregion: Die Fahrt nach Gümmenen ist unkompliziert. Details zur Anfahrt bespreche ich gerne bei der Terminvereinbarung."
      },
      {
        heading: "Für Menschen und Tiere aus Murten",
        text: "Reiki kann als bewusste Auszeit im Alltag dienen – für Menschen ebenso wie, achtsam und im eigenen Tempo, für Hunde und Katzen aus Murten und dem Seebezirk."
      },
      {
        heading: "Hausbesuch als Alternative",
        text: "Wenn ein Termin im Studio nicht passt, ist auch ein Hausbesuch in Murten gegen Aufpreis und Fahrkosten möglich. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie komme ich von Murten zum Reiki Studio in Gümmenen?",
        answer: "Mit dem Auto führt die Strecke direkt durchs Seeland, mit dem Zug ist eine Umsteigeverbindung über Kerzers möglich. Details bespreche ich gerne bei der Terminvereinbarung."
      },
      {
        question: "Wie lange dauert die Anfahrt von Murten?",
        answer: "Mit dem Auto ist mit rund 15 bis 20 Minuten zu rechnen, abhängig vom genauen Wohnort in der Region Murten."
      },
      {
        question: "Gibt es Reiki für Menschen und Tiere aus der Region Murten?",
        answer: "Ja, ich begleite sowohl Menschen als auch Hunde und Katzen aus Murten und dem Seebezirk – im Studio oder als Hausbesuch."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Kerzers", href: "/reiki-in/kerzers" },
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Reiki für Katzen", href: "/reiki-fuer-tiere/katzen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "kerzers",
    category: "ort",
    metaTitle: "Reiki in Kerzers | 4 Minuten ab Bahnhof nach Gümmenen",
    metaDescription:
      "Reiki für Menschen und Tiere aus Kerzers: Praxis in Gümmenen, mit dem Zug in rund 4 Minuten erreichbar. Auch Hausbesuche möglich.",
    h1: "Reiki in Kerzers",
    intro:
      "Kerzers im Seeland ist bekannt für das Papiliorama und liegt verkehrstechnisch günstig zu meinem Studio in Gümmenen. Mit dem Zug ist die Verbindung besonders kurz.",
    sections: [
      {
        heading: "Kurze Zugverbindung nach Gümmenen",
        text: "Ab Kerzers erreichen Sie Gümmenen mit dem Zug in rund 4 Minuten. Auch mit dem Auto ist die Strecke unkompliziert zu fahren."
      },
      {
        heading: "Für Menschen und Tiere aus Kerzers",
        text: "Eine Reiki-Anwendung richtet sich ganz nach Ihnen bzw. Ihrem Tier – ob Sie Reiki bereits kennen oder zum ersten Mal ausprobieren, und ob es sich um eine Anwendung für sich selbst oder für Hund oder Katze handelt."
      },
      {
        heading: "Hausbesuche aus Kerzers",
        text: "Wenn ein Besuch im Studio nicht möglich ist, biete ich auch einen Hausbesuch in Kerzers gegen Aufpreis und Fahrkosten an. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie lange dauert die Zugfahrt von Kerzers nach Gümmenen?",
        answer: "Nur rund 4 Minuten – Kerzers gehört damit zu den am kürzesten mit dem Zug erreichbaren Orten für das Studio."
      },
      {
        question: "Ist eine Anwendung auch kurzfristig ab Kerzers möglich?",
        answer: "Aufgrund der kurzen Anfahrt lassen sich Termine ab Kerzers oft unkompliziert planen. Freie Termine bespreche ich gerne über das Kontaktformular."
      },
      {
        question: "Gibt es auch Hausbesuche in Kerzers?",
        answer: "Ja, ein Hausbesuch in Kerzers ist gegen Aufpreis und Fahrkosten möglich. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Reiki für Hunde", href: "/reiki-fuer-tiere/hunde" },
      { label: "Reiki in Murten", href: "/reiki-in/murten" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "muehleberg",
    category: "ort",
    metaTitle: "Reiki in Mühleberg | Praxis im Nachbarort Gümmenen",
    metaDescription:
      "Reiki für Menschen und Tiere aus Mühleberg an der Aare: Praxis im direkt benachbarten Gümmenen. Auch Hausbesuche möglich.",
    h1: "Reiki in Mühleberg",
    intro:
      "Mühleberg liegt malerisch an der Aare, nur eine kurze Strecke von meinem Studio in Gümmenen entfernt. Für Menschen und Tiere aus Mühleberg ist ein Termin dadurch besonders unkompliziert zu organisieren.",
    sections: [
      {
        heading: "Direkte Nachbarschaft an der Aare",
        text: "Von Mühleberg aus ist mein Studio in Gümmenen in wenigen Minuten erreichbar – ideal auch für regelmässige Anwendungen im Alltag."
      },
      {
        heading: "Für Menschen und Tiere aus Mühleberg",
        text: "Ob als bewusste Auszeit für sich selbst oder als achtsame Begleitung für Hund oder Katze: Eine Anwendung richtet sich ganz nach dem, was Ihnen oder Ihrem Tier guttut."
      },
      {
        heading: "Hausbesuche in Mühleberg",
        text: "Aufgrund der kurzen Distanz ist auch ein Hausbesuch in Mühleberg unkompliziert möglich, gegen Aufpreis und Fahrkosten. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie nah ist Mühleberg an Gümmenen?",
        answer: "Sehr nah – die beiden Orte liegen in direkter Nachbarschaft an der Aare, die Fahrt dauert nur wenige Minuten."
      },
      {
        question: "Eignet sich die kurze Distanz auch für regelmässige Termine?",
        answer: "Ja, gerade weil die Anfahrt so kurz ist, lassen sich auch mehrere Anwendungen im Abstand von einigen Wochen gut in den Alltag einplanen."
      },
      {
        question: "Kann Reiki für mein Tier auch bei mir zu Hause in Mühleberg stattfinden?",
        answer: "Ja, ein Hausbesuch für Hund oder Katze ist möglich, besonders wenn Ihr Tier neue Umgebungen als belastend empfindet."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Reiki in Bern", href: "/reiki-in/bern" },
      { label: "Reiki für Katzen", href: "/reiki-fuer-tiere/katzen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "fribourg",
    category: "ort",
    metaTitle: "Reiki in Fribourg | Über die Kantonsgrenze nach Gümmenen",
    metaDescription:
      "Reiki für Menschen und Tiere aus Fribourg: Praxis in Gümmenen an der Kantonsgrenze zur zweisprachigen Stadt Fribourg. Auch Hausbesuche möglich.",
    h1: "Reiki in Fribourg",
    intro:
      "Die zweisprachige Universitätsstadt Fribourg liegt nahe der Grenze der Kantone Bern und Freiburg – Gümmenen und mein Studio sind von dort aus in angenehmer Fahrdistanz erreichbar.",
    sections: [
      {
        heading: "Über die Kantonsgrenze nach Gümmenen",
        text: "Ob aus der Altstadt von Fribourg oder den umliegenden Quartieren: Die Fahrt über die Kantonsgrenze nach Gümmenen ist unkompliziert und lohnt sich für eine ruhige Auszeit."
      },
      {
        heading: "Für Menschen und Tiere aus Fribourg",
        text: "Reiki kann als bewusste Auszeit im Alltag oder als ergänzende Begleitung in einer stressreicheren Lebensphase dienen – ebenso für Hunde und Katzen, ganz im Tempo des Tieres."
      },
      {
        heading: "Hausbesuch als Option",
        text: "Ist ein Termin im Studio nicht praktikabel, ist auch ein Hausbesuch in Fribourg gegen Aufpreis und Fahrkosten möglich. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie weit ist es von Fribourg nach Gümmenen?",
        answer: "Die Fahrt führt über die Kantonsgrenze und dauert mit dem Auto rund 20 bis 25 Minuten, abhängig vom genauen Ausgangspunkt in Fribourg."
      },
      {
        question: "Ist das Studio auch mit dem Zug ab Fribourg erreichbar?",
        answer: "Ja, mit einer Umsteigeverbindung über Bern oder Kerzers. Details zur besten Verbindung bespreche ich gerne bei der Terminvereinbarung."
      },
      {
        question: "Gibt es Reiki für Tiere aus Fribourg?",
        answer: "Ja, für Hunde und Katzen aus Fribourg biete ich Anwendungen im Studio oder als Hausbesuch an."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Köniz", href: "/reiki-in/koeniz" },
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Reiki als Ergänzung zur Akupunktur", href: "/reiki-fuer-menschen/ergaenzend-zur-akupunktur" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "koeniz",
    category: "ort",
    metaTitle: "Reiki in Köniz | Praxis in Gümmenen erreichbar",
    metaDescription:
      "Reiki für Menschen und Tiere aus Köniz: Praxis in Gümmenen, gut erreichbar aus der grossen Agglomerationsgemeinde Köniz. Auch Hausbesuche möglich.",
    h1: "Reiki in Köniz",
    intro:
      "Köniz gehört zu den grössten und bevölkerungsreichsten Gemeinden der Schweiz und grenzt direkt an die Stadt Bern. Aus den verschiedenen Ortsteilen von Köniz ist mein Studio in Gümmenen in guter Fahrdistanz erreichbar.",
    sections: [
      {
        heading: "Von den Könizer Ortsteilen nach Gümmenen",
        text: "Ob aus Köniz-Dorf, Liebefeld oder einem der anderen Ortsteile: Die Fahrt nach Gümmenen ist unkompliziert. Bei Bedarf bespreche ich die Anfahrt gerne vorab mit Ihnen."
      },
      {
        heading: "Für Menschen und Tiere aus Köniz",
        text: "Reiki kann eine bewusste Auszeit im Alltag oder eine ergänzende Begleitung in einer bewegten Lebensphase sein – ebenso für Hunde und Katzen, ganz im Tempo des Tieres."
      },
      {
        heading: "Hausbesuche in Köniz",
        text: "Ist ein Termin im Studio nicht möglich, biete ich auch einen Hausbesuch in Köniz gegen Aufpreis und Fahrkosten an. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Ist die Anfahrt von Köniz nach Gümmenen weit?",
        answer: "Je nach Ortsteil sind es rund 15 bis 20 Autominuten. Aus den westlichen Ortsteilen wie Niederwangen ist die Strecke etwas kürzer."
      },
      {
        question: "Gibt es aus Köniz auch eine Zugverbindung?",
        answer: "Ja, meist mit einer Umsteigeverbindung über Bern. Details zur besten Verbindung bespreche ich gerne vorab."
      },
      {
        question: "Sind Hausbesuche in Köniz möglich?",
        answer: "Ja, gegen Aufpreis und Fahrkosten. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Bern", href: "/reiki-in/bern" },
      { label: "Reiki in Belp", href: "/reiki-in/belp" },
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "neuenegg",
    category: "ort",
    metaTitle: "Reiki in Neuenegg | Nur wenige Minuten nach Gümmenen",
    metaDescription:
      "Reiki für Menschen und Tiere aus Neuenegg an der Sense: Praxis im direkt benachbarten Gümmenen. Auch Hausbesuche möglich.",
    h1: "Reiki in Neuenegg",
    intro:
      "Neuenegg liegt an der Sense, in unmittelbarer Nachbarschaft zu Gümmenen. Für Menschen und Tiere aus Neuenegg ist mein Studio dadurch besonders schnell erreichbar.",
    sections: [
      {
        heading: "Nur einen Katzensprung entfernt",
        text: "Von Neuenegg aus erreichen Sie mein Studio in Gümmenen in wenigen Minuten – praktisch für kurzfristige Termine ebenso wie für regelmässige Anwendungen."
      },
      {
        heading: "Für Menschen und Tiere aus Neuenegg",
        text: "Ob eine bewusste Auszeit für sich selbst oder eine achtsame Begleitung für Hund oder Katze: Eine Anwendung richtet sich ganz nach dem, was Ihnen oder Ihrem Tier guttut."
      },
      {
        heading: "Hausbesuch in gewohnter Umgebung",
        text: "Wenn Ihnen die gewohnte Umgebung wichtiger ist, ist ein Hausbesuch in Neuenegg gegen Aufpreis und Fahrkosten ebenso möglich. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt von Neuenegg nach Gümmenen?",
        answer: "Nur wenige Minuten mit dem Auto, da beide Orte direkt benachbart liegen."
      },
      {
        question: "Lohnt sich die kurze Strecke auch für regelmässige Anwendungen?",
        answer: "Ja, gerade die kurze Distanz macht es einfach, Reiki bei Bedarf mehrmals in Anspruch zu nehmen."
      },
      {
        question: "Sind Hausbesuche in Neuenegg möglich?",
        answer: "Ja, gegen Aufpreis und Fahrkosten – Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Laupen", href: "/reiki-in/laupen" },
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Reiki für Hunde", href: "/reiki-fuer-tiere/hunde" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "belp",
    category: "ort",
    metaTitle: "Reiki in Belp | Südlich von Bern, Praxis Gümmenen",
    metaDescription:
      "Reiki für Menschen und Tiere aus Belp: Praxis in Gümmenen, südöstlich von Bern gut erreichbar. Auch Hausbesuche möglich.",
    h1: "Reiki in Belp",
    intro:
      "Belp am Fuss des Belpbergs, bekannt auch durch den nahen Flughafen Bern-Belp, liegt südöstlich von Bern in angenehmer Fahrdistanz zu meinem Studio in Gümmenen.",
    sections: [
      {
        heading: "Von Belp aus nach Gümmenen",
        text: "Die Strecke von Belp nach Gümmenen führt quer durch die Region Bern-Süd und ist unkompliziert zu fahren. Details zur Anfahrt bespreche ich gerne bei der Terminvereinbarung."
      },
      {
        heading: "Für Menschen und Tiere aus Belp",
        text: "Ganz gleich, ob Sie Reiki bereits kennen oder zum ersten Mal ausprobieren möchten: Eine Anwendung richtet sich nach Ihren Bedürfnissen – ebenso für Hunde und Katzen aus Belp und Umgebung."
      },
      {
        heading: "Hausbesuche in Belp",
        text: "Bei Bedarf ist auch ein Hausbesuch in Belp gegen Aufpreis und Fahrkosten möglich, bei Tieren etwa dann, wenn die gewohnte Umgebung wichtig ist. Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie weit ist es von Belp nach Gümmenen?",
        answer: "Die Strecke führt quer durch die Region Bern-Süd und dauert mit dem Auto rund 20 Minuten."
      },
      {
        question: "Ist die Fahrt vom Flughafen Bern-Belp aus auch praktisch für Reisende?",
        answer: "Das Studio richtet sich in erster Linie an Menschen aus der Region; bei besonderen Anliegen sprechen Sie mich gerne direkt über das Kontaktformular an."
      },
      {
        question: "Gibt es Reiki für Tiere aus Belp?",
        answer: "Ja, für Hunde und Katzen aus Belp und Umgebung biete ich Anwendungen im Studio oder als Hausbesuch an."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Köniz", href: "/reiki-in/koeniz" },
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Reiki für Katzen", href: "/reiki-fuer-tiere/katzen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },

  // ---------------------------------------------------------------------
  // Themen bei Menschen (Cluster-Seiten unter /reiki-fuer-menschen/[slug])
  // ---------------------------------------------------------------------
  {
    slug: "stress",
    category: "mensch-thema",
    metaTitle: "Reiki bei Stress | Ruhe und Entspannung",
    metaDescription:
      "Reiki kann zur Entspannung beitragen und Stress reduzieren helfen. Erfahren Sie, wie eine Reiki-Anwendung bei Stress und innerer Anspannung unterstützen kann.",
    h1: "Reiki bei Stress",
    intro:
      "Stressreiche Lebensphasen kennen viele: beruflicher Druck, ein voller Terminkalender oder private Belastungen. Reiki kann in solchen Phasen eine ergänzende, entspannungsfördernde Auszeit bieten.",
    benefits: [
      "kann Stress reduzieren helfen",
      "kann zur Entspannung beitragen",
      "unterstützt das allgemeine Wohlbefinden",
      "kann Körper und Geist neue Kraft schenken",
      "kann zum Lösen von Verspannungen beitragen"
    ],
    sections: [
      {
        heading: "Wie kann Reiki bei Stress unterstützen?",
        text: "Während einer Anwendung liegen oder sitzen Sie bequem und bekleidet, während die Hände sanft aufgelegt oder mit Abstand über dem Körper gehalten werden. Viele Menschen empfinden diese Zeit als wohltuende Unterbrechung des Alltags, in der Anspannung Raum bekommt, sich zu lösen."
      },
      {
        heading: "Für wen eignet sich das?",
        text: "Das Angebot richtet sich an alle, die sich in stressigen Lebensphasen eine bewusste Auszeit wünschen – unabhängig davon, ob Reiki bereits bekannt ist oder zum ersten Mal ausprobiert wird. Vorerfahrung ist nicht notwendig."
      },
      {
        heading: "Ablauf einer Anwendung",
        text: "Zu Beginn nehmen wir uns Zeit für ein kurzes Gespräch, damit ich auf Ihre aktuelle Situation eingehen kann. Details zum weiteren Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Wie läuft eine Reiki-Anwendung bei Stress ab?",
        answer: "Sie liegen oder sitzen bequem und bekleidet, während die Hände sanft aufgelegt oder mit Abstand über dem Körper gehalten werden. Vorab findet immer ein kurzes Gespräch statt."
      },
      {
        question: "Wie lange dauert eine Reiki-Sitzung?",
        answer: "Eine Erstanwendung dauert 40 Minuten, eine Folgeanwendung 30 Minuten. Details finden Sie auf der Seite Ablauf und Preise."
      },
      {
        question: "Ersetzt Reiki eine medizinische oder psychotherapeutische Behandlung?",
        answer: "Nein. Reiki versteht sich als ergänzendes, entspannungsförderndes Angebot und ersetzt keine ärztliche oder psychotherapeutische Behandlung."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei Schlafproblemen", href: "/reiki-fuer-menschen/schlafproblemen" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Reiki zur Burnout-Vorbeugung", href: "/reiki-fuer-menschen/burnout-vorbeugung" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "schlafproblemen",
    category: "mensch-thema",
    metaTitle: "Reiki bei Schlafproblemen | Sanft zur Ruhe kommen",
    metaDescription:
      "Reiki wird von vielen als schlaffördernd empfunden. Erfahren Sie, wie eine Reiki-Anwendung bei Ein- und Durchschlafproblemen ergänzend unterstützen kann.",
    h1: "Reiki bei Schlafproblemen",
    intro:
      "Wer nachts schwer zur Ruhe kommt, sucht oft nach sanften Wegen, um Körper und Geist auf Entspannung einzustimmen. Reiki wird von vielen Menschen als schlaffördernd empfunden und kann eine ergänzende Unterstützung sein.",
    benefits: [
      "wird von vielen als schlaffördernd empfunden",
      "kann zur Entspannung beitragen",
      "kann Stress reduzieren helfen",
      "unterstützt das allgemeine Wohlbefinden"
    ],
    sections: [
      {
        heading: "Wie kann Reiki bei Schlafproblemen unterstützen?",
        text: "Die ruhige, achtsame Atmosphäre einer Anwendung kann helfen, innerlich abzuschalten. Viele Menschen berichten, sich nach einer Sitzung spürbar entspannter zu fühlen – als Grundlage für einen erholsameren Schlaf."
      },
      {
        heading: "Für wen eignet sich das?",
        text: "Das Angebot richtet sich an alle, die abends schwer abschalten können oder sich generell mehr Ruhe wünschen. Reiki ersetzt jedoch keine ärztliche Abklärung bei anhaltenden Schlafstörungen."
      },
      {
        heading: "Ablauf einer Anwendung",
        text: "Nach einem kurzen Vorgespräch liegen oder sitzen Sie bequem und bekleidet, während die Hände sanft aufgelegt oder mit Abstand gehalten werden. Details zum weiteren Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Kann Reiki wirklich beim Einschlafen helfen?",
        answer: "Viele Menschen berichten, sich nach einer Anwendung spürbar entspannter zu fühlen. Ein wissenschaftlicher Wirksamkeitsnachweis für Reiki besteht jedoch nicht, weshalb keine Heilversprechen gemacht werden."
      },
      {
        question: "Was, wenn die Schlafprobleme schon lange anhalten?",
        answer: "Bei anhaltenden Schlafstörungen empfiehlt sich zusätzlich eine ärztliche Abklärung. Reiki versteht sich als ergänzendes, nicht als ersetzendes Angebot."
      },
      {
        question: "Zu welcher Tageszeit findet eine Anwendung statt?",
        answer: "Termine sind tagsüber im Studio in Gümmenen möglich; die Anwendung selbst findet nicht abends bei Ihnen zu Hause im Bett statt."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Reiki bei chronischer Erschöpfung", href: "/reiki-fuer-menschen/chronische-erschoepfung" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "innere-unruhe",
    category: "mensch-thema",
    metaTitle: "Reiki bei innerer Unruhe | Begleitende Anwendung",
    metaDescription:
      "Reiki kann zur Entspannung beitragen und bei innerer Unruhe eine wohltuende Auszeit bieten. Jetzt mehr erfahren und unverbindlich anfragen.",
    h1: "Reiki bei innerer Unruhe",
    intro:
      "Innere Unruhe zeigt sich unterschiedlich – als Gedankenkreisen, Nervosität oder ein diffuses Gefühl von Anspannung. Reiki kann als ergänzende, entspannungsfördernde Begleitung in solchen Phasen unterstützen.",
    benefits: [
      "kann zur Entspannung beitragen",
      "kann Stress reduzieren helfen",
      "unterstützt das allgemeine Wohlbefinden",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Wie kann Reiki bei innerer Unruhe unterstützen?",
        text: "In der ruhigen Atmosphäre einer Anwendung darf nichts erzwungen werden – es gibt keine feste Erwartung daran, was Sie spüren oder erleben sollten. Viele empfinden bereits das bewusste Innehalten als wohltuend."
      },
      {
        heading: "Für wen eignet sich das?",
        text: "Das Angebot eignet sich für alle, die sich in bewegten Lebensphasen, bei persönlichen Veränderungen oder einfach im Alltag mehr innere Ruhe wünschen. Vorerfahrung mit Reiki ist nicht notwendig."
      },
      {
        heading: "Ablauf einer Anwendung",
        text: "Zu Beginn nehmen wir uns Zeit für ein kurzes Gespräch. Details zum weiteren Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Was tun, wenn Gedanken während der Anwendung ständig kreisen?",
        answer: "Das ist völlig normal und kein Problem. Es gibt keine Erwartung, den Kopf sofort leer zu bekommen – viele empfinden bereits das bewusste Innehalten als wohltuend."
      },
      {
        question: "Wie oft sollte eine Anwendung bei innerer Unruhe stattfinden?",
        answer: "Das ist individuell verschieden. Manche Menschen profitieren von einer einzelnen Sitzung, andere wünschen sich mehrere Anwendungen im Abstand einiger Wochen – das besprechen wir gemeinsam."
      },
      {
        question: "Ist innere Unruhe dasselbe wie Angst?",
        answer: "Nicht zwingend – innere Unruhe kann verschiedene Ursachen haben. Bei ausgeprägter Angst oder Panik ist fachliche Unterstützung wichtig; Reiki kann dabei höchstens ergänzend begleiten."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki bei Schlafproblemen", href: "/reiki-fuer-menschen/schlafproblemen" },
      { label: "Reiki in Zeiten der Veränderung", href: "/reiki-fuer-menschen/lebensveraenderungen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "schwangerschaft",
    category: "mensch-thema",
    metaTitle: "Reiki in der Schwangerschaft | Sanfte Auszeit",
    metaDescription:
      "Reiki kann in der Schwangerschaft eine sanfte, entspannungsfördernde Auszeit bieten. Bitte vorab Rücksprache mit Ärztin/Arzt oder Hebamme halten.",
    h1: "Reiki in der Schwangerschaft",
    intro:
      "Die Schwangerschaft bringt viele Veränderungen mit sich – körperlich wie emotional. Eine Reiki-Anwendung kann in dieser Zeit eine sanfte, entspannungsfördernde Auszeit bieten.",
    benefits: [
      "kann zur Entspannung beitragen",
      "unterstützt das allgemeine Wohlbefinden",
      "gibt neue Energie",
      "kann zum Lösen von Verspannungen beitragen"
    ],
    sections: [
      {
        heading: "Wie läuft eine Anwendung in der Schwangerschaft ab?",
        text: "Die Anwendung wird an eine bequeme, für Schwangere angenehme Position angepasst. Sie bleiben während der gesamten Sitzung vollständig bekleidet, die Hände werden sanft aufgelegt oder mit Abstand gehalten."
      },
      {
        heading: "Wichtiger Hinweis",
        text: "Bitte halten Sie vorab Rücksprache mit Ihrer Ärztin, Ihrem Arzt oder Ihrer Hebamme, insbesondere bei Risikoschwangerschaften oder Komplikationen. Reiki ersetzt keine medizinische oder geburtshilfliche Betreuung."
      },
      {
        heading: "Ablauf und Vorgespräch",
        text: "Im kurzen Vorgespräch besprechen wir Ihre aktuelle Situation und etwaige Einschränkungen. Details zum allgemeinen Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Ist Reiki in jedem Stadium der Schwangerschaft möglich?",
        answer: "Grundsätzlich ja, die Position wird jeweils an Ihre Bedürfnisse angepasst. Bei Risikoschwangerschaften oder Komplikationen halten Sie bitte vorab Rücksprache mit Ihrer Fachperson."
      },
      {
        question: "Bleibe ich während der Anwendung bekleidet?",
        answer: "Ja, Sie bleiben während der gesamten Sitzung vollständig bekleidet, die Hände werden sanft aufgelegt oder mit Abstand gehalten."
      },
      {
        question: "Kann Reiki auch nach der Geburt genutzt werden?",
        answer: "Ja, auch danach kann eine Anwendung eine entspannungsfördernde Auszeit bieten. Sprechen Sie mich bei Interesse gerne direkt über das Kontaktformular an."
      }
    ],
    disclaimer:
      "Reiki kann zur Entspannung beitragen, ersetzt in der Schwangerschaft jedoch keine ärztliche oder geburtshilfliche Betreuung. Bitte halten Sie vorab Rücksprache mit der behandelnden Fachperson.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Reiki für Kinder", href: "/reiki-fuer-menschen/kinder" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "kinder",
    category: "mensch-thema",
    metaTitle: "Reiki für Kinder im Raum Bern",
    metaDescription:
      "Reiki für Kinder in Gümmenen bei Bern: eine achtsame, kindgerechte Auszeit für Ruhe, Entspannung und Wohlbefinden. Ablauf und Möglichkeiten kennenlernen.",
    h1: "Reiki für Kinder – achtsame Begleitung im Raum Bern",
    intro:
      "Kinder erleben den Alltag oft besonders intensiv. Schule, Veränderungen, viele Eindrücke oder innere Unruhe können dazu führen, dass Ruhe und Entspannung zu kurz kommen. Reiki für Kinder bietet eine sanfte, achtsame Auszeit in geschützter Atmosphäre. In meinem Reiki Studio in Gümmenen bei Bern richte ich jede Anwendung individuell nach dem Alter, den Bedürfnissen und dem Tempo des Kindes aus.",
    benefits: [
      "kann Ruhe und Entspannung unterstützen",
      "bietet eine bewusste Auszeit vom Alltag",
      "wird kindgerecht und ohne Druck gestaltet",
      "das Kind entscheidet jederzeit selbst mit"
    ],
    sections: [
      {
        heading: "Wann kann Reiki für Kinder eine wohltuende Begleitung sein?",
        text: "Kinder brauchen manchmal einen Moment, in dem nichts von ihnen erwartet wird. Eine Reiki-Anwendung kann einen ruhigen Rahmen bieten, in dem das Kind entspannen und zur Ruhe kommen darf. Eltern interessieren sich beispielsweise für Reiki, wenn ihr Kind einen unruhigen Alltag erlebt, vor Veränderungen steht oder sich eine bewusste Auszeit wünscht. Dabei mache ich keine Heilversprechen. Reiki versteht sich als ergänzende Anwendung für Entspannung und Wohlbefinden und ersetzt keine ärztliche, psychologische oder therapeutische Behandlung. Typische Anlässe sind Schulstress und viele Eindrücke, innere Unruhe, Veränderungen wie Schulwechsel oder Umzug, herausfordernde Lebensphasen sowie der Wunsch nach Ruhe und Entspannung."
      },
      {
        heading: "Wie läuft Reiki bei Kindern ab?",
        text: "Vor der ersten Anwendung bespreche ich mit Ihnen als Elternteil in Ruhe, was Ihrem Kind guttut und was Sie sich von der Begegnung wünschen. Auch dem Kind erkläre ich altersgerecht, was bei Reiki passiert. Die Anwendung findet vollständig bekleidet statt und wird an das Alter und die Aufmerksamkeitsspanne des Kindes angepasst. Nähe und Berührung erfolgen niemals gegen den Wunsch des Kindes. Mir ist wichtig, dass es sich sicher und wohlfühlt und jederzeit Nein sagen oder die Anwendung beenden kann."
      },
      {
        heading: "Reiki für Kinder in Gümmenen bei Bern",
        text: "Mein Reiki Studio befindet sich in 3205 Gümmenen im Kanton Bern. Ich begleite Familien aus Gümmenen und der umliegenden Region, beispielsweise aus Mühleberg, Laupen, Neuenegg und Bern. Wenn Sie unsicher sind, ob Reiki für Ihr Kind passend sein könnte, können wir dies gerne in einem unverbindlichen Erstgespräch besprechen."
      }
    ],
    faq: [
      {
        question: "Ab welchem Alter ist Reiki für Kinder geeignet?",
        answer: "Es gibt keine feste Altersgrenze. Wichtig ist, dass das Kind der Anwendung zustimmt und sich sicher fühlt – die genaue Gestaltung passe ich an Alter und Aufmerksamkeitsspanne an."
      },
      {
        question: "Muss ich als Elternteil während der Anwendung dabei sein?",
        answer: "Das besprechen wir individuell, je nach Alter und Wunsch des Kindes. Viele Kinder fühlen sich wohler, wenn ein Elternteil zumindest in der Nähe ist."
      },
      {
        question: "Was, wenn mein Kind die Anwendung nicht möchte?",
        answer: "Dann wird die Anwendung angepasst oder beendet. Nähe und Berührung erfolgen nie gegen den Wunsch des Kindes."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Reiki in der Schwangerschaft", href: "/reiki-fuer-menschen/schwangerschaft" },
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "altersheim",
    category: "mensch-thema",
    metaTitle: "Reiki im Altersheim und Pflegeheim",
    metaDescription:
      "Reiki im Altersheim und Pflegeheim im Raum Bern: ruhige, freiwillige Begleitung für Bewohnerinnen und Bewohner. Für Einrichtungen und Angehörige.",
    h1: "Reiki im Altersheim und Pflegeheim",
    intro:
      "Der Alltag in einem Alters- oder Pflegeheim ist oft dicht getaktet. Reiki kann für Bewohnerinnen und Bewohner eine ruhige, freiwillige Auszeit bieten – sitzend oder liegend, ganz nach dem, was die Person an diesem Tag zulassen möchte. Ich biete solche Besuche sowohl für Einrichtungen als auch auf Wunsch einzelner Angehöriger an.",
    benefits: [
      "kann zur Entspannung beitragen",
      "bietet eine ruhige, freiwillige Auszeit vom Alltag",
      "berücksichtigt die individuelle Tagesform",
      "Berührung ausschliesslich nach Wunsch der Person"
    ],
    sections: [
      {
        heading: "Für wen geeignet?",
        text: "Für Bewohnerinnen und Bewohner von Alters- und Pflegeheimen, unabhängig vom Alter oder Mobilitätsgrad. Die Anwendung findet sitzend oder liegend statt und wird an die jeweilige Tagesform angepasst. Wie bei jeder Reiki-Anwendung entscheidet die Person jederzeit selbst mit, wie viel Nähe sie zulassen möchte."
      },
      {
        heading: "Für Einrichtungen",
        text: "Heimleitungen und Aktivierungsverantwortliche können einzelne Besuche oder eine regelmässige Begleitung vereinbaren. Ablauf, Häufigkeit und organisatorische Fragen bespreche ich gerne direkt mit der Einrichtung."
      },
      {
        heading: "Für Angehörige",
        text: "Auch Angehörige können eine Reiki-Anwendung für eine im Heim lebende Person anfragen. In Absprache mit der Einrichtung wird ein passender Zeitpunkt gefunden."
      },
      {
        heading: "Wichtiger Hinweis",
        text: "Reiki versteht sich als ergänzendes, entspannungsförderndes Angebot und ersetzt keine medizinische, pflegerische oder psychotherapeutische Versorgung. Es werden keine Aussagen über die Behandlung bestehender Erkrankungen gemacht."
      }
    ],
    faq: [
      {
        question: "Wie können Einrichtungen einen Besuch vereinbaren?",
        answer: "Heimleitungen und Aktivierungsverantwortliche können Ablauf, Häufigkeit und organisatorische Fragen direkt über das Kontaktformular mit mir besprechen."
      },
      {
        question: "Ist Reiki auch bei eingeschränkter Mobilität möglich?",
        answer: "Ja, die Anwendung findet sitzend oder liegend statt und wird an die individuelle Tagesform und Mobilität der Person angepasst."
      },
      {
        question: "Kann ein Angehöriger eine Anwendung für eine Person im Heim anfragen?",
        answer: "Ja, in Absprache mit der Einrichtung wird dann ein passender Zeitpunkt gefunden."
      }
    ],
    disclaimer:
      "Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend empfunden. Es ersetzt jedoch keine medizinische, pflegerische oder psychotherapeutische Versorgung und ist als ergänzendes, freiwilliges Angebot zu verstehen.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki als Begleitung während einer Genesungsphase", href: "/reiki-fuer-menschen/genesungsphase" },
      { label: "Reiki für pflegende Angehörige", href: "/reiki-fuer-menschen/pflegende-angehoerige" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "genesungsphase",
    category: "mensch-thema",
    metaTitle: "Reiki als Begleitung während einer Genesungsphase",
    metaDescription:
      "Reiki kann eine Genesungsphase sanft begleiten und zur Entspannung beitragen. Ergänzend zur ärztlichen Behandlung – jetzt unverbindlich anfragen.",
    h1: "Reiki als Begleitung während einer Genesungsphase",
    intro:
      "Nach einer Operation, einer Erkrankung oder in einer längeren Erholungszeit wünschen sich viele Menschen zusätzlich zur medizinischen Behandlung etwas, das ihnen Ruhe und neue Kraft gibt. Reiki kann eine Genesungsphase als ergänzende, entspannungsfördernde Begleitung unterstützen.",
    benefits: [
      "kann zur Entspannung beitragen",
      "unterstützt das allgemeine Wohlbefinden",
      "gibt neue Energie",
      "kann zum Lösen von Verspannungen beitragen"
    ],
    sections: [
      {
        heading: "Wie kann Reiki in einer Genesungsphase unterstützen?",
        text: "Eine Anwendung findet in ruhiger Atmosphäre statt und lässt Raum, um zur Ruhe zu kommen. Viele Menschen empfinden dies in einer Erholungsphase als wohltuende Unterbrechung des Alltags mit seinen Anforderungen."
      },
      {
        heading: "Ergänzend, nicht ersetzend",
        text: "Reiki versteht sich ausdrücklich als Ergänzung zur ärztlichen Behandlung und ersetzt diese nicht. Bitte besprechen Sie bei akuten Beschwerden oder während einer laufenden Behandlung vorab mit Ihrer Ärztin oder Ihrem Arzt, ob eine Anwendung für Sie passend ist."
      },
      {
        heading: "Ablauf und Vorgespräch",
        text: "Im Vorgespräch nehmen wir uns Zeit für Ihre aktuelle Situation, damit die Anwendung darauf abgestimmt werden kann. Details zum allgemeinen Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Wie kurz nach einer Operation kann eine Anwendung stattfinden?",
        answer: "Das hängt von der individuellen Situation ab. Bitte halten Sie bei akuten Beschwerden oder kurz nach einem Eingriff vorab Rücksprache mit Ihrer Ärztin oder Ihrem Arzt."
      },
      {
        question: "Ist Reiki während einer laufenden medizinischen Behandlung sinnvoll?",
        answer: "Reiki kann ergänzend zur ärztlichen Behandlung genutzt werden, ersetzt diese aber nicht. Sprechen Sie eine geplante Anwendung nach Möglichkeit mit Ihrer behandelnden Fachperson ab."
      },
      {
        question: "Was, wenn ich während einer Genesungsphase wenig Energie habe?",
        answer: "Die Anwendung findet in ruhiger, bequemer Position statt und erfordert keine Aktivität Ihrerseits – Sie dürfen einfach liegen oder sitzen bleiben."
      }
    ],
    disclaimer:
      "Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend empfunden. Es ersetzt jedoch keine ärztliche Behandlung, Diagnose oder Therapie und ist ausschliesslich als ergänzendes Angebot zu verstehen.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei chronischer Erschöpfung", href: "/reiki-fuer-menschen/chronische-erschoepfung" },
      { label: "Reiki für pflegende Angehörige", href: "/reiki-fuer-menschen/pflegende-angehoerige" },
      { label: "Reiki im Altersheim und Pflegeheim", href: "/reiki-fuer-menschen/altersheim" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "pflegende-angehoerige",
    category: "mensch-thema",
    metaTitle: "Reiki für pflegende Angehörige",
    metaDescription:
      "Reiki kann pflegenden Angehörigen eine bewusste Auszeit vom Alltag schenken. Entspannungsfördernd und ganz ohne schlechtes Gewissen. Jetzt anfragen.",
    h1: "Reiki für pflegende Angehörige",
    intro:
      "Wer einen kranken oder pflegebedürftigen Menschen im Umfeld begleitet, stellt die eigenen Bedürfnisse oft zurück. Reiki kann pflegenden Angehörigen eine bewusste Auszeit bieten, in der einmal nicht sie für andere, sondern jemand für sie da ist.",
    benefits: [
      "kann zur Entspannung beitragen",
      "kann Stress reduzieren helfen",
      "gibt neue Energie",
      "unterstützt das allgemeine Wohlbefinden"
    ],
    sections: [
      {
        heading: "Warum eine Auszeit gerade jetzt wichtig ist",
        text: "Dauerhafte Belastung durch Pflege und Sorge um einen nahestehenden Menschen zehrt an den eigenen Kraftreserven. Eine Reiki-Anwendung kann ein bewusster Moment sein, um für sich selbst zu sorgen – ohne schlechtes Gewissen."
      },
      {
        heading: "Was Sie erwartet",
        text: "Während der Anwendung liegen oder sitzen Sie bequem und bekleidet. Es gibt keine Erwartungen oder Vorgaben – einzig der Moment der Ruhe steht im Vordergrund."
      },
      {
        heading: "Ablauf und Vorgespräch",
        text: "Im kurzen Vorgespräch ist auch Raum, um kurz über Ihre aktuelle Situation zu sprechen, wenn Sie das möchten. Details zum allgemeinen Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Muss ich über meine Pflegesituation sprechen, wenn ich das nicht möchte?",
        answer: "Nein. Im Vorgespräch gibt es Raum dafür, wenn Sie das wünschen – ein Muss ist es nicht. Die Anwendung steht im Vordergrund."
      },
      {
        question: "Ist eine einzelne Anwendung sinnvoll, oder braucht es mehrere Termine?",
        answer: "Das ist ganz Ihnen überlassen. Manche pflegenden Angehörigen kommen einmalig, andere schätzen eine regelmässige Auszeit."
      },
      {
        question: "Kann ich einen Termin auch kurzfristig vereinbaren?",
        answer: "Ich versuche, gerade für pflegende Angehörige nach Möglichkeit flexibel zu sein. Fragen Sie unverbindlich über das Kontaktformular an."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei chronischer Erschöpfung", href: "/reiki-fuer-menschen/chronische-erschoepfung" },
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki im Altersheim und Pflegeheim", href: "/reiki-fuer-menschen/altersheim" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "chronische-erschoepfung",
    category: "mensch-thema",
    metaTitle: "Reiki bei chronischer Erschöpfung | Neue Kraft",
    metaDescription:
      "Reiki kann bei chronischer Erschöpfung als ergänzender Ausgleich dienen und neue Energie schenken. Jetzt mehr erfahren und unverbindlich anfragen.",
    h1: "Reiki bei chronischer Erschöpfung",
    intro:
      "Anhaltende Müdigkeit und das Gefühl, dauerhaft am Limit zu sein, können den Alltag stark einschränken. Reiki kann als ergänzender Ausgleich dienen und einen Raum schaffen, in dem Körper und Geist zur Ruhe kommen dürfen.",
    benefits: [
      "gibt neue Energie",
      "kann zur Entspannung beitragen",
      "unterstützt das allgemeine Wohlbefinden",
      "kann Stress reduzieren helfen"
    ],
    sections: [
      {
        heading: "Wie kann Reiki bei chronischer Erschöpfung unterstützen?",
        text: "Eine Anwendung bietet bewusste Zeit zum Auftanken, ohne Leistungsanspruch. Viele Menschen berichten, sich danach ausgeglichener und ruhiger zu fühlen."
      },
      {
        heading: "Wichtiger Hinweis",
        text: "Bei anhaltender oder unklarer Erschöpfung empfehlen wir eine ärztliche Abklärung, um mögliche Ursachen zu erkennen. Reiki versteht sich als ergänzendes Angebot und ersetzt keine medizinische Diagnose oder Behandlung."
      },
      {
        heading: "Ablauf und Vorgespräch",
        text: "Im Vorgespräch besprechen wir Ihre aktuelle Situation, damit die Anwendung darauf abgestimmt werden kann. Details zum allgemeinen Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Woher weiss ich, ob meine Erschöpfung medizinisch abgeklärt werden sollte?",
        answer: "Bei anhaltender oder unklarer Erschöpfung ist eine ärztliche Abklärung sinnvoll, um mögliche Ursachen zu erkennen. Reiki ersetzt diese Abklärung nicht."
      },
      {
        question: "Kann Reiki bei Erschöpfung ergänzend zur ärztlichen Behandlung genutzt werden?",
        answer: "Ja, viele nutzen eine Anwendung begleitend zu einer bereits laufenden Abklärung oder Behandlung, als bewusste Zeit zum Auftanken."
      },
      {
        question: "Was unterscheidet chronische Erschöpfung von normaler Müdigkeit?",
        answer: "Das lässt sich am besten ärztlich beurteilen. Reiki macht hierzu keine diagnostischen Aussagen, sondern bietet unabhängig davon eine entspannungsfördernde Auszeit."
      }
    ],
    disclaimer:
      "Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend empfunden. Es ersetzt jedoch keine ärztliche Abklärung oder Behandlung und ist als ergänzendes Angebot zu verstehen.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki für pflegende Angehörige", href: "/reiki-fuer-menschen/pflegende-angehoerige" },
      { label: "Reiki zur Burnout-Vorbeugung", href: "/reiki-fuer-menschen/burnout-vorbeugung" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "lebensveraenderungen",
    category: "mensch-thema",
    metaTitle: "Reiki in Zeiten der Veränderung",
    metaDescription:
      "Reiki kann in Zeiten der Veränderung – etwa bei Umzug, Trennung oder beruflichem Wandel – eine ruhige, entspannungsfördernde Begleitung bieten.",
    h1: "Reiki in Zeiten der Veränderung",
    intro:
      "Ob Umzug, beruflicher Wechsel, Trennung oder ein neuer Lebensabschnitt: Veränderungen bringen oft viele Gedanken und Gefühle mit sich. Reiki kann in solchen Phasen eine ruhige, entspannungsfördernde Begleitung bieten.",
    benefits: [
      "kann zur Entspannung beitragen",
      "kann Stress reduzieren helfen",
      "unterstützt das allgemeine Wohlbefinden",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Wie kann Reiki in Veränderungsphasen unterstützen?",
        text: "Eine Anwendung schafft bewussten Raum, um innezuhalten, während im Aussen vieles in Bewegung ist. Es gibt keine Erwartung daran, was Sie dabei spüren oder erleben sollten."
      },
      {
        heading: "Für wen eignet sich das?",
        text: "Das Angebot richtet sich an alle, die sich in einer Übergangsphase befinden und sich Unterstützung beim Zurechtfinden wünschen – unabhängig davon, ob es sich um eine belastende oder eine grundsätzlich positive Veränderung handelt."
      },
      {
        heading: "Ablauf einer Anwendung",
        text: "Zu Beginn nehmen wir uns Zeit für ein kurzes Gespräch. Details zum weiteren Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Eignet sich Reiki auch bei positiven Veränderungen wie einem neuen Job?",
        answer: "Ja, auch positive Umbrüche können viel Energie und Gedanken beanspruchen. Eine Anwendung kann helfen, bewusst anzukommen."
      },
      {
        question: "Wie schnell nach einer Veränderung kann ich einen Termin vereinbaren?",
        answer: "Es gibt keine Wartezeit – Sie können sich jederzeit über das Kontaktformular melden, ganz gleich, wie frisch die Veränderung ist."
      },
      {
        question: "Hilft eine einzelne Anwendung schon, oder braucht es mehrere Termine?",
        answer: "Das ist unterschiedlich. Manche Menschen wünschen sich eine einmalige Auszeit, andere lassen sich während der gesamten Übergangsphase begleiten – ganz nach Ihrem Bedarf."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Reiki als Begleitung in Zeiten der Trauer", href: "/reiki-fuer-menschen/trauerbegleitung" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "trauerbegleitung",
    category: "mensch-thema",
    metaTitle: "Reiki als Begleitung in Zeiten der Trauer",
    metaDescription:
      "Reiki kann in Zeiten der Trauer einen ruhigen Raum zum Innehalten bieten. Sanft, ohne Erwartungen und in Ihrem eigenen Tempo.",
    h1: "Reiki als Begleitung in Zeiten der Trauer",
    intro:
      "Der Verlust eines nahestehenden Menschen oder Tieres kann sich auf ganz unterschiedliche Weise zeigen. Reiki ersetzt keine Trauerbegleitung oder Therapie, kann aber einen ruhigen Raum bieten, in dem Sie einfach sein dürfen, wie es Ihnen gerade geht.",
    benefits: [
      "kann zur Entspannung beitragen",
      "unterstützt das allgemeine Wohlbefinden",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Was Sie erwartet",
        text: "Eine Anwendung findet ganz ohne Erwartungen statt. Es gibt keinen Zeitplan für Trauer und keine Vorgabe, wie Sie sich während oder nach einer Sitzung fühlen sollten."
      },
      {
        heading: "Ergänzend zu professioneller Unterstützung",
        text: "Bei intensiver oder anhaltender Trauer kann eine Trauerbegleitung oder psychologische Unterstützung sinnvoll und wichtig sein. Reiki versteht sich als ergänzendes, nicht als ersetzendes Angebot."
      },
      {
        heading: "Ablauf und Vorgespräch",
        text: "Im Vorgespräch ist Raum, kurz zu erzählen, was Sie beschäftigt – wenn Sie das möchten. Details zum allgemeinen Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Ist Reiki auch bei Trauer um ein verstorbenes Tier passend?",
        answer: "Ja, der Verlust eines Tieres kann ebenso schmerzhaft sein wie der eines Menschen. Eine Anwendung nimmt darauf ebenso Rücksicht."
      },
      {
        question: "Muss ich während der Anwendung über meine Trauer sprechen?",
        answer: "Nein, es gibt keine Pflicht dazu. Die Sitzung findet ganz ohne Erwartungen statt, Sie dürfen einfach da sein, wie es Ihnen gerade geht."
      },
      {
        question: "Wann sollte ich statt oder zusätzlich zu Reiki eine Trauerbegleitung aufsuchen?",
        answer: "Bei intensiver oder anhaltender Trauer ist professionelle Trauerbegleitung oder psychologische Unterstützung wichtig. Reiki versteht sich ausschliesslich als ergänzendes Angebot."
      }
    ],
    disclaimer:
      "Reiki kann zur Entspannung beitragen und einen ruhigen Raum zum Innehalten bieten. Es ersetzt jedoch keine Trauerbegleitung, Psychotherapie oder ärztliche Behandlung.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki in Zeiten der Veränderung", href: "/reiki-fuer-menschen/lebensveraenderungen" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "burnout-vorbeugung",
    category: "mensch-thema",
    metaTitle: "Reiki zur Burnout-Vorbeugung",
    metaDescription:
      "Reiki kann als bewusster Ausgleich zu beruflicher Dauerbelastung dienen und so vorbeugend zur Entspannung beitragen. Jetzt mehr erfahren.",
    h1: "Reiki zur Burnout-Vorbeugung",
    intro:
      "Dauerhafter beruflicher Druck und fehlende Erholungspausen zählen zu den häufigsten Ursachen für Erschöpfung. Reiki kann als bewusster Ausgleich im Alltag dienen und dabei helfen, vorbeugend auf die eigenen Kraftreserven zu achten.",
    benefits: [
      "kann Stress reduzieren helfen",
      "kann zur Entspannung beitragen",
      "gibt neue Energie",
      "unterstützt das allgemeine Wohlbefinden"
    ],
    sections: [
      {
        heading: "Vorbeugen statt nur reagieren",
        text: "Regelmässige bewusste Pausen können helfen, dauerhafter Überlastung entgegenzuwirken. Eine Reiki-Anwendung bietet eine solche Pause, ohne dass etwas geleistet werden muss."
      },
      {
        heading: "Wichtiger Hinweis",
        text: "Bei bereits bestehenden Anzeichen eines Burnouts oder anderen psychischen Belastungen ist fachliche Unterstützung durch Ärztin, Arzt oder Psychotherapie wichtig. Reiki versteht sich ausschliesslich als ergänzendes, vorbeugendes Angebot."
      },
      {
        heading: "Ablauf einer Anwendung",
        text: "Im Vorgespräch besprechen wir kurz Ihre aktuelle Situation. Details zum weiteren Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Kann Reiki einen bestehenden Burnout behandeln?",
        answer: "Nein. Reiki versteht sich ausschliesslich als vorbeugender, entspannungsfördernder Ausgleich. Bei bestehenden Anzeichen eines Burnouts ist fachliche Unterstützung wichtig."
      },
      {
        question: "Wie oft sollte ich Reiki zur Vorbeugung nutzen?",
        answer: "Das ist individuell. Manche integrieren eine regelmässige Anwendung im Abstand einiger Wochen fest in ihren Alltag, andere nutzen sie punktuell in besonders fordernden Phasen."
      },
      {
        question: "Für wen eignet sich diese Seite besonders?",
        answer: "Für Menschen, die beruflich stark eingespannt sind und bewusst vorbeugen möchten, bevor eine Überlastung entsteht – nicht für die Behandlung eines bereits bestehenden Burnouts."
      }
    ],
    disclaimer:
      "Reiki kann als vorbeugender, entspannungsfördernder Ausgleich dienen. Es ersetzt keine ärztliche oder psychotherapeutische Behandlung und ist nicht zur Behandlung eines bestehenden Burnouts oder anderer psychischer Erkrankungen gedacht.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki bei chronischer Erschöpfung", href: "/reiki-fuer-menschen/chronische-erschoepfung" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "ergaenzend-zur-akupunktur",
    category: "mensch-thema",
    metaTitle: "Reiki als Ergänzung zur Akupunktur",
    metaDescription:
      "Reiki als entspannungsfördernde Ergänzung neben Akupunktur oder anderen Methoden. Hinweis: Petra In-Albon bietet keine Akupunktur an, nur Reiki.",
    h1: "Reiki als Ergänzung zur Akupunktur",
    intro:
      "Manche Menschen kombinieren bewusst mehrere komplementäre Methoden. Wer bereits Akupunktur in Anspruch nimmt, empfindet eine zusätzliche Reiki-Anwendung oft als wohltuende Ergänzung im Alltag zwischen den Terminen.",
    benefits: [
      "kann zur Entspannung beitragen",
      "kann Stress reduzieren helfen",
      "unterstützt das allgemeine Wohlbefinden",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Wichtiger Hinweis",
        text: "Petra In-Albon bietet ausschliesslich Reiki an – keine Akupunktur. Diese Seite richtet sich an Menschen, die Akupunktur bereits anderswo in Anspruch nehmen und zusätzlich eine entspannungsfördernde Reiki-Anwendung suchen."
      },
      {
        heading: "Wie unterscheiden sich die beiden Methoden?",
        text: "Akupunktur ist eine eigenständige Methode aus der Traditionellen Chinesischen Medizin und wird von entsprechend ausgebildeten Fachpersonen durchgeführt. Reiki ist eine sanfte, entspannungsfördernde Anwendung, bei der die Hände aufgelegt oder mit Abstand gehalten werden – ohne Nadeln und ohne medizinischen Anspruch."
      },
      {
        heading: "Ablauf und Vorgespräch",
        text: "Im kurzen Vorgespräch können Sie erwähnen, wenn Sie aktuell in Akupunktur-Behandlung sind, damit die Reiki-Anwendung darauf abgestimmt werden kann. Details zum allgemeinen Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    faq: [
      {
        question: "Bietet Petra In-Albon auch Akupunktur an?",
        answer: "Nein, ausschliesslich Reiki. Diese Seite richtet sich an Menschen, die Akupunktur bereits bei einer anderen Fachperson erhalten."
      },
      {
        question: "Kann Reiki am selben Tag wie eine Akupunktur-Sitzung stattfinden?",
        answer: "Das ist grundsätzlich möglich, sollte aber im Vorgespräch besprochen werden, damit die Anwendung darauf abgestimmt werden kann."
      },
      {
        question: "Ist Reiki eine Alternative zu Akupunktur?",
        answer: "Nein, beides sind eigenständige Methoden mit unterschiedlichem Hintergrund. Reiki wird hier ausdrücklich als mögliche Ergänzung, nicht als Ersatz verstanden."
      }
    ],
    disclaimer:
      "Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend empfunden. Es ist keine Akupunktur, ersetzt keine ärztliche oder TCM-Behandlung und ist als eigenständiges, ergänzendes Angebot zu verstehen.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Wie eine Reiki-Behandlung abläuft", href: "/reiki-behandlung" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "fernbehandlung-schweiz",
    category: "mensch-thema",
    metaTitle: "Reiki-Fernbehandlung Schweiz",
    metaDescription:
      "Reiki-Fernbehandlung für Menschen in der ganzen Schweiz: ortsunabhängig, unkompliziert und als ergänzende Entspannungsmöglichkeit.",
    h1: "Reiki-Fernbehandlung in der ganzen Schweiz",
    intro:
      "Nicht immer ist eine Anwendung vor Ort im Studio in Gümmenen oder ein Hausbesuch möglich. Für Menschen in der ganzen Schweiz biete ich daher auch eine Reiki-Fernbehandlung an.",
    benefits: [
      "kann zur Entspannung beitragen",
      "kann Stress reduzieren helfen",
      "unterstützt das allgemeine Wohlbefinden",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Wie funktioniert eine Fernbehandlung?",
        text: "Bei einer Fernbehandlung sind Sie nicht persönlich vor Ort anwesend. Im Vorgespräch klären wir Ablauf und Zeitpunkt, damit Sie sich währenddessen in Ruhe zurückziehen können – ganz gleich, ob Sie in Zürich, Genf, im Tessin oder anderswo in der Schweiz wohnen."
      },
      {
        heading: "Für wen eignet sich eine Fernbehandlung?",
        text: "Besonders geeignet für alle, die keine Möglichkeit für einen persönlichen Termin in Gümmenen oder einen Hausbesuch haben, aber dennoch von einer Reiki-Anwendung profitieren möchten."
      },
      {
        heading: "Preise und Buchung",
        text: "Eine Fernbehandlung kostet CHF 30.- Details finden Sie auf der Seite Ablauf und Preise. Die Terminvereinbarung erfolgt unkompliziert über das Kontaktformular."
      }
    ],
    faq: [
      {
        question: "Muss ich für eine Fernbehandlung zu einer bestimmten Zeit erreichbar sein?",
        answer: "Wir vereinbaren im Vorgespräch einen Zeitpunkt, an dem Sie sich in Ruhe zurückziehen können. Während der Anwendung selbst müssen Sie nicht aktiv teilnehmen."
      },
      {
        question: "Wie unterscheidet sich eine Fernbehandlung von einer Anwendung vor Ort?",
        answer: "Der wesentliche Unterschied ist Ihre physische Anwesenheit. Viele Menschen berichten von ähnlichen Entspannungserfahrungen wie bei einer Anwendung im Studio."
      },
      {
        question: "Für wen eignet sich eine Fernbehandlung besonders?",
        answer: "Für alle, die weit entfernt wohnen, zeitlich eingeschränkt sind oder aus anderen Gründen keinen Termin vor Ort wahrnehmen können, aber dennoch von Reiki profitieren möchten."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Wie eine Reiki-Behandlung abläuft", href: "/reiki-behandlung" },
      { label: "Reiki-Fernbehandlung für Tiere Schweiz", href: "/reiki-fuer-tiere/fernbehandlung-schweiz" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },

  // ---------------------------------------------------------------------
  // Tierarten (Cluster-Seiten unter /reiki-fuer-tiere/[slug])
  // ---------------------------------------------------------------------
  {
    slug: "hunde",
    category: "tier",
    metaTitle: "Reiki für Hunde | Ruhige Begleitung für Tiere",
    metaDescription:
      "Reiki für Hunde in Gümmenen und Umgebung (u. a. Bern): achtsam, freiwillig und im Tempo Ihres Hundes. Auch Hausbesuche möglich.",
    h1: "Reiki für Hunde",
    intro:
      "Ob quirliger Junghund, gelassener Familienliebling, verunsicherter Rettungshund aus dem Tierschutz, ein Senior mit ruhigeren Bedürfnissen oder ein grosser, kräftiger Hund neben einem zierlichen Kleinen – jeder Hund bringt seinen eigenen Charakter, seine eigene Geschichte und sein eigenes Tempo mit. Genau darauf nehme ich bei einer Reiki-Anwendung Rücksicht: Es gibt kein starres Schema, sondern nur das, was Ihr Hund im Moment zulassen möchte.",
    benefits: [
      "kann zu mehr Gelassenheit beitragen",
      "wird von vielen Hunden als angenehm empfunden",
      "kann zur Beruhigung beitragen",
      "kann bei ängstlichem oder unsicherem Verhalten unterstützend wirken",
      "kann eine ruhige Auszeit für lebhafte oder sensible Hunde bieten",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Für jeden Hund das passende Tempo",
        text: "Kleine und grosse Hunde, ruhige und temperamentvolle, ängstliche und selbstbewusste: Jeder Hund reagiert anders auf neue Situationen und fremde Personen. Ein zurückhaltender Hund darf sich Zeit lassen und den Raum zunächst aus sicherer Distanz erkunden, ein zutraulicher Familienliebling sucht vielleicht sofort die Nähe. Beides ist willkommen – es gibt keinen Druck und keine Erwartung, wie schnell sich Ihr Hund öffnet."
      },
      {
        heading: "Wie läuft eine Anwendung bei Hunden ab?",
        text: "Manche Hunde suchen von sich aus die Nähe und legen sich neben oder auf die Hände, andere bleiben lieber in etwas Abstand oder beobachten zunächst aus der Ferne. Beides wird respektiert – es gibt keinen festen Ablaufplan und keinen Zwang zur Berührung."
      },
      {
        heading: "Typische Anlässe bei Hunden",
        text: "Häufige Anlässe sind die Eingewöhnung nach der Anschaffung oder aus dem Tierschutz, spürbare Verunsicherung oder ängstliches Verhalten – etwa bei Silvesterkrachern, dem Feuerwerk am 1. August, Gewitter oder in anderen ungewohnten Situationen –, Begleitung während der Erholungsphase nach einer Operation, die Bedürfnisse älterer, ruhebedürftiger Hunde oder einfach eine bewusste Auszeit für aktive, lebhafte Vierbeiner."
      },
      {
        heading: "Praxis oder Hausbesuch",
        text: "Eine Anwendung kann im Studio in Gümmenen oder als Hausbesuch stattfinden, damit sich Ihr Hund in vertrauter Umgebung befindet – besonders empfehlenswert bei sehr ängstlichen oder unsicheren Hunden. Details finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie läuft Reiki bei einem Hund ab?",
        answer: "Ihr Hund entscheidet selbst, ob er die Nähe der Hände sucht oder lieber Abstand hält. Es gibt keinen festen Ablaufplan und keinen Zwang zur Berührung."
      },
      {
        question: "Muss mein Hund während Reiki ruhig liegen?",
        answer: "Nein. Manche Hunde legen sich hin, andere bleiben sitzen, bewegen sich zwischendurch oder beobachten aus der Distanz – alles ist in Ordnung."
      },
      {
        question: "Kann Reiki auch beim Hund zu Hause stattfinden?",
        answer: "Ja, ein Hausbesuch ist möglich und empfiehlt sich besonders bei ängstlichen oder unsicheren Hunden, damit sie sich in vertrauter Umgebung befinden."
      }
    ],
    disclaimer: animalDisclaimer,
    cta: defaultAnimalCta,
    relatedPaths: [
      { label: "Reiki für Katzen", href: "/reiki-fuer-tiere/katzen" },
      { label: "Reiki-Fernbehandlung für Tiere Schweiz", href: "/reiki-fuer-tiere/fernbehandlung-schweiz" },
      { label: "Reiki in Bern", href: "/reiki-in/bern" },
      { label: "Reiki in Gümmenen", href: "/reiki-in/guemmenen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "katzen",
    category: "tier",
    metaTitle: "Reiki für Katzen | Sanft im Tempo Ihrer Katze",
    metaDescription:
      "Reiki für Katzen in Gümmenen und Umgebung: sanft, freiwillig und ganz im Tempo Ihrer Katze. Auch Hausbesuche möglich.",
    h1: "Reiki für Katzen",
    intro:
      "Ob zurückhaltende Wohnungskatze, selbstbewusster Freigänger, verschmuster Schmusetiger, scheue Katze aus dem Tierschutz oder ruhebedürftige Seniorin – Katzen sind ausgesprochene Persönlichkeiten und entscheiden meist ganz genau selbst, wann und wie viel Nähe sie zulassen möchten. Eine Reiki-Anwendung nimmt darauf Rücksicht und lässt Ihrer Katze jederzeit die Möglichkeit, sich zurückzuziehen, statt etwas von ihr zu verlangen.",
    benefits: [
      "kann zu mehr Gelassenheit beitragen",
      "wird von vielen Katzen als angenehm empfunden",
      "kann zur Beruhigung beitragen",
      "kann bei scheuem oder ängstlichem Verhalten unterstützend wirken",
      "bietet eine ruhige Auszeit ganz im Tempo Ihrer Katze"
    ],
    sections: [
      {
        heading: "Für jede Katzenpersönlichkeit der passende Rahmen",
        text: "Manche Katzen suchen von Anfang an aktiv die Nähe und schmiegen sich an die Hände, andere beobachten lieber erst aus sicherer Distanz vom Kratzbaum oder aus einer Ecke des Raums. Zurückhaltende, scheue oder aus dem Tierschutz stammende Katzen dürfen sich so viel Zeit lassen, wie sie brauchen – es gibt keinen Zeitdruck und keine Erwartung an direkten Kontakt."
      },
      {
        heading: "Wie läuft eine Anwendung bei Katzen ab?",
        text: "Da Katzen sensibel auf neue Umgebungen reagieren können, findet eine Anwendung häufig als Hausbesuch statt. Eine Anwendung mit etwas Abstand im selben Raum ist ebenfalls möglich, wenn direkter Kontakt (noch) nicht gewünscht wird."
      },
      {
        heading: "Typische Anlässe bei Katzen",
        text: "Häufige Anlässe sind die Eingewöhnung in ein neues Zuhause, Veränderungen im gewohnten Umfeld (z. B. Umzug oder neue Mitbewohner), Verunsicherung durch laute Geräusche wie Silvesterkracher oder das Feuerwerk am 1. August, die Bedürfnisse älterer, ruhebedürftiger Katzen oder eine Begleitung während der Erholungsphase nach einer Behandlung."
      },
      {
        heading: "Praxis oder Hausbesuch",
        text: "Für Katzen empfiehlt sich meist ein Hausbesuch in gewohnter Umgebung, da der vertraute Rückzugsort gerade für scheue Tiere wichtig ist. Details und Fahrkosten finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    faq: [
      {
        question: "Wie läuft Reiki bei einer Katze ab?",
        answer: "Ihre Katze entscheidet selbst, ob sie Nähe sucht oder lieber aus der Distanz beobachtet. Es gibt keinen Zeitdruck und keine Erwartung an direkten Kontakt."
      },
      {
        question: "Warum findet eine Anwendung bei Katzen oft als Hausbesuch statt?",
        answer: "Katzen reagieren häufig sensibel auf neue Umgebungen. In der gewohnten Umgebung fühlen sie sich meist deutlich sicherer und entspannter."
      },
      {
        question: "Was, wenn meine Katze sich während der Anwendung zurückzieht?",
        answer: "Das ist völlig in Ordnung. Rückzug wird respektiert – eine Anwendung findet nie gegen den Willen des Tieres statt."
      }
    ],
    disclaimer: animalDisclaimer,
    cta: defaultAnimalCta,
    relatedPaths: [
      { label: "Reiki für Hunde", href: "/reiki-fuer-tiere/hunde" },
      { label: "Reiki-Fernbehandlung für Tiere Schweiz", href: "/reiki-fuer-tiere/fernbehandlung-schweiz" },
      { label: "Reiki in Murten", href: "/reiki-in/murten" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "fernbehandlung-schweiz",
    category: "tier",
    metaTitle: "Reiki-Fernbehandlung für Tiere Schweiz",
    metaDescription:
      "Reiki-Fernbehandlung für Tiere in der ganzen Schweiz: ortsunabhängig und als ergänzende, entspannungsfördernde Unterstützung.",
    h1: "Reiki-Fernbehandlung für Tiere in der ganzen Schweiz",
    intro:
      "Ist ein Hausbesuch oder eine Anwendung im Studio in Gümmenen nicht möglich, biete ich für Tiere in der ganzen Schweiz auch eine Reiki-Fernbehandlung an.",
    benefits: [
      "kann zu mehr Gelassenheit beitragen",
      "wird von vielen Tieren als angenehm empfunden",
      "kann zur Beruhigung beitragen",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Wie funktioniert eine Fernbehandlung bei Tieren?",
        text: "Ihr Tier muss dafür nicht anwesend sein. Im Vorgespräch besprechen wir Zeitpunkt und Ablauf sowie Besonderheiten Ihres Tieres – unabhängig davon, wo in der Schweiz Sie wohnen."
      },
      {
        heading: "Für welche Tiere eignet sich das?",
        text: "Grundsätzlich für alle Tierarten geeignet, insbesondere wenn ein Tier neue Situationen oder fremde Personen als belastend empfindet und eine Anwendung aus der Ferne dadurch angenehmer ist."
      },
      {
        heading: "Preise und Buchung",
        text: "Eine Fernbehandlung kostet CHF 30.- Details finden Sie auf der Seite Ablauf und Preise. Die Terminvereinbarung erfolgt unkompliziert über das Kontaktformular."
      }
    ],
    faq: [
      {
        question: "Muss mein Tier bei einer Fernbehandlung anwesend sein?",
        answer: "Nein, Ihr Tier muss dafür nicht bei Ihnen sein. Im Vorgespräch klären wir Zeitpunkt, Ablauf und Besonderheiten Ihres Tieres."
      },
      {
        question: "Für welche Tierarten ist eine Fernbehandlung möglich?",
        answer: "Grundsätzlich für alle Tierarten, nicht nur Hunde und Katzen – insbesondere wenn ein Tier fremde Personen oder neue Situationen als belastend empfindet."
      },
      {
        question: "Was kostet eine Fernbehandlung für Tiere?",
        answer: "Eine Fernbehandlung kostet CHF 30.-. Details finden Sie auf der Seite Ablauf und Preise, die Terminvereinbarung erfolgt über das Kontaktformular."
      }
    ],
    disclaimer: animalDisclaimer,
    cta: defaultAnimalCta,
    relatedPaths: [
      { label: "Reiki für Hunde", href: "/reiki-fuer-tiere/hunde" },
      { label: "Reiki für Katzen", href: "/reiki-fuer-tiere/katzen" },
      { label: "Reiki-Fernbehandlung für Menschen Schweiz", href: "/reiki-fuer-menschen/fernbehandlung-schweiz" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  }
];

export function getLandingPagesByCategory(category: LandingPageCategory): LandingPage[] {
  return landingPages.filter((entry) => entry.category === category);
}

export function getLandingPage(
  category: LandingPageCategory,
  slug: string
): LandingPage | undefined {
  return landingPages.find((entry) => entry.category === category && entry.slug === slug);
}
