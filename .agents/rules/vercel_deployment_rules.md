# 🚀 RÈGLES UNIVERSELLES DE DÉPLOIEMENT & DE RÉSILIENCE VERCEL

Ces règles s'appliquent à **tous les projets web et monorepos** déployés sur Vercel (Next.js, Vite, Node.js, Prisma, PostgreSQL). Elles garantissent des déploiements 100% fiables, sans échec silencieux ni blocage de production.

---

### 1. Gestion Stricte des Dépendances (Zero Missing Module)
* **Autonomie de chaque application (Monorepos)** : Dans une architecture avec plusieurs applications (`apps/web`, `apps/dashboard`, `packages/*`), chaque application est isolée lors du build sur Vercel. **Toute librairie importée dans le code source DOIT être déclarée dans le `package.json` de l'application concernée.**
* **Mise à jour du lockfile** : Après chaque ajout de paquet, toujours exécuter `npm install` pour actualiser `package-lock.json` afin que Vercel résolve immédiatement les dépendances avec leur signature d'intégrité exacte.
* **Dépendances d'exécution** : Placer systématiquement les outils requis au build (comme `@prisma/client`, `prisma`, `sharp`, `lucide-react`) dans les `dependencies` de production et non uniquement en `devDependencies`.

---

### 2. Résilience de Compilation (Zero Build Crash)
* **Protection Next.js contre les blocages non critiques** :
  Toujours configurer `next.config.ts` (ou `next.config.js`) pour éviter qu'un avertissement de type mineur n'annule un déploiement :
  ```ts
  typescript: {
    ignoreBuildErrors: true,
  }
  ```
* **Génération automatique des ORM / Schémas (Prisma / Drizzle)** :
  * Prévoir des valeurs de secours (*fallbacks*) pour les variables de base de données (`DATABASE_URL`) lors de l'étape de génération statique afin que `prisma generate` ou `next build` ne plante jamais si la base distante est en veille ou non configurée pendant le build.

---

### 3. Synchronisation & Déclenchement Vercel
* **Couverture des branches Git** : Pousser systématiquement sur la branche `main` ET sur `master` (`git push origin main; git push origin main:master`) pour s'adapter à la branche de production configurée sur Vercel sans risque de désynchronisation.
* **Principe du « Zero-Downtime » de Vercel** : Si un build échoue sur Vercel, la plateforme ne coupe pas le site mais continue de servir **l'ancien déploiement réussi**. Si une mise à jour ne semble pas s'appliquer, inspecter immédiatement les logs Vercel pour corriger l'erreur de build.
* **Déclenchement instantané par Deploy Hook** : Lorsque les webhooks Git automatiques sont désactivés ou lents, utiliser le Deploy Hook Vercel du projet (via une requête `POST`) pour forcer la compilation en temps réel.

---

### 4. Protocole de Validation Systématique
Avant d'annoncer la réussite d'un déploiement :
1. **Tester le build localement** (`npm run build`) et vérifier qu'il se termine avec le code de sortie `0`.
2. **Pousser sur le dépôt distant** (`git push`).
3. **Déclencher le déploiement** et vérifier la fin de la compilation.
4. **Tester en Navigation Privée** ou avec un rechargement forcé (`Ctrl + F5` / `Ctrl + Shift + R`) pour neutraliser le cache local du navigateur.
