// addAudioItem(perent: HTMLElement, item: IPlayItem) {
//     const li = new Control(perent, 'li', 'play-list-item');
//     const audio = new Audio();
//     audio.src = item.src;
//     const icon = new Control(li.node, 'div', 'play-list-item__icon');

//     const itemInfo = new Control(li.node, 'div', 'play-list-item__info');
//     const name = new Control(itemInfo.node, 'p', '', item.title);
//     const text = item.time ? this.viewTime(item.time) : '';
//     const time = new Control(itemInfo.node, 'p', '', text);
//     const svg = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
//     svg.setAttribute('viewBox', '0 0 30 15.7');
//     svg.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
//     `;
//     li.node.appendChild(svg);
//     icon.node.onclick = () => this.onClickPlay(item, audio);

// }