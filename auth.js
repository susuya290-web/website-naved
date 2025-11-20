// auth.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form submit (refresh halaman)

    // Untuk simulasi, kita tidak perlu cek username/password.
    // Kita anggap login selalu berhasil.
    // Di aplikasi nyata, di sini Anda akan mengirim data ke server.
    
    const username = document.getElementById('username').value;

    if (username.trim() === '') {
        // Tambahan: minimal harus isi username
        document.getElementById('login-error').textContent = 'Username tidak boleh kosong!';
        return;
    }

    // Simpan status "sudah login" di sessionStorage
    // sessionStorage akan terhapus saat browser ditutup
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);

    // Arahkan ke halaman home
    window.location.href = 'home.html';
});


