import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function MainMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uygulama Menüsü</Text>
      <View style={styles.menuContainer}>
        <Link href="/(screens)/screen1" asChild>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.buttonText}>Stroop Test</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(screens)/screening" asChild>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.buttonText}>DEHB Şiddeti</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  menuContainer: {
    width: '100%',
    gap: 20,
  },
  menuButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 