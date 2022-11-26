import { Control } from './control';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Main } from './pages/main/main';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';

class App {
    private _body: HTMLElement;
    private _wrapper: Control;
    private _header: Header;
    private _footer: Footer;
    public main: Control;
    private _currentPage: Main | About | NotFound | null = null;

    constructor() {
        this._body = document.querySelector('body');
        this._wrapper = new Control(this._body, 'div', 'wrapper', '', null);
        this._header = new Header();
        this._footer = new Footer();
        this.main = new Control(null, 'main', 'main', '', null);
        this._wrapper.node.append(this._header.node, this.main.node, this._footer.node);
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
        this.main.node.appendChild(newPage.page.node);
    }

    removePage() {
        if (this._currentPage !== null) {
            this._currentPage.destroy();
        }
    }
}

export const app = new App();