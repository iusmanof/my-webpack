import * as $ from 'jquery'

function createAnalytics(){
    let counter = 0;
    let destroyed = false; 

    const listener = () => counter++;

    $(document).on('click',listener);

    return{
        destroy(){
            $(document).off('click',listener);
            destroyed = true;    
        },

        getClicks(){
            return destroyed ? 'Analitics is destroyed' : counter;
        }
    }
}

window.analytics = createAnalytics(); 