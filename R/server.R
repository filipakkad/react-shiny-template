server <- function(input, output, session) {

  #' Endpoint for fetching ggplot (as svg)
  ggplot_url_svg <- session$registerDataObj(
    name = "example_plot_svg",
    data = list(),
    filterFunc = function(data, req) {
      if(req$REQUEST_METHOD == "GET") {
        params <- parseQueryString(req$QUERY_STRING)
        gg <- generate_ggplot(params$title)
        tmp_path <- paste0(tempfile(),".svg")
        ggsave(tmp_path, plot = gg)
        readBin(tmp_path, "raw", 100000000) %>%
          httpResponse(200, "image/svg+xml", .)
      }
    }
  )

  return_data <- ggplot2::midwest

  #' Endpoint for fetching data
  example_get_data_url <- session$registerDataObj(
    name = "example-get-data-api",
    data = list(),
    filterFunc = function(data, req) {
      if (req$REQUEST_METHOD == "GET") {
        response <- return_data[sample(5), ]
        response %>%
          toJSON(auto_unbox = TRUE) %>%
          httpResponse(200, "application/json", .)
      }
    }
  )

  observeEvent(input$message_from_react, {
    showNotification(input$message_from_react)
    print(input$message_from_react)
  })

  session$sendCustomMessage("message_from_shiny", "I AM THE MESSAGE FROM SHINY SERVER 🎉")

  #' Inform React about endpoints
  session$sendCustomMessage("urls", {
    list(
      ggplot_url_svg = ggplot_url_svg,
      example_get_data_url = example_get_data_url
    )
  })
}
