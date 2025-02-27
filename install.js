//variable globale
let deferredPrompt;
const installButton = document.getElementById('installButton');

//on affiche le bouton avant installation automatique
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.style.display = 'block';
});

//si click sur le bouton d'install
installButton.addEventListener('click', async () => {
    //si il y a installation auto
    if (deferredPrompt) {
        //on affiche la box de confirmation
        deferredPrompt.prompt();
        // on récupère le choix de l'user (oui/non)
        const outcome = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the installation');
            // on masque le bouton
            installButton.style.display = 'none';
        }
        //on neutralise l'install auto
        deferredPrompt = null;
    }
});
//quand l'app est installée
window.addEventListener('appinstalled', () => {
    //on masque le bouton
    installButton.style.display = 'none';
    console.log('PWA was installed');
});