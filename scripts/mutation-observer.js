//MutationObserver.observe() config
const mediaContainerId = "iframe";
const mediaContainerEl = document.getElementById(mediaContainerId);
const mediaChildrenEl = mediaContainerEl.children;


const config = {
    subtree: true,
    childList: true,
    attributeFilter: ['style', 'class', 'width', 'height'],
    attributeOldValue: true, //for testing

}
const observer = new MutationObserver(checkStyleChanges);
const observe = (observer) => observer.observe(mediaContainerEl, config);
observe(observer);

function checkStyleChanges(mutationList) {
    mutationList.forEach(mutation => {
        switch(mutation.type) {
            case "attributes":
                switch(mutation.attributeName) {
                    case "width":
                    case "height":
                        observer.disconnect();
                        if(mutation.oldValue === null) {
                            mutation.target.removeAttribute(mutation.attributeName);
                        }
                        if(mutation.oldValue) {
                            mutation.target.setAttribute(mutation.attributeName, mutation.oldValue);
                        }
                        observe(observer);
                        rawr.refresh();
                        
                        break;

                    case "style":

                        break;
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
                break;
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