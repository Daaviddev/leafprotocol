
import styled from 'styled-components';
import { Box, Typography } from "@material-ui/core";

// import "./cardheader.scss";

const CustomTypography = styled(Typography)`
width: fit-content;
background-image: linear-gradient(111deg, #fa5853, #f46692 50%, #ffc444);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
font-weight: 900;
`

const CardHeader = ({ title, children }) => {
  return (
    <Box className={`card-header`}>
      <CustomTypography variant="h5">{title}</CustomTypography>
      {children}
    </Box>
  );
};

export default CardHeader;
