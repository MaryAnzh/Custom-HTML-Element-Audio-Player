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
    // private lang: string;

    constructor() {
        super(document.body, 'div', 'wrapper');

        this.header = new Header(translator.langs);
        this.footer = new Footer();
        this.main = new Control(null, 'main', 'main', '', null);
        this.node.append(this.header.node, this.main.node, this.footer.node);

        this.header.onChange = (lang) => {
            translator.lang = lang;
        };

        translator.onChange.add(this.translate);
    }

    addPage(page: string) {
        console.log('Рисуем страницу');
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
        this.translate(translator.translate(translator.lang));
    }

    removePage() {
        if (this.currentPage !== null) {
            this.currentPage.destroy();
        }
    }

    translate = (langObj: Object): void => {
        //const langObj = translator.translate(lang);
        
        this.header.translate(langObj);
        if (this.currentPage) {
            this.currentPage.translate(langObj);
        }
    }

    destroy(): void {
        translator.onChange.remove(this.translate);
        super.destroy();
    }
}

export const app = new App();