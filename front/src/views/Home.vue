<template>
  <div id="home">
    <h1 class="mt-16">
      BANK
      <br />FAC - BETIM
    </h1>
    <v-card class="calledClient mx-auto mt-10" elevation="2" loading outlined>
      <h1>
        Cliente
        <b>{{calledTicket.ticket}}</b>
        dirija-se ao caixa {{calledTicket.attendant}}
      </h1>
    </v-card>
    <v-card class="lastCalleds mx-auto mt-2" elevation="2" outlined>
      <h1>Ultimas senhas:</h1>
      <h2 v-if="lastTicket1">
        <b>{{lastTicket1.ticket}}</b>
        caixa {{lastTicket1.attendant}}
      </h2>
      <h2 v-if="lastTicket2">
        <b>{{lastTicket2.ticket}}</b>
        caixa {{lastTicket2.attendant}}
      </h2>
      <h2 v-if="lastTicket3">
        <b>{{lastTicket3.ticket}}</b>
        caixa {{lastTicket3.attendant}}
      </h2>
    </v-card>
  </div>
</template>

<style lang="scss">
#home {
  background-color: #86c6f6;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 30px;
  }

  .calledClient,
  .lastCalleds {
    width: 80%;
    border-radius: 25px;
    h1 {
      margin: 20px 0;
      font-weight: unset;
    }
  }

  .lastCalleds {
    h1 {
      margin: 0;
    }
  }
}
</style>

<script>
import api from "../services/api";

export default {
  name:"displayTicket",
  data() {
    return {
      calledTicket: false,
      lastTicket1: false,
      lastTicket2: false,
      lastTicket3: false
    };
  },
  async mounted() {
    while (1) {
      const response = await api.get("lastCallTicket");
      let lastTicket = this.extractData(response);
      this.attData(lastTicket);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  },
  methods: {
    extractData(data) {
      return {
        ticket: data.data["lastTicket"][0].type + data.data["lastTicket"][0].id,
        attendant: data.data["lastTicket"][0].attendant
      };
    },
    attData(lastCalled) {
      if (lastCalled.ticket != this.calledTicket.ticket) {
        this.lastTicket3 = this.lastTicket2;
        this.lastTicket2 = this.lastTicket1;
        this.lastTicket1 = this.calledTicket;
        this.calledTicket = lastCalled;
      }
    }
  }
};
</script>
