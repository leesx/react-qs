#!/bin/sh
#
# An example hook script to prepare a packed repository for use over
# dumb transports.
#
# To enable this hook, rename this file to "post-update"

#!/bin/sh
unset GIT_DIR
DIR_ONE=/usr/local/works/awesome-app  #此目录为服务器页面展示目录  
cd $DIR_ONE
git init
git remote add deploy  /usr/local/works/repos/awesome-bare.git
git clean -df
git pull deploy  master
npm run debug:client
#pm2 restart awesome-app  #pm2重启项目即可