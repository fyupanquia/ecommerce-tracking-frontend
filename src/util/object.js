export const patchThemeWithProvider = (theme, obj) => {
  theme.palette.primary.main = obj.primaryColor;
  theme.palette.primary.focus = obj.primaryColor;
  theme.palette.secondary.main = obj.secondaryColor;
  theme.palette.secondary.focus = obj.secondaryColor;

  theme.palette.gradients.primary.main = obj.primaryColor;
  theme.palette.gradients.primary.focus = obj.primaryColor;
  theme.palette.gradients.primary.state = obj.primaryColor;
  theme.palette.gradients.secondary.main = obj.secondaryColor;
  theme.palette.gradients.secondary.focus = obj.secondaryColor;
  theme.palette.gradients.secondary.state = obj.secondaryColor;
  return theme;
};
