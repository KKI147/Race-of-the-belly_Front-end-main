import GlobalStyle from "./shared/GlobalStyle";
import { ThemeProvider } from "styled-components";
import Router from "./shared/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;

const theme = {
  mainC: "#e1eef6",
  subC: "#fcbe32",
  textBoxC: "#f5f2e",
  thirdC: "#004e66",
};
