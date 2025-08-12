//  EmailJS
emailjs.init("Hl9fnzSJSGH-uSgAX");

const translations = {
    en: {
        navHome: "Home",
        navAbout: "About",
        navProjects: "Projects",
        navContact: "Contact",
        heroTitle: "Margarita Lykhvar",
        heroSubtitle: "Frontend Developer & Graphic Designer",
        heroBtnProjects: "View Projects",
        heroBtnContact: "Contact Me",
        aboutTitle: "About Me",
        skillsTitle: "Technical Skills",
        languagesTitle: "Languages",
        educationTitle: "Education",
        experienceTitle: "Work Experience",
        softSkillsTitle: "Soft Skills",
        projectsTitle: "My Projects",
        contactTitle: "Contact Me",
        contactText: "Feel free to get in touch with me. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
        contactName: "Your Name",
        contactEmail: "Your Email",
        contactMessage: "Your Message",
        contactSend: "Send Message",
        footerText: "© 2025 Margarita Lykhvar. All rights reserved.",
        formSuccess: "Message sent! Thank you!",
        formError: "Error sending message. Please try again."
    },
    de: {
        navHome: "Startseite",
        navAbout: "Über Mich",
        navProjects: "Projekte",
        navContact: "Kontakt",
        heroTitle: "Margarita Lykhvar",
        heroSubtitle: "Frontend Entwicklerin & Grafikdesignerin",
        heroBtnProjects: "Projekte ansehen",
        heroBtnContact: "Kontakt aufnehmen",
        aboutTitle: "Über Mich",
        skillsTitle: "Technische Fähigkeiten",
        languagesTitle: "Sprachen",
        educationTitle: "Ausbildung",
        experienceTitle: "Berufserfahrung",
        softSkillsTitle: "Soft Skills",
        projectsTitle: "Meine Projekte",
        contactTitle: "Kontaktieren Sie mich",
        contactText: "Fühlen Sie sich frei, mit mir in Kontakt zu treten. Ich bin immer offen für die Diskussion neuer Projekte, kreativer Ideen oder Möglichkeiten, Teil Ihrer Vision zu sein.",
        contactName: "Ihr Name",
        contactEmail: "Ihre E-Mail",
        contactMessage: "Ihre Nachricht",
        contactSend: "Nachricht senden",
        footerText: "© 2025 Margarita Lykhvar. Alle Rechte vorbehalten.",
        formSuccess: "Nachricht gesendet! Danke!",
        formError: "Fehler beim Senden. Bitte versuchen Sie es erneut."
    },
    ru: {
        navHome: "Главная",
        navAbout: "Обо мне",
        navProjects: "Проекты",
        navContact: "Контакты",
        heroTitle: "Маргарита Лихвар",
        heroSubtitle: "Фронтенд разработчик и графический дизайнер",
        heroBtnProjects: "Смотреть проекты",
        heroBtnContact: "Связаться со мной",
        aboutTitle: "Обо мне",
        skillsTitle: "Технические навыки",
        languagesTitle: "Языки",
        educationTitle: "Образование",
        experienceTitle: "Опыт работы",
        softSkillsTitle: "Гибкие навыки",
        projectsTitle: "Мои проекты",
        contactTitle: "Свяжитесь со мной",
        contactText: "Не стесняйтесь связаться со мной. Я всегда открыта для обсуждения новых проектов, творческих идей или возможностей стать частью вашего видения.",
        contactName: "Ваше имя",
        contactEmail: "Ваш Email",
        contactMessage: "Ваше сообщение",
        contactSend: "Отправить сообщение",
        footerText: "© 2025 Маргарита Лихвар. Все права защищены.",
        formSuccess: "Сообщение отправлено! Спасибо!",
        formError: "Ошибка отправки. Пожалуйста, попробуйте снова."
    }
};

class ContactForm extends React.Component {
    state = {
        name: '',
        email: '',
        message: '',
        isSending: false,
        isSent: false,
        error: null
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSending: true, error: null });

        const templateParams = {
            from_name: this.state.name,
            from_email: this.state.email,
            message: this.state.message
        };

       emailjs.send(
            'service_e5deqwo', 
            'template_ll3oplw', 
    templateParams
)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            this.setState({ 
                isSending: false, 
                isSent: true,
                name: '',
                email: '',
                message: ''
            });
            
            
            setTimeout(() => {
                this.setState({ isSent: false });
            }, 5000);
        })
        .catch((error) => {
            console.error('FAILED...', error);
            this.setState({ 
                isSending: false, 
                error: this.props.t.formError 
            });
        });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { language } = this.props;
        const t = translations[language];
        const { name, email, message, isSending, isSent, error } = this.state;

        return (
            <form className="contact-form" onSubmit={this.handleSubmit}>
                {isSent && (
                    <div className="alert success">
                        {t.formSuccess}
                    </div>
                )}
                
                {error && (
                    <div className="alert error">{error}</div>
                )}

                <div className="form-group">
                    <label htmlFor="name">{t.contactName}</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="form-control" 
                        placeholder={t.contactName}
                        value={name}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">{t.contactEmail}</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        className="form-control" 
                        placeholder={t.contactEmail}
                        value={email}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="message">{t.contactMessage}</label>
                    <textarea 
                        id="message" 
                        name="message"
                        className="form-control" 
                        placeholder={t.contactMessage}
                        value={message}
                        onChange={this.handleChange}
                        required
                    ></textarea>
                </div>
                
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSending}
                >
                    {isSending ? (
                        <span>
                            <i className="fas fa-spinner fa-spin"></i> {t.contactSend}...
                        </span>
                    ) : (
                        t.contactSend
                    )}
                </button>
            </form>
        );
    }
}


const projectsData = [
    {
        id: 1,
        title: {
            en: "Garden Products Web App",
            de: "Gartenprodukte Web App",
            ru: "Веб-приложение для садовых товаров"
        },
        description: {
            en: "Online store implementation with ReactJS, Redux and Firebase. Focus on UI/UX, responsive design, real-time data, secure authentication and structured product presentation.",
            de: "Umsetzung eines Online-Shops mit ReactJS, Redux und Firebase. Fokus auf UI/UX, responsives Design, Echtzeitdaten, sichere Authentifizierung und strukturierte Produktdarstellung.",
            ru: "Реализация интернет-магазина с использованием ReactJS, Redux и Firebase. Фокус на UI/UX, адаптивный дизайн, данные в реальном времени, безопасная аутентификация и структурированное представление продуктов."
        },
        technologies: ["React", "Redux", "Firebase", "CSS3", "Responsive Design"],
        link: "https://main.d2twwigf4rhq0f.amplifyapp.com/",
        image: "./project-garden.jpg"
    }
];

const educationData = [
    {
        period: "03/2024 – 04/2025",
        title: {
            en: "Frontend Web Development",
            de: "Frontend Web Development",
            ru: "Frontend Web Development"
        },
        subtitle: {
            en: "Tel-Ran.de GmbH, Berlin",
            de: "Tel-Ran.de GmbH, Berlin",
            ru: "Tel-Ran.de GmbH, Berlin"
        },
        description: {
            en: "Intensive Fullstack training with focus on modern web technologies (HTML, CSS, JavaScript, React). Implementation of practical projects in agile teams (Scrum). Version control with Git, collaborative work in distributed development teams.",
            de: "Intensives Fullstack-Training mit Schwerpunkt auf modernen Webtechnologien (HTML, CSS, JavaScript, React). Umsetzung praxisnaher Projekte in agilen Teams (Scrum). Versionskontrolle mit Git, kollaboratives Arbeiten in verteilten Entwicklungsteams.",
            ru: "Интенсивное обучение Fullstack с акцентом на современных веб-технологиях (HTML, CSS, JavaScript, React). Реализация практических проектов в гибких командах (Scrum). Контроль версий с Git, совместная работа в распределенных командах разработчиков."
        }
    },
    {
        period: "2016 – 2019",
        title: {
            en: "Graphic Design Studies",
            de: "Studium Grafikdesign",
            ru: "Изучение графического дизайна"
        },
        subtitle: {
            en: "Computerakademie „Schritt“, Kyiv",
            de: "Computerakademie „Schritt“, Kiew",
            ru: "Computerakademie „Schritt“, Киев"
        },
        description: {
            en: "Focus areas: Digital design, layout and typography, visual communication and design software",
            de: "Schwerpunkte: Digitale Gestaltung, Layout und Typografie, visuelle Kommunikation und Design-Software",
            ru: "Основные направления: Цифровой дизайн, верстка и типографика, визуальная коммуникация и программное обеспечение для дизайна"
        }
    },
    {
        period: "2004 – 2008",
        title: {
            en: "Law Studies",
            de: "Studium Rechtswissenschaften",
            ru: "Изучение юриспруденции"
        },
        subtitle: {
            en: "National Academy of Internal Affairs of Ukraine",
            de: "Nationale Akademie für innere Angelegenheiten der Ukraine",
            ru: "Национальная академия внутренних дел Украины"
        },
        description: {
            en: "Complete university degree - recognition procedure in Germany ongoing",
            de: "Vollständiger Hochschulabschluss – Anerkennungsverfahren in Deutschland laufend",
            ru: "Полное высшее образование - процедура признания в Германии продолжается"
        }
    },
    {
        period: "1991 – 1996",
        title: {
            en: "Teaching Degree in Russian, German and Literature",
            de: "Studium Lehramt für Russisch, Deutsch und Literatur",
            ru: "Педагогическое образование по русскому, немецкому языку и литературе"
        },
        subtitle: {
            en: "State Pedagogical University, Ukraine",
            de: "Staatliche Pädagogische Universität, Ukraine",
            ru: "Государственный педагогический университет, Украина"
        },
        description: {
            en: "Complete university degree - recognition procedure in Germany ongoing",
            de: "Vollständiger Hochschulabschluss – Anerkennungsverfahren in Deutschland laufend",
            ru: "Полное высшее образование - процедура признания в Германии продолжается"
        }
    }
];

const experienceData = [
    {
        period: "05/2022 - Present",
        title: {
            en: "Integration and language training in Germany",
            de: "Integration und sprachliche Weiterbildung in Deutschland",
            ru: "Интеграция и языковая подготовка в Германии"
        },
        description: {
            en: "Participation in integration courses and successful completion of all German courses up to level B2 (CEFR). Deepening knowledge of the German education system and preparation for career entry in Germany.",
            de: "Teilnahme an Integrationskursen sowie erfolgreicher Abschluss aller Deutschkurse bis zum Niveau B2 (GER). Vertiefung der Kenntnisse des deutschen Bildungssystems und Vorbereitung auf den Berufseinstieg in Deutschland.",
            ru: "Участие в интеграционных курсах и успешное завершение всех курсов немецкого языка до уровня B2 (GER). Углубление знаний о немецкой системе образования и подготовка к началу карьеры в Германии."
        }
    },
    {
        period: "03/2008 – 05/2022",
        title: {
            en: "Deputy HR Director",
            de: "Stellvertretende Direktorin HR",
            ru: "Заместитель директора по персоналу"
        },
        subtitle: {
            en: "Delta Medical LTD, Kyiv",
            de: "Delta Medical LTD, Kiew",
            ru: "Delta Medical LTD, Киев"
        },
        description: {
            en: "Establishment and supervision of an e-learning system with digital tools. Management of digitization projects, including electronic documentation and process optimization. Maintenance of quality guidelines in digital HR systems. Use of graphic design for internal presentations, training materials and the visual corporate presence.",
            de: "Aufbau und Betreuung eines E-Learning-Systems mit digitalen Tools. Leitung von Digitalisierungsprojekten, inklusive elektronischer Dokumentation und Prozessoptimierung. Pflege von Qualitätsrichtlinien in digitalen HR-Systemen. Einsatz von Grafikdesign für interne Präsentationen, Schulungsmaterialien und den visuellen Unternehmensauftritt.",
            ru: "Создание и курирование системы электронного обучения с использованием цифровых инструментов. Руководство проектами по цифровизации, включая электронную документацию и оптимизацию процессов. Поддержание стандартов качества в цифровых HR-системах. Использование графического дизайна для внутренних презентаций, учебных материалов и визуального представления компании."
        }
    },
    {
        period: "02/2006 – 03/2008",
        title: {
            en: "HR Manager",
            de: "HR-Managerin",
            ru: "Менеджер по персоналу"
        },
        subtitle: {
            en: "Alkiv LTD, Kyiv",
            de: "Alkiv LTD, Kiew",
            ru: "Alkiv LTD, Киев"
        },
        description: {
            en: "Introduction and management of digital personnel files and documentation processes. Application of structured HR systems for data collection and analysis. Support of internal communication through targeted use of graphic design.",
            de: "Einführung und Verwaltung digitaler Personalakten und Dokumentationsprozesse. Anwendung strukturierter HR-Systeme zur Datenerfassung und -analyse. Unterstützung der internen Kommunikation durch gezielten Einsatz von Grafikdesign.",
            ru: "Внедрение и управление цифровыми кадровыми документами и процессами документооборота. Применение структурированных HR-систем для сбора и анализа данных. Поддержка внутренних коммуникаций с помощью целенаправленного использования графического дизайна."
        }
    }
];

const languagesData = [
    { name: "Russian", level: "Native" },
    { name: "Ukrainian", level: "Native" },
    { name: "German", level: "B2" },
    { name: "English", level: "A2 (Basic with technical vocabulary)" }
];

const skillsData = [
    {
        category: "Frontend",
        items: ["HTML5", "CSS3 (Flexbox, Grid, Media Queries, Bootstrap)", "JavaScript (ES6+, DOM, OOP)", "ReactJS (Hooks, Components, Redux)"],
        icon: "fas fa-code"
    },
    {
        category: "Databases",
        items: ["Node.js", "MongoDB (Mongoose)", "SQL"],
        icon: "fas fa-database"
    },
    {
        category: "Tools",
        items: ["Git", "GitHub", "IntelliJ IDEA", "MongoDB Compass", "MySQL Workbench", "Jira"],
        icon: "fas fa-tools"
    },
    {
        category: "Design & UX",
        items: ["Adobe Creative Suite (Photoshop, Illustrator, InDesign)", "Layout", "Visual communication", "UX principles"],
        icon: "fas fa-palette"
    }
];

const softSkillsData = [
    "Willingness to learn and initiative",
    "User orientation",
    "Teamwork",
    "Communication skills",
    "Structured and independent way of working"
];

const contactData = {
    tel: "+49 174 684 77 75",
    email: "margorav@gmail.com",
    location: "Berlin, Germany"
};

class App extends React.Component {
    state = {
        language: 'de',
        isLanguageMenuOpen: false
    };

    changeLanguage = (lang) => {
        this.setState({ language: lang, isLanguageMenuOpen: false });
    };

    toggleLanguageMenu = () => {
        this.setState(prevState => ({
            isLanguageMenuOpen: !prevState.isLanguageMenuOpen
        }));
    };

    render() {
        const { language, isLanguageMenuOpen } = this.state;
        const t = translations[language];

        return (
            <div>
                {/* Header */}
                <header>
                    <div className="container">
                        <div className="navbar">
                            <a href="#" className="logo">ML</a>
                            <ul className="nav-links">
                                <li><a href="#">{t.navHome}</a></li>
                                <li><a href="#about">{t.navAbout}</a></li>
                                <li><a href="#projects">{t.navProjects}</a></li>
                                <li><a href="#contact">{t.navContact}</a></li>
                            </ul>
                            <div className="controls">
                                <div className="language-switcher">
                                    <button className="language-btn" onClick={this.toggleLanguageMenu}>
                                        {language.toUpperCase()} <i className="fas fa-chevron-down"></i>
                                    </button>
                                    <div className={`language-options ${isLanguageMenuOpen ? 'active' : ''}`}>
                                        <button onClick={() => this.changeLanguage('de')}>DE</button>
                                        <button onClick={() => this.changeLanguage('en')}>EN</button>
                                        <button onClick={() => this.changeLanguage('ru')}>RU</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="hero" id="home">
                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-text">
                                <h1 className="hero-title">{t.heroTitle}</h1>
                                <p className="hero-subtitle">{t.heroSubtitle}</p>
                                <div className="hero-buttons">
                                    <a href="#projects" className="btn btn-primary">{t.heroBtnProjects}</a>
                                    <a href="#contact" className="btn btn-outline">{t.heroBtnContact}</a>
                                </div>
                            </div>
                            <div className="hero-image">
                                <img src="./photo.jpg" alt="Margarita Lykhvar" className="profile-img" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about">
                    <div className="container">
                        <h2 className="section-title">{t.aboutTitle}</h2>
                        <div className="about-content">
                            <div>
                                <h3>{t.skillsTitle}</h3>
                                <div className="skills-grid">
                                    {skillsData.map((skillCategory, index) => (
                                        <div className="skill-category" key={index}>
                                            <h3>
                                                <i className={skillCategory.icon} style={{ marginRight: '10px' }}></i>
                                                {skillCategory.category}
                                            </h3>
                                            <ul>
                                                {skillCategory.items.map((item, idx) => (
                                                    <li key={idx} className="skill-item">
                                                        <div className="skill-icon">
                                                            <i className="fas fa-check"></i>
                                                        </div>
                                                        <div className="skill-text">{item}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <h3 style={{ marginTop: '40px' }}>{t.languagesTitle}</h3>
                                <ul>
                                    {languagesData.map((lang, index) => (
                                        <li key={index} className="skill-item">
                                            <div className="skill-icon">
                                                <i className="fas fa-language"></i>
                                            </div>
                                            <div>
                                                <strong>{lang.name}</strong>: {lang.level}
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <h3 style={{ marginTop: '40px' }}>{t.softSkillsTitle}</h3>
                                <div className="soft-skills">
                                    {softSkillsData.map((skill, index) => (
                                        <span className="soft-skill" key={index}>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3>{t.educationTitle}</h3>
                                <div className="timeline">
                                    {educationData.map((edu, index) => (
                                        <div className="timeline-item" key={index}>
                                            <div className="timeline-date">{edu.period}</div>
                                            <div className="timeline-title">{edu.title[language]}</div>
                                            <div className="timeline-subtitle">{edu.subtitle[language]}</div>
                                            <p>{edu.description[language]}</p>
                                        </div>
                                    ))}
                                </div>

                                <h3 style={{ marginTop: '40px' }}>{t.experienceTitle}</h3>
                                <div className="timeline">
                                    {experienceData.map((exp, index) => (
                                        <div className="timeline-item" key={index}>
                                            <div className="timeline-date">{exp.period}</div>
                                            <div className="timeline-title">{exp.title[language]}</div>
                                            {exp.subtitle && <div className="timeline-subtitle">{exp.subtitle[language]}</div>}
                                            <p>{exp.description[language]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" style={{ backgroundColor: '#f1f5f9' }}>
                    <div className="container">
                        <h2 className="section-title">{t.projectsTitle}</h2>
                        <div className="projects-grid">
                            {projectsData.map(project => (
                                <div className="project-card" key={project.id}>
                                    <img src={project.image} alt={project.title[language]} className="project-img" loading="lazy" />
                                    <div className="project-content">
                                        <h3 className="project-title">{project.title[language]}</h3>
                                        <p className="project-description">{project.description[language]}</p>
                                        <div className="project-tech">
                                            {project.technologies.map((tech, idx) => (
                                                <span className="tech-tag" key={idx}>{tech}</span>
                                            ))}
                                        </div>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                            {language === 'de' ? 'Projekt ansehen' :
                                                language === 'ru' ? 'Посмотреть проект' : 'View Project'}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact">
                    <div className="container">
                        <h2 className="section-title">{t.contactTitle}</h2>
                        <div className="contact-container">
                            <div className="contact-info">
                                <p>{t.contactText}</p>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h3>{language === 'de' ? 'Telefon' : language === 'ru' ? 'Телефон' : 'Phone'}</h3>
                                        <p>{contactData.tel}</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h3>E-Mail</h3>
                                        <p>{contactData.email}</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h3>{language === 'de' ? 'Standort' : language === 'ru' ? 'Местоположение' : 'Location'}</h3>
                                        <p>{contactData.location}</p>
                                    </div>
                                </div>
                            </div>
                            <ContactForm language={language} t={t} />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer>
                    <div className="container">
                        <div className="social-links">
                            <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        </div>
                        <p>{t.footerText}</p>
                    </div>
                </footer>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));









