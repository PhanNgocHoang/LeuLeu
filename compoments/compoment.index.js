const componentIndex = {
    navIndex: `
    <nav class="auth">
    <button class="login selected" id="login1">Login</button>
    <button class="signup" id="register1">Signup</button>
    </nav>
    `,
    login: `
    <section>
    <div id='login'>
        <div>
            <label for="">Username</label>
            <input type="text"/>
        </div>
        <div>
            <label for="">Password</label>
            <input type="password" />
        </div>
        <div>
            <div class="input-select">
                <input id="remember-me" type="checkbox" />
                <label for="remember-me">Remember me</label>
            </div>
        </div>
        <div>
            <button>Log in</button>
        </div>
    </section>
    `,
    register: `
    <section>
<div id='signup'>
    <div>
        <label for="">Username</label>
        <input type="text"/>
    </div>
    <div>
        <label for="">Password</label>
        <input type="password" /></div>
    <div>
    <div>
        <label for="">Confirm Password</label>
        <input type="password" /></div>
    <div>
        <button>Sign up</button>
    </div>
</div>
</section>
    `
}