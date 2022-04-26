args <- commandArgs(trailingOnly = TRUE)
if (is.null(args[1])) {
    r_config_active <- "prod"
} else {
    r_config_active <- args[1]
}
Sys.setenv(R_CONFIG_ACTIVE = r_config_active)
shiny::runApp(launch.browser = TRUE)
