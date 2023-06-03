git checkout .
rm -drf ./node_modules
git pull origin dev
chmod +x ./start.sh
npm i
pm2 delete GBG-dev
pm2 start src/app.js --name GBG-dev
pm2 ls