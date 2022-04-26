library(shiny)
library(ggplot2)
library(svglite)
library(config)
library(dplyr)
library(jsonlite)
library(purrr)

config <- config::get()
options(shiny.port = 3838)
options(shiny.autoreload = FALSE)
options(shiny.autoload.r = TRUE)

WEBAPP_DIR <- config$webapp_dir
print(WEBAPP_DIR)
addResourcePath("static", file.path(WEBAPP_DIR, "static"))

shinyApp(
  ui = function() {
    tagList(
      htmlTemplate(file.path(WEBAPP_DIR, "index.html"))
    )
  },
  server = server
)
