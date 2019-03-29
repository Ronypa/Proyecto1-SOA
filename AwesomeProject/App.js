import { createStackNavigator } from "react-navigation";

import Login from "./screens/login-page";
import HomeScreen from "./screens/main-screen";
import HouseScreen from "./screens/functions-screen";

const App = createStackNavigator({
  Login: { screen: Login },
  House: { screen: HouseScreen },
  Home: { screen: HomeScreen }
});

export default App;
