// auth.js - Username Bebas, Password Kunci

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah refresh halaman

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');

    // --- TENTUKAN PASSWORD RAHASIA DI SINI ---
    const PASSWORD_BENAR = "Aira"; 
    // -----------------------------------------

    if (passwordInput === PASSWORD_BENAR) {
        // Jika password benar
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Simpan nama yang diketik user (apapun itu)
        // Nanti halaman Home akan menyapa sesuai nama ini
        sessionStorage.setItem('username', usernameInput);

        // Arahkan ke home
        window.location.href = 'home.html';
    } else {
        // Jika password salah
        errorMessage.textContent = 'Password salah! Coba lagi.';
        
        // Efek getar (Shake animation)
        const loginCard = document.querySelector('.login-card');
        loginCard.style.animation = 'none';
        setTimeout(() => {
            loginCard.style.animation = 'shake 0.5s';
        }, 10);
    }
});
