//react
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

//api interface
interface User {
  id: number;
  uid: string;
  password: string;
  username: string;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

//main function
const App: React.FC = () => {

  //useState
  const [user, setUser] = useState<User[] | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //useEffect
  useEffect(() => {
    fetchUser();
  }, []);

  //fetch api
  const fetchUser = async () => {
    try {
      const response = await fetch('https://random-data-api.com/api/users/random_user?size=80');
      const data: User[] = await response.json();
      setUser(data);
    } catch (error) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  //prev button
  const Prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  //next button
  const Next = () => {
    if (user && index < user.length - 1) {
      setIndex(index + 1);
    }
  };

  //show loading
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  //show error
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  const currentUser = user[index];

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />

      <Text style={styles.name}>{currentUser.first_name + " " + currentUser.last_name}</Text>

      <View style={styles.detailsContainer}>
        {Object.entries({
          ID: currentUser.id,
          UID: currentUser.uid,
          Password: currentUser.password,
          Username: currentUser.username,
          Email: currentUser.email,
        }).map(([label, value]) => (
          <View key={label} style={styles.box}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.text}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.buttonPrev]} onPress={Prev} disabled={index === 0}>
          <Text style={styles.buttonTextPrev}>Previous</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.buttonNext]} onPress={Next} disabled={user.length <= 1 || index === user.length - 1}>
          <Text style={styles.buttonTextNext}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#DDDDDD',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
  },
  box: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: '600',
    marginRight: 10,
    fontSize: 16,
    color: '#333333',
  },
  text: {
    fontSize: 16,
    color: '#666666',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
  },
  buttonPrev: {
    backgroundColor: '#FFFFFF',
    borderColor: 'lightgrey',
  },
  buttonNext: {
    backgroundColor: '#000000',
    borderColor: 'lightgrey',
  },
  buttonTextPrev: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  buttonTextNext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  errorText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default App;
