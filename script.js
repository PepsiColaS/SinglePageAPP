function loadNewPage(url) {
    // Изменяем URL без перезагрузки страницы
    window.history.pushState({page: "newPage"}, "New Page", url);
    
    // Загружаем новое содержимое страницы
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data;
            if (url == "timer.html"){
               timer();
            }
            if (url == "map.html"){
                initMap();          
             }
        });
}


// Создание янедкс карты

function initMap() {
    ymaps.ready(function() {
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
function timer(){
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