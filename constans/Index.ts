export const sampleTips = [
  {
    id: "start",
    title: "START Csomag",
    available_tipps: 76,
    sum_tip_number: 239,
    rating: 4.9,
    winned_tip: 50,
    winned_unity: 150,
    front_description:
      "Az első lépés a siker felé! Egy biztos kezdőcsomag, amellyel stabil alapokat építhetsz sportfogadásodhoz. Duplázók és közepes oddsok a hét minden napján!",
    back_description:
      "Hétköznap: 2db duplázó (2-2,5x)\nHétvégén: 3db duplázó, 1db közepes odds (2,5-5x)",
    color: "#1c1f40",
    cover: "/images/Kaszadella_halal_starter_pack.png",
    video: "/videos/start-pack.mp4",
    price: 2990,
    accuracy: 68,
    stripePriceId: process.env.STRIPE_PRICE_ID_START!,
  },
  {
    id: "kasza",
    title: "KASZA Csomag",
    available_tipps: 9,
    sum_tip_number: 150,
    rating: 4.7,
    winned_tip: 78,
    winned_unity: 110,
    front_description:
      "Itt kezdődhet az igazi aratás! A hét folyamán duplázókkal és közepes oddsokkal segítünk, hétvégére pedig jönnek az extra nagy tippek!",
    back_description:
      "Hétköznap: 2db duplázó (2-2,5x)\nHétvégén: 3db duplázó, 3db közepes, 1db nagy tipp valamelyik napra",
    color: "#1c1f40",
    cover: "/images/Kaszadella_halal_casa_pack.png",
    video: "/videos/kasza-pack.mp4",
    price: 4990,
    accuracy: 59,
    stripePriceId: process.env.STRIPE_PRICE_ID_KASZA!,
  },
  {
    id: "kaszadella",
    title: "KASZADELLA Csomag",
    available_tipps: 7,
    sum_tip_number: 90,
    rating: 4.5,
    winned_tip: 60,
    winned_unity: 273,
    front_description:
      "A bajnokok csomagja! Kaszadella vezetésével most a legnagyobb nyeremények várnak rád. Duplázók, közepes oddsok és hatalmas tippek minden hétvégén!",
    back_description:
      "Hétköznap: 2db duplázó, 2db közepes odds, 3db nagy tipp / hét\nHétvégén: 6db duplázó, 3db közepes, 3db nagy tipp + 1 hétvégi nagy mix",
    color: "#1c1f40",
    cover: "/images/Kaszadella_halal_kaszadella_pack2.png",
    video: "/videos/kaszadella-pack.mp4",
    price: 7990,
    accuracy: 73,
    stripePriceId: process.env.STRIPE_PRICE_ID_KASZADELLA!,
  },
];
