import movMDC from '../../dades/MDolors_Carlos.json'
import movMD from '../../dades/MDolors.json'
import movTGN from '../../dades/tgn.json'
import movJMG from '../../dades/jmg.json'

export default function () {
  return {
    arrComptes: [movMDC, movMD, movTGN, movJMG],

    // 3. Array de valors unics (unificats) de conceptes del any i compte seleccionat
    arrConceptesUnificats: [
      'NATURGY', 'CORRESP.', 'OCASO', 'IBERDROLA',
      'FATIR', 'DETIR', 'Iva', 'PR.DE', 'PR.FA',
      'NOMINA', 'A.C.E.S.A', 'TAXI', 'MASPI'
    ]

  }
}
