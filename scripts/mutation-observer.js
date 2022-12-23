//MutationObserver.observe() config
const mediaContainerId = "iframe";
const mediaContainerEl = document.getElementById(mediaContainerId);
const mediaChildrenEl = mediaContainerEl.children;

const config = {
    subtree: true,
    childList: true,
    attributesFilter: ['style', 'class'],
    attributeOldValue: true, //for testing

}
const observer = new MutationObserver(checkStyleChanges);
observer.observe(mediaContainerEl, config);

function checkStyleChanges(mutationList) {
    mutationList.forEach(mutation => {
        switch(mutation.type) {
            case "attributes":
                switch(mutation.attributeName) {
                    case "class":
                        console.log(mutation.oldValue);
                        // if (mutation.oldValue) {
                        //     console.log(mutation.target);
                        //     mutation.target.classList = mutation.oldValue.split(" "); 
                        // }
                        break;
                }
            break;

            case "childList":
                if (mutation.removedNodes.length) {
                    const canvasIsRemoved = Array.from(mutation.removedNodes).filter(n => n.nodeName === "CANVAS").length;

                    if(canvasIsRemoved) {
                        removeAllMediaDOMElements();
                        createMediaErrorMessage();
                    }
                }
        }
    });
}

function removeAllMediaDOMElements() {
    Array.from(mediaChildrenEl).forEach(el => mediaContainerEl.removeChild(el));
}

function createMediaErrorMessage() {
    const image = document.createElement('img');
    image.src = "./bsod.jpg";
    image.classList.add('media-content');
    image.style.zIndex = 1000;
    mediaContainerEl.appendChild(image);
}