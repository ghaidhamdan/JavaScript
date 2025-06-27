document.addEventListener('DOMContentLoaded', async () => {
    const aboutMeData = await fetch('starter/data/aboutMeData.json').then(response => response.json());
    const projectsData = await fetch('starter/data/projectsData.json').then(response => response.json());

    const aboutMeSection = document.getElementById('aboutMe');

    const bioParagraph = document.createElement('p');
    bioParagraph.textContent = aboutMeData.aboutMe || 'No bio provided.';
    aboutMeSection.appendChild(bioParagraph);

    if (aboutMeData.headshot) {
        const headshotContainer = document.createElement('div');
        headshotContainer.classList.add('headshotContainer');

        const img = document.createElement('img');
        img.src = aboutMeData.headshot;
        img.alt = "Headshot";

        headshotContainer.appendChild(img);
        aboutMeSection.appendChild(headshotContainer);
    }

    const projectList = document.getElementById('projectList');
    const spotlight = document.getElementById('projectSpotlight');
    const spotlightTitles = document.getElementById('spotlightTitles');

    const renderSpotlight = (project) => {
        spotlight.style.backgroundImage = project.spotlight_image
            ? `url(${project.spotlight_image})`
            : 'none';

        spotlightTitles.innerHTML = '';

        const title = document.createElement('h3');
        title.textContent = project.project_name || 'Untitled Project';

        const description = document.createElement('p');
        description.textContent = project.long_description || 'No description available.';

        spotlightTitles.appendChild(title);
        spotlightTitles.appendChild(description);

        if (project.url) {
            const link = document.createElement('a');
            link.href = project.url;
            link.textContent = 'View Project';
            link.target = '_blank';
            spotlightTitles.appendChild(link);
        }
    };

    projectsData.forEach((project, index) => {
        const card = document.createElement('div');
        card.classList.add('projectCard');
        card.id = project.project_id;

        if (project.card_image) {
            card.style.backgroundImage = `url(${project.card_image})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }

        const name = document.createElement('h4');
        name.textContent = project.project_name;

        const shortDesc = document.createElement('p');
        shortDesc.textContent = project.short_description || '';

        card.appendChild(name);
        card.appendChild(shortDesc);

        card.addEventListener('click', () => renderSpotlight(project));

        projectList.appendChild(card);

        if (index === 0) {
            renderSpotlight(project);
        }
    });

    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const charCount = document.getElementById('charactersLeft');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidCharsRegex = /[^a-zA-Z0-9@._-]/;
    const maxLength = 300;

    emailInput.addEventListener('input', () => {
        validateEmail();
    });

    messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        charCount.textContent = `Characters: ${length}/300`;

        if (length > maxLength) {
            charCount.style.color = 'red';
            messageError.textContent = 'Message exceeds 300 character limit.';
        } else {
            charCount.style.color = 'black';
            messageError.textContent = '';
        }
    });

    function validateEmail() {
        const value = emailInput.value.trim();
        if (value === '') {
            emailError.textContent = 'Email is required.';
            return false;
        } else if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        } else if (invalidCharsRegex.test(value)) {
            emailError.textContent = 'Email contains invalid characters.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value === '') {
            messageError.textContent = 'Message is required.';
            return false;
        } else if (value.length > maxLength) {
            messageError.textContent = 'Message exceeds 300 character limit.';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }

    const form = document.getElementById('formSection');
    form.addEventListener('submit', (e) => {
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (!isEmailValid || !isMessageValid) {
            e.preventDefault();
        }
    });

    const projectListElement = document.getElementById('projectList');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');

    const isMobile = () => window.innerWidth < 768;
    const scrollAmount = 200;

    arrowLeft.addEventListener('click', () => {
        if (isMobile()) {
            projectListElement.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            projectListElement.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        }
    });

    arrowRight.addEventListener('click', () => {
        if (isMobile()) {
            projectListElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            projectListElement.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    });
});
