export const round = value => Math.round((value + Number.EPSILON) * 100) / 100;
export const newSession = () => ({version:1,name:'Poker night',rate:1,tokens:1000,players:[],events:[],closed:false});
export function totals(state) {
  return {pot:round(state.events.reduce((n,e)=>n+e.amount,0)),chips:state.events.reduce((n,e)=>n+e.chips,0),buyins:state.events.length};
}
export function playerTotals(state,id) {
  const events=state.events.filter(e=>e.playerId===id);
  const invested=round(events.reduce((n,e)=>n+e.amount,0));
  const player=state.players.find(p=>p.id===id);
  return {buyins:events.length,invested,chips:events.reduce((n,e)=>n+e.chips,0),cashout:player.final===null?null:round(player.final*state.rate),profit:player.final===null?null:round(player.final*state.rate-invested)};
}
export function settlement(state) {
  const complete=state.players.length>0&&state.players.every(p=>Number.isSafeInteger(p.final)&&p.final>=0);
  const counted=state.players.reduce((n,p)=>n+(p.final??0),0);
  const difference=counted-totals(state).chips;
  return {complete,counted,difference,balanced:complete&&difference===0};
}
