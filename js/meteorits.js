function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var data = xhttp.responseText;
    // Innen, ide dolgozz... Itt hívd meg a függvényeid stb. A json file tartalma innen érhető csak
    // Live servert használd mindig
    var datas = JSON.parse(data);

   createTable(datas);
   sortingData(sortingKey);


   //1951-01-01T00:00:00.000
   //1951. 01. 01.


    


   var sumWeight = 0;
   for (var i = 0; i < datas.length; i++) {
    sumWeight += datas[i].mass;
    }
    var para = document.createElement("P");
    var t = document.createTextNode(sumWeight);
    para.appendChild(t);
    document.querySelector("#sumWeight").appendChild(para);

    var minWeight = 0;
    datas[0].mass = minWeight;
   for (var i = 0; i < datas.length; i++) {
       if(minWeight > datas[i].mass) {
           minWeight = datas[i].mass;
       }
    }
    var para = document.createElement("P");
    var t = document.createTextNode(minWeight);
    para.appendChild(t);
    document.querySelector("#minWeight").appendChild(para);


    var maxWeight = 0;
    datas[0].mass = maxWeight;
   for (var i = 0; i < datas.length; i++) {
       if(maxWeight < datas[i].mass) {
           maxWeight = datas[i].mass;
       }
    }
    var para = document.createElement("P");
    var t = document.createTextNode(maxWeight);
    para.appendChild(t);
    document.querySelector("#maxWeight").appendChild(para);

    var para = document.createElement("P");
    var t = document.createTextNode(sumWeight/datas.length);
    para.appendChild(t);
    document.querySelector("#avgWeight").appendChild(para);

    var sum = [];
    for (var i = 0; i < datas.length; i++) {
        if (datas[i].year === 1990) {
            sum.push(datas[i].year);
        }
    }
    var para = document.createElement("P");
    var t = document.createTextNode(sum);
    para.appendChild(t);
    document.querySelector("#sum").appendChild(para);
    

    var sum10000 = [];
    for (var i = 0; i < datas.length; i++) {
        if(datas[i].mass >= 10000) {
            sum10000.push(datas[i].mass);
        }
    }
    var para = document.createElement("P");
    var t = document.createTextNode(sum10000.length);
    para.appendChild(t);
    document.querySelector("#minWeight10000").appendChild(para);

}

getData('js/meteorits.json', successAjax);

function createTable(datas) {
    var table = '';
    for (var i = 0; i < datas.length; i++) {
        table += `<tr>
        <td> ${datas[i].id} </td>
        <td> ${datas[i].mass.toFixed(2)} </td>
        <td> ${datas[i].name} </td>
        <td> ${datas[i].nametype} </td>
        <td> ${datas[i].racclass} </td>
        <td> ${datas[i].reclat} </td>
        <td> ${datas[i].reclong} </td>
        <td> ${datas[i].year} </td>
        </tr>`;
}
    document.querySelector('#meteor').innerHTML = table;
}
createTable(datas);

function sortingData(sortingKey) {
 var temp;
 var first;
 var second;
 for (var i = 0; i < datas.length-1; i++) {
     for (var j = i + 1; j < datas.length; j++) {
         first = datas[i][sortingKey];
         second = datas[j][sortingKey];
         
         if (first > second) {
             temp = datas[i];
             datas[i] = datas[j];
            datas[j] = temp;
         }
     }
 }
 createTable();
}





/* 
    A kapott JSON file a Föld-be csapódott meteoritok adatait tartalmazza.

    FELADATOK:
    1. Írasd ki egy táblázatba a következő adatait a meteoritoknak:
        id
        mass
        name
        nametype
        recclass
        reclat
        reclong
        year

     Pozitív, ha ezeket az elemeket nem az innerHTML segítségével hozod létre. 

    2. A táblázatban formázd a tömeget 2 tizedes jegy pontosan. Ha kell kerekíts a legközelebbi egészre.
       A matamatikai kerekítés szabályait használd. Ha valahol egész érték van, ott is legyen a 00 kiiratva
       az egész érték után .
       Formázd a dátumot az alábbi formátumba: 1990. 01. 02. 
    
    3. A táblázat fejlécére kattintva növekvő sorrendbe lehessen rendezni a táblázat adatait az alábbi
       meteorit tulajdonságok szerint: id, mass, name, és reclass.
       Az id és a mass szerinti rendezés számok alapján rendezzen.

    4.  Valósítsd meg a rendezést úgy, hogy nem csak növekvő, hanem csökkenő sorrendbe is lehessen az adatokat rendezni.
        Ha az adatok még nincsenek rendezve, akkor az adott fejlév/tulajdonság alapján növekvő sorrendbe rendezze az adatokat kattintásra.
        Amennyiben még egyszer ugyanarra a fejlécre kattintanak, akkor a sorrend legyen csökkenő. És így tovább....
        Amennyiben egy új fejlécre kattintanak, először mindig növekvő sorrend szerint legyenek az  adatok rendezve.

    5. A táblázat alá az alábbi adatokat ki kell iratni/számolni:

        Az összes meteorit összsúlya
        A legkönyebb meteorit súlya
        A legnehezebb meteorit súlya
        A meteoritok súlyának átlaga
        Hány darab meteorit csapódott be 1990-ben
        Hány darab meteorit súlya legalább 10000

        Ezeket az elemeket ne az innerHTML segítségével hozd létre. Használd az ismert node metódusokat. KÖTELEZŐEN!

    6. Legyen szép a táblázat és az adatok. HAsználj CSS-t a formázáshoz.

    7. Töltsd fel az elkészült fileokat egy github repoba, és küld el a repo elérhetőségét.

    8. Szusszanj egyet.

*/


