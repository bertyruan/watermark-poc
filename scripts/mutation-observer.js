//MutationObserver.observe() config
const mediaContainerId = "iframe";
const mediaContainerEl = document.getElementById(mediaContainerId);
const mediaChildrenEl = mediaContainerEl.children;


const config = {
    subtree: true,
    childList: true,
    attributeFilter: ['style', 'class', 'id', 'width', 'height'],
    attributeOldValue: true,

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
                        // is it possible to do it without disconnecting and refereshing?
                        toggleObserver(function(mutation) {
                            if(mutation.oldValue === null) {
                                mutation.target.removeAttribute(mutation.attributeName);
                            }
                            if(mutation.oldValue) {
                                mutation.target.setAttribute(mutation.attributeName, mutation.oldValue);
                            }

                            // resets canvas font. b.c. canvas font styles reset when height or width changes
                            rawr.refresh();
                        }, mutation);
                        break;

                    case "style":
                        if(mutation.oldValue === null) {
                            mutation.target.removeAttribute('style');
                        }
                        break;
                    
                    case "id":
                        toggleObserver(function(mutation) {
                            mutation.target.id = mutation.oldValue; 
                        }, mutation);
                        break;
                        
                    case "class":
                        toggleObserver(function(mutation) {
                            mutation.target.classList = mutation.oldValue; 
                        }, mutation);
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

function toggleObserver(callback, mutation) {
    observer.disconnect(); 
    callback(mutation);
    observe(observer);
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