.PHONY: css site csswa jkwa

all: css site

css:
	compass compile --force -e production

site:
	jekyll build

csswa:
	compass watch

jkwa:
	jekyll serve --watch

slideswa:
	jade -w -P slides/osb_2014_net_art/*