const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d"); 

// Kad tiek nospiesta jebkura taustiņš, tiek izsaukta funkcija, lai pārvietotu pan
 
// pan sākotnējās pozīcijas
  let pan_x = 0;
  let pan_y = 0;
    // Izveido jaunu attēlu pan un nosaka avotu, kas norāda attēla URL
  let PanImg = new Image();
  PanImg.src = "https://cdn-icons-png.flaticon.com/128/10698/10698438.png";
// Sākotnējās pozīcijas cake
  let cake_x = 0;
  let cake_y = 0;

  // Izveido jaunu attēlu cake un nosaka avotu, kas norāda attēla URL
  let CakeImg = new Image();
  CakeImg.src = "https://cdn-icons-png.flaticon.com/128/6366/6366141.png";

   // Izmēri pan un cake
  let panWidth = 70;  
  let panHeight = 70;
  let cakeWidth = 40; 
  let cakeHeight = 40; 
// Sākotnējais rezultāts
  let score = 0;
// Funkcija, kas pārbauda, vai pan un cake saskaras
  function ImagesTouching(x1, y1, pan, x2, y2, cake) {
     // Pārbauda, vai pan un cake ir pārklāti (jebkura kunkcija saskaras)
    if (x1 >= x2 + cake.width || x1 + pan.width <= x2) return false;   
    if (y1 >= y2 + cake.height || y1 + pan.height <= y2) return false; 
    return true;    // Ja tie ir pārklāti, tad atgriež true                                                 
  }
  function MyKeyDownHandler (MyEvent) { 
    if (MyEvent.keyCode == 37 && pan_x > 0) {pan_x = pan_x - 10};  // Kreisā bultiņa (37), pārvieto pan pa kreisi
    if (MyEvent.keyCode == 39 && pan_x + PanImg.width < myCanvas.width) // Labā bultiņa (39), pārvieto pan pa labi
        {pan_x = pan_x + 10};
      
  }

  addEventListener("keydown", MyKeyDownHandler); 
// Šis ir spēles taimeris, sākotnējais laiks ir 20 sekundes
  let time_remaining = 20;
// Šī funkcija ir galvenais spēles cikls, kas tiek izpildīts katrā kadru izveidē
  function Do_a_Frame () {
     // Notīra kanvas, lai zīmētu visu no jauna nākamajā kadru
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
// Iestata teksta krāsu uz baltu un zīmējam pašreizējo rezultātu
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);
// Iestata pan y pozīciju tā, lai tas būtu kanvas apakšā
    pan_y = myCanvas.height - panHeight;
    // Zīmēs pan attēlu tā pašreizējā x un y pozīcijā
    ctx.drawImage(PanImg, pan_x, pan_y, panWidth, panHeight); 
      // Zīmēs laiku, kas palicis spēlē
    ctx.fillText("Time Remaining: " + Math.round(time_remaining), 0, 45);
// Ja laiks ir beidzies, parādām "Game Over" (Spēle beigusies)
    if (time_remaining <= 0) {
      ctx.fillStyle = "white";
      ctx.font = "bold 50px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);
      ctx.textAlign = "left";
      
    }
    else {
         // Samazina atlikušos laiku
      time_remaining = time_remaining - 1 / 40;
// Padara cake krītošu no augšas uz leju
      cake_y = cake_y + 3;

        // Ja cake ir nokļuvusi līdz kanvas apakšai, tad tas  novietojas atpakaļ augšā un izliek jaunu random X pozīciju
      if (cake_y > myCanvas.height) {
          cake_y = 0;
          cake_x = Math.random() * (myCanvas.width - cakeWidth);  
      }

      // Zīmē cake tā pašreizējā x un y pozīcijā
      ctx.drawImage(CakeImg, cake_x, cake_y, cakeWidth, cakeHeight);
    }

      // Pārbauda, vai pan  un cake ir saskārušies
    if (ImagesTouching(pan_x, pan_y, PanImg, cake_x, cake_y, CakeImg)) {
        score = score + 1; // Ja tie ir saskārušies, palielinām rezultātu par 1

// Pārvietojas cake ārā no ekrāna, lai "pazustu"
        cake_y = -cakeHeight;  

          // Pēc tam, kad cake "sāvāktas" tas šis kods to novieto random  pozīcijā
        cake_x = Math.random() * (myCanvas.width - cakeWidth);
    }
  }   
   // kods izsauc spēles ciklu katrā 25 milisekundēs (tā tiek kontrolēts spēles ātrums)
  setInterval(Do_a_Frame, 25);