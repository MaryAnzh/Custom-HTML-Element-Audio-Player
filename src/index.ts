"use strict";

import './assets/style/style.scss';
import { app } from './view/app';
import { AppRouter } from './view/app-router ';
import { AudioPlayerCustomHTML } from './view/components/audio-player/audio-player';

customElements.define("audio-player", AudioPlayerCustomHTML);

const routes: string[] = [
    '/',
    '/about'
];

let currentPage: string | null = null;

const appRoute = new AppRouter(routes);

const onloadPage = () => {
    const page = appRoute.route();
    currentPage = page;
    app.addPage(page);
}

const onloadApp = () => {
    app;
    onloadPage();
}

window.onload = () => onloadApp();

window.addEventListener('hashchange', () => {
    app.removePage();
    onloadPage();
});