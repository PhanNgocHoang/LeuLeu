const componentIndex = {
    login: `
      <div class="container">
          <nav class="auth">
              <div class="signup">Login</div>
          </nav>
          <main>
              <div id='login' class="show">
              <form id='form-login'>
                  <div>
                      <div>
                          <input type="email" name="email" placeholder="Email or Username">
                          <div class="message-error" id="email-error"></div>
                      </div>
                      <div>
                          <input type="password" name="password" placeholder="Password">
                          <div class="message-error" id="password-error"></div>
                      </div>
                  </div>
                  <div>
                      <div class="input-select">
                          <input id="remember-me" type="checkbox" />
                          <label for="remember-me">Remember me</label>
                      </div>
                  </div>
                  <div id="login-success" class="login-success"></div>
                  <div id="login-error" class="login-error"></div>
                  <div>
                      <a href="#">Not yet have an account? Register</a>
                      <button id="login-btn" type="submit">Log in</button>
                  </div>
                  </form>
              </div>
          </main>
      </div>`,
    register: `
      <div class="container">
          <nav class="auth">
              <div class="signup">Register</div>
          </nav>
          <main>
          <form id="register-form">
              <div id='signup' class="show">
              <div>
                    <input type="text" name="nickname" placeholder="Your Nick Name">
                    <div class="message-error" id="email-error"></div>
              </div>
                 <div>
                      <input type="email" name="email" placeholder="Email">
                      <div class="message-error" id="email-error"></div>
                  </div>
                  <div>
                      <input type="date" name="dayofbirth" placeholder="Your Day of birth">
                      <div class="message-error" id="email-error"></div>
                  </div>
                  <div>
                      <input type="password" name="password" placeholder="Password">
                      <div class="message-error" id="password-error"></div>
                  </div>
                  <div>
                      <input type="password" name="confirm-password" placeholder="Confirm password">
                      <div class="message-error" id="confirm-password-error"></div>
                  </div>
                  <div id="register-success" class="message-success"></div>
                  <div id="register-error" class="message-error"></div>
                  <div>
                      <a href="#">Already have an account? Login</a>
                      <button id="signup-btn" type="submit">Sign up</button>
                  </div>
              </div>
              </form>
          </main>
      </div>
      `,
  };
  