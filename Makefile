.PHONY: watch css site serve

all: css site

watch:
	compass watch

css:
	compass compile --force -e production

site:
	jekyll build

serve:
	bundle exec jekyll serve