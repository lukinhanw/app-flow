import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  Animated,
  Keyboard
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { signIn, loading } = useAuth();
  const shakeAnimation = new Animated.Value(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      shakeError();
      return;
    }

    try {
      await signIn(email, password);
      router.replace('/(app)/(tabs)');
    } catch (error) {
      shakeError();
      setEmailError('Invalid email or password');
      setPasswordError('Invalid email or password');
    }
  };

  const isValidEmail = email && !emailError;
  const isValidPassword = password && !passwordError;

  return (
    <View style={styles.container}>
      <View style={[styles.topSection, isKeyboardVisible && styles.topSectionSmall]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.title}>Approval Flow</Text>
        <Text style={styles.subtitle}>Streamline your workflow</Text>
      </View>
      
      <Animated.View 
        style={[
          styles.formContainer,
          { transform: [{ translateX: shakeAnimation }] }
        ]}
      >
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  emailError && styles.inputError,
                  isValidEmail && styles.inputSuccess
                ]}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  validateEmail(text);
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {isValidEmail && (
                <CheckCircle2 
                  size={20} 
                  color="#4CAF50" 
                  style={styles.inputIcon} 
                />
              )}
              {emailError && (
                <AlertCircle 
                  size={20} 
                  color="#FF5252" 
                  style={styles.inputIcon} 
                />
              )}
            </View>
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            }
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  passwordError && styles.inputError,
                  isValidPassword && styles.inputSuccess
                ]}
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  validatePassword(text);
                }}
                secureTextEntry
              />
              {isValidPassword && (
                <CheckCircle2 
                  size={20} 
                  color="#4CAF50" 
                  style={styles.inputIcon} 
                />
              )}
              {passwordError && (
                <AlertCircle 
                  size={20} 
                  color="#FF5252" 
                  style={styles.inputIcon} 
                />
              )}
            </View>
            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
            }
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              loading && styles.buttonDisabled,
              (!isValidEmail || !isValidPassword) && styles.buttonInactive
            ]}
            onPress={handleLogin}
            disabled={loading || !isValidEmail || !isValidPassword}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.hint}>
            <Text style={styles.hintText}>
              Hint: Use email with '@admin' for admin access
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSectionSmall: {
    height: '30%',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 20,
  },
  form: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 40,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  inputError: {
    borderColor: '#FF5252',
    backgroundColor: '#FFF8F8',
  },
  inputSuccess: {
    borderColor: '#4CAF50',
    backgroundColor: '#F8FFF8',
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#B8B8B8',
  },
  buttonInactive: {
    backgroundColor: '#007AFF80',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  hint: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
  },
  hintText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});