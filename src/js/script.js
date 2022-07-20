// import { smoothScrollToTop } from './modules/slidingscroll';
// const { smoothScrollToTop } = require('./modules/sliding-scroll');

document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    timer('.timer', deadline());
    forms();
    hamburger();
    goTop();
});

// TIMER
function deadline() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
}

function timer(id, deadline) {
    function getTimeRemaining(endtime) {
        const t       = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor((t / 1000) % 60),
              minutes = Math.floor((t / 1000 / 60) % 60),
              hours   = Math.floor((t / (1000 * 60 * 60)) % 24);

        return {
            total: t,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer        = document.querySelector(selector),
              hours        = timer.querySelector('#hours'),
              minutes      = timer.querySelector('#minutes'),
              seconds      = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

// FORM
function forms() {
    const form = document.querySelector('#free-training-form');
    // inputs = document.querySelectorAll('.join__input');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });

        return await res.json();
    };
    bindPostData(form);

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    statusMessage.textContent = message.success;
                })
                .catch(() => (statusMessage.textContent = message.failure))
                .finally(() => {
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    }
}

// HAMBURGER
function hamburger() {
    const menu      = document.querySelector('.menu'),
          // menuItem  = document.querySelectorAll('.menu__link'),
          hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    // menuItem.forEach(item => {
    //     item.addEventListener('click', () => {
    //         hamburger.classList.toggle('hamburger_active');
    //         menu.classList.toggle('menu__items_active');
    //     });
    // });

}

// go to top button
function goTop() {
    const goTopBtn = document.querySelector('#gotop');

    goTopBtn.addEventListener('onclick', () => {
        // smoothScrollToTop(800);
        // document.querySelector('body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    window.addEventListener('scroll', () => {
        // if (this.scrollTop() > 400) {
        //     goTopBtn.removeAttribute('hidden');
        // } else {
        //     goTopBtn.setAttribute('hidden', 'hidden');
        // }

    });
}


