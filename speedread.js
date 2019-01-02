javascript:(function(){
  wpm = localStorage.getItem('___aotavnkoyayovfuy_WPM') || 250;

  let gtimeout = 0;
  let inner;
  let outer;
  let wpmCounter;

  let setWpm = (dif) => {
    wpm += dif;
    wpmCounter.innerHTML = wpm;
    localStorage.setItem('___aotavnkoyayovfuy_WPM', wpm);
  };

  document.addEventListener('selectionchange', () => {
    let term = window.getSelection().toString();
    stop();
    if(term.length < 10){
      return;
    }
    if(!outer){
      outer = Array.from(document.getElementsByTagName('body'))[0].appendChild(document.createElement('div'));
      inner = outer.appendChild(document.createElement('div'));
      outer.style.position = 'fixed';
      outer.style.top = 'calc(50%25 - 50px)';
      outer.style.margin = 'auto';
      outer.style.height = '100px';
      outer.style.minWidth = '800px';
      outer.style.background = '#f5f5f5';
      outer.style.left = 'calc(50%25 - 400px)';
      outer.style.fontSize = '70px';
      outer.style.textAlign = 'center';
      outer.style.lineHeight = '100px';
      outer.style.flexDirection = 'row';
      outer.style.justifyContent = 'center';
      outer.style.alignItems = 'center';
      outer.style.display = 'flex';
      outer.style.borderTop = '3px solid';
      outer.style.borderBottom = '3px solid';
      outer.style.opacity = '0.97';

      let temp = outer.appendChild(document.createElement('div'));
      temp.style.width = '3px';
      temp.style.background = 'black';
      temp.style.height = '7px';
      temp.style.position = 'absolute';
      temp.style.top = '0px';
      temp.style.left = '50%25';

      temp = outer.appendChild(document.createElement('div'));
      temp.style.width = '3px';
      temp.style.background = 'black';
      temp.style.height = '7px';
      temp.style.position = 'absolute';
      temp.style.bottom = '0px';
      temp.style.left = '50%25';

      let temp1 = outer.appendChild(document.createElement('div'));
      temp1.style.position = 'absolute';
      temp1.style.left = '10px';
      temp1.style.flexDirection = 'row';
      temp1.style.display = 'flex';
      temp1.style.alignItems = 'center';
      temp1.style.top = '5px';

      temp = temp1.appendChild(document.createElement('button'));
      temp.style.background = '#eee';
      temp.style.color = 'black';
      temp.style.border = 'none';
      temp.style.fontSize = '10px';
      temp.innerHTML = '-';
      temp.addEventListener('click', () => setWpm(-10));

      wpmCounter = temp1.appendChild(document.createElement('div'));
      wpmCounter.style.fontSize = '10px';
      wpmCounter.style.lineHeight = '10px';
      wpmCounter.style.height = '10px';
      wpmCounter.style.margin = '10px';
      wpmCounter.innerHTML = wpm;

      temp = temp1.appendChild(document.createElement('button'));
      temp.style.background = '#eee';
      temp.style.color = 'black';
      temp.style.border = 'none';
      temp.style.fontSize = '10px';
      temp.innerHTML = '+';
      temp.addEventListener('click', () => setWpm(10));

      inner.style.display = 'inline-block';
      inner.style.transform = 'translate(8%25)';

      inner.innerHTML = '3';
    }
    setTimeout(() => inner.innerHTML = '2', 200);
    setTimeout(() => inner.innerHTML = '1', 400);
    gtimeout = setTimeout(() => nextWord(term.split(' ').reverse()), 600);
  });

  let nextWord = (words) => {
    let next = words.pop();
    if(next.length < 3 && words.length && words[words.length - 1].length < 6){
      next += ' ' + words.pop();
    }
    inner.innerHTML = next;
    let duration = (1000 / (wpm / 60)) * ((next.length / 5 - 1) * 0.5 + 1);
    let timeout = setTimeout(() => {
      if(words.length){
        if(timeout !== gtimeout){
          return;
        }
        nextWord(words);
      } else {
        stop();
      }
    }, duration);
    gtimeout = timeout;
  };

  stop = () => {
    clearTimeout(gtimeout);
    gtimeout = 0;
    if(outer){
      try{
        Array.from(document.getElementsByTagName('body'))[0].removeChild(outer);
      } catch(e){}
      outer = inner = undefined;
    }
  };
})();
