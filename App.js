import React, { useState, useEffect } from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApplicationProvider, IconRegistry } from "react-native-ui-kitten";
import { mapping, dark as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Client from "./apolloClient";
import AppLoader from "./core/AppLoader";
import router from "./core/Router";

const App = () => {
  const [signedIn, setSignedIn] = useState(null);
  let Router = router(signedIn);

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
        },
        images: [
          require("./assets/images/source/image-profile-1.jpg"),
          require("./assets/images/source/image-profile-2.jpg"),
          require("./assets/images/source/image-profile-3.jpg"),
          require("./assets/images/source/image-profile-4.jpg"),
          require("./assets/images/source/image-profile-5.jpg"),
          require("./assets/images/source/image-profile-6.jpg"),
          require("./assets/images/source/image-profile-7.jpg"),
          require("./assets/images/source/image-profile-8.jpg"),
          require("./assets/images/source/image-profile-9.jpg"),
          require("./assets/images/source/image-profile-10.jpg")
        ]
      }}
    >
      <ApolloProvider client={Client}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          {signedIn !== null ? <Router /> : null}
        </ApplicationProvider>
      </ApolloProvider>
    </AppLoader>
  );
};

export default App;
