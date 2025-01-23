const auth = {
    currentUser: null,

    async init() {
        // Simula verificação de usuário logado
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }

        // Adiciona listener para o botão de logout
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.signOut();
            });
        }
    },

    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'block';
                userName.textContent = this.currentUser.name || this.currentUser.email;
            }
        } else {
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    },

    async signIn(email, password) {
        // Simula autenticação
        if (email && password) {
            const user = {
                email: email,
                name: email.split('@')[0], // Usa parte do email como nome
                type: 'client' // Por padrão, considera como cliente
            };
            
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser = user;
            this.updateUI();
            return true;
        }
        throw new Error('Email e senha são obrigatórios');
    },

    async register(data, type) {
        // Simula registro
        const user = {
            ...data,
            type: type
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
        this.updateUI();
        return true;
    },

    signOut() {
        localStorage.removeItem('user');
        this.currentUser = null;
        this.updateUI();
        window.location.href = 'index.html';
    }
};

// Inicializa o auth quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    auth.init();
});
