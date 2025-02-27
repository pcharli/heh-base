// Insertion des articles dans le document
const createArticleElement = (article) => {
    return `
        <article class="article">
            <img src="${article.image}" alt="${article.title1}">
            <h2 class="article-title">${article.title1}</h2>
            <h3 class="article-subtitle">${article.title2}</h3>
            <div class="article-content">${article.content}</div>
            <div class="article-meta">
                <span class="article-date">${new Date(article.date).toLocaleDateString()}</span>
                <span class="article-author">${article.author}</span>
            </div>
        </article>
    `;
}
// requête Ajax
async function loadArticles() {
    const articlesContainer = document.getElementById('articles');

    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const articles = await response.json();
        // tri par date
        const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        //injection des articles 1 par 1
        articlesContainer.innerHTML = sortedArticles.map(createArticleElement).join('');

    } catch (error) {
        console.error('Error fetching articles:', error);
        articlesContainer.innerHTML = '<p>Une erreur est survenue lors du chargement des articles.</p>';
    }
}

// attente 5 sec. avant de lancer l'Ajax
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadArticles, 5000);
});

