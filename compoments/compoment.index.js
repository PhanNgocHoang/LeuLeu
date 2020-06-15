const componentIndex = {
    login: `
      <div class="container">
          <nav class="auth">
              <div class="signup">Login</div>
          </nav>
          <main>
              <div id='login' class="show">
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
                      <button id="login-btn">Log in</button>
                  </div>
              </div>
          </main>
      </div>`,
    register: `
      <div class="container">
          <nav class="auth">
              <div class="signup">Register</div>
          </nav>
          <main>
              <div id='signup' class="show">
                  <div>
                      <input type="email" name="email" placeholder="Email or Username">
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
                      <button id="signup-btn">Sign up</button>
                  </div>
              </div>
          </main>
      </div>
      `,
  };
  