#!/bin/bash

NAME=$1

if [ -z "$NAME" ]; then
  echo 'Please specify the project name:'
  echo '  npm init nrapp <project-nanme>'
  exit 1
fi

create-react-app $NAME
cd $NAME
ESLINT_VERSION=$(grep '"eslint"' node_modules/react-scripts/package.json | sed 's/[a-z": ,]//g')

npm i axios body-parser bookshelf bootstrap classnames express express-async-handler final-form knex lodash mysql2 prop-types qs ramda react-final-form react-icons react-router react-router-dom react-select react-toastify reactstrap ws
npm i -D concurrently eslint@$ESLINT_VERSION eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react http-proxy-middleware nodemon

sed -i '' 's/"start": "react-scripts start",/"backend": "nodemon --watch src\/backend src\/backend",\
    "frontend": "react-scripts start",\
    "start": "concurrently ''npm run backend'' ''npm run frontend''",/g' package.json

rm -rf src public README.md .git

git clone --depth=1 https://github.com/dmitrydyomin/nrapp.git _src
mv _src/src _src/public _src/.eslintrc.js _src/knexfile.js ./
rm -rf _src

sed -i '' "s/app/$NAME/g" knexfile.js

git init
git add .
git commit -m 'First commit'
