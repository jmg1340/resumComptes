import movMDC from '../../dades/MDolors_Carlos.json'
import movMD from '../../dades/MDolors.json'
import movTGN from '../../dades/tgn.json'

export default function () {
  return {
    arrComptes: [movMDC, movMD, movTGN],

    // 3. Array de valors unics (unificats) de conceptes del any i compte seleccionat
    arrConceptesUnificats: [
      "NATURGY", "CORRESP.", "OCASO",
      "FATIR", "Iva", "PR.DE", "PR.FA"
    ]
    
  }
}
