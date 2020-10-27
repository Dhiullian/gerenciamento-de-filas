import Knex from 'knex';

export async function up (knex: Knex){
    // CRIAR TABELA
    return knex.schema.createTable('ticket', table => {
        table.increments('id').primary();
        table.boolean('called');
        table.string('type',1);
        table.dateTime('calledTime');
        table.integer('attendant');
        table.dateTime('getTicket').defaultTo(knex.fn.now());
    })

}

export async function down (knex: Knex){
    //DROPAR TABLE
    return knex.schema.dropTable('ticket');
}