import { createStackNavigator } from "react-navigation";

import Login from "./screens/login-page";
import HomeScreen from "./screens/main-screen";
import HouseScreen from "./screens/controls-screen";

const App = createStackNavigator({
  //Login: { screen: Login },
  HouseControls: { screen: HouseScreen },
  //Home: { screen: HomeScreen }
});

export default App;
