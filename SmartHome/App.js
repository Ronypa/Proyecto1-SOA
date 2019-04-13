import { createStackNavigator } from 'react-navigation'

import Login from './screens/login-page'
import HomeScreen from './screens/main-screen'
import HouseScreen from './screens/controls-screen'
import OptionsScreen from './screens/configuration-screen'

const App = createStackNavigator({
  Login: { screen: Login },
  Home: { screen: HomeScreen },
  HouseControls: { screen: HouseScreen },
  Options: { screen: OptionsScreen },
})

export default App
