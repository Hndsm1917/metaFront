export default {
  register: {
    text_1: 'Invest Hub is filled',
    text_2: 'At the moment',
    text_3: 'filled and registration of new users is suspended.',
    text_4: 'If you already have an account, log in',
    title: 'Registration',
    labels: {
      email: 'Your email:',
      nickname: 'Your Nickname:',
      name: 'Your Name:',
      password: 'Set Password:',
      password_confirm: 'Confirm Password:',
      sponsorEmail: 'Sponsor Email:',
      wallet: 'TRON Wallet Address for Payouts:',
      referral_link: 'Referral Sponsor Link:'
    },
    placeholders: {
      email: 'Enter your email',
      nickname: 'Enter your nickname',
      name: 'Enter your name',
      password: 'Set password',
      password_confirm: 'Confirm password',
      sponsorEmail: 'Enter sponsor email',
      wallet: 'Enter TRON wallet address for payouts'
    },
    button_1: 'Already have an account? Log in',
    button_2: 'Register',
    wallet_error: 'Invalid wallet address'
  },
  login: {
    title: 'Authorization',
    labels: {
      email: 'Your email:',
      password: 'Enter password:'
    },
    placeholders: {
      email: 'Enter your email',
      password: 'Enter password'
    },
    button_1: "Don't have an account yet? Register",
    button_2: 'Login'
  },
  reset_password: {
    title: 'Password Recovery',
    labels: {
      email: 'Enter email for password recovery:'
    },
    placeholders: {
      email: 'Enter your email'
    },
    button_1: 'Go back',
    button_2: 'Send',
    info_1: 'A password recovery link has been sent to your email.',
    info_2: 'Please follow the link to restore access to your account.',
    title_2: 'Password Recovery'
  },
  new_password: {
    title: 'Password Recovery',
    labels: {
      password: 'Enter new password:',
      password_confirm: 'Confirm new password*'
    },
    placeholders: {
      password: 'New password*',
      password_confirm: 'Confirm new password'
    },
    button_1: 'Close',
    button_2: 'Save'
  },
  finish_register: {
    title: 'Registration Completed',
    text_1: 'A registration completion link has been sent to your email.',
    text_2: 'Now follow it to complete the registration'
  },
  header: {
    register: 'Register',
    login: 'Login'
  },
  errors: {
    'Incorrect login or/and password': 'Incorrect login or password',
    'User already registered': 'User already registered'
  }
}
