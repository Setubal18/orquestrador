# Orquestrador de Aplicações

Projeto criado pelo time bixcoito para facilitar a comunicação entre varias aplicações utilizando a tecnlogia **single-spa** (um agregador de aplicações SPA)

## Instalando Dependências

```
yarn install ou npm install
```

## Ambiente de desenvolvimento

```
yarn start ou npm start
```

## Build do projeto

```
yarn build ou npm build
```

## Entendendo o Orquestrador

O orquestrador agrega vários SPA(React, Vue, AngularJS e Angular+), ou seja, as aplicações agregadas precisam estar rodando em ambientes separados. Caso não estejam rodando, essa aplicação vai apenas mostrar uma tela branca.

O projeto tem 2 arquivos que merecem atenção: `index.ejs` e `medgrupo-root-config.js`

- `index.ejs` - Contém o "HTML" do projeto, as importações das bibliotecas e das aplicações agregadas.

- `medgrupo-root-config.js` - Contém o "JS" do projeto. Nele tem as configurações que registra as aplicações para suas rotas.

## Colocando sua aplicação no orquestrador

### Criando projeto do zero

1. Instalar a ferramenta `create_single_spa`:

```
npm install --global create-single-spa
ou
yarn global add create-single-spa
```

2. Criar um projeto com o `create_single_spa`

```
npm init single-spa
ou
npx create-single-spa.
ou
yarn create single-spa
```

3. Vão aparecer 3 opções, selecione a primeira:

```
Select type to generate (Use arrow keys)
> single-spa application / parcel
  in browser utility module (styleguide, api cache, etc)
  single-spa root config
```

> A opção `single-spa application / parcel` vai criar uma **aplicação pra ser usada em um orquestrador**

> A opção `single-spa root config` vai **criar um orquestrador**

4. Defina as outras configurações como desejar, dando atenção ao **nome da organização** (todos os projetos **devem estar com o mesmo nome de organização**):

```
? Which framework do you want to use? <resposta>
? Which package managerdo you want to use? <resposta>
? Will this project use Typescript? <resposta>
? Organization name (can use letters, numbers, dash or underscore) <resposta>
```

5. A aplicação é criada com sucesso!

### Inserindo no orquestrador

No projeto do orquestrador, vá no arquivo `medgrupo-root-config.js`. Ele estará mais ou menos assim:

```js
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@medgrupo/home-react",
  app: () => System.import("@medgrupo/home-react"),
  activeWhen: (location) => location.pathname === "/",
});

registerApplication({
  name: "@medgrupo/react",
  app: () => System.import("@medgrupo/react"),
  activeWhen: ["/react"],
});

registerApplication({
  name: "@medgrupo/vue",
  app: () => System.import("@medgrupo/vue"),
  activeWhen: ["/vue"],
});

[...]

start({
  urlRerouteOnly: true,
});
```

A função `registerApplication` registra a sua aplicação onde vc inclui um _nome_, _aonde sua aplicação se encontra_ e o _path_. Basta chamar a função com os parâmetros da sua aplicação.

> Obs: (passando uma função você define que seu path será absoluto) em mod de array ex [‘/rota’] ele permite navegação interna e componentes que são com o path ‘/’ coexistem com as demais aplicações;

```js
registerApplication({
  name: "@medgrupo/meu-app", // Nome definido no arquivo index.ejs. @<organização>/<aplicação>
  app: () => System.import("@medgrupo/meu-app"), // Função de inicialização
  activeWhen: ["/meu-app"], // Rota (apesar de ser array, só aceita 1 rota)
});
```

Agora no arquivo `index.ejs` importe a sua aplicação nessa sessão:

```html
<% if (isLocal) { %>
<script type="systemjs-importmap">
  {
    "imports": {
      "@medgrupo/root-config": "//localhost:9000/medgrupo-root-config.js",
      "@medgrupo/react": "//localhost:8500/medgrupo-react.js",
      "@medgrupo/vue": "//localhost:8085/js/app.js",
      "@medgrupo/navbar-vue": "//localhost:8081/js/app.js",
      "@medgrupo/automatizacao": "//localhost:8082/js/app.js",
      "@medgrupo/home-react": "//localhost:8600/medgrupo-home-react.js",
      "@medgrupo/navbar-react": "//localhost:8601/medgrupo-navbar-react.js",
      "@medgrupo/adm-inscricoes-react": "//localhost:8083/medgrupo-ADM-INSCRICOES-REACT.js",
      "@medgrupo/adm-vuejs": "//localhost:8701/js/app.js",
      "@medgrupo/angular": "//localhost:4200/main.js"
    }
  }
</script>
<% } %>
```

> **IMPORTANTE:** cada aplicação deve **rodar em uma porta diferente**

Adicione:

```js
"@medgrupo/meu-app": "//localhost:8008/app.js"
```

**Para saber qual arquivo js rodar**: abra a sua aplicação no browser (Ex.: http://localhost:8082/). Vai aparecer um aviso _Your Microfrontend is not here_ . Nas instruções, vai ter um link com a _base da url + um arquivo JS_. Ex.: _http://localhost:8082/js/app.js_ ou _http://localhost:8082/medgrupo-react.js_ ou outro link.

> **Para rodar a sua aplicação sozinha**, sem depender do single-spa, rode>
>
> ```
> yarn serve:single-spa:angular (angular)
> ou
> yarn start:standalone (react)
> ou
> yarn serve:standalone (vue)
> ```

> O arquivo ejs permite criar condições nos imports podendo criar ambientes de homol e prod

##
