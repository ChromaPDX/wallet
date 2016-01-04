echo 'deploying...'
cd www
s3cmd -P --recursive --exclude='.DS_Store' -c ../s3cfg sync . s3://wallet.chroma.fund/
