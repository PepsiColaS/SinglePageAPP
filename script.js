
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




// SPA
document.querySelectorAll('a').forEach(function (element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        var url = this.getAttribute('href');

        history.pushState({ page: url }, '', url);
        
        loadPageContent();
    });
});

window.onpopstate = loadPageContent;

function loadPageContent() {
    var a = document.getElementsByClassName('active')
    a[0].classList.remove('active')
    let currentUrl = window.location.href + '.html'; 
    if (currentUrl == 'http://localhost:3000/index.html' || currentUrl == 'http://localhost:3000/.html') {
        currentUrl = '/activity.html'
        document.getElementById('index10').classList.add('active')
    }
    fetch(currentUrl)
    .then(response => response.text())  
    .then(text => {
        if (text.length) {
            document.getElementById('container').innerHTML = text;
            if (currentUrl.endsWith('/map.html')) {
                initMap();
                document.getElementById('map10').classList.add('active');
            }
            if (currentUrl.endsWith('/timer.html')) {
                timer()
                document.getElementById('timer10').classList.add('active')
            }

            
        } else {
            console.log('Error');
        }
    })
    .catch(error => console.error('Ошибка при загрузке контента:', error));
}


window.onload = function() {
    loadPageContent()
    startTime = Date.now()
};

// Таймер
function timer() { 
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
