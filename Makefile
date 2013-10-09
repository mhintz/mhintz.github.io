.PHONY: data content

all: data content

data:
	node js/build.js data

content:
	rm -rf content/*
	node js/build.js build