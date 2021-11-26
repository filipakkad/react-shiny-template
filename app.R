library(shiny)
library(ggplot2)
library(svglite)
library(config)
library(dplyr)
library(jsonlite)
library(purrr)

#Sys.setenv(R_CONFIG_ACTIVE = "dev")
config <- config::get()
options(shiny.port = 3838)
options(shiny.autoreload = config$shiny_autoreload)
options(shiny.autoload.r = TRUE)

WEBAPP_DIR <- config$webapp_dir
addResourcePath("static", file.path(WEBAPP_DIR, "static"))

shinyApp(
  ui = function() {
    tagList(
      htmlTemplate(file.path(WEBAPP_DIR, "index.html"))
    )
  },
  server = server
)
