<template>
  <div id="callTicket">
    <h1 class="mt-16">
      BANK
      <br />FAC - BETIM
    </h1>
    <h1>Chamada de clientes:</h1>

    <div class="alignCards">
      <v-card class="card" elevation="2" outlined>
        <v-card-title class="cardTitle">Caixa 1</v-card-title>
        <v-card-text v-if="callAttendant1 != null">
          <b v-if="callAttendant1">Cliente -></b>
          {{callAttendant1 || notClient}}
        </v-card-text>
        <v-btn
          class="mx-auto cardBtn"
          elevation="2"
          rounded
          @click="attendantCaller(1)"
        >Chamar cliente</v-btn>
      </v-card>

      <v-card class="card" elevation="2" outlined>
        <v-card-title class="cardTitle">Caixa 2</v-card-title>
        <v-card-text v-if="callAttendant2 != null">
          <b v-if="callAttendant2">Cliente -></b>
          {{callAttendant2 || notClient}}
        </v-card-text>
        <v-btn
          class="mx-auto cardBtn"
          elevation="2"
          rounded
          @click="attendantCaller(2)"
        >Chamar cliente</v-btn>
      </v-card>

      <v-card class="card" elevation="2" outlined>
        <v-card-title class="cardTitle">Caixa 3</v-card-title>
        <v-card-text v-if="callAttendant3 != null">
          <b v-if="callAttendant3">Cliente -></b>
          {{callAttendant3 || notClient}}
        </v-card-text>
        <v-btn
          class="mx-auto cardBtn"
          elevation="2"
          rounded
          @click="attendantCaller(3)"
        >Chamar cliente</v-btn>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss">
#callTicket {
  background-color: #86c6f6;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 30px;
  }

  .alignCards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .card {
      width: 25%;
      padding: 10px 20px;
      margin: auto;

      .cardTitle {
        justify-content: center;
      }

      .v-card__text {
        color: #000;
      }

      .cardBtn {
        background-color: #86c6f6;
        font-size: 13px;
      }
    }
  }
}
</style>

<script>
import api from "../services/api";

export default {
   name:"callTicket",
  data() {
    return {
      callAttendant1: null,
      callAttendant2: null,
      callAttendant3: null,
      notClient: "Não há clientes na fila"
    };
  },
  methods: {
    async attendantCaller(attendant) {
      let response = await this.callClient(attendant);
      response = this.extractData(response);

      switch (attendant) {
        case 1:
          this.callAttendant1 = response;
          break;
        case 2:
          this.callAttendant2 = response;
          break;
        case 3:
          this.callAttendant3 = response;
          break;
      }
    },
    callClient(attendant) {
      return api.get("callTicket", {
        params: {
          attendant: attendant
        }
      });
    },
    extractData(data) {
      data = data.data;
      if (data.status == 200) {
        data = data.calledticket;
      } else {
        data = false;
      }
      return data;
    }
  }
};
</script>
