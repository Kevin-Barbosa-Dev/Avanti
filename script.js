document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    // Função para abrir o menu
    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede rolagem quando menu está aberto
    });

    // Função para fechar o menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura rolagem
    }

    menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {

    // Carrossel personalizado
    const track = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const paginationContainer = document.getElementById('carouselPagination');

    if (!track || !items.length || !prevButton || !nextButton || !paginationContainer) {
        return; // Sai da função se algum elemento não for encontrado
    }

    let currentIndex = 0;
    let itemWidth = 0;
    let itemsPerView = 1;
    let maxIndex = 0;

    // Função para atualizar as variáveis baseadas no tamanho da tela
    function updateCarouselVars() {
        const containerWidth = track.parentElement.clientWidth;

        // Determina quantos itens mostrar por vez baseado na largura da tela
        if (window.innerWidth >= 1200) {
            itemsPerView = 5; // Extra large screens
        } else if (window.innerWidth >= 992) {
            itemsPerView = 4; // Large screens
        } else if (window.innerWidth >= 768) {
            itemsPerView = 3; // Medium screens
        } else if (window.innerWidth >= 576) {
            itemsPerView = 2; // Small screens
        } else {
            itemsPerView = 1; // Extra small screens
        }

        itemWidth = containerWidth / itemsPerView;
        maxIndex = Math.max(0, items.length - itemsPerView);

        // Atualiza a largura de cada item
        items.forEach(item => {
            item.style.width = `${itemWidth}px`;
        });

        // Atualiza a posição do track
        updateCarouselPosition();

        // Atualiza a paginação
        updatePagination();
    }

    // Função para atualizar a posição do carrossel
    function updateCarouselPosition() {
        track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        // Atualiza os botões de navegação
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === maxIndex;

        // Atualiza a paginação ativa
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Função para criar a paginação
    function updatePagination() {
        paginationContainer.innerHTML = '';

        // Cria um ponto para cada página possível
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarouselPosition();
            });

            paginationContainer.appendChild(dot);
        }
    }

    // Event listeners para os botões de navegação
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarouselPosition();
        }
    });

    // Inicializa o carrossel
    updateCarouselVars();

    // Atualiza o carrossel quando a janela é redimensionada
    window.addEventListener('resize', updateCarouselVars);
});
function changeImage() {
    const bannerQuartoDesktop = document.getElementById('bannerQuatro');
    const newImageMobile = document.getElementById('bannerQuatroMobile');

    if (window.innerWidth <= 768) {
        bannerQuartoDesktop.src = newImageMobile.src;
    } else {
        newImageMobile.sr = bannerQuartoDesktop.src;
    }
}