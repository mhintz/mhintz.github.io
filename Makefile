.PHONY: data content watch css

all: css

data:
	node data/build.js data

content:
	rm -rf content/*
	node data/build.js build

watch:
	compass watch

css:
	compass compile --force -e production