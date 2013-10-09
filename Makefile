.PHONY: content

all: content

content:
	rm -rf content/*
	node js/build.js build