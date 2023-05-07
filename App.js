import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ListSelections from "./src/screens/ListSelections";
import ListSeparators from "./src/screens/ListSeparatorsScreen";
import PullToRefresh from "./src/screens/PullToRefreshList";
import SimpleList from "./src/screens/SimpleListScreen";
import SwpipeToDeleteList from "./src/screens/SwipeToDeleteList";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    SimpleList: SimpleList,
    ListSeparators: ListSeparators,
    ListSelections: ListSelections,
    SwipeToDeleteList: SwpipeToDeleteList,
    PullToRefreshList: PullToRefresh
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "RN List Building",
    },
  }
)

export default createAppContainer(navigator);