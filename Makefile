.PHONY: css csswa slideswa install build

all: css build

css:
	compass compile --force -e production src

csswa:
	compass watch src

slideswa:
	jade -w -P src/slides/osb_2014_net_art/*

install: node_modules Makefile
	npm install

build: install css 
	node --harmony index.js
