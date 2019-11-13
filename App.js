import React, { useState } from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApplicationProvider, IconRegistry } from "react-native-ui-kitten";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Client from "./apolloClient";
import AppLoader from "./core/AppLoader";
import router from "./core/Router";
import Register from "./views/Register";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  const Router = router(signedIn);
  return (
    <AppLoader
      setSignedIn={setSignedIn}
      assets={{
        fonts: {
          "opensans-semibold": require("./assets/fonts/opensans-semibold.ttf"),
          "opensans-bold": require("./assets/fonts/opensans-bold.ttf"),
          "opensans-extrabold": require("./assets/fonts/opensans-extra-bold.ttf"),
          "opensans-light": require("./assets/fonts/opensans-light.ttf"),
          "opensans-regular": require("./assets/fonts/opensans-regular.ttf")
        }
      }}
    >
      <ApolloProvider client={Client}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <Register />
        </ApplicationProvider>
      </ApolloProvider>
    </AppLoader>
  );
};

export default App;
