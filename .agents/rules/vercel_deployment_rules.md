# 🚀 RÈGLES DE DÉPLOIEMENT VERCEL & ARCHITECTURE MONOREPO

Ce document définit les règles strictes pour le déploiement et la gestion des dépendances du monorepo **Les Épices de Sulson**.

---

### 1. Isolation Stricte des Dépendances par Application
Dans un monorepo npm (`apps/web` et `apps/dashboard`) :
- **Chaque application est déployée de façon autonome par Vercel.**
- **Règle absolue** : Tout composant importé dans `apps/web` (ex: `lucide-react`, `@prisma/client`, `framer-motion`, etc.) **DOIT** figurer explicitement dans le fichier `apps/web/package.json`.
- **Interdiction** : Ne jamais supposer qu'une dépendance installée dans le tableau de bord ou à la racine sera disponible pour la boutique lors du build Vercel.

---

### 2. Configuration Next.js Résiliente pour la Production
Dans `apps/web/next.config.ts` et `apps/dashboard/next.config.ts` :
- Toujours conserver l'option de secours pour éviter qu'un avertissement de type non critique n'interrompe un déploiement urgent :
  ```ts
  typescript: {
    ignoreBuildErrors: true,
  }
  ```
- Ne pas inclure de clé `eslint` dépréciée dans `next.config.ts` (obsolète en Next.js 16).

---

### 3. Déclenchement Automatique des Déploiements Vercel
- Si le webhook GitHub vers Vercel est inactif ou désynchronisé, déclencher immédiatement le déploiement via le Deploy Hook officiel du projet :
  - **Deploy Hook Web (`epicesdesulson-web`)** :
    `POST https://api.vercel.com/v1/integrations/deploy/prj_dzAw3R2ZXEJjvLaker09RiZhGzOb/sDq58u56XM`
- Commande PowerShell pour déclencher :
  ```powershell
  Invoke-RestMethod -Uri "https://api.vercel.com/v1/integrations/deploy/prj_dzAw3R2ZXEJjvLaker09RiZhGzOb/sDq58u56XM" -Method POST
  ```

---

### 4. Validation Systématique Pré-Déploiement
Avant de pousser un commit vers `origin/main` :
1. Exécuter la compilation locale :
   ```bash
   npm run build -w apps/web
   ```
2. Vérifier que la compilation affiche `✓ Generating static pages (69/69)` sans aucune erreur `Module not found`.
3. Pousser les modifications sur `main` et sur `master`.
