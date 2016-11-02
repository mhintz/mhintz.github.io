.PHONY: install css html deploy watch_osb_slides

all: install css html


# install / setup

node_modules: package.json
	npm install

install: Makefile node_modules


# content

css:
	compass compile --force -e production --no-line-comments --sass-dir=src/sass --css-dir=content/css
	cp -r src/fonts/ content/css/fonts/

html: install
	MODE=development DEBUG=metalsmith:* node --harmony src/index.js

# deploy: install
# 	MODE=production node --harmony src/index.js
# 	git checkout master
# 	cp -r build/* .
# 	git commit -a -m "Deployment"
# 	git push origin master


# single-use stuff

watch_osb_slides:
	jade -w -P content/slides/osb_2014_net_art/*
