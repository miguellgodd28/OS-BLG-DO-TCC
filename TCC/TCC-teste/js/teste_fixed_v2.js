// teste_fixed_v2.js - versão mais robusta e limpa para rolagem horizontal com setas
(function(){
  let rafId = null;

  function $(sel){ return document.querySelector(sel); }
  function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

  function updateArrowStates(){
    const container = $('#coffeeContainer');
    const left = $('#coffeeLeftArrow');
    const right = $('#coffeeRightArrow');
    if (!container || !left || !right) return;
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    const atStart = container.scrollLeft <= 1;
    const atEnd = container.scrollLeft >= (maxScroll - 1);
    left.disabled = atStart;
    right.disabled = atEnd;
  }

  function scrollCoffee(direction){
    const container = $('#coffeeContainer');
    if (!container) return;
    const card = container.querySelector('.btn_Custom_backgroud');
    const style = getComputedStyle(container);
    const gap = parseInt(style.gap) || 20;
    const cardWidth = card ? Math.round(card.getBoundingClientRect().width + gap) : Math.round(Math.max(180, container.clientWidth * 0.6));
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    let target = container.scrollLeft + (direction * cardWidth);
    if (target < 0) target = 0;
    if (target > maxScroll) target = maxScroll;

    if ('scrollTo' in container) {
      container.scrollTo({ left: target, behavior: 'smooth' });
    } else {
      container.scrollLeft = target;
    }

    // atualiza ícones após animação
    setTimeout(() => updateArrowStates(), 220);
  }

  document.addEventListener('DOMContentLoaded', function(){
    const left = $('#coffeeLeftArrow');
    const right = $('#coffeeRightArrow');
    const container = $('#coffeeContainer');

    if (left) left.addEventListener('click', () => scrollCoffee(-1));
    if (right) right.addEventListener('click', () => scrollCoffee(1));
    if (container) {
      container.addEventListener('scroll', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateArrowStates);
      });

      // teclado
      container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); scrollCoffee(-1); }
        if (e.key === 'ArrowRight'){ e.preventDefault(); scrollCoffee(1); }
      });
    }

    // recalcular após imagens carregarem e resize
    window.addEventListener('load', updateArrowStates);
    window.addEventListener('resize', () => { if (rafId) cancelAnimationFrame(rafId); rafId = requestAnimationFrame(updateArrowStates); });

    // chamado inicial (um pequeno timeout garante layout pronto)
    setTimeout(updateArrowStates, 50);
  });

  // export placeholders (se o resto do seu código espera funções globais)
  window.selectCoffeeType = window.selectCoffeeType || function(){ console.log('selectCoffeeType called'); };
  window.selectSize = window.selectSize || function(){ console.log('selectSize called'); };
})();