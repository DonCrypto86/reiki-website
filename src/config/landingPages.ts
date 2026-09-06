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

export type LandingPage = {
  slug: string;
  category: LandingPageCategory;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  benefits?: string[];
  sections: LandingPageSection[];
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
    slug: "bern",
    category: "ort",
    metaTitle: "Reiki in Bern – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Bern: Hausbesuche ab Gümmenen, nur wenige Fahrminuten von der Stadt Bern entfernt. Jetzt unverbindlich anfragen.",
    h1: "Reiki in Bern",
    intro:
      "Mein Reiki Studio liegt in Gümmenen, nur wenige Fahrminuten von der Stadt Bern entfernt. Für Menschen und Tiere in Bern biete ich sowohl Anwendungen im Studio als auch Hausbesuche an – ganz nach dem, was für Sie und Ihr Tier am angenehmsten ist.",
    sections: [
      {
        heading: "Reiki für Menschen in Bern",
        text: "Ob nach einem stressigen Arbeitstag in der Stadt oder in einer bewegten Lebensphase: Reiki kann zur Entspannung beitragen und Körper und Geist neue Kraft schenken. Für Termine aus Bern ist sowohl ein Besuch im Studio in Gümmenen als auch ein Hausbesuch möglich."
      },
      {
        heading: "Reiki für Tiere in Bern",
        text: "Auch für Hunde, Katzen und andere Tiere aus Bern begleite ich Anwendungen achtsam und im Tempo des Tieres – bei Bedarf direkt bei Ihnen zu Hause, damit sich Ihr Tier in gewohnter Umgebung befindet."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Gümmenen liegt südwestlich von Bern und ist von der Stadt aus gut erreichbar. Hausbesuche in Bern sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise. Alternativ ist auch eine Fernbehandlung denkbar, wenn eine Anwendung vor Ort nicht möglich ist."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki für Hunde", href: "/reiki-fuer-tiere/hunde" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "laupen",
    category: "ort",
    metaTitle: "Reiki in Laupen – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Laupen: Mein Studio in Gümmenen liegt gleich nebenan, Hausbesuche in Laupen sind ebenfalls möglich.",
    h1: "Reiki in Laupen",
    intro:
      "Das historische Städtchen Laupen liegt in direkter Nachbarschaft zu Gümmenen. Für Menschen und Tiere aus Laupen sind sowohl Anwendungen in meinem Studio als auch Hausbesuche eine unkomplizierte Option.",
    sections: [
      {
        heading: "Reiki für Menschen in Laupen",
        text: "Wer eine bewusste Auszeit sucht, findet in meinem Studio in Gümmenen einen ruhigen Rückzugsort – von Laupen aus in wenigen Minuten erreichbar. Ein Hausbesuch in Laupen ist ebenso möglich."
      },
      {
        heading: "Reiki für Tiere in Laupen",
        text: "Für Hunde, Katzen und andere Tiere aus Laupen biete ich Anwendungen an, die sich ganz nach dem Tempo Ihres Tieres richten – bei Ihnen zu Hause oder im Studio."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Aufgrund der Nähe zu Laupen ist die Anfahrt kurz. Hausbesuche sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki in Bern", href: "/reiki-in/bern" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "murten",
    category: "ort",
    metaTitle: "Reiki in Murten – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Murten und Umgebung: Studio in Gümmenen oder Hausbesuch direkt in Murten.",
    h1: "Reiki in Murten",
    intro:
      "Von der Seestadt Murten aus ist mein Studio in Gümmenen gut zu erreichen. Für Menschen und Tiere aus Murten biete ich Anwendungen im Studio sowie Hausbesuche an.",
    sections: [
      {
        heading: "Reiki für Menschen in Murten",
        text: "Reiki kann zur Entspannung beitragen und wird von vielen als wohltuend empfunden – ob als bewusste Auszeit im Alltag oder als ergänzende Begleitung in einer stressreicheren Lebensphase."
      },
      {
        heading: "Reiki für Tiere in Murten",
        text: "Für Tiere aus Murten und dem Seebezirk sind Anwendungen im Studio ebenso möglich wie ein Hausbesuch, damit sich Ihr Tier in vertrauter Umgebung befindet."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Murten liegt in angenehmer Fahrdistanz zu Gümmenen. Hausbesuche sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki in Kerzers", href: "/reiki-in/kerzers" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "kerzers",
    category: "ort",
    metaTitle: "Reiki in Kerzers – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Kerzers: Studio in Gümmenen oder Hausbesuch direkt in Kerzers.",
    h1: "Reiki in Kerzers",
    intro:
      "Kerzers liegt im Seeland, nicht weit von meinem Studio in Gümmenen entfernt. Für Menschen und Tiere aus Kerzers biete ich Anwendungen im Studio sowie Hausbesuche an.",
    sections: [
      {
        heading: "Reiki für Menschen in Kerzers",
        text: "Eine Reiki-Anwendung kann zur Entspannung beitragen und Körper und Geist neue Kraft schenken – ganz gleich, ob Sie Reiki bereits kennen oder zum ersten Mal ausprobieren möchten."
      },
      {
        heading: "Reiki für Tiere in Kerzers",
        text: "Für Tiere aus Kerzers und Umgebung – ob Hund, Katze, Kleintier oder Pferd – richtet sich eine Anwendung ganz nach dem, was Ihr Tier zulassen möchte, bei Bedarf direkt bei Ihnen zu Hause."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Kerzers ist von Gümmenen aus gut erreichbar. Hausbesuche sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki für Pferde", href: "/reiki-fuer-tiere/pferde" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "muehleberg",
    category: "ort",
    metaTitle: "Reiki in Mühleberg – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Mühleberg: Mein Studio in Gümmenen liegt gleich nebenan, Hausbesuche in Mühleberg sind ebenfalls möglich.",
    h1: "Reiki in Mühleberg",
    intro:
      "Mühleberg an der Aare liegt in unmittelbarer Nähe zu Gümmenen. Für Menschen und Tiere aus Mühleberg sind sowohl Anwendungen in meinem Studio als auch Hausbesuche eine unkomplizierte Option.",
    sections: [
      {
        heading: "Reiki für Menschen in Mühleberg",
        text: "Eine kurze Anfahrt genügt: Von Mühleberg aus erreichen Sie mein Studio in Gümmenen in wenigen Minuten. Ein Hausbesuch in Mühleberg ist ebenso möglich."
      },
      {
        heading: "Reiki für Tiere in Mühleberg",
        text: "Für Hunde, Katzen und andere Tiere aus Mühleberg biete ich Anwendungen an, die sich ganz nach dem Tempo Ihres Tieres richten – bei Ihnen zu Hause oder im Studio."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Aufgrund der Nähe zu Mühleberg ist die Anfahrt kurz. Hausbesuche sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki in Bern", href: "/reiki-in/bern" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },

  // ---------------------------------------------------------------------
  // Themen bei Menschen (Cluster-Seiten unter /reiki-fuer-menschen/[slug])
  // ---------------------------------------------------------------------
  {
    slug: "stress",
    category: "mensch-thema",
    metaTitle: "Reiki bei Stress – Reiki Studio Petra In-Albon",
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
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei Schlafproblemen", href: "/reiki-fuer-menschen/schlafproblemen" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "schlafproblemen",
    category: "mensch-thema",
    metaTitle: "Reiki bei Schlafproblemen – Reiki Studio Petra In-Albon",
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
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "innere-unruhe",
    category: "mensch-thema",
    metaTitle: "Reiki bei innerer Unruhe – Reiki Studio Petra In-Albon",
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
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki bei Schlafproblemen", href: "/reiki-fuer-menschen/schlafproblemen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "schwangerschaft",
    category: "mensch-thema",
    metaTitle: "Reiki in der Schwangerschaft – Reiki Studio Petra In-Albon",
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
    disclaimer:
      "Reiki kann zur Entspannung beitragen, ersetzt in der Schwangerschaft jedoch keine ärztliche oder geburtshilfliche Betreuung. Bitte halten Sie vorab Rücksprache mit der behandelnden Fachperson.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "fernbehandlung-schweiz",
    category: "mensch-thema",
    metaTitle: "Reiki-Fernbehandlung Schweiz – Reiki Studio Petra In-Albon",
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
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
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
    metaTitle: "Reiki für Hunde – Reiki Studio Petra In-Albon",
    metaDescription:
      "Reiki für Hunde in Gümmenen und Umgebung (u. a. Bern): achtsam, freiwillig und im Tempo Ihres Hundes. Auch Hausbesuche möglich.",
    h1: "Reiki für Hunde",
    intro:
      "Ob verunsicherter Rettungshund, älterer Hund oder aufgeweckter Junghund – jeder Hund reagiert unterschiedlich auf neue Situationen. Eine Reiki-Anwendung richtet sich ganz nach dem, was Ihr Hund zulassen möchte.",
    benefits: [
      "kann zu mehr Gelassenheit beitragen",
      "wird von vielen Tieren als angenehm empfunden",
      "kann zur Beruhigung beitragen",
      "kann bei ängstlichem Verhalten unterstützend wirken",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Wie läuft eine Anwendung bei Hunden ab?",
        text: "Manche Hunde suchen von sich aus die Nähe und legen sich neben oder auf die Hände, andere bleiben lieber in etwas Abstand. Beides wird respektiert – es gibt keinen festen Ablaufplan."
      },
      {
        heading: "Typische Anlässe bei Hunden",
        text: "Häufige Anlässe sind die Eingewöhnung nach der Anschaffung oder aus dem Tierschutz, Unterstützung bei ängstlichem Verhalten (z. B. an Silvester oder bei Gewitter), Begleitung während der Erholungsphase nach einer Operation oder einfach eine ruhige Auszeit für aktive Hunde."
      },
      {
        heading: "Praxis oder Hausbesuch",
        text: "Eine Anwendung kann im Studio in Gümmenen oder als Hausbesuch stattfinden, damit sich Ihr Hund in vertrauter Umgebung befindet. Details finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: animalDisclaimer,
    cta: defaultAnimalCta,
    relatedPaths: [
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki für Katzen", href: "/reiki-fuer-tiere/katzen" },
      { label: "Reiki in Bern", href: "/reiki-in/bern" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "katzen",
    category: "tier",
    metaTitle: "Reiki für Katzen – Reiki Studio Petra In-Albon",
    metaDescription:
      "Reiki für Katzen in Gümmenen und Umgebung: sanft, freiwillig und ganz im Tempo Ihrer Katze. Auch Hausbesuche möglich.",
    h1: "Reiki für Katzen",
    intro:
      "Katzen entscheiden meist ganz genau selbst, wann und wie viel Nähe sie zulassen möchten. Eine Reiki-Anwendung nimmt darauf Rücksicht und lässt Ihrer Katze jederzeit die Möglichkeit, sich zurückzuziehen.",
    benefits: [
      "kann zu mehr Gelassenheit beitragen",
      "wird von vielen Tieren als angenehm empfunden",
      "kann zur Beruhigung beitragen",
      "aktiviert die körpereigenen Selbstheilungskräfte"
    ],
    sections: [
      {
        heading: "Wie läuft eine Anwendung bei Katzen ab?",
        text: "Da Katzen sensibel auf neue Umgebungen reagieren können, findet eine Anwendung häufig als Hausbesuch statt. Eine Anwendung mit etwas Abstand im selben Raum ist ebenfalls möglich, wenn direkter Kontakt (noch) nicht gewünscht wird."
      },
      {
        heading: "Typische Anlässe bei Katzen",
        text: "Häufige Anlässe sind die Eingewöhnung in ein neues Zuhause, Veränderungen im gewohnten Umfeld (z. B. Umzug oder neue Mitbewohner), Unterstützung älterer Katzen oder eine Begleitung während der Erholungsphase nach einer Behandlung."
      },
      {
        heading: "Praxis oder Hausbesuch",
        text: "Für Katzen empfiehlt sich meist ein Hausbesuch in gewohnter Umgebung. Details und Fahrkosten finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: animalDisclaimer,
    cta: defaultAnimalCta,
    relatedPaths: [
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki für Hunde", href: "/reiki-fuer-tiere/hunde" },
      { label: "Reiki für Kleintiere", href: "/reiki-fuer-tiere/kleintiere" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "pferde",
    category: "tier",
    metaTitle: "Reiki für Pferde – Reiki Studio Petra In-Albon",
    metaDescription:
      "Reiki für Pferde im Raum Bern: achtsame Anwendungen direkt im Stall, ganz im Tempo Ihres Pferdes.",
    h1: "Reiki für Pferde",
    intro:
      "Bei Pferden findet eine Reiki-Anwendung praktisch immer dort statt, wo das Pferd zu Hause ist – im Stall oder auf der Weide. So bleibt Ihr Pferd in vertrauter Umgebung, was vielen Pferden zusätzliche Sicherheit gibt.",
    benefits: [
      "kann zu mehr Gelassenheit beitragen",
      "wird von vielen Tieren als angenehm empfunden",
      "kann das Wohlbefinden fördern",
      "gibt neue Energie"
    ],
    sections: [
      {
        heading: "Wie läuft eine Anwendung bei Pferden ab?",
        text: "Zu Beginn nehmen wir uns Zeit, damit Ihr Pferd mich in Ruhe kennenlernen kann. Die Hände werden sanft aufgelegt oder mit etwas Abstand gehalten – ganz danach, was Ihr Pferd in dem Moment zulassen möchte."
      },
      {
        heading: "Typische Anlässe bei Pferden",
        text: "Häufige Anlässe sind Unterstützung in stressigen Situationen (z. B. Stallwechsel oder Transport), Begleitung während der Erholungsphase nach Verletzungen oder Operationen sowie eine ruhige Auszeit für sensible oder ältere Pferde."
      },
      {
        heading: "Vor-Ort-Termine im Stall",
        text: "Anwendungen bei Pferden finden grundsätzlich vor Ort im Stall statt (Hausbesuch). Details und Fahrkosten finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: animalDisclaimer,
    cta: defaultAnimalCta,
    relatedPaths: [
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki in Kerzers", href: "/reiki-in/kerzers" },
      { label: "Reiki in Murten", href: "/reiki-in/murten" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "kleintiere",
    category: "tier",
    metaTitle: "Reiki für Kleintiere – Reiki Studio Petra In-Albon",
    metaDescription:
      "Reiki für Kleintiere wie Kaninchen und Meerschweinchen in Gümmenen und Umgebung: besonders behutsam und mit viel Abstand, wenn gewünscht.",
    h1: "Reiki für Kleintiere",
    intro:
      "Kaninchen, Meerschweinchen und andere Kleintiere reagieren oft besonders sensibel auf neue Situationen. Eine Reiki-Anwendung berücksichtigt das mit einer ruhigen, zurückhaltenden Herangehensweise.",
    benefits: [
      "kann zu mehr Gelassenheit beitragen",
      "wird von vielen Tieren als angenehm empfunden",
      "kann zur Beruhigung beitragen"
    ],
    sections: [
      {
        heading: "Wie läuft eine Anwendung bei Kleintieren ab?",
        text: "Bei Kleintieren wird besonders viel Rücksicht auf Distanzbedürfnisse genommen. Häufig findet die Anwendung mit etwas Abstand im selben Raum statt, ganz ohne Zwang zu direktem Kontakt."
      },
      {
        heading: "Typische Anlässe bei Kleintieren",
        text: "Häufige Anlässe sind die Eingewöhnung in ein neues Zuhause, Veränderungen im Gehege oder in der Gruppenzusammensetzung sowie Unterstützung bei sichtlich verängstigten oder gestressten Tieren."
      },
      {
        heading: "Immer als Hausbesuch",
        text: "Anwendungen bei Kleintieren finden aus Rücksicht auf das Tier grundsätzlich bei Ihnen zu Hause statt. Details und Fahrkosten finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: animalDisclaimer,
    cta: defaultAnimalCta,
    relatedPaths: [
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki für Katzen", href: "/reiki-fuer-tiere/katzen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "fernbehandlung-schweiz",
    category: "tier",
    metaTitle: "Reiki-Fernbehandlung für Tiere Schweiz – Reiki Studio Petra In-Albon",
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
    disclaimer: animalDisclaimer,
    cta: defaultAnimalCta,
    relatedPaths: [
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
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
