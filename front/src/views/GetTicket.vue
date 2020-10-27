<template>
  <div id="getTicket">
    <h1 class="mt-16">
      BANK
      <br />FAC - BETIM
    </h1>
    <h1>Retirada de Ticket:</h1>

    <div class="alignCards">
      <v-card class="card" elevation="2" outlined>
        <v-card-title class="cardTitle"> Retirar senha para o caixa </v-card-title>
        <v-card-text v-if="ticket"> <b> Senha -> </b> {{ticket}} </v-card-text>
        <v-btn class="mx-auto cardBtn" elevation="2" rounded @click="getTicket('C')"> Retirar senha </v-btn>
      </v-card>

      <v-card class="card" elevation="2" outlined>
        <v-card-title class="cardTitle"> Retirar senha para o caixa prioridade </v-card-title>
        <v-card-text v-if="priorityTicket"> <b> Senha -> </b> {{priorityTicket}}
        </v-card-text>
        <v-btn class="mx-auto cardBtn" elevation="2" rounded @click="getTicket('P')"> Retirar senha </v-btn>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss">
#getTicket {
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
      width: 30%;
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
      }
    }
  }
}
</style>

<script>
import api from "../services/api";

export default {
  name: "getTicket",
  data() {
    return {
      ticket: false,
      priorityTicket: false
    };
  },
  methods: {
    async getTicket(type) {
      let response = await api.post("getTicket", {
        type: type
      });

      type == 'C' ? this.ticket = response.data.senha
        : this.priorityTicket = response.data.senha;

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      type == 'C' ? this.ticket = false : this.priorityTicket = false;      
    }    
  }
};
</script>
