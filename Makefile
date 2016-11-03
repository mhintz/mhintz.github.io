.PHONY: install css html deploy watch_osb_slides

all: install css html


# install / setup

node_modules: package.json
	npm install

install: Makefile node_modules


# content

css:
	compass compile --force --no-line-comments --sass-dir=src/sass --css-dir=content/css
	cp -r src/fonts/ content/css/fonts/

# uncomment this line to show debug logging in metalsmith
# DEBUG=metalsmith-*
html: install
	MODE=development DEBUG=$(DEBUG) node --harmony src/index.js

deploy: install
	MODE=production node --harmony src/index.js
	git checkout master
	cp -r build/* .
	git add -A
	git commit -a -m "deploy new site contents"
	git push origin master
	git checkout develop
# see also? https://gist.github.com/cobyism/4730490


# single-use stuff

watch_osb_slides:
	jade -w -P content/slides/osb_2014_net_art/*
