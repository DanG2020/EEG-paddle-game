const { MuseClient, channelNames } = require('muse-js');

require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');

async function connectToMuse() {
    const client = new MuseClient();
    await client.connect();
    await client.start();

    const leftChannel = channelNames.indexOf('AF7'); // Left eye electrode
    const blinks = client.eegReadings
        .filter(r => r.electrode === leftChannel)
        .map(r => Math.max(...r.samples.map(n => Math.abs(n))))
        .filter(max => max > 500);

     
        
    blinks.subscribe(() => {
       console.log('Blinkheard!');
        const leftEvent = new Event('keydown');
            leftEvent.keyCode = 37; // Space key
           // console.log(leftEvent)
            document.dispatchEvent(leftEvent);
               
  
    }); 
    const blinksstop = client.eegReadings
        .filter(r => r.electrode === leftChannel)
        .map(r => Math.max(...r.samples.map(n => Math.abs(n))))
        .filter(max => max < 40); 

        blinksstop.subscribe(() => {
            console.log('Blink!');
            const leftEvent = new Event('keyup');
                leftEvent.keyCode = 37; // Space key
               // console.log(leftEvent)
                document.dispatchEvent(leftEvent);
        });
    
// --------------------------------------------------------------------------

const rightChannel = channelNames.indexOf('AF8'); // Left eye electrode
const blinks2 = client.eegReadings
    .filter(r => r.electrode === rightChannel)
    .map(r => Math.max(...r.samples.map(n => Math.abs(n))))
    .filter(max => max > 500);

 
    
blinks2.subscribe(() => {
    console.log('Blinkright!');
    const rightEvent = new Event('keydown');
        rightEvent.keyCode = 39; // Space key
       // console.log(rightEvent)
        document.dispatchEvent(rightEvent);
            

}); 
const blinksstop2 = client.eegReadings
    .filter(r => r.electrode === rightChannel)
    .map(r => Math.max(...r.samples.map(n => Math.abs(n))))
    .filter(max => max < 40); 

    blinksstop2.subscribe(() => {
        console.log('Blink2!');
        const rightEvent = new Event('keyup');
            rightEvent.keyCode = 39; // Space key
         //   console.log(rightEvent)
            document.dispatchEvent(rightEvent);
    }); 
    
//---------------------------------------------------------------------------
}
window.connectToMuse = connectToMuse;

//------------------------------





