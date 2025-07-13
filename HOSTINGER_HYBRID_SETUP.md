# 🚀 HIBRID DEPLOYMENT: HOSTINGER + RAILWAY

**💡 Legjobb megoldás: $0 extra költség!**

- 🏠 **Hostinger**: Frontend hosting (static files)
- 🚂 **Railway**: Backend API + PostgreSQL (ingyenes tier)

---

## 📋 **LÉPÉSRŐL LÉPÉSRE ÚTMUTATÓ**

### **🚂 1. RAILWAY BACKEND SETUP**

#### **Step 1: Railway regisztráció**
```
1. Menj a railway.app-ra
2. "Sign up with GitHub" gomb
3. Email confirmation
4. GitHub permissions engedélyezése
```

#### **Step 2: Projekt létrehozása**
```
1. Railway Dashboard → "New Project"
2. "Deploy from GitHub repo"
3. "GiantFace/Kaszadella" kiválasztása
4. "Deploy Now" gomb
```

#### **Step 3: PostgreSQL hozzáadása**
```
1. Project Dashboard → "New" gomb (jobb felső)
2. "Database" → "PostgreSQL"
3. Várj 2-3 percet az automatic setup-ra
```

#### **Step 4: Environment Variables**
```
1. Project → App Service → "Variables" tab
2. Add these variables:

DATABASE_URL: [Railway automatically generates]
AUTH_SECRET: [Generate 32+ character string]
NEXTAUTH_URL: https://[your-railway-app].up.railway.app
NEXT_PUBLIC_BASE_URL: https://[your-railway-app].up.railway.app
STRIPE_SECRET_KEY: sk_test_[your_stripe_secret]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: pk_test_[your_stripe_publishable]
STRIPE_WEBHOOK_SECRET: whsec_[webhook_from_stripe]
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_USER: [your_email@gmail.com]
SMTP_PASSWORD: [app_password]
SMTP_FROM: [your_email@gmail.com]
```

#### **Step 5: Deploy URL másolása**
```
1. App Service → "Deployments" tab
2. Latest deployment → View Logs
3. "Deployed successfully" után megjelenik URL
4. Másold ki: https://web-production-[id].up.railway.app
```

#### **Step 6: Adatbázis importálása**
```
1. Project → PostgreSQL → "Connect"
2. Railway CLI install: npm install -g @railway/cli
3. Railway login: railway login
4. Database import: 
   railway connect postgres
   \i /path/to/kaszadella_neon_backup.sql
```

---

### **🏠 2. HOSTINGER FRONTEND SETUP**

#### **Step 1: Hibrid build készítése**
```bash
# Terminal-ban a projekt mappában:
chmod +x scripts/deploy-hostinger-hybrid.sh
./scripts/deploy-hostinger-hybrid.sh
```

**A script megkérdezi:**
```
Railway app URL: https://web-production-[YOUR-ID].up.railway.app
```

#### **Step 2: Hostinger cPanel feltöltés**
```
1. Hostinger cPanel → File Manager
2. public_html mappába menj
3. Upload → kaszadella-hostinger-hybrid-[date].zip
4. Jobb klikk ZIP-en → Extract
5. Extract to: [ÜRES - közvetlenül public_html mappába]
```

#### **Step 3: Domain beállítás**
```
✅ Nem kell subdomain!
✅ Weboldal: https://yourdomain.com
✅ Document Root: public_html/ (automatikus)
```

#### **Step 4: SSL tanúsítvány**
```
1. cPanel → SSL/TLS
2. Let's Encrypt Free SSL
3. yourdomain.com domain (automatikus)
4. Issue certificate
```

---

## 🔧 **KONFIGURÁCIÓS BEÁLLÍTÁSOK**

### **Railway Environment Variables:**
```env
DATABASE_URL=postgresql://postgres:password@railway.app:5432/railway
AUTH_SECRET=your-32-character-secret-here
NEXTAUTH_URL=https://web-production-abc.up.railway.app
NEXT_PUBLIC_BASE_URL=https://web-production-abc.up.railway.app
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NODE_ENV=production
```

### **Hostinger Environment:**
```env
NEXT_PUBLIC_API_URL=https://web-production-abc.up.railway.app
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NODE_ENV=production
```

---

## 🌐 **DOMAIN ÉS DNS BEÁLLÍTÁSOK**

### **Railway Domain (Backend API):**
```
✅ Automatikus: https://web-production-[id].up.railway.app
✅ SSL: Automatikus
✅ API endpoints: /api/*
```

### **Hostinger Domain (Frontend):**
```
✅ Main domain: https://yourdomain.com
✅ SSL: Let's Encrypt
✅ Static files: HTML, CSS, JS, képek
```

### **CORS beállítás Railway-n:**
```javascript
// middleware.ts-ben már beállítva
const allowedOrigins = [
  'https://yourdomain.com',
  'https://web-production-abc.up.railway.app'
];
```

---

## 🧪 **TESZTELÉSI CHECKLIST**

### **🚂 Railway Backend tesztek:**
- [ ] API endpoints válaszolnak: `GET /api/example`
- [ ] PostgreSQL kapcsolat működik
- [ ] NextAuth bejelentkezés működik
- [ ] Stripe webhook működik
- [ ] Email küldés működik

### **🏠 Hostinger Frontend tesztek:**
- [ ] Főoldal betölt: `https://yourdomain.com`
- [ ] Static fájlok (CSS, JS, képek) betöltődnek
- [ ] API hívások Railway-re irányulnak
- [ ] Bejelentkezés átirányít Railway-re
- [ ] Fizetési folyamat működik

### **🔗 Integráció tesztek:**
- [ ] Frontend → Railway API hívások
- [ ] Authentication flow: Hostinger ↔ Railway
- [ ] Stripe checkout: Hostinger → Railway → Stripe
- [ ] Email notifications működnek

---

## 🚨 **HIBAELHÁRÍTÁS**

### **CORS Error:**
```javascript
// Railway app/api routes-ban:
const headers = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};
```

### **API hívások nem működnek:**
```bash
# Ellenőrizd:
1. NEXT_PUBLIC_API_URL helyes-e a Hostinger .env-ben
2. Railway app fut-e és válaszol-e
3. Network tab-ban látható-e a Railway domain
```

### **Authentication problémák:**
```bash
# Ellenőrizd:
1. NEXTAUTH_URL mindkét oldalon helyes
2. AUTH_SECRET ugyanaz mindenhol
3. Railway-n auth endpoints működnek
```

---

## 💰 **KÖLTSÉGVETÉS**

### **🆓 Ingyenes komponensek:**
- ✅ Railway: 500h/hó + PostgreSQL (ingyenes tier)
- ✅ Hostinger: Jelenlegi hosting csomag
- ✅ Let's Encrypt SSL: Ingyenes
- ✅ GitHub: Public repo hosting

### **💳 Fizetős komponensek:**
- 🔧 Stripe: Transaction fees (csak sikeres fizetéseknél)
- 📧 Email szolgáltatás: Gmail app password (ingyenes)

### **📊 Összesen: $0/hó kezdéshez!** 🎉

---

## 🎯 **VÉGEREDMÉNY**

```
🌐 FRONTEND: https://yourdomain.com
   ├── Static files (HTML, CSS, JS)
   ├── Fast loading (Hostinger CDN)
   └── SEO optimized

🔧 BACKEND: https://web-production-abc.up.railway.app  
   ├── Next.js API routes
   ├── PostgreSQL database
   ├── Authentication (NextAuth)
   ├── Stripe payments
   └── Email notifications

🔗 INTEGRATION:
   ├── Frontend API calls → Railway
   ├── Shared authentication state
   ├── Seamless user experience
   └── Professional setup
```

**🏁 PROFESSIONAL SETUP READY!** 🚀 