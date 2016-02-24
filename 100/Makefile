.PHONY: css
css:
	mkdir -p bundle
	postcss --watch  --use postcss-import --use autoprefixer css/app.css --output bundle/app.css

.PHONY: server
server:
	browser-sync start --server --directory ./ --files "*/*.css, */*.html, */*.js"


.PHONY: all
all:
	(make css  & make server & wait)

.PHONY: clean
clean:
	rm -r bundle

