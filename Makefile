dev:
	NODE_ENV=development npm start

bundle:
	NODE_ENV=production webpack -p
	cd dist && gzip bundle.js -c > bundle.gzjs
