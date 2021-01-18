<template>
  <div class="q-ma-lg">
    
   <q-table
      title="Quadre anual"
      :data="getQuadre"
      :columns="columnes"
      row-key="concepte"
      separator="cell"
      dense
      :pagination="initialPagination"
      class="capsalera"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-md">
             <!-- <div class="col"> -->
              <q-select class="col-auto bg-white" color="grey-8" dense outlined label-color="orange" v-model="compteSeleccionat" :options="getComptes" label="Seleccionar compte">
                <template v-slot:append>
                  <q-icon name="description" color="orange" />
                </template>
              </q-select>
              <q-space />
              <q-select class="col-auto bg-white" color="grey-8" dense outlined label-color="orange" v-model="anySeleccionat" :options="getAnys" label="Seleccionar any">
                <template v-slot:append>
                  <q-icon name="event" color="orange" />
                </template>
              </q-select>
            <!-- </div> -->
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="concepte" :props="props" @click="veureMoviments(props.row.concepte)">
            {{ props.row.concepte }}
          </q-td>

          <q-td v-for="objMes in mesos" :key="objMes.nom"  :props="props" >
            <div :class="{colorImport: props.row[objMes.numero] < 0}">
              {{ (props.row[objMes.numero] == 0) ? null : props.row[objMes.numero] }}
            </div>
          </q-td>


          <q-td key="totalConcepte" :props="props" :class="{colorImport: props.row.totalConcepte < 0}">
            {{ props.row.totalConcepte }}
          </q-td> 

        </q-tr>
      </template>
    </q-table>



    <q-dialog v-model="activarMoviments" >
      <q-card style="width: 600px" class="q-pa-md">
        <ul>
          <li v-for="(objMov,index) in arrMoviments" :key="index">
            <div class="row no-wrap" style="border-bottom: 1px solid black">
              <div class="col-2">{{objMov.data}}</div>
              <div class="col-6">{{objMov.moviment}}</div>
              <div class="col-auto">{{objMov.import}}</div>
            </div>
          </li>
        </ul>

      </q-card>
    </q-dialog>


  </div>  
 
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      compteSeleccionat: {label: "Compte Carlos & Mª Dolors", value: "ES89 2100 1085 9001 0053 9597"},
      anySeleccionat: null,
      activarMoviments: false,
      arrMoviments: [],
      mesos: [
        { numero: '01', nom: 'gen' },
        { numero: '02', nom: 'feb' },
        { numero: '03', nom: 'mar' },
        { numero: '04', nom: 'abr' },
        { numero: '05', nom: 'mai' },
        { numero: '06', nom: 'jun' },
        { numero: '07', nom: 'jul' },
        { numero: '08', nom: 'ago' },
        { numero: '09', nom: 'set' },
        { numero: '10', nom: 'oct' },
        { numero: '11', nom: 'nov' },
        { numero: '12', nom: 'des' }
			],
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 75
      }
			
    }
  },

  methods: {
    veureMoviments(concepte){
      // retorna array d'objectes moviments
      this.arrMoviments = this.$store.getters["modulIG/getMoviments"](this.compteSeleccionat.value, this.anySeleccionat, concepte)
      console.log(this.arrMoviments);
      this.activarMoviments = true
    }
  },

  computed: {

		columnes: function () {
			let arrCols = [
        { 
          name: 'concepte', label: 'Concepte', field: 'concepte', 
          classes: 'bg-grey-2 ellipsis', 
          headerClasses: 'bg-grey-9 text-white text-center'
        }
			]

      this.mesos.forEach( (mes) => {
				arrCols.push({ 
					name: mes.nom, 
					label: mes.nom, 
          field: mes.numero,
          headerClasses: 'bg-grey-9 text-white'
				})
      })

			arrCols.push({ 
        name: 'totalConcepte', 
        label: 'Total', 
        field: 'totalConcepte', 
        classes: 'bg-grey-2 ellipsis', 
        headerClasses: 'bg-grey-9 text-white'
      })
			
			return arrCols
	
		},

    getComptes: function () {
      return this.$store.getters["modulIG/getComptes"]
    },

    getAnys: function () {
      if ( this.compteSeleccionat === null ) {
        return []
      } else {
        return this.$store.getters["modulIG/getAnys"](this.compteSeleccionat.value)
      }
      
    },

    getQuadre: function (){
      console.log("compteSeleccionat.value: "+ this.compteSeleccionat.value)
      if (this.compteSeleccionat.value === null && this.anySeleccionat === null) {
        return []
      } else {
        return this.$store.getters["modulIG/getQuadreDades"](this.compteSeleccionat.value, this.anySeleccionat)
      }
    },

  },
}
</script>


<style lang="sass" scoped>
  .capsalera::v-deep

    /* height or max-height is important */
    height: 500px

    .q-table__top
      /* bg color is important for th; just specify one */
      background-color: #f5d671

    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0


    /* this is when the loading indicator appears */
    &.q-table--loading thead tr:last-child th
      /* height of all previous header rows */
      top: 48px





  tr:last-child >
    td 
      background-color: #f5d671
  

  .colorImport
    color: red
  
</style>
