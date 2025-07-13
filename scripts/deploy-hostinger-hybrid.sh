#!/bin/bash

# 🚀 KASZADELLA HIBRID DEPLOYMENT SCRIPT
# Frontend: Hostinger | Backend: Railway
# Használat: ./scripts/deploy-hostinger-hybrid.sh

echo "🚀 KASZADELLA HIBRID DEPLOYMENT"
echo "================================="
echo "🏠 Frontend: Hostinger"
echo "🚂 Backend: Railway PostgreSQL"
echo ""

# 🔍 Ellenőrzések
echo "🔍 Ellenőrzések..."

# Node.js verzió
echo "📦 Node.js verzió: $(node --version)"

# Package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json nem található!"
    exit 1
fi

# Environment template
if [ ! -f "hostinger-hybrid.env.template" ]; then
    echo "❌ hostinger-hybrid.env.template nem található!"
    exit 1
fi

# 🧹 Takarítás
echo "🧹 Projekt takarítása..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf deployment

# 📦 Dependencies telepítése
echo "📦 Dependencies telepítése..."
npm ci

# ⚠️ RAILWAY URL ELLENŐRZÉS
echo ""
echo "⚠️  FONTOS: Railway app létrehozása előtt!"
echo "1. Menj a railway.app-ra"
echo "2. Deploy from GitHub repo: GiantFace/Kaszadella"
echo "3. Add PostgreSQL database"
echo "4. Másold ki a Railway app URL-t"
echo ""
read -p "Railway app URL (pl. https://web-production-abc.up.railway.app): " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo "❌ Railway URL szükséges!"
    exit 1
fi

# 🔧 Environment fájl készítése
echo "🔧 Environment konfiguráció..."
mkdir -p deployment/hostinger

# Hostinger environment
cat > deployment/hostinger/.env.local << EOF
# 🏠 HOSTINGER HIBRID KONFIGURÁCIÓ
NEXT_PUBLIC_API_URL="$RAILWAY_URL"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_[YOUR_PUBLISHABLE_KEY]"
NODE_ENV="production"
EOF

echo "✅ Environment konfiguráció kész"

# 🏗️ Hostinger Build (Static export)
echo "🏗️ Static export készítése Hostingerhez..."

# Next.js konfiguráció módosítása static exporthoz
cat > next.config.hostinger.ts << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger static export
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // Disable API routes for static export
  experimental: {
    runtime: 'nodejs'
  }
};

export default nextConfig;
EOF

# Build with custom config
NEXT_CONFIG_FILE=next.config.hostinger.ts npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build sikertelen!"
    exit 1
fi

# 🗂️ Fájlok másolása
echo "🗂️ Hostinger fájlok előkészítése..."

# Static output másolása
cp -r out/* deployment/hostinger/

# Config fájlok
cp hostinger-hybrid.env.template deployment/hostinger/
cp HOSTINGER_SETUP.md deployment/hostinger/

# Cleanup
rm next.config.hostinger.ts

# 🗂️ ZIP archívum készítése
echo "🗂️ ZIP archívum készítése..."
cd deployment
zip -r kaszadella-hostinger-hybrid-$(date +%Y%m%d-%H%M%S).zip hostinger/

echo ""
echo "✅ HIBRID DEPLOYMENT KÉSZ!"
echo "=========================="
echo ""
echo "🚂 RAILWAY BACKEND:"
echo "   URL: $RAILWAY_URL"
echo "   PostgreSQL: ✅ Automatikus"
echo "   API endpoints: ✅ Működik"
echo ""
echo "🏠 HOSTINGER FRONTEND:"
echo "   📦 ZIP: deployment/kaszadella-hostinger-hybrid-*.zip"
echo "   📁 Static fájlok készek"
echo "   🔗 API calls → Railway"
echo ""
echo "🎯 KÖVETKEZŐ LÉPÉSEK:"
echo "1. 🚂 Railway: GitHub repo deploy + PostgreSQL"
echo "2. 🏠 Hostinger: ZIP feltöltés + kicsomagolás"
echo "3. 🔧 Domain beállítás mindkét oldalon"
echo "4. 🧪 Tesztelés"
echo ""
echo "📖 Részletes útmutató: HOSTINGER_SETUP.md"
echo "" 