server <- function(input, output, session) {
  showNotification("Hello new Shiny session!")
  #' Generating HTTP API endpoints and sending links to React
  #' Endpoint 1 for fetching ggplot (as svg)
  ggplot_url_svg <- session$registerDataObj(
    name = "example_plot_svg",
    data = list(),
    filterFunc = function(data, req) {
      if(req$REQUEST_METHOD == "GET") {
        params <- parseQueryString(req$QUERY_STRING)
        gg <- generate_ggplot(params$title)
        tmp_path <- paste0(tempfile(),".svg")
        ggsave(tmp_path, plot = gg)
        #' Reading a plot svg file as binary and passing it to the response
        readBin(tmp_path, "raw", 100000000) %>%
          httpResponse(200, "image/svg+xml", .)
      }
    }
  )

  example_get_people_url <- session$registerDataObj(
    name = "example-get-people-api",
    data = list(),
    filterFunc = function(data, req) {
      if (req$REQUEST_METHOD == "GET") {
        n <- 500000
        response <- dplyr::tibble(
          first_name = randomNames::randomNames(n, which.names = "first"),
          last_name = randomNames::randomNames(n, which.names = "last"),
          age = as.integer(runif(n, 0, 70)),
          image_url = paste0("https://picsum.photos/40/40?", sample(letters, n, replace = TRUE))
        )
        response %>%
          toJSON(auto_unbox = TRUE) %>%
          httpResponse(200, "application/json", .)
      }
    }
  )

  #' Inform React about HTTP API endpoints through Websocket
  #' Otherwise React won't be able to use it
  session$sendCustomMessage("urls", {
    list(
      ggplot_url_svg = ggplot_url_svg,
      example_get_people_url = example_get_people_url
    )
  })

  #' Websocket communication between React and Shiny
  #' Listen for the message
  observeEvent(input$message_from_react, {
    showNotification(input$message_from_react)
    print(input$message_from_react)
  })

  #' Send the message
  session$sendCustomMessage("message_from_shiny", "HELLO FROM SHINY SERVER 🎉")
}
