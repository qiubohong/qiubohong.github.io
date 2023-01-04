cd source
hexo g
cd ../
git add . *
git commit -m "update"
git push

rsync -av -e ssh --exclude 'source' /Users/borfyqiu/Desktop/study/github/qiubohong.github.io/* root@1.13.188.124:/usr/share/nginx/html/