$(document).ready(function() {
    // console.log("ready!");
    $.ajax({
        method: 'GET',
        url: 'https://api.coinmarketcap.com/v2/ticker/?limit=20&sort=rank'
    })
        .done(function(data) {
            // console.log(data);

            for (let i in data.data) {
                let dat = data.data[i].quotes.USD;
                $(".content").append(template(data.data[i].name,data.data[i].symbol,dat.price.toFixed(2),timeConverter(data.data[i].last_updated),dat.volume_24h.toFixed(2),dat.market_cap.toFixed(2),dat.percent_change_24h.toFixed(2),dat.percent_change_1h.toFixed(2),dat.percent_change_7d.toFixed(2)));
            };
        }).fail(function (error) {
            console.log(error);
        });


    function template(name='n/a',symbol='n/a',price='n/a',time='n/a',volume='n/a',market_cap='n/a',percent_change_24h='n/a',percent_change_1h='n/a',percent_change_7d='n/a') {
        let schema =
            `<div class="col-md-6 mb-5">
            <h2><strong>${symbol} ${(symbol === 'BTC' || symbol === 'BCH') ? '<i class="fab fa-bitcoin text-warning"></i>':''}</strong></h2>
            <p>${name}</p>
            <div class="card bg-light">
            <div class="card-body">
            <div class="row">
            <div class="col-md-7">
            <h4 class="card-title">Price: <strong>$${price}</strong></h4>
            <h5 class="card-title">Volume (24h): $${volume}</h5>
            <h5 class="card-title">Market Cap: $${market_cap}</h5>
            <p>Last update: ${time}</p>
            </div>
            <div class="col-md-5">
            <p>1h change: <strong>${percent_change_1h}</strong>% ${(percent_change_1h < 0) ? '<i class="fas fa-arrow-down text-danger"></i>':'<i class="fas fa-arrow-up text-success"></i>'}</p>
            <p>24h change: <strong>${percent_change_24h}</strong>% ${(percent_change_24h < 0) ? '<i class="fas fa-arrow-down text-danger"></i>':'<i class="fas fa-arrow-up text-success"></i>'}</p>
            <p>7d change: <strong>${percent_change_7d}</strong>% ${(percent_change_7d < 0) ? '<i class="fas fa-arrow-down text-danger"></i>':'<i class="fas fa-arrow-up text-success"></i>'}</p>
            </div>
            </div>
            </div>     
            </div>
            </div>`;
        return schema;
    }

    function timeConverter(UNIX_timestamp){
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

});