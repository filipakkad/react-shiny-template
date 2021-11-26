generate_ggplot <- function(title = "PLOT TITLE") {
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
         title = title,
         caption = "Source: midwest")
}
