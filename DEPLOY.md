# Deploy 2 github

ng build --prod --base-href "https://vadim-gentoomen.github.io/ng-ol-test/"
npx angular-cli-ghpages --dir=dist/ng-ol-test

or 

npx angular-cli-ghpages --dir=dist/ng-ol-test --repo=https://GH_TOKEN@github.com/vadim-gentoomen/ng-ol-test.git



