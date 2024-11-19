<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />

  <div class="auth-wrapper">
    <div class="container" :class="{ 'right-panel-active': rightPanelActive }">
      <!-- Форма реєстрації -->
      <div class="form-container sign-up-container">
        <form @submit.prevent="handleSignUp">
          <h1>Create Account</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input v-model="signUpForm.name" type="text" placeholder="Name" required />
          <input v-model="signUpForm.email" type="email" placeholder="Email" required />
          <input v-model="signUpForm.password" type="password" placeholder="Password" required />
          <button>Sign Up</button>
        </form>
      </div>

      <!-- Форма входу -->
      <div class="form-container sign-in-container">
        <form @submit.prevent="handleSignIn">
          <h1>Sign in</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input v-model="signInForm.email" type="email" placeholder="Email" required />
          <input v-model="signInForm.password" type="password" placeholder="Password" required />
          <a href="#" class="forgot-password">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>

      <!-- Оверлей для анімації -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" @click="togglePanel(false)">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" @click="togglePanel(true)">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Модальне вікно -->
  <ModalAuth
    :isVisible="showModal"
    title="Success"
    :message="modalMessage"
    @update:isVisible="showModal = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import ModalAuth from './ModalAuth.vue'; // Імпортуємо компонент ModalAuth

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

interface SignInForm {
  email: string;
  password: string;
}

export default defineComponent({
  components: {
    ModalAuth,
  },
  setup() {
    // Reactive state for the modal
    const showModal = ref(false);
    const modalMessage = ref<string>('');
    const rightPanelActive = ref(false); // Свойство для переключення панелі

    // Form data for sign-up and sign-in
    const signUpForm = reactive<SignUpForm>({
      name: '',
      email: '',
      password: '',
    });

    const signInForm = reactive<SignInForm>({
      email: '',
      password: '',
    });

    // Toggle the panel for sign-up and sign-in
    const togglePanel = (isSignUp: boolean) => {
      rightPanelActive.value = isSignUp;
    };

    // Handle sign-up form submission
    const handleSignUp = () => {
      console.log('Sign Up:', signUpForm);
      signUpForm.name = '';
      signUpForm.email = '';
      signUpForm.password = '';
      modalMessage.value = 'You have successfully registered!';
      showModal.value = true;
    };

    // Handle sign-in form submission
    const handleSignIn = () => {
      console.log('Sign In:', signInForm);

      // Pushing to the main page after successful login
      // @ts-ignore: Assume $router is available in the component scope
      this.$router.push('/');

      // Clear sign-in form
      signInForm.email = '';
      signInForm.password = '';
      modalMessage.value = 'You have successfully logged in!';
      showModal.value = true;
    };

    // Return all necessary data and methods
    return {
      showModal,
      modalMessage,
      rightPanelActive,
      signUpForm,
      signInForm,
      togglePanel,
      handleSignUp,
      handleSignIn,
    };
  },
});
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px); /* Підлаштовуємо під висоту хедера */
  padding-top: 60px; /* Відступ для коректного відображення */
  box-sizing: border-box;
}

h1 {
  font-weight: bold;
  margin: 0;
}

form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #fe00e0;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: linear-gradient(to right, #58004e, #fe00e0);
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  display: flex;
  justify-content: space-between; /* Це розміщує іконки по горизонталі */
  margin: 20px 0;
}

.social {
  border: 1px solid #fe00e0;
  border-radius: 50%;
  color: #050505;
  font-size: 20px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}

.social:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

a {
  color: #000000;
  text-decoration: none;
}

.forgot-password {
  color: #000000;
  font-size: 14px;
  margin-top: 10px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;
}
</style>
