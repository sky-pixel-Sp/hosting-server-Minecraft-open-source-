#!/bin/bash

# Ambil port secara dinamis dari Pterodactyl ($SERVER_PORT), di panel kamu: 4120.
# Jika tidak ada, fallback ke 3000.
REAL_PORT="${SERVER_PORT:-${PORT:-3000}}"
export PORT=$REAL_PORT
export SERVER_PORT=$REAL_PORT

echo "=========================================="
echo " Starting SkyHub UI + Cloudflare Tunnel"
echo " Port Terdeteksi: $REAL_PORT"
echo "=========================================="

# Otomatis install package jika belum ada
if [ ! -d "node_modules" ]; then
  echo "📦 [0/2] Menginstall dependencies..."
  npm install
fi

# Otomatis build React & Server jika dist/server.cjs tidak ditemukan
if [ ! -f "dist/server.cjs" ]; then
  echo "🔨 [0/2] Membangun aplikasi (Vite Build)... ini mungkin memakan waktu sebentar."
  npm run build
fi

echo "🚀 [1/2] Memulai Node.js Server (SkyHub UI)..."
node dist/server.cjs &
NODE_PID=$!

# Tunggu sebentar sampai web server siap
sleep 3

echo "🌐 [2/2] Memulai Cloudflared Tunnel..."
if [ ! -f "./cloudflared" ]; then
    echo "⬇️ Mendownload Cloudflared binary..."
    curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
    chmod +x cloudflared
fi

# Cek apakah file konfigurasi cloudflare ada
if [ -f "./cloudflare.json" ]; then
    # Mendapatkan detail dari JSON
    CF_ID=$(node -e "console.log(require('./cloudflare.json').tunnel_id || '')")
    CF_NAME=$(node -e "console.log(require('./cloudflare.json').tunnel_name || '')")
    CF_HOST=$(node -e "console.log(require('./cloudflare.json').hostname || '')")
    CF_CRED=$(node -e "console.log(require('./cloudflare.json').cred_file || '')")
    
    mkdir -p .cloudflared
    
    # Membuat config.yml dinamis yang mengarah ke http://localhost:$REAL_PORT (Node.js)
    cat > .cloudflared/config.yml << CFEOF
tunnel: $CF_ID
credentials-file: $CF_CRED

ingress:
  - hostname: $CF_HOST
    service: http://localhost:$REAL_PORT
    originRequest:
      noTLSVerify: true
  - service: http_status:404
CFEOF

    echo "✅ Konfigurasi Tunnel untuk $CF_HOST berhasil diamankan (Meneruskan ke Port $REAL_PORT)"
    ./cloudflared tunnel --config .cloudflared/config.yml run "$CF_NAME"
else
    echo "⚠️ PERINGATAN KRITIS: File 'cloudflare.json' TIDAK DITEMUKAN di server!"
    echo "👉 Silahkan upload file cloudflare.json milikmu ke File Manager (sejajar dengan package.json)."
    echo "👉 Jika tidak di-upload, web kamu akan menampilkan Error 1033 (Tunnel error)."
    wait $NODE_PID
fi
