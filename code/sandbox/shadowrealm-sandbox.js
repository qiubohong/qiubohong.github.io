/**
 * 
 */

class ShadownRealmSandBox{
    constructor(){
        this.sr = new ShadownRealm();
    }

    excute(code){
        return this.sr.evaluate(code);
    }
}