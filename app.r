library(shiny)
library(ggplot2)
library(svglite)
library(config)
library(magrittr)


generate_ggplot <- function() {
  options(scipen = 999)
  theme_set(theme_bw())
  data("midwest", package = "ggplot2")
  ggplot(midwest, aes(x = area, y = poptotal)) +
    geom_point(aes(col = state, size = popdensity)) +
    geom_smooth(method = "loess", se = F) +
    xlim(c(0, 0.1)) +
    ylim(c(0, 500000)) +
    labs(subtitle = "Area Vs Population",
         y = "Population",
         x = "Area",
         title = "Scatterplot",
         caption = "Source: midwest")
}


config <- config::get()
options(shiny.port = config$shiny_port)
options(shiny.autoreload = config$shiny_autoreload)
webapp_dir <- config$webapp_dir

ui <- function() {
  addResourcePath("static", file.path(webapp_dir, "static"))
  fluidPage(
    suppressDependencies("bootstrap"),
    htmlTemplate(file.path(webapp_dir, "index.html"))
  )
}

server <- function(input, output, session) {
  
  ggplot_url_svg <- session$registerDataObj(
    name = "example_plot_svg",
    data = list(),
    filterFunc = function(data, req) {
      if(req$REQUEST_METHOD == "GET") {
        gg <- generate_ggplot()
        tmp_path <- paste0(tempfile(),".svg")
        ggsave(tmp_path, plot = gg)
        readBin(tmp_path, "raw", 100000000) %>%
          shiny:::httpResponse(200, "image/svg+xml", .)
      }
    }
  )
  
  session$sendCustomMessage("hello_react", "I AM THE MESSAGE FROM SHINY SERVER")
  session$sendCustomMessage("urls", {
    list(
      ggplot_url_svg = ggplot_url_svg
    )
  })
}

shinyApp(ui, server)
