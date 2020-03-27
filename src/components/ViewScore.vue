<template>
<div id="view-score" class="container-100">
    
    <!-------- Title -------->

    <div class="fs-1-3 fw-b p-y-3 grey lighten-4"><div class="blue-text center">スコア</div></div>

    <!-------- Radar Chart -------->

    <div class="container p-y-2 border-b">
        <radar :chartdata="chartdata" :options="options"></radar>
    </div>

    <!-------- MyScore -------->

    <div class="container p-y-2">
        <form @submit.prevent="saveScore">
            <table>
                <tr v-for="score in myscores" class="border-0">
                    <td class="p-y-0-5"><span class="chip blue-text fw-b blue lighten-5">{{ score.name }}</span></td>
                    <td class="p-y-0-5"><span class="range-field">
                        <input v-model="score.value" type="range" min="0" max="100" />
                    </span></td>
                    <td class="p-y-0-5"><span class="blue-text fw-b m-l-1">{{ score.value }}</span></td>
                </tr>
            </table>
            <button type="submit" class="btn waves-effect waves-light h-3 rounded-10 w-50 m-y-1
            bg-theme z-depth-0 right">保存</button>
        </form>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
import Radar from './Radar.vue'

export default {
    name : 'view-score',
    components: {
      Radar
    },
    data() {
        return {
            chartdata: {
                labels: ['人事', '新規事業', 'プロセス', 'スキル', '職場環境', 'その他'],
                datasets: [
                    {
                        backgroundColor: 'rgba(33, 150, 243, 0.5)',
                        data: [37, 35, 35, 36, 40, 35],
                        borderWidth: 0
                    },
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scale: {
                       ticks: {
                         min:0,
                         max:50
                       }
                }
            },
            myscores: [
                {
                    name: '人事',
                    value: 50
                },
                {
                    name: '新規事業',
                    value: 50
                },
                {
                    name: 'プロセス',
                    value: 50
                },
                {
                    name: 'スキル',
                    value: 50
                },
                {
                    name: '職場環境',
                    value: 50
                },
                {
                    name: 'その他',
                    value: 50
                },
            ],
        }
    },
    mounted() {
        db.collection('users').doc(firebase.auth().currentUser.email)
        .get().then(
            doc => {
                if(doc.exists) {
                    var score = doc.get('score');
                    if(typeof score !== "undefined") this.myscores = score;
                }
            }
        )
    },
    methods: {
        saveScore() {
            db.collection('users').doc(firebase.auth().currentUser.email).update({
                score: this.myscores
            });
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>