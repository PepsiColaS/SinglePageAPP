
// Создание яндекс карты

function initMap() {
    ymaps.ready(function () {
        document.querySelector('.preloader').style.display = 'block';

        var myMap = new ymaps.Map("map", {
            center: [56.740058, 37.225314],
            zoom: 12
        });

        var myPlacemark = new ymaps.Placemark([56.740058, 37.225314], {
            hintContent: 'Место проживания',
            balloonContent: 'Место проживания'
        });

        myMap.geoObjects.add(myPlacemark);
        document.querySelector('.preloader').style.display = 'none';

        document.querySelector('.second-map').style.height = '100%'
    });
}




// Таймер
function timer() {
    if (!sessionStorage.getItem('startTime')) {
        sessionStorage.setItem('startTime', Date.now());
    }

    const startTime = sessionStorage.getItem('startTime');
    const timeSpentElement = document.getElementById('timeSpent');

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const updateTimeSpent = () => {
        let currentTime = Date.now();
        let timeSpent = currentTime - startTime;
        timeSpentElement.textContent = formatTime(timeSpent);
    };

    setInterval(updateTimeSpent, 1000); // Обновляем каждую секунду
}


// SPA
document.querySelectorAll('a').forEach(function (element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        var url = this.getAttribute('href');

        history.pushState({ page: url }, '', url);
        
        if (url == '/index.html') url = '/activity.html'

        loadPageContent(url);
    });
});

window.addEventListener('popstate', function (event) {
    if (event.state) {
        var url = event.state.page;

        if (url == '/index.html') url = '/activity.html'
        loadPageContent(url);
    }
});

function loadPageContent(url) {
    fetch(url)
    .then(response => response.text())  
    .then(text => {
        if (text.length) {
            document.getElementById('container').innerHTML = text;
            if (url == '/map.html') initMap();
            if (url == '/timer.html') timer();
        } else {
            console.log('Error')
        }
    })
    .catch(error => console.error('Ошибка при загрузке контента:', error));

}

window.onload = function() {
    loadPageContent('/activity.html')
};

window.addEventListener('hashchange', function() {
    console.log('fggffg')
});