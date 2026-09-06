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
        text: "Für Hunde und Katzen aus Kerzers und Umgebung richtet sich eine Anwendung ganz nach dem, was Ihr Tier zulassen möchte, bei Bedarf direkt bei Ihnen zu Hause."
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
      { label: "Reiki für Hunde", href: "/reiki-fuer-tiere/hunde" },
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
  {
    slug: "fribourg",
    category: "ort",
    metaTitle: "Reiki in Fribourg – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Fribourg: Studio in Gümmenen an der Kantonsgrenze oder Hausbesuch direkt in Fribourg.",
    h1: "Reiki in Fribourg",
    intro:
      "Gümmenen liegt an der Grenze der Kantone Bern und Freiburg – Fribourg ist von hier aus gut erreichbar. Für Menschen und Tiere aus Fribourg biete ich Anwendungen im Studio sowie Hausbesuche an.",
    sections: [
      {
        heading: "Reiki für Menschen in Fribourg",
        text: "Eine Reiki-Anwendung kann zur Entspannung beitragen und Körper und Geist neue Kraft schenken – als bewusste Auszeit im Alltag oder als ergänzende Begleitung in einer stressreicheren Lebensphase."
      },
      {
        heading: "Reiki für Hunde und Katzen in Fribourg",
        text: "Für Hunde und Katzen aus Fribourg und Umgebung richtet sich eine Anwendung ganz nach dem, was Ihr Tier zulassen möchte – im Studio oder bei Ihnen zu Hause."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Fribourg ist von Gümmenen aus in angenehmer Fahrdistanz erreichbar. Hausbesuche sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki in Köniz", href: "/reiki-in/koeniz" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "koeniz",
    category: "ort",
    metaTitle: "Reiki in Köniz – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Köniz: Studio in Gümmenen oder Hausbesuch direkt in Köniz.",
    h1: "Reiki in Köniz",
    intro:
      "Köniz grenzt an die Stadt Bern und liegt in guter Fahrdistanz zu meinem Studio in Gümmenen. Für Menschen und Tiere aus Köniz biete ich Anwendungen im Studio sowie Hausbesuche an.",
    sections: [
      {
        heading: "Reiki für Menschen in Köniz",
        text: "Reiki kann zur Entspannung beitragen und wird von vielen als wohltuend empfunden – ob als bewusste Auszeit im Alltag oder als ergänzende Begleitung in einer bewegten Lebensphase."
      },
      {
        heading: "Reiki für Hunde und Katzen in Köniz",
        text: "Für Hunde und Katzen aus Köniz und Umgebung biete ich Anwendungen an, die sich ganz nach dem Tempo Ihres Tieres richten – bei Ihnen zu Hause oder im Studio."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Köniz ist von Gümmenen aus gut erreichbar. Hausbesuche sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise."
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
    slug: "neuenegg",
    category: "ort",
    metaTitle: "Reiki in Neuenegg – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Neuenegg: Mein Studio in Gümmenen liegt gleich nebenan, Hausbesuche in Neuenegg sind ebenfalls möglich.",
    h1: "Reiki in Neuenegg",
    intro:
      "Neuenegg liegt in unmittelbarer Nachbarschaft zu Gümmenen. Für Menschen und Tiere aus Neuenegg sind sowohl Anwendungen in meinem Studio als auch Hausbesuche eine unkomplizierte Option.",
    sections: [
      {
        heading: "Reiki für Menschen in Neuenegg",
        text: "Von Neuenegg aus erreichen Sie mein Studio in Gümmenen in wenigen Minuten. Ein Hausbesuch in Neuenegg ist ebenso möglich, wenn Ihnen die gewohnte Umgebung wichtiger ist."
      },
      {
        heading: "Reiki für Hunde und Katzen in Neuenegg",
        text: "Für Hunde und Katzen aus Neuenegg biete ich Anwendungen an, die sich ganz nach dem Tempo Ihres Tieres richten – bei Ihnen zu Hause oder im Studio."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Aufgrund der Nähe zu Neuenegg ist die Anfahrt kurz. Hausbesuche sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki in Laupen", href: "/reiki-in/laupen" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "belp",
    category: "ort",
    metaTitle: "Reiki in Belp – Hausbesuche für Menschen & Tiere",
    metaDescription:
      "Reiki-Anwendungen für Menschen und Tiere in Belp: Studio in Gümmenen oder Hausbesuch direkt in Belp.",
    h1: "Reiki in Belp",
    intro:
      "Belp liegt südöstlich von Bern und ist von meinem Studio in Gümmenen aus gut erreichbar. Für Menschen und Tiere aus Belp biete ich Anwendungen im Studio sowie Hausbesuche an.",
    sections: [
      {
        heading: "Reiki für Menschen in Belp",
        text: "Reiki kann zur Entspannung beitragen und Körper und Geist neue Kraft schenken – ganz gleich, ob Sie Reiki bereits kennen oder zum ersten Mal ausprobieren möchten."
      },
      {
        heading: "Reiki für Hunde und Katzen in Belp",
        text: "Für Hunde und Katzen aus Belp und Umgebung richtet sich eine Anwendung ganz nach dem, was Ihr Tier zulassen möchte, bei Bedarf direkt bei Ihnen zu Hause."
      },
      {
        heading: "Anfahrt und Hausbesuche",
        text: "Belp ist von Gümmenen aus in angenehmer Fahrdistanz erreichbar. Hausbesuche sind gegen Fahrkosten möglich, Details dazu finden Sie auf der Seite Ablauf und Preise."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki für Tiere", href: "/reiki-fuer-tiere" },
      { label: "Reiki in Köniz", href: "/reiki-in/koeniz" },
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
    slug: "kinder",
    category: "mensch-thema",
    metaTitle: "Reiki für Kinder – Reiki Studio Petra In-Albon",
    metaDescription:
      "Reiki für Kinder in Gümmenen im Raum Bern: sanft, spielerisch erklärt und ganz freiwillig. Jetzt mehr erfahren.",
    h1: "Reiki für Kinder",
    intro:
      "Auch Kinder können von einer ruhigen, achtsamen Auszeit profitieren – etwa bei innerer Unruhe, in aufregenden Lebensphasen oder einfach als besondere gemeinsame Zeit. Eine Anwendung wird kindgerecht erklärt und findet ganz freiwillig statt.",
    benefits: [
      "kann zur Entspannung beitragen",
      "gibt neue Energie",
      "unterstützt das allgemeine Wohlbefinden",
      "wird von vielen als schlaffördernd empfunden"
    ],
    sections: [
      {
        heading: "Wie läuft eine Anwendung bei Kindern ab?",
        text: "Vor der Anwendung wird kindgerecht erklärt, was passiert. Ihr Kind bleibt vollständig bekleidet und entscheidet jederzeit selbst mit, wie viel es zulassen möchte. Ein Elternteil ist herzlich willkommen, dabei zu bleiben."
      },
      {
        heading: "Für welches Alter geeignet?",
        text: "Grundsätzlich für Kinder jeden Alters geeignet – von der Bereitschaft des Kindes hängt ab, wie die Anwendung im Detail gestaltet wird. Bei Unsicherheit sprechen Sie mich gerne im Vorgespräch darauf an."
      },
      {
        heading: "Ablauf und Vorgespräch",
        text: "Im kurzen Vorgespräch mit den Eltern klären wir Anlass und Erwartungen. Details zum allgemeinen Ablauf finden Sie auf der Seite Reiki für Menschen."
      }
    ],
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "genesungsphase",
    category: "mensch-thema",
    metaTitle: "Reiki als Begleitung während einer Genesungsphase – Reiki Studio Petra In-Albon",
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
    disclaimer:
      "Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend empfunden. Es ersetzt jedoch keine ärztliche Behandlung, Diagnose oder Therapie und ist ausschliesslich als ergänzendes Angebot zu verstehen.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei chronischer Erschöpfung", href: "/reiki-fuer-menschen/chronische-erschoepfung" },
      { label: "Reiki für pflegende Angehörige", href: "/reiki-fuer-menschen/pflegende-angehoerige" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "pflegende-angehoerige",
    category: "mensch-thema",
    metaTitle: "Reiki für pflegende Angehörige – Reiki Studio Petra In-Albon",
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
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei chronischer Erschöpfung", href: "/reiki-fuer-menschen/chronische-erschoepfung" },
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "chronische-erschoepfung",
    category: "mensch-thema",
    metaTitle: "Reiki bei chronischer Erschöpfung – Reiki Studio Petra In-Albon",
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
    disclaimer:
      "Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend empfunden. Es ersetzt jedoch keine ärztliche Abklärung oder Behandlung und ist als ergänzendes Angebot zu verstehen.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki für pflegende Angehörige", href: "/reiki-fuer-menschen/pflegende-angehoerige" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "lebensveraenderungen",
    category: "mensch-thema",
    metaTitle: "Reiki in Zeiten der Veränderung – Reiki Studio Petra In-Albon",
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
    disclaimer: humanDisclaimer,
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "trauerbegleitung",
    category: "mensch-thema",
    metaTitle: "Reiki als Begleitung in Zeiten der Trauer – Reiki Studio Petra In-Albon",
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
    disclaimer:
      "Reiki kann zur Entspannung beitragen und einen ruhigen Raum zum Innehalten bieten. Es ersetzt jedoch keine Trauerbegleitung, Psychotherapie oder ärztliche Behandlung.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki in Zeiten der Veränderung", href: "/reiki-fuer-menschen/lebensveraenderungen" },
      { label: "Reiki bei innerer Unruhe", href: "/reiki-fuer-menschen/innere-unruhe" },
      { label: "Ablauf und Preise", href: "/ablauf-preise" }
    ]
  },
  {
    slug: "burnout-vorbeugung",
    category: "mensch-thema",
    metaTitle: "Reiki zur Burnout-Vorbeugung – Reiki Studio Petra In-Albon",
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
    disclaimer:
      "Reiki kann als vorbeugender, entspannungsfördernder Ausgleich dienen. Es ersetzt keine ärztliche oder psychotherapeutische Behandlung und ist nicht zur Behandlung eines bestehenden Burnouts oder anderer psychischer Erkrankungen gedacht.",
    cta: defaultCta,
    relatedPaths: [
      { label: "Reiki für Menschen", href: "/reiki-fuer-menschen" },
      { label: "Reiki bei Stress", href: "/reiki-fuer-menschen/stress" },
      { label: "Reiki bei chronischer Erschöpfung", href: "/reiki-fuer-menschen/chronische-erschoepfung" },
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
      { label: "Reiki-Fernbehandlung für Tiere Schweiz", href: "/reiki-fuer-tiere/fernbehandlung-schweiz" },
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
