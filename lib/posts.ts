// Blog posts. Short, genuinely useful guides that double as SEO entry points
// (cake sizing, choosing a wedding cake…). Bilingual; body is an array of
// paragraphs. Cover images reuse the product shots.

export type Post = {
  slug: string;
  date: string; // ISO
  cover: string;
  cs: { title: string; excerpt: string; body: string[] };
  en: { title: string; excerpt: string; body: string[] };
};

export const posts: Post[] = [
  {
    slug: "kolik-porci-dortu",
    date: "2026-05-20",
    cover: "/photos/cakes/06-birthday-exterior.webp",
    cs: {
      title: "Kolik porcí dortu potřebuji?",
      excerpt: "Rychlý odhad velikosti dortu podle počtu hostů, ať neobjednáš málo (ani zbytečně moc).",
      body: [
        "Nejčastější otázka před objednávkou je velikost. Dobré pravidlo: počítej jednu porci na hosta, u dezertního stolu s víc sladkostmi klidně o trochu míň.",
        "Malý dort (6–8 porcí) je akorát na rodinnou oslavu. Střední (10–15 porcí) pokryje běžné narozeniny. Na větší akce nebo svatbu se hodí velký dort (20–30 porcí) nebo patrový.",
        "Když si nejsi jistý, napiš mi počet hostů a typ akce, a velikost ti doporučím. Radši přidám malý rezervní zákusek než aby někdo zůstal o hladu.",
      ],
    },
    en: {
      title: "How many cake servings do I need?",
      excerpt: "A quick way to size your cake by guest count, so you don't under-order (or over-order).",
      body: [
        "The most common question before ordering is size. A good rule: one serving per guest, slightly fewer if there's a dessert table with other sweets.",
        "A small cake (6–8 servings) suits a family celebration. Medium (10–15) covers a typical birthday. For bigger events or a wedding, go for a large cake (20–30) or a tiered one.",
        "If you're unsure, send me your guest count and the type of event and I'll recommend a size. I'd rather add a small backup dessert than leave anyone hungry.",
      ],
    },
  },
  {
    slug: "dort-na-svatbu",
    date: "2026-06-02",
    cover: "/photos/cakes/07-wedding-exterior.webp",
    cs: {
      title: "Jak vybrat dort na svatbu",
      excerpt: "Patra, chuť, květiny i frgály pro hosty, na co myslet, aby dort sedl k vašemu dni.",
      body: [
        "Svatební dort je hlavní hvězda sladkého stolu, ale nemusí vás stresovat. Začněte stylem svatby, podle něj se odvíjí barvy, květiny i tvar.",
        "Lehký korpus (třeba citronový nebo ovocný) je v létě vděčnější než těžká čokoláda. Patra volte podle počtu hostů, klidně doplňte mini zákusky a tradiční frgály, ať si každý najde to své.",
        "Nemusíte mít jasnou vizi, stačí pár oblíbených chutí a fotka stylu. Návrh vždycky pošlu k odsouhlasení, takže žádné překvapení v den D.",
      ],
    },
    en: {
      title: "How to choose a wedding cake",
      excerpt: "Tiers, flavour, flowers and frgály for guests, what to think about so the cake fits your day.",
      body: [
        "The wedding cake is the star of the sweet table, but it doesn't have to stress you out. Start with the style of the wedding, that drives the colours, flowers and shape.",
        "A light sponge (lemon or fruit) is friendlier in summer than heavy chocolate. Choose tiers by guest count, and feel free to add mini desserts and traditional frgály so everyone finds their favourite.",
        "You don't need a clear vision, a few favourite flavours and a style photo are enough. I always send the design for approval, so there's no surprise on the big day.",
      ],
    },
  },
];

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));
