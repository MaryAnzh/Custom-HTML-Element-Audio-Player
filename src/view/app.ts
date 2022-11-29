import { Control } from '../service/control';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Main } from './pages/main/main';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';

class App extends Control {
    private _header: Header;
    private _footer: Footer;
    public main: Control;
    private _currentPage: Main | About | NotFound | null = null;

    constructor() {
        super(document.body, 'div', 'wrapper');

        const langs = ['en', 'ru', 'by'];
        this._header = new Header(langs);
        this._footer = new Footer();
        this.main = new Control(null, 'main', 'main', '', null);
        this.node.append(this._header.node, this.main.node, this._footer.node);
    }

    addPage(page: string) {
        this._header.selectCurrentPage(page);

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

        this._currentPage = newPage;
        this.main.node.appendChild(newPage.node);
    }

    removePage() {
        if (this._currentPage !== null) {
            this._currentPage.destroy();
        }
    }

    translate(config: any): void {
        this._header.translate(config);
    }
}

export const app = new App();