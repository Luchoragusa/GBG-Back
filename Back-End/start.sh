git checkout .
rm -drf ./node_modules
git pull origin main
chmod +x ./start.sh
npm i
pm2 delete GBG
pm2 start src/app.js --name GBG
pm2 ls