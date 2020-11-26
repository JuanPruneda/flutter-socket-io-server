const Band = require("./band");


class Bands {

    constructor(){
        this.bands = [];
    }

    // Agregar Banda
    addBand(band = new Band()){
        this.bands.push( band );
    }

    // Obtener Banda
    getBands(){
        return this.bands;
    }

    //Borrar Banda
    deleteBand( id = ''){
        this.bands = this.bands.filter( band =>  band.id !== id );
        return this.bands;
    }

    //votar por una banda
    voteBand( id = ''){
        this.bands = this.bands.map( band =>{
            if(band.id === id){ //Si la banda es exactamente igual al id
                band.votes++;
                return band;
            }else{
                return band;
            }
        } );
    }
}

module.exports = Bands; //poder utilzar esta clase fuera del archivo