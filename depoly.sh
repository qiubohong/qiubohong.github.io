source ~/.bash_profile
cd source
nvm use v12.22.12
npm run deploy
cd ../
git add . *
git commit -m "update"
git push

rsync -av -e ssh --exclude 'source' --exclude 'node_modules' --exclude '__snapshots__' /Users/borfyqiu/Desktop/study/self/qiubohong.github.io/* root@1.13.188.124:/usr/share/nginx/html/
rsync -av -e ssh  /Users/borfyqiu/Desktop/study/self/qiubohong.github.io/fedlearn/source/* root@1.13.188.124:/usr/share/nginx/html/fedlearn/source/

curl -H 'Content-Type:text/plain' --data-binary @baidu_urls.txt "http://data.zz.baidu.com/urls?site=www.qborfy.com&token=kuOs5hlQSCQFsh00"
