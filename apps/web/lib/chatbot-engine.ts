export interface BotMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  showWhatsappButton?: boolean;
  whatsappMessage?: string;
  chips?: string[];
}

export interface FAQItem {
  id: number;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
  chips?: string[];
  suggestWhatsapp?: boolean;
}

export const KNOWLEDGE_BASE_100: FAQItem[] = [
  // ── 1. POIVRES RARES & BAIES SAUVAGES (1 to 15) ──
  {
    id: 1,
    category: "Poivres Rares",
    keywords: ["kampot", "rouge kampot", "cambodge", "poivre rouge"],
    question: "Qu'est-ce que le Poivre Rouge de Kampot IGP ?",
    answer: "Le Poivre Rouge de Kampot IGP est un grand cru récolté à pleine maturité grain par grain au Cambodge. Il offre des arômes exceptionnels de fruits confits, d'agrumes et de résine, avec une chaleur douce et élégante.",
    chips: ["Comment l'utiliser ?", "Et le poivre sauvage ?", "Commander le Poivre de Kampot"],
  },
  {
    id: 2,
    category: "Poivres Rares",
    keywords: ["difference poivre", "couleur poivre", "noir blanc vert rouge", "types de poivre"],
    question: "Quelle est la différence entre poivre noir, blanc, vert et rouge ?",
    answer: "C'est le même fruit (Piper nigrum) récolté à différents stades : le vert est jeune et frais, le noir est séché au soleil, le rouge est récolté à pleine maturité, et le blanc est le cœur du grain débarrassé de son péricarpe.",
    chips: ["Quel poivre pour la viande ?", "Quel poivre pour le poisson ?"],
  },
  {
    id: 3,
    category: "Poivres Rares",
    keywords: ["voatsiperifery", "poivre sauvage", "madagascar"],
    question: "Qu'est-ce que le Poivre Sauvage Voatsiperifery de Madagascar ?",
    answer: "C'est une liane sauvage rare qui grimpe jusqu'à 20 mètres dans la canopée des forêts malgaches. Récolté à la main, il dégage des notes boisées, florales et légèrement terreuses qui subliment viandes et chocolat.",
    chips: ["Conseils pour le chocolat", "Origines Madagascar", "Commander"],
  },
  {
    id: 4,
    category: "Poivres Rares",
    keywords: ["timut", "baie timut", "nepal", "agrume", "pamplemousse"],
    question: "Comment utiliser les Baies de Timut du Népal ?",
    answer: "La baie de Timut n'est pas un vrai poivre mais une baie aux notes intenses de pamplemousse rose et de yuzu. Elle est fabuleuse sur les poissons, noix de Saint-Jacques, ceviches et desserts aux fruits.",
    chips: ["Idées pour le poisson", "Code promo -10%", "Frais de livraison"],
  },
  {
    id: 5,
    category: "Poivres Rares",
    keywords: ["baies roses", "baie rose", "poivre rose"],
    question: "Qu'est-ce que les Baies Roses et avec quoi les marier ?",
    answer: "Les baies roses apportent une touche sucrée, résineuse et légèrement anisée sans piquant agressif. Elles subliment les carpaccios de poisson, le fromage de chèvre et les marinades.",
    chips: ["Fleur de sel aux baies roses", "Idée pour fromage de chèvre"],
  },
  {
    id: 6,
    category: "Poivres Rares",
    keywords: ["sichuan", "poivre sichuan", "engourdissement", "chine"],
    question: "Quelle est la particularité du Poivre de Sichuan ?",
    answer: "Le poivre de Sichuan procure une sensation unique de picotement rafraîchissant (effet anesthésiant doux) et des arômes boisés citronnés, indispensables pour les woks et canards laqués.",
    chips: ["Recettes asiatiques", "Nos mélanges"],
  },
  {
    id: 7,
    category: "Poivres Rares",
    keywords: ["penja", "poivre penja", "cameroun"],
    question: "Qu'est-ce que le Poivre de Penja ?",
    answer: "Cultivé sur des terres volcaniques au Cameroun (première IGP d'Afrique), le Poivre de Penja possède un terroir puissant, musqué et animal qui s'accorde divinement avec le gibier et les viandes maturées.",
    chips: ["Quel poivre pour côte de bœuf ?", "Nos origines"],
  },
  {
    id: 8,
    category: "Poivres Rares",
    keywords: ["pourquoi moudre", "moudre dernier moment", "poivre moulu"],
    question: "Pourquoi moudre son poivre au dernier moment ?",
    answer: "Les huiles essentielles volatiles du poivre s'évaporent en quelques heures après mouture. Moudre à la minute garantit 100% de la richesse aromatique et de la fraîcheur du grain.",
    chips: ["Mortier ou moulin ?", "Torréfaction du poivre"],
  },
  {
    id: 9,
    category: "Poivres Rares",
    keywords: ["mortier", "moulin", "concasser", "mouture"],
    question: "Faut-il utiliser un moulin ou un mortier ?",
    answer: "Le mortier en granit est idéal pour un concassage grossier qui préserve les facettes aromatiques pour les grillades. Le moulin à meule céramique permet une mouture fine et homogène pour les sauces.",
    chips: ["Quelle épice pour la viande ?", "Guide de conservation"],
  },
  {
    id: 10,
    category: "Poivres Rares",
    keywords: ["cuire poivre", "bruler poivre", "temperature poivre"],
    question: "Pourquoi ne faut-il pas cuire le poivre à haute température ?",
    answer: "La chaleur excessive brûle la pipérine et détruit les arômes subtils en développant une amertume désagréable. Ajoutez toujours le poivre en toute fin de cuisson ou dans l'assiette.",
    chips: ["Secrets de chefs", "Recette de curry"],
  },
  {
    id: 11,
    category: "Poivres Rares",
    keywords: ["torrefaction", "torrefier", "chauffer grain"],
    question: "Qu'est-ce que la torréfaction des grains de poivre ?",
    answer: "Faire chauffer les grains entiers à sec dans une poêle chaude pendant 45 secondes réveille les huiles essentielles et développe de surprenantes notes fumées et boisées.",
    chips: ["Comment doser ?", "Conseils de cuisine"],
  },
  {
    id: 12,
    category: "Poivres Rares",
    keywords: ["plus piquant", "poivre fort", "piquant"],
    question: "Quel est le poivre le plus piquant de votre sélection ?",
    answer: "Le Poivre Noir de Kampot et le Poivre de Penja Noir sont les plus corsés et vigoureux en pipérine, parfaits pour les amateurs de sensations franches.",
    chips: ["Poivres plus doux", "Mélanges d'épices"],
  },
  {
    id: 13,
    category: "Poivres Rares",
    keywords: ["plus fruite", "poivre doux", "aromatique"],
    question: "Quel est le poivre le plus fruité ou aromatique ?",
    answer: "Le Poivre Rouge de Kampot (notes de fruits rouges confits) et les Baies de Timut (notes éclatantes de pamplemousse) sont nos sélections les plus fruitées et gourmandes.",
    chips: ["Commander le Poivre Rouge", "Baies de Timut"],
  },
  {
    id: 14,
    category: "Poivres Rares",
    keywords: ["viande rouge", "cote de boeuf", "entrecote poivre"],
    question: "Quel poivre choisir pour une viande rouge ou côte de bœuf ?",
    answer: "Le Poivre Rouge de Kampot IGP concassé grossièrement ou le Poivre Sauvage Voatsiperifery. Leur complexité boisée sublime le gras noble de la viande.",
    chips: ["Fleur de sel", "Mélange Festif Bio", "Commander"],
  },
  {
    id: 15,
    category: "Poivres Rares",
    keywords: ["poisson poivre", "poisson blanc poivre", "carpaccio poivre"],
    question: "Quel poivre choisir pour un poisson blanc ou carpaccio ?",
    answer: "Les Baies de Timut Sauvages ou la Fleur de Sel aux Baies Roses. Elles apportent fraîcheur et peps sans jamais masquer la finesse de la chair.",
    chips: ["Voir les sels", "Conseils cuisine"],
  },

  // ── 2. MÉLANGES D'ÉPICES & MASALAS (16 to 30) ──
  {
    id: 16,
    category: "Mélanges d'Épices",
    keywords: ["curry madras", "curry royal", "composition curry"],
    question: "Quelle est la composition de votre Curry Royal de Madras ?",
    answer: "Notre Curry Royal marie curcuma de terroir, coriandre, cumin noble, fenugrec, cardamome, gingembre et une pointe de piment doux. Un équilibre parfait entre parfum chaleureux et douceur.",
    chips: ["Recette curry de poulet", "Commander le curry", "Code promo -10%"],
  },
  {
    id: 17,
    category: "Mélanges d'Épices",
    keywords: ["garam masala", "masala indien", "comment utiliser garam"],
    question: "Qu'est-ce que le Garam Masala et comment l'utiliser ?",
    answer: "Le Garam Masala (« mélange chaud » en hindi) réunit cannelle, cardamome, girofle, cumin et poivre noir torréfiés. Il s'ajoute en fin de cuisson (dernières 5 minutes) pour parfumer sans cuire les arômes.",
    chips: ["Différence avec le curry", "Mélanges d'épices"],
  },
  {
    id: 18,
    category: "Mélanges d'Épices",
    keywords: ["festif bio", "melange festif", "epices festives"],
    question: "Qu'est-ce que le Mélange d'Épices Festives Bio ?",
    answer: "C'est notre assemblage signature exclusif associant baies nobles, paprika doux, herbes sauvages et épices douces. Idéal pour frotter les rôtis, volailles de fête et légumes au four.",
    chips: ["Commander le mélange festif", "Idée recette"],
  },
  {
    id: 19,
    category: "Mélanges d'Épices",
    keywords: ["curry doux fort", "curry piquant", "difference curry"],
    question: "Quelle est la différence entre curry doux et fort ?",
    answer: "La différence réside dans la proportion de piment rouge et de gingembre. Notre Curry de Madras privilégie la complexité aromatique et l'onctuosité plutôt que la brûlure.",
    chips: ["Comment adoucir un plat ?", "Nos mélanges"],
  },
  {
    id: 20,
    category: "Mélanges d'Épices",
    keywords: ["ras el hanout", "couscous", "tajine epice"],
    question: "Qu'est-ce que le Ras el Hanout ?",
    answer: "Signifiant « la tête de la boutique » en arabe, c'est le joyau de la cuisine maghrébine mêlant jusqu'à 15 épices (rose de Damas, cannelle, curcuma, cardamome, muscade...). Parfait pour tajines et couscous.",
    chips: ["Idée tajine", "Tous nos mélanges"],
  },
  {
    id: 21,
    category: "Mélanges d'Épices",
    keywords: ["tandoori", "poulet tandoori", "marinade tandoori"],
    question: "Comment utiliser le mélange Tandoori pour mariner le poulet ?",
    answer: "Mélangez 2 cuillères à soupe d'épices Tandoori avec un yaourt nature crémeux, un filet de jus de citron et un peu d'ail. Laissez mariner vos morceaux de poulet au frais 2h avant d'enfourner à 200°C.",
    chips: ["Commander le tandoori", "Code promo"],
  },
  {
    id: 22,
    category: "Mélanges d'Épices",
    keywords: ["zaatar", "za'atar", "thym libanais", "huile olive zaatar"],
    question: "Qu'est-ce que le Zaatar et comment le déguster ?",
    answer: "C'est un mélange traditionnel du Levant à base de thym sauvage, sésame grillé et sumac acidulé. Dégustez-le simplement trempé dans une bonne huile d'olive avec du pain chaud ou sur du fromage frais.",
    chips: ["Origines", "Nos aromates"],
  },
  {
    id: 23,
    category: "Mélanges d'Épices",
    keywords: ["curry legume", "recette vegetarienne", "curry maison"],
    question: "Comment réussir un curry de légumes maison ?",
    answer: "Faites revenir 1 oignon et 1 cuillère d'épices Curry dans de l'huile 1 min. Ajoutez vos légumes (patates douces, pois chiches, épinards), mouillez avec du lait de coco et laissez mijoter 20 min à feu doux.",
    chips: ["Commander le Curry de Madras", "Frais de port"],
  },
  {
    id: 24,
    category: "Mélanges d'Épices",
    keywords: ["tadka", "torrefaction huile", "infusion huile epices"],
    question: "Pourquoi faire revenir les épices dans de l'huile chaude (Tadka) ?",
    answer: "La majorité des molécules aromatiques des épices sont liposolubles (solubles dans le gras). Les chauffer 30 secondes dans l'huile chaude débloque leurs saveurs et les diffuse dans tout le plat.",
    chips: ["Secrets de chefs", "Nos poivres"],
  },
  {
    id: 25,
    category: "Mélanges d'Épices",
    keywords: ["sel ajoute", "sucre ajoute", "sans sel"],
    question: "Vos mélanges contiennent-ils du sel ou du sucre ajouté ?",
    answer: "Non ! Chez Les Épices de Sulson, nos mélanges sont 100% constitués de véritables épices et aromates purs, sans sel de remplissage, sans sucre et sans glutamate.",
    chips: ["Qualité et pureté", "Tous nos produits"],
  },
  {
    id: 26,
    category: "Mélanges d'Épices",
    keywords: ["sans gluten", "allergene", "allergie"],
    question: "Vos mélanges sont-ils sans gluten et sans allergènes ?",
    answer: "Nos épices pures et mélanges sont naturellement sans gluten. Ils sont préparés et conditionnés dans un atelier dédié respectant des normes d'hygiène rigoureuses.",
    chips: ["Certifications", "Service client WhatsApp"],
  },
  {
    id: 27,
    category: "Mélanges d'Épices",
    keywords: ["legumes rotis", "legume four epice", "butternut epice"],
    question: "Quel mélange choisir pour assaisonner des légumes rôtis ?",
    answer: "Notre Mélange Festif Bio ou une combinaison Curcuma + Baies de Timut avec un filet d'huile d'olive. Idéal sur courges butternut, carottes, patates douces et choux-fleurs.",
    chips: ["Commander", "Idées recettes"],
  },
  {
    id: 28,
    category: "Mélanges d'Épices",
    keywords: ["soupe epice", "veloute epice", "potiron epice"],
    question: "Quelle épice utiliser pour une soupe ou un velouté ?",
    answer: "Une pointe de Curry Royal de Madras ou de Gingembre moulu dans un velouté de potimarron, ou une pincée de Fleur de Sel aux Baies Roses au moment de servir.",
    chips: ["Voir les sels", "Commander"],
  },
  {
    id: 29,
    category: "Mélanges d'Épices",
    keywords: ["barbecue", "grillade ete", "rub marinade"],
    question: "Quel mélange utiliser pour un barbecue estival ?",
    answer: "Frottez vos viandes ou brochettes avec notre Mélange Festif Bio ou préparez une marinade huile d'olive + Poivre de Kampot concassé + Fleur de Sel aux Baies Roses.",
    chips: ["Voir les poivres", "Livraison offerte dès 50€"],
  },
  {
    id: 30,
    category: "Mélanges d'Épices",
    keywords: ["doser epices", "combien epices", "quantite epice"],
    question: "Comment doser les épices sans trop piquer ?",
    answer: "Commencez toujours par 1 cuillère à café rase pour 4 personnes. Goûtez en cours de cuisson et ajustez progressivement. Il est plus facile d'en rajouter que d'en enlever !",
    chips: ["Rattraper un plat trop piquant", "Conseils chefs"],
  },

  // ── 3. VANILLES D'EXCEPTION & CANNELLES (31 to 42) ──
  {
    id: 31,
    category: "Vanille & Douceurs",
    keywords: ["vanille bourbon", "madagascar vanille", "sambava"],
    question: "D'où viennent vos gousses de Vanille Bourbon Gourmet ?",
    answer: "Nos gousses proviennent directement de Sambava dans la région de la SAVA à Madagascar. Elles sont affinées traditionnellement au soleil pendant plusieurs mois pour développer un parfum riche et vanillé incomparable.",
    chips: ["Comment l'utiliser ?", "Commander la vanille", "Code promo"],
  },
  {
    id: 32,
    category: "Vanille & Douceurs",
    keywords: ["reconnaitre bonne vanille", "qualite vanille", "gousse souple"],
    question: "Comment reconnaître une gousse de vanille de haute qualité ?",
    answer: "Une vanille de qualité gourmet doit être noire, luisante, charnue et tellement souple que vous pouvez faire un nœud sans qu'elle ne casse. Elle ne doit jamais être sèche ni cassante.",
    chips: ["Conseils conservation vanille", "Commander"],
  },
  {
    id: 33,
    category: "Vanille & Douceurs",
    keywords: ["gratter vanille", "fendre gousse", "recuperer grains"],
    question: "Comment bien fendre et gratter une gousse de vanille ?",
    answer: "Aplatissez la gousse avec le dos de la lame. Fendez-la en deux dans la longueur avec la pointe d'un couteau, puis raclez fermement l'intérieur de haut en bas pour extraire la précieuse pulpe noire.",
    chips: ["Recycler la gousse", "Idée dessert"],
  },
  {
    id: 34,
    category: "Vanille & Douceurs",
    keywords: ["gousse utilisee", "recycler gousse", "zero dechet vanille"],
    question: "Que faire des gousses de vanille déjà utilisées ?",
    answer: "Ne les jetez jamais ! Rincez-les, séchez-les et glissez-les dans votre bocal de sucre, ou mixez-les une fois bien sèches pour obtenir une poudre de vanille 100% naturelle.",
    chips: ["Faire son sucre vanillé", "Commander des gousses"],
  },
  {
    id: 35,
    category: "Vanille & Douceurs",
    keywords: ["sucre vanille maison", "faire sucre vanille"],
    question: "Comment faire son propre sucre vanillé maison ?",
    answer: "Remplissez un bocal hermétique de 500g de sucre de canne non raffiné et insérez 2 gousses de vanille fendues ou épuisées. Laissez infuser 2 semaines en secouant de temps en temps.",
    chips: ["Extrait de vanille", "Idée pâtisserie"],
  },
  {
    id: 36,
    category: "Vanille & Douceurs",
    keywords: ["extrait vanille", "rhum arrange", "infusion alcool vanille"],
    question: "Comment faire un extrait de vanille ou du rhum arrangé ?",
    answer: "Fendez 5 gousses de vanille en deux et plongez-les dans une bouteille de rhum blanc ou de vodka neutre. Laissez macérer à l'abri de la lumière pendant 2 à 3 mois en remuant régulièrement.",
    chips: ["Commander nos gousses", "Frais de port"],
  },
  {
    id: 37,
    category: "Vanille & Douceurs",
    keywords: ["conserver vanille", "stocker gousse", "tube hermetique"],
    question: "Comment conserver ses gousses de vanille ?",
    answer: "Conservez-les dans leur tube hermétique en verre, bien serrées, à l'abri de la lumière et de la chaleur ambiante (15-20°C). Ne les mettez JAMAIS au réfrigérateur car le froid assèche la vanille et crée des moisissures.",
    chips: ["Durée de conservation", "Voir la vanille"],
  },
  {
    id: 38,
    category: "Vanille & Douceurs",
    keywords: ["cannelle ceylan", "difference cannelle", "cannelle cassia"],
    question: "Quelle est la différence entre cannelle de Ceylan et cannelle Cassia ?",
    answer: "La cannelle de Ceylan (Sri Lanka) est la « vraie » cannelle noble : bâtons feuilletés friables, arôme doux et raffiné sans amertume, et surtout très faible teneur en coumarine (inoffensive pour le foie).",
    chips: ["Bienfaits santé", "Commander la cannelle"],
  },
  {
    id: 39,
    category: "Vanille & Douceurs",
    keywords: ["coumarine", "sante cannelle", "foie cannelle"],
    question: "Pourquoi la cannelle de Ceylan est-elle meilleure pour la santé ?",
    answer: "Contrairement à la cannelle Cassia de supermarché qui contient beaucoup de coumarine toxique pour le foie en usage régulier, la cannelle de Ceylan Sulson n'en contient que des traces infimes et est 100% sécuritaire au quotidien.",
    chips: ["Commander la Cannelle Bio", "Code promo"],
  },
  {
    id: 40,
    category: "Vanille & Douceurs",
    keywords: ["baton cannelle", "comment utiliser baton", "infuser cannelle"],
    question: "Comment utiliser la cannelle en bâton ?",
    answer: "Plongez un demi-bâton dans vos tisanes, vins chauds, compotes de pommes ou plats mijotés orientaux (tajines, ragoûts). Retirez le bâton avant de servir.",
    chips: ["Idée dessert", "Tous nos aromates"],
  },
  {
    id: 41,
    category: "Vanille & Douceurs",
    keywords: ["vanille plat sale", "saint jacques vanille", "volaille vanille"],
    question: "Peut-on utiliser la vanille dans des plats salés ?",
    answer: "Absolument ! La vanille Bourbon est spectaculaire dans une sauce crémée pour accompagner des noix de Saint-Jacques poêlées, du cabillaud, du homard ou un suprême de volaille.",
    chips: ["Commander la Vanille Bourbon", "Idées recettes"],
  },
  {
    id: 42,
    category: "Vanille & Douceurs",
    keywords: ["duree vanille", "peremption vanille", "combien temps vanille"],
    question: "Combien de temps peut-on conserver des gousses de vanille ?",
    answer: "Dans leur tube hermétique à température ambiante, nos gousses de vanille conservent tout leur moelleux et leurs arômes pendant 2 à 3 ans.",
    chips: ["Voir la boutique", "Frais de livraison"],
  },

  // ── 4. SELS & CONDIMENTS (43 to 50) ──
  {
    id: 43,
    category: "Sels & Condiments",
    keywords: ["fleur de sel", "baies roses sel", "guerande"],
    question: "D'où provient votre Fleur de Sel aux Baies Roses ?",
    answer: "Notre fleur de sel est récoltée à la main de manière artisanale sur les marais salants de Guérande en France, puis délicatement assemblée avec des baies roses concassées pour un croquant parfumé.",
    chips: ["Comment l'utiliser ?", "Commander le sel", "Nos origines"],
  },
  {
    id: 44,
    category: "Sels & Condiments",
    keywords: ["difference fleur de sel", "sel fin", "sel de table"],
    question: "Quelle est la différence entre fleur de sel et sel fin ?",
    answer: "La fleur de sel se forme à la surface de l'eau sous l'effet du vent et du soleil. Elle est naturellement riche en minéraux, non raffinée, croustillante et fond délicatement sur la langue.",
    chips: ["Voir les sels", "Conseils cuisine"],
  },
  {
    id: 45,
    category: "Sels & Condiments",
    keywords: ["sel fume", "bois hetre", "fumee sel"],
    question: "Comment utiliser le sel fumé au bois de hêtre ?",
    answer: "Le sel fumé apporte une saveur authentique de feu de bois sans aucun arôme artificiel. Il est sensationnel sur des œufs au plat, des pommes de terre au four, du tofu ou des viandes grillées.",
    chips: ["Idée barbecue", "Commander"],
  },
  {
    id: 46,
    category: "Sels & Condiments",
    keywords: ["quand saler", "dressage sel", "cuisson sel"],
    question: "Pourquoi mettre la fleur de sel au moment du dressage ?",
    answer: "La fleur de sel est un sel de finition : si vous la mettez pendant la cuisson, ses cristaux fondent et perdent leur texture croquante. Saupoudrez-la au dernier moment pour une explosion en bouche.",
    chips: ["Poivres rares", "Secrets de chefs"],
  },
  {
    id: 47,
    category: "Sels & Condiments",
    keywords: ["sel rose himalaya", "sel rose bienfaits"],
    question: "Qu'est-ce que le sel rose de l'Himalaya ?",
    answer: "C'est un sel gemme fossile pur issu de roches millénaires, non pollué par les océans modernes et riche en fer (qui lui donne sa teinte rose). Il a un goût minéral très doux.",
    chips: ["Nos condiments", "Tous les produits"],
  },
  {
    id: 48,
    category: "Sels & Condiments",
    keywords: ["vinaigrette", "assaisonnement salade", "sel salade"],
    question: "Quel sel utiliser pour assaisonner des salades ?",
    answer: "Notre Fleur de Sel aux Baies Roses est parfaite sur une salade de tomates d'été, une burrata crémeuse ou un avocat avec un filet d'huile d'olive de qualité.",
    chips: ["Baies de Timut", "Commander"],
  },
  {
    id: 49,
    category: "Sels & Condiments",
    keywords: ["sel iode", "antiagglomerant", "chimie sel"],
    question: "Vos sels contiennent-ils des anti-agglomérants ou produits chimiques ?",
    answer: "Absolument pas ! Nos sels sont 100% naturels, bruts de récolte, non blanchis et sans additif anti-agglomérant.",
    chips: ["Engagement qualité", "Frais de port"],
  },
  {
    id: 50,
    category: "Sels & Condiments",
    keywords: ["conserver sel", "humidite sel"],
    question: "Comment conserver le sel pour qu'il ne prenne pas l'humidité ?",
    answer: "Conservez-le dans un pot en céramique ou en verre avec couvercle hermétique à l'abri des projections d'eau. La fleur de sel naturelle conserve toujours une légère humidité résiduelle normale.",
    chips: ["Voir les sels", "Retour accueil"],
  },

  // ── 5. ACCORDS METS & ÉPICES (51 to 65) ──
  {
    id: 51,
    category: "Accords Culinaires",
    keywords: ["entrecote", "cote boeuf epice", "steak epice"],
    question: "Quelle épice pour sublimer une entrecôte ou côte de bœuf ?",
    answer: "Le Poivre Rouge de Kampot IGP concassé et une pincée de Fleur de Sel aux Baies Roses. Pour une marinade, optez pour notre Mélange Festif Bio.",
    chips: ["Poivre de Kampot", "Fleur de sel", "Commander"],
  },
  {
    id: 52,
    category: "Accords Culinaires",
    keywords: ["saumon epice", "truite epice", "poisson gras"],
    question: "Quelle épice marier avec un pavé de saumon ?",
    answer: "Les Baies de Timut Sauvages (pour la touche pamplemousse) ou le Poivre Sauvage Voatsiperifery. Un soupçon d'aneth et de fleur de sel complète merveilleusement le plat.",
    chips: ["Baies de Timut", "Commander"],
  },
  {
    id: 53,
    category: "Accords Culinaires",
    keywords: ["crevettes", "gambas", "crustaces epices"],
    question: "Quelle épice utiliser pour des crevettes ou gambas poêlées ?",
    answer: "Faites revenir vos gambas avec une pointe d'ail, un filet d'huile d'olive et 1 cuillère à café de Curry Royal de Madras ou de Baies de Timut concassées.",
    chips: ["Curry de Madras", "Idées recettes"],
  },
  {
    id: 54,
    category: "Accords Culinaires",
    keywords: ["poulet roti epice", "volaille dimanche"],
    question: "Quelle épice pour parfumer un poulet rôti du dimanche ?",
    answer: "Glissez sous la peau du poulet un mélange de beurre pommade, Mélange Festif Bio et une pincée de Curry Royal. La peau deviendra croustillante et parfumée à souhait !",
    chips: ["Mélange Festif Bio", "Commander"],
  },
  {
    id: 55,
    category: "Accords Culinaires",
    keywords: ["sauce tomate", "pates epices", "pizza epices"],
    question: "Quelle épice mettre dans une sauce tomate maison ?",
    answer: "Une pointe d'origan sauvage, une feuille de laurier, une pincée de piment doux et une touche de Poivre Noir de Kampot en fin de mijotage.",
    chips: ["Nos aromates", "Code promo"],
  },
  {
    id: 56,
    category: "Accords Culinaires",
    keywords: ["champignons", "poelee champignons", "cepes epices"],
    question: "Quelle épice pour relever une poêlée de champignons ?",
    answer: "Le Poivre Sauvage Voatsiperifery et une pointe d'ail persillé. Les notes sous-bois du poivre malgache s'harmonisent naturellement avec les champignons.",
    chips: ["Poivre Voatsiperifery", "Commander"],
  },
  {
    id: 57,
    category: "Accords Culinaires",
    keywords: ["puree", "pomme de terre epice", "patate douce epice"],
    question: "Quelle épice ajouter dans une purée de pommes de terre ?",
    answer: "Une râpée de noix de muscade fraîche, une pincée de poivre blanc ou une pointe de curcuma pour donner une belle couleur dorée aux patates douces.",
    chips: ["Nos épices pures", "Mélanges"],
  },
  {
    id: 58,
    category: "Accords Culinaires",
    keywords: ["risotto", "risotto safran", "riz epice"],
    question: "Quelle épice sublime un risotto crémeux ?",
    answer: "Le Safran Impérial en pistils infusé dans du bouillon chaud (pour le célèbre Risotto alla Milanese) ou un tour de moulin de Poivre de Kampot au dressage.",
    chips: ["Commander le Safran", "Idée recette"],
  },
  {
    id: 59,
    category: "Accords Culinaires",
    keywords: ["fromage chevre", "chevre chaud epice", "fromage epice"],
    question: "Quelle épice marier avec du fromage de chèvre chaud ?",
    answer: "Une pincée de Baies Roses concassées avec un filet de miel d'acacia et un tour de moulin de Baies de Timut. L'accord sucré-salé est remarquable !",
    chips: ["Baies roses", "Commander"],
  },
  {
    id: 60,
    category: "Accords Culinaires",
    keywords: ["chocolat noir epice", "mousse chocolat poivre"],
    question: "Quelle épice associer avec une mousse au chocolat noir ?",
    answer: "Une pincée de Poivre Sauvage Voatsiperifery ou de Baies de Timut concassées dans une mousse à 70% de cacao. Les notes acidulées exaltent la force du chocolat.",
    chips: ["Poivre sauvage", "Commander"],
  },
  {
    id: 61,
    category: "Accords Culinaires",
    keywords: ["tarte pommes", "compote epice", "pomme cannelle"],
    question: "Quelle épice pour une tarte aux pommes ou compote ?",
    answer: "Notre Cannelle de Ceylan Bio en poudre ou les grains d'une demi-gousse de Vanille Bourbon Gourmet de Madagascar.",
    chips: ["Cannelle de Ceylan", "Vanille Bourbon", "Commander"],
  },
  {
    id: 62,
    category: "Accords Culinaires",
    keywords: ["the chai", "cafe epice", "latte cannelle"],
    question: "Quelle épice pour parfumer un thé chaud, café ou latte ?",
    answer: "Un mélange de cannelle de Ceylan, cardamome écrasée et gingembre moulu pour créer un délicieux Chaï Latte maison réconfortant.",
    chips: ["Nos épices douces", "Code promo"],
  },
  {
    id: 63,
    category: "Accords Culinaires",
    keywords: ["vinaigrette epice", "assaisonner salade"],
    question: "Quelle épice utiliser dans une vinaigrette ?",
    answer: "Mélangez huile d'olive, vinaigre de cidre, moutarde, une pincée de curcuma et quelques Baies de Timut concassées pour une vinaigrette ensoleillée.",
    chips: ["Fleur de sel", "Voir les poivres"],
  },
  {
    id: 64,
    category: "Accords Culinaires",
    keywords: ["guacamole", "avocat epice", "dip avocat"],
    question: "Quelle épice pour un guacamole maison ?",
    answer: "Une pincée de cumin noble, du paprika doux, une pointe de piment doux, du jus de citron vert et de la fleur de sel aux baies roses.",
    chips: ["Mélanges d'épices", "Commander"],
  },
  {
    id: 65,
    category: "Accords Culinaires",
    keywords: ["riz basmati epice", "quinoa epice", "cuire riz"],
    question: "Quelle épice pour assaisonner du riz basmati ?",
    answer: "Ajoutez 2 gousses de cardamome verte écrasées, un clou de girofle et un demi-bâton de cannelle dans l'eau de cuisson de votre riz pour un parfum digne d'un grand restaurant indien.",
    chips: ["Curry de Madras", "Toutes nos épices"],
  },

  // ── 6. CONSEILS CULINAIRES & SECRETS DE CHEFS (66 to 75) ──
  {
    id: 66,
    category: "Secrets de Chefs",
    keywords: ["moment assaisonner", "quand mettre epices", "debut fin cuisson"],
    question: "À quel moment précis faut-il ajouter les épices ?",
    answer: "Les épices en graines et mélanges de base (curry, curcuma) au début dans la matière grasse. Les herbes séchées à mi-cuisson. Les poivres rares, fleurs de sel et garam masala toujours en toute fin de cuisson.",
    chips: ["Technique du tadka", "Torréfaction"],
  },
  {
    id: 67,
    category: "Secrets de Chefs",
    keywords: ["pourquoi torrefier", "chauffer epices sec"],
    question: "Pourquoi certaines épices doivent-elles être torréfiées à sec ?",
    answer: "La torréfaction à sec active les huiles essentielles dormantes dans la graine, élimine l'humidité résiduelle et développe de nouvelles molécules aromatiques grillées et caramélisées.",
    chips: ["Poivres rares", "Mélanges masalas"],
  },
  {
    id: 68,
    category: "Secrets de Chefs",
    keywords: ["trop epice", "plat trop piquant", "adoucir plat"],
    question: "Comment rattraper un plat devenu trop épicé ou piquant ?",
    answer: "Ajoutez un corps gras ou laitage (crème fraîche, lait de coco, yaourt, beurre) : les matières grasses dissolvent la capsaïcine piquante. Vous pouvez aussi ajouter une pomme de terre crue coupée qui absorbera l'excès.",
    chips: ["Doser les épices", "Nos currys doux"],
  },
  {
    id: 69,
    category: "Secrets de Chefs",
    keywords: ["piperine", "capsaicine", "chimie piquant"],
    question: "Qu'est-ce que la pipérine et la capsaïcine ?",
    answer: "La pipérine est la molécule piquante propre au poivre (Piper nigrum), apportant une chaleur stimulante. La capsaïcine est la molécule des piments (Capsicum), procurant une sensation de brûlure thermique.",
    chips: ["Nos poivres", "Nos piments"],
  },
  {
    id: 70,
    category: "Secrets de Chefs",
    keywords: ["laver epices", "nettoyer epices"],
    question: "Faut-il laver ses épices avant de les utiliser ?",
    answer: "Non, jamais ! Laver les épices sèches détruirait leurs arômes et provoquerait l'apparition de moisissures. Nos épices sont triées, nettoyées et prêtes à l'emploi.",
    chips: ["Conservation des épices", "Nos origines"],
  },
  {
    id: 71,
    category: "Secrets de Chefs",
    keywords: ["moudre petite quantite", "grain ou poudre"],
    question: "Pourquoi acheter en grains plutôt qu'en poudre ?",
    answer: "Le grain entier protège les arômes pendant plusieurs années. Une fois moulu, le contact avec l'oxygène entraîne une perte de 50% du parfum en quelques semaines.",
    chips: ["Mortier et moulin", "Commander des grains"],
  },
  {
    id: 72,
    category: "Secrets de Chefs",
    keywords: ["huile parfumee", "infuser huile", "huile pimentee"],
    question: "Comment créer une huile parfumée maison aux épices ?",
    answer: "Faites tiédir 250ml d'huile d'olive à 60°C maximum avec du Poivre de Kampot concassé, des baies de Timut et du romarin. Laissez infuser 48h puis filtrez dans une bouteille propre.",
    chips: ["Poivres rares", "Nos sels"],
  },
  {
    id: 73,
    category: "Secrets de Chefs",
    keywords: ["marinade viande", "attendrir viande"],
    question: "Comment faire une bonne marinade d'épices pour attendrir la viande ?",
    answer: "Associez une base acide (jus de citron ou yaourt), une matière grasse (huile d'olive), vos épices (Mélange Festif ou Tandoori) et laissez reposer au minimum 2h au réfrigérateur.",
    chips: ["Mélange Festif", "Tandoori"],
  },
  {
    id: 74,
    category: "Secrets de Chefs",
    keywords: ["digestion", "epices digestion", "apres repas"],
    question: "Quelles épices facilitent la digestion après un repas ?",
    answer: "La cardamome, le gingembre, le fenouil et le cumin sont réputés depuis l'Antiquité pour stimuler la sécrétion d'enzymes digestives et apaiser les ballonnements.",
    chips: ["Nos aromates", "Thé Chaï"],
  },
  {
    id: 75,
    category: "Secrets de Chefs",
    keywords: ["anti-inflammatoire", "curcuma bienfaits", "gingembre bienfaits", "sante epices"],
    question: "Quelles sont les épices anti-inflammatoires reconnues ?",
    answer: "Le curcuma (riche en curcumine) associé au poivre noir (la pipérine multiplie par 20 son absorption par le corps) et le gingembre sont les champions naturels de la protection cellulaire.",
    chips: ["Commander du curcuma", "Poivres de Kampot"],
  },

  // ── 7. CONSERVATION & FRAÎCHEUR (76 to 83) ──
  {
    id: 76,
    category: "Conservation",
    keywords: ["duree grains", "combien temps grains", "conservation grains"],
    question: "Quelle est la durée de vie des épices en grains entiers ?",
    answer: "Les épices entières (poivres, baies, bâtons de cannelle, clous de girofle) se conservent parfaitement entre 2 et 3 ans dans un bocal hermétique sans perdre leur puissance.",
    chips: ["Et les poudres ?", "Conseils bocaux"],
  },
  {
    id: 77,
    category: "Conservation",
    keywords: ["duree poudres", "conservation poudre", "moulue duree"],
    question: "Quelle est la durée de conservation des épices moulues ?",
    answer: "Les poudres d'épices et mélanges conservent toute leur intensité aromatique pendant 10 à 12 mois. Au-delà, elles ne sont pas périmées mais perdent progressivement en parfum.",
    chips: ["Comment stocker ?", "Nos produits"],
  },
  {
    id: 78,
    category: "Conservation",
    keywords: ["epice perimee", "toxique epice", "date limite epice"],
    question: "Les épices peuvent-elles périmer ou devenir toxiques ?",
    answer: "Non, les épices séchées ne développent pas de bactéries pathogènes et ne périment pas au sens strict. Elles portent une DDM (Date de Durabilité Minimale) indiquant la période de fraîcheur optimale.",
    chips: ["Tester la fraîcheur", "Conseils stockage"],
  },
  {
    id: 79,
    category: "Conservation",
    keywords: ["dessus plaques", "erreur rangement", "chaleur epices"],
    question: "Pourquoi éviter de ranger les épices au-dessus des plaques de cuisson ?",
    answer: "La chaleur des feux et la vapeur d'eau montante pénètrent dans les pots à chaque ouverture, ce qui agglomère les poudres et détruit les huiles essentielles en quelques semaines.",
    chips: ["Où ranger ses épices ?", "Bocaux hermétiques"],
  },
  {
    id: 80,
    category: "Conservation",
    keywords: ["bocal ideal", "type pot", "verre opaque"],
    question: "Quel bocal est idéal pour conserver les épices ?",
    answer: "Des pots en verre hermétiques (avec joint ou bouchon vissant) rangés dans un tiroir ou placard sombre, ou des pots opaques qui bloquent les rayons UV de la lumière.",
    chips: ["Nos contenants", "Commander"],
  },
  {
    id: 81,
    category: "Conservation",
    keywords: ["congelateur", "congeler epices", "congeler vanille"],
    question: "Peut-on congeler des épices ou des gousses de vanille ?",
    answer: "Il est déconseillé de congeler les épices sèches car la décongélation crée de la condensation destructrice. Seules les herbes fraîches ciselées dans de l'huile se congèlent bien.",
    chips: ["Conservation de la vanille", "Tous nos conseils"],
  },
  {
    id: 82,
    category: "Conservation",
    keywords: ["savoir fraicheur", "tester epice", "epice eventee"],
    question: "Comment savoir si une épice a perdu sa fraîcheur ?",
    answer: "Frottez une pincée d'épice entre vos doigts et sentez : si le parfum est immédiat et piquant, elle est parfaite. Si l'odeur est fade ou inexistante, il est temps de la renouveler !",
    chips: ["Renouveler mon stock", "Code promo -10%"],
  },
  {
    id: 83,
    category: "Conservation",
    keywords: ["mottes poudre", "grumeaux epices", "humidite poudre"],
    question: "Comment éviter que la poudre d'épice ne forme des grumeaux ?",
    answer: "Ne saupoudrez jamais directement au-dessus d'une casserole fumante : prélevez l'épice avec une cuillère sèche. Vous pouvez aussi ajouter quelques grains de riz cru au fond du pot.",
    chips: ["Bocaux de conservation", "Guide cuisine"],
  },

  // ── 8. ORIGINES & ENGAGEMENTS SULSON (84 to 90) ──
  {
    id: 84,
    category: "Maison Sulson",
    keywords: ["d'ou viennent epices", "terroirs", "provenance sulson"],
    question: "D'où proviennent les épices Les Épices de Sulson ?",
    answer: "Nous sourçons nos récoltes dans leurs terroirs historiques d'excellence : Cambodge (Kampot), Madagascar (Sambava, Forêts tropicales), Sri Lanka (Ceylan), Maroc (Taliouine), Népal et France (Guérande).",
    chips: ["Nos engagements", "Voir la boutique"],
  },
  {
    id: 85,
    category: "Maison Sulson",
    keywords: ["100% pur", "colorant", "conservateur", "purete"],
    question: "Vos épices sont-elles 100% pures et sans additifs ?",
    answer: "Oui, à 100% ! Nous refusons catégoriquement les colorants, anti-agglomérants, arômes artificiels ou sels de charge. Nos produits sont bruts, authentiques et puissants.",
    chips: ["Nos mélanges", "Code promo"],
  },
  {
    id: 86,
    category: "Maison Sulson",
    keywords: ["producteurs direct", "circuit court", "cooperative"],
    question: "Travaillez-vous en direct avec les petits producteurs ?",
    answer: "Oui ! Nous privilégions les relations directes avec des coopératives familiales et des fermes artisanales pour garantir une juste rémunération et une traçabilité totale.",
    chips: ["Nos origines", "Poivres rares"],
  },
  {
    id: 87,
    category: "Maison Sulson",
    keywords: ["supermarche difference", "pourquoi plus cher", "qualite superieure"],
    question: "Pourquoi vos épices sont-elles plus parfumées que celles des supermarchés ?",
    answer: "Les épices industrielles subissent de longs mois de stockage en vrac et sont souvent ionisées ou coupées. Nos épices sont fraîchement récoltées, sélectionnées à pleine maturité et conditionnées en petites séries.",
    chips: ["Tester nos poivres", "Commander"],
  },
  {
    id: 88,
    category: "Maison Sulson",
    keywords: ["emballage", "recyclable", "eco-responsable", "kraft"],
    question: "Vos emballages sont-ils recyclables ?",
    answer: "Oui, nos pots en verre sont réutilisables à l'infini et nos sachets kraft zippés sont conçus avec des matériaux recyclables préservant la barrière aromatique.",
    chips: ["Nos coffrets cadeaux", "Livraison offerte"],
  },
  {
    id: 89,
    category: "Maison Sulson",
    keywords: ["atelier", "ou prepare", "made in france"],
    question: "Où sont préparés et conditionnés vos mélanges ?",
    answer: "Toutes nos épices sont contrôlées, assemblées et conditionnées avec soin dans notre atelier en France.",
    chips: ["Découvrir les mélanges", "Contactez-nous"],
  },
  {
    id: 90,
    category: "Maison Sulson",
    keywords: ["histoire sulson", "qui sommes nous", "fondation"],
    question: "Quelle est l'histoire de la Maison Les Épices de Sulson ?",
    answer: "Née de la passion pour la haute gastronomie et les terroirs du monde, notre maison a pour mission d'apporter aux passionnés de cuisine les épices les plus pures, nobles et intenses du marché.",
    chips: ["Voir les produits", "Parler sur WhatsApp"],
  },

  // ── 9. COMMANDES & PAIEMENTS (91 to 95) ──
  {
    id: 91,
    category: "Commandes",
    keywords: ["moyens de paiement", "carte bancaire", "stripe", "paypal"],
    question: "Quels sont les moyens de paiement acceptés sur le site ?",
    answer: "Nous acceptons les cartes bancaires (Visa, MasterCard), Stripe, PayPal et Apple Pay avec un protocole de paiement sécurisé 3D-Secure.",
    chips: ["Délais de livraison", "Code promo"],
  },
  {
    id: 92,
    category: "Commandes",
    keywords: ["paiement securise", "securite donnee", "ssl"],
    question: "Les paiements en ligne sont-ils entièrement sécurisés ?",
    answer: "Oui, vos transactions sont cryptées par protocole SSL de niveau bancaire. Aucune donnée de carte n'est stockée sur nos serveurs.",
    chips: ["Frais de port", "Commander"],
  },
  {
    id: 93,
    category: "Commandes",
    keywords: ["sans compte", "compte obligatoire", "commande invite"],
    question: "Puis-je commander sans créer de compte client ?",
    answer: "Oui ! Vous pouvez commander en toute simplicité en mode invité direct, sans mot de passe compliqué. Vous recevez directement votre confirmation et suivi par email.",
    chips: ["Code promo -10%", "Frais de livraison"],
  },
  {
    id: 94,
    category: "Commandes",
    keywords: ["coffret cadeau", "offrir", "coffret bois"],
    question: "Proposez-vous des coffrets cadeaux à offrir ?",
    answer: "Oui ! Découvrez notre Coffret Grand Cru : Les 5 Trésors d'Épices du Monde présenté dans un élégant coffret en bois gravé, prêt à être offert aux passionnés de cuisine.",
    chips: ["Voir le coffret grand cru", "Livraison offerte"],
  },
  {
    id: 95,
    category: "Commandes",
    keywords: ["mot personnalise", "message cadeau", "carte cadeau"],
    question: "Puis-je ajouter un mot personnalisé pour un cadeau ?",
    answer: "Oui ! Lors du passage de votre commande ou en nous contactant directement sur WhatsApp après validation, nous joindrons gratuitement une jolie carte manuscrite avec votre message.",
    chips: ["Discuter sur WhatsApp", "Commander"],
  },

  // ── 10. LIVRAISON & EXPÉDITIONS (96 to 100) ──
  {
    id: 96,
    category: "Livraison",
    keywords: ["livraison offerte", "frais de port gratuit", "franco de port"],
    question: "À partir de quel montant la livraison est-elle offerte ?",
    answer: "La livraison est **100% OFFERTE dès 50€ d'achat** pour toute commande expédiée en France métropolitaine !",
    chips: ["Délais d'expédition", "Code promo -10%", "Commander"],
  },
  {
    id: 97,
    category: "Livraison",
    keywords: ["delais livraison", "temps livraison", "combien de jours"],
    question: "Quels sont les délais d'expédition et de livraison ?",
    answer: "Toute commande est préparée et expédiée sous 24h à 48h ouvrées. La livraison Colissimo à domicile prend 48h et en point relais Mondial Relay environ 3 à 4 jours ouvrés.",
    chips: ["Suivi de colis", "Frais de livraison"],
  },
  {
    id: 98,
    category: "Livraison",
    keywords: ["transporteur", "colissimo", "mondial relay", "chronopost"],
    question: "Quels transporteurs utilisez-vous ?",
    answer: "Nous expédions vos colis avec Colissimo Suivi de La Poste (livraison à domicile avec ou sans signature) et Mondial Relay (livraison sécurisée en point relais proche de chez vous).",
    chips: ["Livraison offerte dès 50€", "Suivi"],
  },
  {
    id: 99,
    category: "Livraison",
    keywords: ["dom tom", "international", "belgique", "suisse"],
    question: "Livrez-vous dans les DOM-TOM et en Europe ?",
    answer: "Oui ! Nous livrons en Belgique, Suisse, Luxembourg et dans l'ensemble de l'Union Européenne ainsi que dans les DOM-TOM.",
    chips: ["Contacter sur WhatsApp pour devis", "Tarifs de livraison"],
  },
  {
    id: 100,
    category: "Livraison",
    keywords: ["suivre colis", "numero suivi", "ou est ma commande"],
    question: "Comment suivre l'acheminement de mon colis en temps réel ?",
    answer: "Dès l'expédition de votre commande, vous recevez un email automatique contenant le numéro de suivi direct et le lien du transporteur.",
    chips: ["Service client WhatsApp", "Code promo"],
  },
];

export function generateBotReply(userQuery: string): {
  text: string;
  showWhatsappButton?: boolean;
  whatsappMessage?: string;
  chips?: string[];
} {
  const query = userQuery.toLowerCase().trim();

  // 1. Explicit WhatsApp request
  if (
    query.includes("whatsapp") ||
    query.includes("humain") ||
    query.includes("conseill") ||
    query.includes("parler") ||
    query.includes("téléphone") ||
    query.includes("contact") ||
    query.includes("appeler")
  ) {
    return {
      text: "Avec grand plaisir ! Notre équipe est disponible en direct sur WhatsApp pour vous conseiller personnellement, vous aider à choisir vos épices ou faire le point sur une commande.",
      showWhatsappButton: true,
      whatsappMessage: `Bonjour Les Épices de Sulson, j'aimerais échanger avec vous : "${userQuery}"`,
      chips: ["Quelle épice pour mon plat ?", "Délais de livraison", "Code promo -10%"],
    };
  }

  // 2. Short greetings
  if (
    query.match(/^(bonjour|salut|hello|coucou|bonsoir|hey|hi)/i) &&
    query.length < 25
  ) {
    return {
      text: "Bonjour et bienvenue chez Les Épices de Sulson ! 🌿\n\nQue recherchez-vous aujourd'hui : une recommandation d'épices pour un plat précis, des conseils de conservation ou des informations sur la livraison ?",
      chips: [
        "Quelle épice pour mon plat ?",
        "Délais et frais de livraison",
        "Avez-vous un code promo ?",
        "Origines et qualité",
        "Discuter sur WhatsApp",
      ],
    };
  }

  // 3. Search in the 100 Q&A Knowledge Base with multi-keyword scoring
  let bestMatch: FAQItem | null = null;
  let maxScore = 0;

  const queryTokens = query
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  for (const item of KNOWLEDGE_BASE_100) {
    let score = 0;

    // Check keyword hits
    for (const kw of item.keywords) {
      if (query.includes(kw.toLowerCase())) {
        score += 8;
      }
    }

    // Check token overlap with question
    const qLower = item.question.toLowerCase();
    for (const token of queryTokens) {
      if (qLower.includes(token)) {
        score += 3;
      }
    }

    // Check token overlap with answer
    const aLower = item.answer.toLowerCase();
    for (const token of queryTokens) {
      if (aLower.includes(token)) {
        score += 1;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  // If we found a confident match in our 100 Q&A base
  if (bestMatch && maxScore >= 4) {
    return {
      text: `${bestMatch.answer}`,
      showWhatsappButton: bestMatch.suggestWhatsapp,
      whatsappMessage: `Bonjour, j'ai une question complémentaire sur : "${bestMatch.question}"`,
      chips: bestMatch.chips || [
        "Quelle épice pour mon plat ?",
        "Frais de livraison",
        "Code promo -10%",
        "Discuter sur WhatsApp",
      ],
    };
  }

  // 4. Fallback when question is unknown or highly specific -> WhatsApp redirect
  return {
    text: "Je n'ai pas la réponse exacte à cette question précise, mais notre équipe d'experts est disponible en direct pour vous renseigner !\n\nCliquez ci-dessous pour discuter directement avec notre conseillère sur WhatsApp :",
    showWhatsappButton: true,
    whatsappMessage: `Bonjour Les Épices de Sulson, j'ai une question sur votre boutique : "${userQuery}"`,
    chips: [
      "Quelle épice pour mon plat ?",
      "Délais et livraison",
      "Avez-vous un code promo ?",
      "Discuter sur WhatsApp",
    ],
  };
}
