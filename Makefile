.PHONY: all build install css watch-css html server production-build deploy watch_osb_slides

all: css html

build: html # alias


# install / setup

node_modules: package.json
	npm install

install: Makefile node_modules


# content

css:
	compass compile --force --no-line-comments --sass-dir=src/sass --css-dir=content/css

watch-css:
	compass watch --force --no-line-comments --sass-dir=src/sass --css-dir=content/css

# uncomment this line to show debug logging in metalsmith
# DEBUG=metalsmith-*
html: install
	MODE=development DEBUG=$(DEBUG) node --harmony src/index.js

server:
	cd build; python2.7 -m SimpleHTTPServer 8000

production-build: install css
	MODE=production node --harmony src/index.js

deploy: install production-build
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
