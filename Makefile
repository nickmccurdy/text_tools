lint: jslint csslint

jslint:
	jslint --terse js/*.js

csslint:
	csslint --quiet --ignore=adjoining-classes *.css
