const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();    //crear una nueva instancia de la clase Bands
console.log('init server');     //mostrar mensaje al usuario

bands.addBand( new Band('Queen'));                  //Agregar una banda a bandas
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Heroes del Silencio'));
bands.addBand( new Band('Metallica'));

console.log(bands);                       //imprimir en consola

// Mensajes de Sockets
io.on('connection', client => {             //Cuando hay una conexion con el cliente
    console.log('Cliente conectado');
    
    client.emit('active-bands',bands.getBands() );       //emitir un mensaje al cliente que  se esta conectando
    
    client.on('disconnect', () => { 
        console.log('Cliente Desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje!!!', payload);

        io.emit( 'mensaje', { admin: 'Nuevo Mensaje' });
    });

    /*
    client.on('emitir-mensaje', (payload) => {
        
        //console.log(payload);
        //io.emit('nuevo-mensaje', payload); //emite a todos los clientes
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos los clientes menos el que lo emitio


    })*/

    client.on('vote-band', ( payload )=> {      //escuchar un mensaje del cliente

        console.log(payload); //imprimir en pantalla el id de la banda
        bands.voteBand( payload.id ); //aqui se realiza la votacion respectiva
        io.emit('active-bands', bands.getBands()); //notificar a todos los clientes!!

    });

    //Escuchar: add-band
    client.on('add-band', ( payload )=> {      //escuchar un mensaje del cliente

        const newBand = new Band(payload.name);
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands()); //notificar a todos los clientes!!

    });
    // Escuchar: delete-band
    client.on('delete-band', ( payload )=> {      //escuchar un mensaje del cliente

        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands()); //notificar a todos los clientes!!

    });

  });

