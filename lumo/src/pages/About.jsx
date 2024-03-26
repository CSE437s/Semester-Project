/* About.jsx
Basic about page
*/
import { Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Stack
      className="fullscreen"
      direction={{
        xs: "column",
        md: "row-reverse",
      }}
      alignItems="center"
      justifyContent="center"
      padding={3}
      spacing={4}
    >
      <div>
        <Typography component="h1" variant="h4" textAlign="center" fontWeight="bold">
          About Us
        </Typography>

        <Typography maxWidth="sm" variant="body1" marginTop={2}>
          <strong>Article 26</strong> in The UN Declaration of Human Rights states that everyone has
          the right to education. As a team of minorities, we have experienced the effects of
          financial literacy not being held to this same standard.
          <br />
          <br />
          The <strong>Financial Phenotype Test</strong>, similar to the Myers Briggs personality
          test, is a tool we've developed to help individuals understand their unique financial
          personality. By understanding one's <strong>financial phenotype</strong>, individuals can
          gain insights into their financial tendencies, strengths, and areas for improvement,
          enabling them to make more informed financial decisions and build healthier financial
          habits.
          <br />
          <br />
          Leveraging <strong>artificial intelligence (AI)</strong>, we intend to provide
          personalized financial guidance tailored to each user's distinct financial phenotype.
          <br />
          <br />
        </Typography>

        <Button variant="contained" component={Link} to="/home/quiz" color="primary">
          Take the Financial Phenotype Test
        </Button>
      </div>
    </Stack>
  );
}
