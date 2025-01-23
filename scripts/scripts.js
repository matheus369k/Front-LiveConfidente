// Dados mockados para desenvolvimento
const mockModels = [
    {
        id: 1,
        name: 'Ana Silva',
        age: 23,
        location: 'São Paulo - SP',
        category: 'premium',
        photo: 'assets/images/model1.jpg',
        rating: 4.8,
        verified: true,
        online: true,
        price: 300
    },
    {
        id: 2,
        name: 'Julia Santos',
        age: 25,
        location: 'Rio de Janeiro - RJ',
        category: 'vip',
        photo: 'assets/images/model2.jpg',
        rating: 4.9,
        verified: true,
        online: false,
        price: 500
    },
    {
        id: 3,
        name: 'Carla Oliveira',
        age: 22,
        location: 'Brasília - DF',
        category: 'standard',
        photo: 'assets/images/model3.jpg',
        rating: 4.7,
        verified: false,
        online: true,
        price: 200
    },
    {
        id: 4,
        name: 'Mariana Costa',
        age: 24,
        location: 'Salvador - BA',
        category: 'premium',
        photo: 'assets/images/model4.jpg',
        rating: 4.6,
        verified: true,
        online: true,
        price: 350
    },
    {
        id: 5,
        name: 'Beatriz Lima',
        age: 26,
        location: 'Belo Horizonte - MG',
        category: 'vip',
        photo: 'assets/images/model5.jpg',
        rating: 4.9,
        verified: true,
        online: false,
        price: 450
    },
    {
        id: 6,
        name: 'Fernanda Martins',
        age: 23,
        location: 'Curitiba - PR',
        category: 'premium',
        photo: 'assets/images/model6.jpg',
        rating: 4.8,
        verified: true,
        online: true,
        price: 300
    }
];

// Função para renderizar os cards dos modelos
function renderModelCards(models) {
    const grid = document.getElementById('modelsGrid');
    if (!grid) return;

    grid.innerHTML = models.map(model => `
        <div class="model-card">
            <div class="model-photo">
                <img src="${model.photo}" alt="${model.name}">
                ${model.online ? '<span class="online-badge">Online</span>' : ''}
                ${model.verified ? '<span class="verified-badge">✓ Verificada</span>' : ''}
            </div>
            <div class="model-info">
                <h3>${model.name}, ${model.age}</h3>
                <p class="location">${model.location}</p>
                <div class="rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-value">${model.rating}</span>
                </div>
                <div class="price">
                    R$ ${model.price}/hora
                </div>
                <a href="profile.html?id=${model.id}" class="btn btn-primary">Ver perfil</a>
            </div>
        </div>
    `).join('');
}

// Função para filtrar modelos
function filterModels(query = '', city = '') {
    let filtered = [...mockModels];

    if (query) {
        filtered = filtered.filter(model => 
            model.name.toLowerCase().includes(query.toLowerCase()) ||
            model.location.toLowerCase().includes(query.toLowerCase())
        );
    }

    if (city) {
        filtered = filtered.filter(model => 
            model.location.toLowerCase() === city.toLowerCase()
        );
    }

    return filtered;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza todos os modelos inicialmente
    renderModelCards(mockModels);

    // Adiciona event listener para o campo de busca
    const searchInput = document.getElementById('searchInput');
    const cityFilter = document.getElementById('cityFilter');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const filtered = filterModels(e.target.value, cityFilter?.value);
            renderModelCards(filtered);
        });
    }

    if (cityFilter) {
        cityFilter.addEventListener('change', (e) => {
            const filtered = filterModels(searchInput?.value, e.target.value);
            renderModelCards(filtered);
        });
    }

    // Event listeners para as tags de filtro
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            let filtered = [...mockModels];
            const filter = tag.textContent.toLowerCase();

            switch (filter) {
                case 'novos':
                    filtered.sort((a, b) => b.id - a.id);
                    break;
                case 'verificados':
                    filtered = filtered.filter(model => model.verified);
                    break;
                case 'vip':
                    filtered = filtered.filter(model => model.category === 'vip');
                    break;
                case 'online':
                    filtered = filtered.filter(model => model.online);
                    break;
            }

            renderModelCards(filtered);
        });
    });
});
