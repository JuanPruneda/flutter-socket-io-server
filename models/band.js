const{v4: uuidV4} = require('uuid'); //esta utileria se instala mediante
                                    // npm i uuid@8.3.0 y genera un ID unico


class Band{

    constructor( name = 'no-name'){
        
        this.id = uuidV4();  // crear un identificador unico
        this.name   =   name;
        this.votes  =   0;
    }

}

module.exports = Band;