export function getComptes( state ) {
  return state.arrComptes.map( (objCompte) => {
    return {
      value: objCompte.compte,
      label: objCompte.descripcio
    }
  })
}


export function getAnys(state) {
  return function(compteSeleccionat) {
    // 1. De state.arrComptes seleccionar compte a fer el quadre
    const objCompteSeleccionat = state.arrComptes.filter(
      objCompte => objCompte.compte == compteSeleccionat
    )[0];  
    
    return [...new Set(objCompteSeleccionat.moviments.map(obj => obj.data.substring(6)))];
  };
}


export function getQuadreDades(state, getters) {
  

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }  
  

  return function(compteSeleccionat, anySeleccionat) {

    // 1. De state.arrComptes seleccionar compte a fer el quadre
    const objCompteSeleccionat = state.arrComptes.filter(
      objCompte => objCompte.compte == compteSeleccionat
    )[0];

    console.log(objCompteSeleccionat);

    // 2. De l'objCompteSeleccionat, filtrar els moviments de l'any seleccionat
    const arrMovimentsAnyMes = objCompteSeleccionat.moviments.map(obj => {
      obj.any = obj.data.substring(6);
      obj.mes = obj.data.substring(3, 5);
      return obj;
    });

    const arrMovimentsAnySeleccionat = arrMovimentsAnyMes.filter(
      obj => obj.any == anySeleccionat
    );

    
    const arrConceptes = [...new Set(arrMovimentsAnySeleccionat.map(obj => {
      // console.log(arrConceptesUnificats)
      let strConUnif = ""
      const existeixConcepteUnificat = state.arrConceptesUnificats.some( (conUnif) => {
        strConUnif = conUnif
        const re = new RegExp("^" + conUnif)
        return re.test(obj.moviment)
      })
      return existeixConcepteUnificat ? strConUnif : obj.moviment
    }))]

    arrConceptes.sort( );   // ordenacio alfabètica


    // 4. Construccio del quadre

    /* array on les dades s'estructuren de la següent manera
      [
        {concepte: "xxxx", 01: (suma imports mes 1), 02: (suma imports mes 2), ... , total: (suma concepte)},
        {concepte: "yyyy", 01: (suma imports mes 1), 02: (suma imports mes 2), ... , total: (suma concepte)},
        ...
        {concepte: "TOTAL, 01: (suma mes 1, 02: (suma mes 2", ... , total: (suma de total"}
      ]
      */

    const arrMesos = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];

    const arrQuadre = [];    // array on hi haurà les dades que es mostren a la taula
  
    // creacio objecte on hi haurà el sumatori dels imports totals de cada mes
    const objSumesMesos = arrMesos.reduce ( (obj, mes ) => {
      obj[mes] = 0
      return obj
    }, {} )

    // construccio del quadre (cada linia és un objecte que, un cop creades les seves propietats, -concepte,
    // mesos i total concepte- serà afegit a arrQuadre) en funció de ANY, MES, CONCEPTE
    arrConceptes.forEach(concepte => {

      let objlinia = {};  // objecte on hi haurà la informació de cada linia o registre de la taula
      objlinia.concepte = concepte;   //creacio i assignacio del valor concepte

      arrMesos.forEach(mes => {
        // Per cada mes, creació de la propietat nºmes i assignació de valor que serà la suma de tots
        // els imports dels moviments per a l'any seleccionat i concepte i mes de torn)
        objlinia[mes] = arrMovimentsAnySeleccionat.reduce((total, objMov) => {
          const re = new RegExp("^" + concepte)
          if (
            objMov.any === anySeleccionat &&
            objMov.mes === mes &&
            re.test(objMov.moviment)
          ) {
            const totalMesConcepte = round(+total + +objMov.import, 2);            
            return totalMesConcepte
          } else {
            return total;
          }
        }, 0);

        // paral·lelament va calculant el total del mes a traves de l'objecte ja creat anteriorment.
        objSumesMesos[mes] = round (objSumesMesos[mes] + objlinia[mes], 2)   // import acumulat del mes
      });

      // afegir propietat "totalConcepte" amb la suma dels imports de tots els mesos
      const importTotalConcepte = arrMesos.reduce(
        (suma, mes) => suma + objlinia[mes],
        0
      );
      objlinia.totalConcepte = round(importTotalConcepte, 2);
 
      // un cop ja tenim fetes totes les propietats de l'objecte (concepte, 01, 02, .. totalConcepte)
      // l'afegim a l'array
      arrQuadre.push(objlinia);

    });


    // Fins aqui tenim fetes les dades (concepte, imports de cada mes i totalConcepte). Ara cada afegir
    // una linia / registre més al array on hi haurà el total per cada mes.
    // Els imports totals de cada mes ja els tenim a objSumesMesos. A dit objecte se li afegeix la propietat
    // 'totalConcepte' que sera la suma de les propietats on hi ha l'import total dels mesos.
    // Despres se li afegeix propietat "concepte: 'TOTAL'" i finalment s'afegeix l'objecte al arrQuadres

    const importTotalConcepte = round (arrMesos.reduce(
      (suma, mes) => suma + objSumesMesos[mes],
      0
    ) ,2);
    objSumesMesos.totalConcepte = round(importTotalConcepte, 2);
    objSumesMesos.concepte = "TOTAL:"
    arrQuadre.push(objSumesMesos);

    return arrQuadre
  };

}




export function getMoviments(state, getters) {
  
  return function(compteSeleccionat, anySeleccionat, concepte) {

    // 1. De state.arrComptes seleccionar compte 
    const objCompteSeleccionat = state.arrComptes.filter(
      objCompte => objCompte.compte == compteSeleccionat
    )[0];

    // 2. De l'objCompteSeleccionat, filtrar els moviments de l'any seleccionat
    const arrMovimentsAny = objCompteSeleccionat.moviments.map(obj => {
      obj.any = obj.data.substring(6);
      return obj;
    });

    return arrMovimentsAny.filter(obj => {
      const re = new RegExp("^" + concepte)
      return obj.any === anySeleccionat && re.test(obj.moviment)
    });

  }
}