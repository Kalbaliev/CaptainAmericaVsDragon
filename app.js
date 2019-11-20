new Vue({

    el:"#app",
    data:{

        player_health:100,
        monster_health:100,

        attack_multiple:10,
        special_attack_multiple:25,
        monster_attack_multiple:15,
        health_multiple:20,
        log_text:{
            attack:"Vurduğunuz zərbə : ",
            special_attack:"Özəl vuruş : ",
            monster_attack: "Canavar zərbəsi :",
            health_up: "İlk yardım : ",
            health_up_err: "Canınınız zatən doludur!",
            give_up: "Siz Təslim Oldunuz!"
        },
        game_is_on:false,
        logs:[]


    },
    methods:{

        start_game:function(){

            this.game_is_on=true;

        },
        attack:function(){

            var point = Math.ceil(Math.random()*this.attack_multiple);
            this.monster_health-=point;
            this.add_to_log({
                turn:"p",text:this.log_text.attack+point
            })
            this.monster_attack();
            
        
        },
        special_attack:function(){
            var point = Math.ceil(Math.random()*this.special_attack_multiple);
            this.monster_health-=point;
            this.add_to_log({
                turn:"p",text:this.log_text.special_attack+point
            })
            this.monster_attack();
          
        },
        health_up:function(){
            if(this.player_health<100){

            
                var point = Math.ceil(Math.random()*this.health_multiple);
                this.player_health+=point;
                this.add_to_log({
                    turn:"h",text:this.log_text.health_up+point
                })
            }
            else{

                this.add_to_log({
                    turn:"h",text:this.log_text.health_up_err
                })
            }
        },
        give_up:function(){
            this.player_health=0;
            this.add_to_log({
                turn:"p",text:this.log_text.give_up
            })

        },
        monster_attack:function(){
            var point = Math.ceil(Math.random()*this.monster_attack_multiple);
            this.player_health-=point;
            this.add_to_log({
                turn:"m",text:this.log_text.monster_attack+point
            })
        },
        add_to_log:function(log){

            this.logs.push(log);
        }

    },
    watch:{
        player_health:function(value){

            if (value<=0){

                this.player_health=0;
                if(confirm("Siz MƏĞLUB oldunuz.\nYenidən oynamaq istəyirsiniz ?")){
                    this.player_health=100;
                    this.monster_health=100;
                    this.logs=[]
                }
            }
            else if (value>=100){
                this.player_health=100;
            }

        },
        monster_health:function(value){

            if (value<=0){

                this.monster_health=0;
                if(confirm("Siz QALİB oldunuz.\nYenidən oynamaq istəyirsiniz ?")){
                    this.player_health=100;
                    this.monster_health=100;
                    this.logs=[]
                }
            }
            

        }
    },

    computed:{

        playerProgress:function(){

            return {
                width:this.player_health+"%"

            }
        },
        monsterProgress:function(){

            return {
                width:this.monster_health+"%"
            }
        }
    }


})