#!/bin/bash

# Pastikan port web server menggunakan 3000 agar sesuai dengan tunnel
export PORT=3000
export SERVER_PORT=3000

echo "=========================================="
echo " Starting SkyHub UI + Cloudflare Tunnel"
echo "=========================================="

echo "🚀 [1/2] Memulai Node.js Server (SkyHub UI)..."
node dist/server.cjs &
NODE_PID=$!

# Tunggu sebentar sampai web server siap
sleep 2

echo "🌐 [2/2] Memulai Cloudflared Tunnel..."
if [ ! -f "./cloudflared" ]; then
    echo "Mendownload Cloudflared..."
    curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
    chmod +x cloudflared
fi

# Cek apakah file konfigurasi cloudflare ada
if [ -f "./cloudflare.json" ]; then
    # Mendapatkan detail dari JSON
    CF_ID=$(node -e "console.log(require('./cloudflare.json').tunnel_id)")
    CF_NAME=$(node -e "console.log(require('./cloudflare.json').tunnel_name)")
    CF_HOST=$(node -e "console.log(require('./cloudflare.json').hostname)")
    CF_CRED=$(node -e "console.log(require('./cloudflare.json').cred_file)")
    
    mkdir -p .cloudflared
    
    # Membuat config.yml dinamis yang mengarah ke http://localhost:3000 (Node.js)
    cat > .cloudflared/config.yml << CFEOF
tunnel: $CF_ID
credentials-file: $CF_CRED

ingress:
  - hostname: $CF_HOST
    service: http://localhost:3000
  - service: http_status:404
CFEOF

    echo "✅ Konfigurasi Tunnel untuk $CF_HOST ter-update (Meneruskan ke Port 3000)"
    ./cloudflared tunnel --config .cloudflared/config.yml run "$CF_NAME"
else
    echo "⚠️ Peringatan: cloudflare.json tidak ditemukan! Hanya Node.js yang berjalan."
    echo "⚠️ Error 1033 akan terjadi di web jika tunnel tidak menyala."
    wait $NODE_PID
fi
