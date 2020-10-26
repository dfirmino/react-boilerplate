Escrevo esse post pois não é fácil encontrar algum material que explique de forma eficiente como se montar um boilerplate com react e typescrip sem o CRA (Create-React-App).
Embora a grande maioria dos casos o cra atenda perfeitamente, pode existir um determinado caso que em função de sua arquitetura você queira fazer um setup manual.
o cra é muito útil e longe de mim querer criticá-lo porém ele pode deixar sua arquitetura um pouco engessada.
Esse post irá explicar de forma detalhada cada passo do projeto, caso você não queira ler pule para o final do arquivo com o link do repositório.

# Padrões
Antes de começarmos de fato, vamos definir alguns padrões para que o projeto não vire a casa da mãe joanna.
Para os commits utilizaremos o [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

# Começando
Primeiro vamos criar a nossa pasta para iniciar o projeto
```bash
mkdir boilerplate && cd boilerplate
```
Agora vamos iniciar o package.json
```bash
npm init -y
```
Vamos iniciar o git
```bash
git init
```
Vamos adicionar um biblioteca para ajudar a gente a manter o padrão das mensagens de commit.
[git-commit-msg-linter](https://www.npmjs.com/package/git-commit-msg-linter)
```bash
npm i -D git-commit-msg-linter
```
Vamos agora criar o .gitignore a adicionar nele o node_modules
```bash
echo "node_modules\ncoverage\npublic/js" > .gitignore
```
Vamos instalar o typescript
```bash
npm i -D typescript
```
Agora o types do node (para garantir a tipagem do node)
```bash
npm i -D @types/node
```
Vamos agora criar o arquivo de configuração do typescript
```bash
touch tsconfig.json
```
dentro dele vamos digitar o seguinte:
```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "react",
    "rootDir": "src",
    "baseUrl": "src",
    "allowJs": true,
    "resolveJsonModule": true,
    "isolatedModules": false,
  },
  "include": [
    "src"
  ],
  "exclude": []
}
```
Caso você não entenda essas configurações você pode consultar [aqui](https://www.typescriptlang.org/tsconfig).

Agora vamos configurar o [eslint](https://eslint.org/), existem diversas formas para fazer isso eu vou escolher a que eu considero mais didática possível.
```bash
npx eslint --init
```
Vamos marcar a opção:
**To check syntax and find problems**
*o code style será feito pelo prettier daqui a pouco*
Depois marcamos: 
**JavaScript modules (import/export)**
**React**
**yes**
**Browser**
**JSON**
**yes**

Vamos adicionar um plugin para que nosso lint consiga trabalhar com hooks:
```bash
npm i -D eslint-plugin-react-hooks
```

Agora vamos configurar o prettier:
```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

Agora vamos editar nosso .eslintrc.json:
```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "settings": {
      "react" : {
        "version": "detect"
      }
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error"
    }
}
```
referências [aqui](https://eslint.org/docs/user-guide/configuring)

Vamos criar nosso .eslintignore

```bash
echo "node_modules\njest.config.js\ncoverage\npublic\nwebpack.config.js" > .eslintignore   
```

Vamos criar nosso .prettierrc:
```bash
touch .prettierrc
```
Dentro dele vamos colocar:
```json
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true
}
```
referências [aqui](https://prettier.io/docs/en/configuration.html)

Vamos adicionar um script de lint no nosso package.json para facilitar o trabalho:
```json
"lint": "eslint src"
```
Vamos agora adicionar o [lint-staged](https://github.com/okonet/lint-staged) para poder executar ações em nossos arquivos que estão na staged area do git

```bash
npm i -D lint-staged
```
Vamos adicionar também o [husky](https://www.npmjs.com/package/husky) para criarmos hooks no git

```bash
npm i -D husky
```

vamos criar nosso arquivo .lintstagedrc
```bash
touch .lintstagedrc.json
```

dentro dele vamos colocar
```json
{
  "*.{ts,tsx}" : [
      "eslint 'src/**' --fix ",
      "npm run test:staged"
  ]
}
```
vamos criar agora nosso huskyrc:
```bash
touch .huskyrc.json
```
dentro dele vamos colocar:
```json
{
    "hooks": {
        "pre-commit": "lint-staged && npm run test:ci",
    }
}
```

Vamos agora configurar o [jest](https://jestjs.io/) para nossos testes
```bash
npm i -D jest @types/jest ts-jest
```
Vamos criar o arquivo de configuração do jest
```bash
touch jest.config.js
```
dentro dele
```json
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy'
  }
}
```
referências [aqui](https://jestjs.io/docs/en/configuration)

Vamos adicionar agora alguns scripts pra teste no package.json
```json
"test": "jest --passWithNoTests --no-cache --verbose --runInBand",
"test:watch": "npm run test -- --watch",
"test:staged": "npm run test -- --findRelatedTests",
"test:ci": "npm run test -- --coveraged",
```
#Finalmente React \o/
Antes de prosseguir vamos certificar que seu projeto está igual ao meu:
![folder](https://i.ibb.co/BsKqsxH/Captura-de-Tela-2020-10-25-a-s-21-00-38.png)

Vamos começar instalando o react e o react dom
```bash
npm i react react-dom
```
e o types delas
```bash
npm i -D @types/react @types/react-dom
```
na raiz do projeto vamos criar uma pasta com o nome de public
```bash
mkdir public
```
dentro dessa pasta vamos criar um index.html com o seguinte conteudo
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="js/bundle.js"></script>
</body>
</html>
```
dentro de public vamos criar uma pasta js

vamos instalar e configurar o webpack agora
```
npm i -D webpack webpack-cli webpack-dev-server
```
vamos criar o arquivo do webpack.config.js na raiz do projeto
e dentro dele vamos adicionar o seguinte
```js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'public', 'js'),
    publicPath: path.join('public', 'js'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.(s)css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    writeToDisk: true,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```
vamos adicionar os plugins necessários pra fazer o webpack funcionar:
```bash
npm i -D clean-webpack-plugin node-sass sass-loader css-loader style-loader ts-loader
```
Analisando dependências:
* [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) - Plugin para limpar a pasta de build (ajuda com o cache).
* [node-sass](https://www.npmjs.com/package/node-sass) - Para conseguir usar sass dentro do node
* [css-loader](https://www.npmjs.com/package/css-loader) - Para que o webpack entenda algumas coisas como: @import, url()...
* [style-loader](https://www.npmjs.com/package/style-loader) - para o webpack consiga colocar o style no DOM.
* [sass-loader](https://webpack.js.org/loaders/sass-loader/) - Loader para que o webpack consiga trabalhar com sass
* [ts-loader](https://github.com/TypeStrong/ts-loader) - Para o webpack entender o typescript

Vamos criar uma pasta src e dentro dela um arquivo sass-module.d.ts com o seguinte:
```ts
declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}
```

dentro de src vamos criar o arquivo index.tsx com o seguinte conteúdo:
```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render(<App />, document.getElementById('app'))

```
dentro de src vamos criar a pasta components e criar o App.tsx
com o seguinte conteúdo: 
```tsx
import React from 'react'
import Styles from './App-styles.scss'

const App: React.FC = () => {
  return <h1 className={Styles.h1}>Glória a Deuxxx</h1>
}

export default App
```
ainda dentro de components vamos criar o App-styles.scss:
```css
.h1 {
  color: tomato;
}
```
E vamos criar um arquivo App.spec.tsx vazio por enquanto.
Por fim adicionamos o script de start no package.json:

```
"start": "webpack serve"
```
Nossa estrutura até aqui:
![estrutura](https://i.ibb.co/cCby9n3/Captura-de-Tela-2020-10-25-a-s-22-26-44.png)

## Preparando os testes no react
antes da gente começar a configurar os testes temos que instalar um pacote identity-obj-proxy para que o jest não "encrenque"com o sass.
```
npm i -D identity-obj-proxy
```
## Dicas
Podemos configurar o lint para ser executado após o save do arquivo, vou colocar um exemplo do meu settings do vscode mas aconselho da uma pesquisada na internet e ajustar no seu:
![Settings](https://i.ibb.co/R3bxB5b/Captura-de-Tela-2020-10-25-a-s-16-37-01.png)