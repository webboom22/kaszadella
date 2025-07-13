#!/bin/bash

# 🚀 KASZADELLA EGYSZERŰ HIBRID DEPLOYMENT
# Hostinger Node.js + Railway PostgreSQL

echo "🚀 KASZADELLA HIBRID DEPLOYMENT (Node.js)"
echo "=========================================="
echo "🏠 Hostinger: Node.js App"
echo "🚂 Railway: PostgreSQL Backend"
echo ""

# Railway URL bekérése
read -p "Railway app URL: " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo "❌ Railway URL szükséges!"
    exit 1
fi

echo "🧹 Takarítás..."
rm -rf deployment
mkdir -p deployment/hostinger

echo "📦 Build készítése..."
npm run build

echo "🗂️ Fájlok másolása..."

# Teljes projekt másolása (Node.js-hez)
cp -r .next deployment/hostinger/
cp package.json deployment/hostinger/
cp package-lock.json deployment/hostinger/
cp next.config.ts deployment/hostinger/

# App fájlok
cp -r app deployment/hostinger/
cp -r components deployment/hostinger/
cp -r lib deployment/hostinger/
cp -r hooks deployment/hostinger/
cp -r constans deployment/hostinger/
cp -r database deployment/hostinger/
cp auth.ts deployment/hostinger/
cp middleware.ts deployment/hostinger/
cp types.d.ts deployment/hostinger/

# Config fájlok
cp tailwind.config.ts deployment/hostinger/
cp tsconfig.json deployment/hostinger/
cp components.json deployment/hostinger/
cp postcss.config.mjs deployment/hostinger/

# Public fájlok
cp -r public deployment/hostinger/

# Environment fájl (Railway URL-lel)
cat > deployment/hostinger/.env.local << EOF
# 🏠 HOSTINGER + 🚂 RAILWAY HIBRID
DATABASE_URL="${RAILWAY_URL}/api/database"
NEXT_PUBLIC_API_URL="${RAILWAY_URL}"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
NEXTAUTH_URL="https://yourdomain.com"
AUTH_SECRET="your-secret-here"
NODE_ENV="production"
EOF

# Package.json módosítása (start script)
cat > deployment/hostinger/package.json << 'EOF'
{
  "name": "kaszadella-hostinger",
  "version": "1.0.0",
  "scripts": {
    "start": "next start",
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "next": "^15.1.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
EOF

echo "🗂️ ZIP készítése..."
cd deployment
zip -r kaszadella-hostinger-nodejs-$(date +%Y%m%d-%H%M%S).zip hostinger/

echo ""
echo "✅ DEPLOYMENT KÉSZ!"
echo "=================="
echo ""
echo "📦 ZIP: deployment/kaszadella-hostinger-nodejs-*.zip"
echo ""
echo "🎯 HOSTINGER BEÁLLÍTÁS:"
echo "1. cPanel → Node.js App"
echo "2. Create Application"
echo "3. Upload & Extract ZIP"
echo "4. npm install"
echo "5. npm start"
echo ""
echo "🔗 API calls → $RAILWAY_URL"
echo "" 