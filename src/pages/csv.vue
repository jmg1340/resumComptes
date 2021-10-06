<template>
  <div>
    <div class="text-h6 text-center">CSV a JSON</div>
    <div class="q-ma-md">
      Les dades exportades de La Caixa (fitxer xls) s'han d'obrir amb
      LibreOffice i transformar a CSV. Abans, assegurar-se de que en el format
      de l'import, el separador de decimals sigui un punt i que no tingui cap
      separador d'unitats de mil
    </div>

    <div class="row">
      <div class="col-6 q-pa-lg">
        Enganxar les dades del CSV, que han de ser: DATA, MOVIMENT, IMPORT.
        <q-input v-model="csv" filled type="textarea" autogrow />
      </div>
      <div class="col-6 q-pa-lg bg-yellow-3">
        <div v-for="(item, index) in json" :key="index">{{ item }},</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      csv: null
    };
  },

  computed: {
    json: function() {
      if (this.csv) {
        const arrLinies = this.csv.split("\n");
        const arrJSON = arrLinies.map(linia => {
          const dades = linia.split(",");

          return {
            data: dades[0],
            moviment: dades[1],
            import: dades[2]
          };
        });
        return arrJSON;
      }
      return "";
    }
  }
};
</script>

<style></style>
