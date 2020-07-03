setTimeout(() => {
  const startingWindowWidth = window.innerWidth;

  const scrollToBottom = () => {
    document.documentElement.scrollTop = document.body.clientHeight;
  }

  document.body.style.background = 'orange';
  document.body.textContent = `Ok lets keep some promises guys.
Can you:
- Wait 20 seconds?
- Click on the lower-right quadrant of the screen?
- Resize the friggin window to half its current width?
  `;

  //
  // WAIT PROMISE
  //
  const waitPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('\n\ndamn u are patient hoss, you waited 20 whole seconds');
    }, 20000);
  });

  //
  // AFTER WAIT PROMISE IS RESOLVED
  //
  Promise.resolve(waitPromise).then((response) => {
    document.body.style.background = 'yellow';
    document.body.textContent += response;
    scrollToBottom();
  });

  //
  // CLICK PROMISE
  //
  const clickPromise = new Promise((resolve) => {
    const handleClick = (event) => {
      const clickX = event.clientX;
      const clickY = event.clientY;
      const isInLowerRightQuadrant = clickX > window.innerWidth / 2 && clickY > window.innerHeight / 2;
      if (isInLowerRightQuadrant) {
        window.removeEventListener('click', handleClick);
        resolve('\n\nThank you for clicking CORRECTLY');
      } else {
        document.body.textContent += '\n\nYou are CLICKING WRONG!!';
        scrollToBottom();
      }
    };

    window.addEventListener('click', handleClick);
  });

  //
  // AFTER CLICK PROMISE IS RESOLVED
  //
  Promise.resolve(clickPromise).then((response) => {
    document.body.style.background = 'green';
    document.body.textContent += response;
    scrollToBottom();
  });

  //
  // RESIZE PROMISE
  //
  const resizePromise = new Promise((resolve) => {
    const handleResize = (event) => {
      window.requestAnimationFrame(() => {
        if (window.innerWidth <= startingWindowWidth / 2) {
          window.removeEventListener('click', handleResize);
          resolve('\n\nResizing the browser window is one of your talents');
        } else {
          document.body.textContent += '\n' + window.innerWidth;
          scrollToBottom();
        }
      });
    };

    window.addEventListener('resize', handleResize);
  });

  //
  // AFTER RESIZE PROMISE IS RESOLVED
  //
  Promise.resolve(resizePromise).then((response) => {
    document.body.style.background = 'pink';
    document.body.textContent += response;
    scrollToBottom();
  });

  //
  // AFTER ALL PROMISES HAVE BEEN RESOLVED
  //
  Promise.all([waitPromise, clickPromise, resizePromise]).then((responses) => {
    document.body.textContent += '\n\nAll promises have been resolved!';
    scrollToBottom();
    console.log('these were their responses:', responses);
  });
}, 3000);
