import { NotFound } from './pages/not-found/not-found'

export type Request = {
    resource: string | null, id: string | null, verb: string | null
}

export class AppRouter {
    public routes: string[];
    public notFound: NotFound;

    constructor(routes: string[]) {
        this.routes = routes;
        this.notFound = new NotFound();
    }

    route = (): string => {
        const pageName = this.parseRequestURL();
        const page = this.routes.filter((el: string): boolean => el == pageName)[0];
        return page;
    }

    parseRequestURL = (): string => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")

        let request: Request = {
            resource: null,
            id: null,
            verb: null
        }

        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];;
        let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
        return parsedURL;
    }
}