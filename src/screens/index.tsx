import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Details from './Newspaper/Newspaper';
import Bookmark from './Bookmark/Bookmark';
import ChatBot from './ChatBot/ChatBot';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    borderTopWidth: 0,
    height: 70,
    padding: 10,

    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Sombra para Android
    elevation: 10,
  },
  tabBarActiveTintColor: '#1E88E5',
  tabBarInactiveTintColor: '#b4b4b4',
  tabBarHideOnKeyboard: true,
};

const tabs = [
  {
    name: 'Home',
    component: Home,
    icon: 'grid-outline',
  },
  {
    name: 'Notícias',
    component: Details,
    icon: 'newspaper-outline',
  },
  {
    name: 'Salvos',
    component: Bookmark,
    icon: 'bookmark-outline',
  },
  {
    name: 'Assistente',
    component: ChatBot,
    icon: 'chatbubble-outline',
  },
  {
    name: 'Perfil',
    component: Profile,
    icon: 'person-outline',
  },
];

export default function Screens() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name={tab.icon} color={color} size={size} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
