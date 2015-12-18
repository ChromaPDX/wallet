echo 'building...'
stylus www/bower_components/chroma-style/style --out www/css/
stylus www/bower_components/chroma-style/style/embellish/inverse.styl --out www/css/
stylus www/bower_components/chroma-style/style/components/footer.styl --out www/css/
stylus www/bower_components/chroma-style/style/lib --out www/css/lib
stylus www/bower_components/chroma-style/style/components/navbar --out www/css/navbar
stylus www/bower_components/chroma-style/style/components/panels.styl --out www/css

cp www/bower_components/chroma-style/fonts/Brandon_reg.otf www/packages/chroma_style/fonts/Brandon_reg.otf
cp www/bower_components/chroma-style/fonts/Gotham-Bold.ttf www/packages/chroma_style/fonts/Gotham-Bold.ttf
