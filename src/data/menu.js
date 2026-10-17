// ============================================================
// BYTEBREW — Data menu
// Ganti isi array `ITEMS` di bawah dengan katalog asli.
// ============================================================

export const CATEGORIES = [
  {
    id: "signature",
    label: "Kopi Panas",
    note: "Disiapkan setelah pesanan diterima.",
  },
  {
    id: "cold",
    label: "Cold Brew",
    note: "Direndam selama 18 jam dan disajikan dingin dengan rasa seimbang.",
  },
  {
    id: "notcoffee",
    label: "Non-Kopi",
    note: "Pilihan minuman tanpa kopi.",
  },
];

export const ITEMS = [
  // --- Kopi Panas ---
  {
    id: "espresso",
    name: "Espresso",
    category: "signature",
    desc: "Dua shot espresso dibuat dari 18 gram biji kopi dan menghasilkan 40 gram espresso. Disajikan dengan satu biskuit.",
    notes: ["Cokelat pekat", "Garam laut"],
    price: 22,
    tag: null,
    img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "single-origin",
    name: "Single Origin",
    category: "signature",
    desc: "Kopi dari satu kebun di Sumatra dengan cita rasa cokelat gelap dan manis alami.",
    notes: ["Cokelat gelap", "Manis alami"],
    price: 28,
    tag: "Paling laris",
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "flat-white",
    name: "Flat White",
    category: "signature",
    desc: "Espresso dengan 180 ml susu bertekstur lembut untuk rasa yang seimbang.",
    notes: ["Busa tebal", "Manis lembut"],
    price: 32,
    tag: null,
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cortado",
    name: "Cortado",
    category: "signature",
    desc: "Espresso dengan susu oat dalam takaran seimbang, disajikan dalam ukuran kecil.",
    notes: ["Seimbang", "Susu oat"],
    price: 30,
    tag: null,
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
  },

  // --- Cold Brew ---
  {
    id: "cold-brew",
    name: "Cold Brew",
    category: "cold",
    desc: "Biji kopi giling kasar direndam selama 18 jam dan disajikan dengan es. Rasa manisnya berasal dari karakter alami biji kopi.",
    notes: ["Pekat", "Lembut"],
    price: 35,
    tag: "Paling laris",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "vanilla-cold-brew",
    name: "Vanilla Cold Brew",
    category: "cold",
    desc: "Cold brew dengan sirup vanila Madagaskar, bercita rasa manis dan beraroma lembut.",
    notes: ["Vanila", "Wangi"],
    price: 38,
    tag: null,
    img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "orange-cold-brew",
    name: "Orange Cold Brew",
    category: "cold",
    desc: "Cold brew dengan kulit jeruk dan tonic, bercita rasa segar dengan sedikit sentuhan asam.",
    notes: ["Jeruk", "Segar"],
    price: 40,
    tag: "Baru",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
  },

  // --- Non-Kopi ---
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    category: "notcoffee",
    desc: "Bubuk matcha pilihan dari Uji yang dikocok bersama susu oat.",
    notes: ["Tidak pahit", "Aroma herbal"],
    price: 38,
    tag: null,
    img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    category: "notcoffee",
    desc: "Cokelat dengan kandungan kakao 70%, sedikit garam laut, dan susu hangat.",
    notes: ["Kental", "Garam laut"],
    price: 34,
    tag: null,
    img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "jasmine-tea",
    name: "Jasmine Tea",
    category: "notcoffee",
    desc: "Teh hijau melati dengan irisan yuzu dan madu.",
    notes: ["Melati", "Yuzu"],
    price: 30,
    tag: null,
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    category: "notcoffee",
    desc: "Susu dengan cardamom dan campuran rempah racikan Bytebrew.",
    notes: ["Cardamom", "Hangat"],
    price: 36,
    tag: null,
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80",
  },
];

export const FEATURED_IDS = ["single-origin", "cold-brew", "flat-white", "matcha-latte"];

export function getByCategory(id) {
  return ITEMS.filter((i) => i.category === id);
}

export function formatPrice(n) {
  return `Rp${n}k`;
}

export const INFO = {
  name: "BYTEBREW",
  tagline: "Kopi berkualitas, di-roast setiap hari.",
  address: "Jl. Senopati No. 12, Jakarta Selatan",
  mapsQuery: "Senopati Jakarta Selatan",
  hours: [
    { day: "Senin – Jumat", time: "07:00 – 22:00" },
    { day: "Sabtu", time: "08:00 – 23:00" },
    { day: "Minggu", time: "08:00 – 21:00" },
  ],
  email: "halo@bytebrew.id",
  phone: "+62 811 0000 777",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
};
