import React from 'react';
import CreateAccountBtn from './CreateAccountBtn'
import ImportAccountSubmitBtn from './ImportAccountSubmitBtn'
import './style.css'

const Profile = () =>
  <div id="profile">
    <h2 id='profile-config-instructions'>Create a new public private key pair or import a private key</h2>
    <div id="account-config-options">
      <CreateAccountBtn />
      <h5>or</h5>
      <ImportAccountSubmitBtn />
    </div>
  </div>

export default Profile
