import { Control } from '../service/control';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Main } from './pages/main/main';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { translator } from '../service/translator/translator';

class App extends Control {
    private header: Header;
    private footer: Footer;
    public main: Control;
    private currentPage: Main | About | NotFound | null = null;
    private lang: string;

    constructor() {
        super(document.body, 'div', 'wrapper');

        const langs = ['en', 'ru', 'by'];
        this.lang = 'en';
        this.header = new Header(langs);
        this.footer = new Footer();
        this.main = new Control(null, 'main', 'main', '', null);
        this.node.append(this.header.node, this.main.node, this.footer.node);

        this.header.onChange = (lang) => {
            this.translate(lang);
            this.lang = lang;
        };
    }

    addPage(page: string) {
        this.header.selectCurrentPage(page);
        let newPage: Main | About | NotFound | null = null;

        switch (page) {
            case '/':
                newPage = new Main();
                break;

            case '/about':
                newPage = new About();
                break;
            default:
                newPage = new NotFound();
                break;
        }

        this.currentPage = newPage;
        this.main.node.appendChild(newPage.node);
        this.translate(this.lang);
    }

    removePage() {
        if (this.currentPage !== null) {
            this.currentPage.destroy();
        }
    }

    translate = (lang: string): void => {
        const langObj = translator.translate(lang);
        this.header.translate(langObj);
        if (this.currentPage) {
            this.currentPage.translate(langObj);
        }
    }
}

export const app = new App();