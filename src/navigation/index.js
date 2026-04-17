// src/navigation/index.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors, Radius } from '../constants/theme';

// Screens
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CategoryScreen from '../screens/CategoryScreen';
import DocumentDetailScreen from '../screens/DocumentDetailScreen';
import AddDocumentScreen from '../screens/AddDocumentScreen';
import AllDocumentsScreen from '../screens/AllDocumentsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ emoji, label, focused }) => (
  <View style={{ alignItems: 'center', gap: 2, paddingTop: 4 }}>
    <Text style={{ fontSize: 20 }}>{emoji}</Text>
    <Text style={{
      fontSize: 10, fontWeight: '600',
      color: focused ? Colors.orange : Colors.textMuted,
    }}>{label}</Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: Colors.surface,
        borderTopColor: Colors.cardBorder,
        borderTopWidth: 1,
        height: 68,
        paddingBottom: 8,
      },
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Home" focused={focused} /> }}
    />
    <Tab.Screen
      name="Documents"
      component={AllDocumentsScreen}
      options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="📄" label="Docs" focused={focused} /> }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="👤" label="Profile" focused={focused} /> }}
    />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Category" component={CategoryScreen} />
    <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} />
    <Stack.Screen
      name="AddDocument"
      component={AddDocumentScreen}
      options={{ presentation: 'modal' }}
    />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated);
  return isAuthenticated ? <AppStack /> : <AuthStack />;
};

const Navigation = () => {
  return <RootNavigator />;
};

export default Navigation;
