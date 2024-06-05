import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography color="black" variant="h6">
          Aplicacion de muestra e-comerce
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="textSecondary" variant="subtitle1">
          {`React | Redux | Material UI | React Router`}
        </Typography>
      </Grid>
    </Grid>
  );
};
