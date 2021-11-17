# React - Shiny Template

This setup is allowing the user to write the frontend in pure React.js whereas keep the backend in Shiny. This includes:
1. Building the app and then using it with Shiny
2. Using Node server for development (to see changes made live)

The React app has been set up using [`create-react-app`](https://create-react-app.dev/docs/getting-started). In order to provide easier maintenance and updating we avoided [`ejecting`](https://create-react-app.dev/docs/available-scripts#npm-run-eject). However, small modifications were required to make the setup working. For this purpose [`craco`](https://github.com/gsoft-inc/craco) has been used, which allows for overriding `webpack` configuration without `ejecting`. 

## How does it differ from just using `Plumber`?

1. Plumber doesn’t offer websocket connection out of the box as Shiny does. In other words, with Plumber only the client is initiating a communication - by making a request - whereas Shiny allows for bidirectional initialization. Having that the developer can trigger things to happen from the server side, e.g. send a notification/message to the browser.

2. As the UI is made as a static web page (at least in this setup) **it can be the part of the Shiny project**. Therefore the developer doesn’t have to bother with separate servers for backend and frontend. Deployment process to RStudio Connect will then be the same as for the standard app. 

3. The session is still managed by Shiny (all the REST URLs have session token embedded, so assuming that session token is secret the REST URLs are session-scoped). React app has all the Shiny dependencies ([`{{ headContent() }}`](https://shiny.rstudio.com/articles/templates.html)), so when the session is over you can notice the characteristic grey page and notification about reloading the session.

## How to run the template?

Make sure you have all the `R` dependencies installed:

``` r
renv::restore()
```

Then you launch the app like any other Shiny app
``` r
shiny::runApp()
```

# Development

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

Once you decide you app is ready you need to build it and place it inside your Shiny project, by running the command:
``` console
npm run build
```

Now, you can run your Shiny app as usual. 

