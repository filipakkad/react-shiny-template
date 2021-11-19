![Maintcainer](https://img.shields.io/badge/maintainer-filpro-blue)
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/filpro)


# React - Shiny Template

[**See the demo**](https://akkido.shinyapps.io/react_shiny_template/)

## React developers - welcome on (dash) board!

This setup is allowing the user to build frontend in pure [React.js](https://reactjs.org/) whereas keep the backend in [Shiny](https://shiny.rstudio.com/).
But one may ask - why?

1. By splitting frontend and backend R/Shiny developer can now collaborate with React developer on creating beautiful, modern web applications.
2. Shiny server won't be needed for generating UI (everything on the browser side).
3. UI part is no longer dependent on R wrappers of JS libraries. 
4. You are able now to take advantage of:
    - [Material UI](https://mui.com/getting-started/usage/), [PrimeReact](https://primefaces.org/primereact/showcase/), [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/controls/web), [React-Bootstrap](), [Blueprint](https://blueprintjs.com/docs/), [Ant Design](https://ant.design/components/overview/) and many other great UI libraries.
    - static typing with [TypeScript](https://www.typescriptlang.org/)
    - [mobx](https://www.mobxjs.com/), [redux](https://redux.js.org/) for state management
    - modern tools for designing React components - e.g. [Storybook](https://storybook.js.org/docs/react/get-started/introduction), [styled-components](https://styled-components.com/)
    - solutions addressing performance issues - e.g. [react-virtualized](https://github.com/bvaughn/react-virtualized)/[react-window](https://github.com/bvaughn/react-window) for rendering huge lists
    - support from large React community
    - (many many others)

## Setup

The setup allows for:
1. Building the app and then using it with Shiny
2. Using [Node server for development](https://create-react-app.dev/docs/getting-started/#npm-start-or-yarn-start) (to see changes made live)

The React app has been set up using [`create-react-app`](https://create-react-app.dev/docs/getting-started). Small modifications were required to make the setup working, however I wanted to avoid [`ejecting`](https://create-react-app.dev/docs/available-scripts#npm-run-eject) as this one-way operation breaks support from `create-react-app`. Instead I used [`craco`](https://github.com/gsoft-inc/craco) for overriding `webpack` configuration (without resigning from support from `create-react-app`). This way we kind of have our cake and eat it 🙂

# Launching the app

Make sure you have all the `R` dependencies installed:

``` r
renv::restore()
```

Then you launch the app like any other Shiny app
``` r
shiny::runApp()
```

# Development
## Starting development server

Make sure you have all the `R` dependencies installed:

``` r
renv::restore()
```

Then you need to go to React directory inside the project

``` console
cd React
```
If you are starting the development for the first time you need to install all the dependencies:

``` console
npm install
```

And then you need to start both Node development server and Shiny app. You can do both just by running the command:

``` console
npm start
```

And you are ready to go! 

---

Once you decide you React app is ready you need to build it and place it inside your Shiny project. You can do it by running the command:
``` console
npm run build
```

Now, you can run your Shiny app as usual. 

## Communication between Shiny and React

There are basically three ways how React app can communicate with Shiny backend:
  1. [Shiny → React (websocket)](#1-shiny--react-websocket)
  2. [React → Shiny (websocket)](#2-react--shiny-websocket)
  > You can also learn more about communication between JS and R through websocket [HERE](https://shiny.rstudio.com/articles/communicating-with-js.html)
  3. [React ⇄ Shiny (REST API)](#3-react--shiny-rest-api)



The examples given below aim to present just the idea of how the connection could be established (putting aside applicable design patterns).

> **NOTE**: no `ui` function is being presented assuming that all the `UI` is being handled by `React` app

### 1. Shiny → React (websocket)
#### Example
On `Shiny` server side:

``` r
library(shiny)

server <- function(input, output, session) {
  #...
  session$sendCustomMessage("message_from_shiny", "HI, THIS IS A MESSAGE FROM SHINY")
}
```

On `React` side:

``` javascript 
const MyComponent = () => {
  const [shinyMessage, setShinyMessage] = useState(null);
  
  window.Shiny.addCustomMessageHandler('message_from_shiny', function(message) => {
  /* Whatever action you need to do with the data */
    console.log(message);
    setShinyMessage(message);
  })
  
  return <p>{shinyMessage}</p>
}
```

### 2. React → Shiny (websocket)
#### Example
On `Shiny` server side:
``` r
library(shiny)

server <- function(input, output, session) {
  #...
  observeEvent(input$message_from_react, {
    print(input$message_from_react)
  })
}
```

On `React` side:

``` javascript 
const MyComponent = () => {
  const sendMessage = () => {
    window.Shiny.setInputValue('message_from_react', 'This a message from React!')
  }
  
  return <button onClick={sendMessage}>Send message to Shiny!</button>
}
```

### 3. React ⇄ Shiny ([REST API](https://www.ibm.com/cloud/learn/rest-apis))
#### Description
This is probably the least popular way of communicating with Shiny server. However, there are many benefits from using it:

1. Thanks to the stateless nature of `REST API` you can manage the app state solely in `React` (with help of e.g. [`mobx`](https://mobx.js.org/), [`redux`](https://redux.js.org/))
2. You don't need to configure two way communication whenever React needs anything from Shiny (i.e. [approach 1](#1-shiny--react-websocket) combined with [approach 2](#2-react--shiny-websocket))
3. It would be potentially easier to replace Shiny with any other `REST API` backend

Existence of `REST API` in the Shiny package given out of the box is a great and promising feature. However, *out of the box* doesn’t actually mean transparent in a sense that the developer must combine certain - not intuitively named or easily accessible - functions in order to achieve it:

- [`session$registerDataObj(name, data, filterFunc)`](https://shiny.rstudio.com/reference/shiny/latest/session.html)
- [`shiny:::httpResponse(status, content_type, content, headers)`](https://shiny.rstudio.com/reference/shiny/latest/httpResponse.html)

##### `session$registerDataObj(name, data, filterFunc)`
> **registerDataObj(name, data, filterFunc)**<br/>
> Publishes any `R` object as a URL endpoint that is unique to this session. `name` must be a single element character vector; it will be used to form part of the URL. `filterFunc` must be a function that takes two arguments: `data` (the value that was passed into `registerDataObj`) and req (an environment that implements the `Rook` specification for HTTP requests). `filterFunc` will be called with these values whenever an HTTP request is made to the URL endpoint. The return value of `filterFunc` should be a `Rook`-style response.


So instead of publishing any R object directly (in our case `data = list()`) we are focusing on the `filterFunc(data, req)` function, which in this case will work as the request handler. 

The function returns an URL which looks similarily to this:
> session/13b6edsessiontoken3764158e8a3af1/dataobj/example-api-example-get-api?w=&nonce=14367c50429fc201

##### `shiny:::httpResponse(status, content_type, content, headers)`
The response will be handled by Shiny private (`:::`) function `shiny:::httpResponse(...)` - there is no detailed description unfortunately (yet), but the idea is pretty straightforward - [see the documentation](https://shiny.rstudio.com/reference/shiny/latest/httpResponse.html). When determining `content_type` you can use [this source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

---

#### Graph

![graph](https://user-images.githubusercontent.com/54677165/142600070-48d240d5-c2ff-43c7-a9bd-166ce11bdd67.png)

---
#### Example
On `Shiny` server side:
``` r
library(shiny)
library(jsonlite)
library(dplyr)

server <- function(input, output, session) {
  #...
  data <- mtcars
  
  example_get_api_url <- session$registerDataObj(
    name = "example-get-api",
    data = list(), # Empty list, we are not sharing any object
    # That's the place where the request is being handled
    filterFunc = function(data, req) {
      if (req$REQUEST_METHOD == "GET") {
        response <- data
        response %>%
          toJSON(auto_unbox = TRUE) %>%
          shiny:::httpResponse(200, "application/json", .)
      }
    }
  )
  
  session$sendCustomMessage(
    "shiny_api_urls",
    list(
      example_get_api_url = example_get_api_url
    )
  )
}
```

On `React` side:

``` javascript 
const MyComponent = () => {
  const [urls, setUrls] = useState(null);
  const [data, setData] = useState([]);
  
  Shiny.addCustomMessageHandler('shiny_api_urls', function(urls) => {
    setUrls(urls);
    fetchData(urls);
  })
  
  const fetchData = async (urls) => {
    const fetchedData = await fetch(urls.example_get_api_url).then(data => data.json());
    setData(fetchedData);
  }
  
  const item_list = data.map(item => <li>{item.mpg}</li>);

  return <ul>{item_list}</ul>
}
```

---




# FAQ
## How does using Shiny REST API differ from [`Plumber`](https://www.rplumber.io/)?

1. Plumber doesn’t offer websocket connection out of the box as Shiny does. In other words, with Plumber only the client is initiating a communication - by making a request - whereas Shiny allows for bidirectional initialization. Having that the developer can trigger things to happen from the server side, e.g. send a notification/message to the browser.

2. As the UI is made as a static web page **it can be the part of the Shiny project**. Therefore the developer doesn’t have to bother with separate servers/deployments for backend and frontend. Deployment process to RStudio Connect will then be the same as for the standard Shiny app. 

3. The session is still managed by Shiny (all the REST URLs contain session token, so assuming that session token is secret the REST URLs might be considered as session-scoped). React app contains all Shiny dependencies (through [`{{ headContent() }}`](https://shiny.rstudio.com/articles/templates.html) used in [`htmlTemplate()`](https://shiny.rstudio.com/reference/shiny/latest/htmlTemplate.html) function), so when the session is over you can notice the characteristic grey page and notification about reloading the session.

