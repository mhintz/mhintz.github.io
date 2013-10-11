.PHONY: data content

all: data content

data:
	node data/build.js data

content:
	rm -rf content/*
	node data/build.js build